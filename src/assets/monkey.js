// monkey.js
import { load, apply } from 'https://cdn.jsdelivr.net/gh/starfederation/datastar@main/bundles/datastar.js';

// --- CONSTANTS for clarity and to avoid magic strings ---
const DATASTAR_FETCH_EVENT = 'datastar-fetch';
const EV_PATCH_ELEMENTS = 'datastar-patch-elements';
const EV_STARTED = 'started';
const EV_FINISHED = 'finished';

// --- HELPER to parse the configuration object ---
const parseAttr = (str) => {
  if (!str) return {};
  try {
    // A robust way to parse a JS object string that might not have quoted keys
    return new Function(`return (${str})`)();
  } catch (e) {
    console.error("Could not parse monkey attribute value:", str, e);
    return {};
  }
};

const MonkeyPatchAction = {
  type: 'action',
  name: 'monkey',
  // The 'fn' is the heart of the action.
  // It receives the Datastar context (including the element `el`) and any arguments from the template.
  fn: async ({ el }, url) => {
    // Dispatch a 'started' event for indicators.
    document.dispatchEvent(new CustomEvent(DATASTAR_FETCH_EVENT, { detail: { type: EV_STARTED, el } }));

    try {
      // 1. Get configuration directly from the element that triggered the action.
      const config = parseAttr(el.getAttribute('data-monkey'));
      const {
        patch: patchSelector,
        select: fragmentSelector,
        swap: mode = 'outer', // Default to 'outer' if not specified
        transition: useViewTransition = false,
        url: historyUrl,
      } = config;

      if (!patchSelector) {
        console.warn('[Monkey] Missing `patch` selector in data-monkey attribute.', el);
        return;
      }

      // 2. Build HTMX-style headers.
      const kebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const headers = {
        'HX-Request': 'true',
        'HX-Trigger': el.id || kebab(el.tagName),
        'HX-Target': patchSelector,
        'HX-Current-URL': window.location.href,
      };
      if (fragmentSelector) headers['HX-Select'] = fragmentSelector;

      // 3. Perform the fetch.
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let htmlText = await response.text();

      // 4. Select a fragment if requested.
      if (fragmentSelector) {
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
        const fragment = doc.querySelector(fragmentSelector);
        if (!fragment) {
          console.warn(`[Monkey] Selector "${fragmentSelector}" not found in response.`, el);
          return; // Abort the patch
        }
        htmlText = fragment.outerHTML;
      }

      // 5. Dispatch the event that tells Datastar to perform the patch.
      // This is the core integration point. We're using Datastar's powerful morphing engine.
      document.dispatchEvent(new CustomEvent(DATASTAR_FETCH_EVENT, {
        detail: {
          type: EV_PATCH_ELEMENTS,
          el,
          argsRaw: {
            elements: htmlText,
            selector: patchSelector,
            mode,
            useViewTransition,
          }
        }
      }));

      // 6. Handle history pushstate *after* the fetch is done.
      // We listen for our own 'finished' event to ensure the DOM has been patched.
      if (historyUrl !== undefined) {
        history.pushState({}, '', historyUrl);
      }

    } catch (error) {
      console.error('[Monkey] Fetch failed:', error);
    } finally {
      // ALWAYS dispatch a 'finished' event, even on error.
      document.dispatchEvent(new CustomEvent(DATASTAR_FETCH_EVENT, { detail: { type: EV_FINISHED, el } }));
    }
  }
};

// Load ONLY our beautiful new action.
load(MonkeyPatchAction);

apply();