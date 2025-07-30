// monkey.js - A client-side HTMX patch for Datastar
import { load, apply } from 'https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js';

const FETCH_EVENT = 'datastar-fetch';
const PATCH_ELEMENTS = 'datastar-patch-elements';

// Parse object literals without quotes
const parseAttr = (str) => {
  if (!str) return {};
  try {
    return new Function(`return (${str})`)();
  } catch (e) {
    console.error('[🐒] Parse error:', str, e);
    return {};
  }
};

// Serialize form to object (for JSON)
const formToObject = (form) => {
  const data = {};
  new FormData(form).forEach((value, key) => {
    if (key in data) {
      data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
    } else {
      data[key] = value;
    }
  });
  return data;
};

// Find form element
const findForm = (el, selector) => {
  if (selector) return document.querySelector(selector);
  return el.closest('form') || (el.tagName === 'FORM' ? el : null);
};

// Core action
const monkeyFetch = async ({ el }, url, method = 'GET') => {
  // Get config early for confirm check
  const config = parseAttr(el.getAttribute('data-monkey'));
  console.log(config);
  const {
    patch,
    select,
    swap = 'outer',
    transition = false,
    url: pushUrl,
    body,
    form: formSelector,
    json = true,
    clear = false,
    confirm: confirmText,
    indicator,
    vals
  } = config;

  // Bail if no patch target
  if (!patch) {
    console.warn('[🐒] No patch target');
    return;
  }

  // Confirmation dialog
  if (confirmText && !window.confirm(confirmText)) {
    return;
  }

  // Show loading indicator
  const indicatorEl = indicator ? document.querySelector(indicator) : null;
  if (indicatorEl) indicatorEl.classList.add('htmx-request');

  // Signal start
  document.dispatchEvent(new CustomEvent(FETCH_EVENT, {
    detail: { type: 'started', el }
  }));

  try {
    // HTMX headers
    const kebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    const headers = {
      'HX-Request': 'true',
      'HX-Trigger': el.id || kebab(el.tagName),
      'HX-Target': patch,
      'HX-Current-URL': window.location.href,
    };
    if (select) headers['HX-Select'] = select;

    // Build request
    const opts = { method, headers };
    let formElement = null;

    // Handle body/form data
    if (method !== 'GET') {
      formElement = findForm(el, formSelector);

      if (formElement) {
        let formData = formToObject(formElement);

        // Merge additional values
        if (vals) {
          const extraData = typeof vals === 'string' ? parseAttr(vals) : vals;
          formData = { ...formData, ...extraData };
        }

        if (json) {
          headers['Content-Type'] = 'application/json';
          opts.body = JSON.stringify(formData);
        } else {
          // FormData for file uploads
          const fd = new FormData(formElement);
          if (vals) {
            const extraData = typeof vals === 'string' ? parseAttr(vals) : vals;
            Object.entries(extraData).forEach(([k, v]) => fd.append(k, v));
          }
          opts.body = fd;
        }
      } else if (body) {
        // Explicit body
        let bodyData = body;
        if (vals) {
          const extraData = typeof vals === 'string' ? parseAttr(vals) : vals;
          bodyData = { ...body, ...extraData };
        }
        headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(bodyData);
      }
    }

    const response = await fetch(url, opts);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    let html = await response.text();

    // Extract fragment
    if (select) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const fragment = doc.querySelector(select);
      if (!fragment) {
        console.warn(`[🐒] Fragment "${select}" not found`);
        return;
      }
      html = fragment.outerHTML;
    }

    // Morph the DOM
    document.dispatchEvent(new CustomEvent(FETCH_EVENT, {
      detail: {
        type: PATCH_ELEMENTS,
        el,
        argsRaw: {
          elements: html,
          selector: patch,
          mode: swap,
          useViewTransition: transition,
        }
      }
    }));

    // Clear form after successful submission
    if (clear && formElement) {
      formElement.reset();

      // Focus first input for better UX
      const firstInput = formElement.querySelector('input:not([type="hidden"]), textarea, select');
      if (firstInput) firstInput.focus();
    }

    // Update history
    if (pushUrl !== undefined) {
      history.pushState({}, '', pushUrl);
    }

  } catch (error) {
    console.error('[🐒] Fetch failed:', error);

    // Simple error display
    if (patch && error.message.match(/\d{3}/)) {
      const errorHtml = `<div class="error">Error: ${error.message}</div>`;
      document.dispatchEvent(new CustomEvent(FETCH_EVENT, {
        detail: {
          type: PATCH_ELEMENTS,
          el,
          argsRaw: {
            elements: errorHtml,
            selector: patch,
            mode: 'inner'
          }
        }
      }));
    }
  } finally {
    // Hide loading indicator
    if (indicatorEl) indicatorEl.classList.remove('htmx-request');

    // Signal completion
    document.dispatchEvent(new CustomEvent(FETCH_EVENT, {
      detail: { type: 'finished', el }
    }));
  }
};

// Register HTTP methods
['hx-get', 'hx-post', 'hx-put', 'hx-delete', 'hx-patch'].forEach(method => {
  load({
    type: 'action',
    name: method,
    fn: ({ el }, url) => monkeyFetch({ el }, url, method.toUpperCase())
  });
});

// Keep original @monkey for backwards compat
load({
  type: 'action',
  name: 'monkey',
  fn: ({ el }, url) => monkeyFetch({ el }, url, 'GET')
});

apply();