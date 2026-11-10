const drawer = document.querySelector('#about-zach');

if (drawer) {
  await Promise.all(['wa-drawer', 'wa-button'].map(tag => customElements.whenDefined(tag)));
  let opener;

  document.addEventListener('click', event => {
    const trigger = event.composedPath().find(node =>
      node instanceof Element && node.hasAttribute('data-about-zach')
    );
    if (!trigger) return;

    opener = trigger;
    trigger.focus({ preventScroll: true });
    drawer.open = true;
  });

  // Leave mobile navigation open underneath and return to the button that opened About.
  drawer.addEventListener('wa-after-hide', () => opener?.focus({ preventScroll: true }));
}
