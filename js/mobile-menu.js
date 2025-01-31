(() => {
  const refs = {
    openMenuBtn: document.querySelector('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
    links: document.querySelectorAll('[data-menu] .mobile-menu__link'), 
  };

  refs.openMenuBtn.addEventListener('click', toggleModal);
  refs.closeMenuBtn.addEventListener('click', toggleModal);
  document.addEventListener('click', onDocumentClick);

  
  refs.links.forEach(link => {
    link.addEventListener('click', () => {
      toggleModal(); 
    });
  });

  function toggleModal() {
    const isOpen = refs.menu.classList.toggle('is-open');
    refs.openMenuBtn.setAttribute('aria-expanded', isOpen);
  }

  function onDocumentClick(event) {
    const isMenuOpen = refs.menu.classList.contains('is-open');
    const isClickInsideMenu = refs.menu.contains(event.target);
    const isClickOnOpenBtn = refs.openMenuBtn.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnOpenBtn) {
      toggleModal();
    }
  }
})();
