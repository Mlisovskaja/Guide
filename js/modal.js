(() => {
    const refs = {
        openModalBtn: document.querySelector("[data-modal-open]"),
        closeModalBtn: document.querySelectorAll("[data-modal-close]"),
        formModal: document.getElementById("form-modal"),
        notificationModal: document.getElementById("notification-modal"),
        notificationText: document.getElementById("notification-text"), // Добавьте элемент для текста
        contactForm: document.getElementById("contact-form"),
    };

    refs.openModalBtn.addEventListener("click", () => toggleModal(refs.formModal));
    refs.closeModalBtn.forEach(btn => btn.addEventListener("click", closeAllModals));
    window.addEventListener("click", closeModalOnClickOutside);
    window.addEventListener("keydown", closeModalOnEscape);
    refs.contactForm.addEventListener("submit", handleSubmit);

    function toggleModal(modal) {
        modal.classList.toggle("is-hidden");
    }

    function closeAllModals() {
        refs.formModal.classList.add("is-hidden");
        refs.notificationModal.classList.add("is-hidden");
    }

    function closeModalOnClickOutside(event) {
        if (event.target === refs.formModal || event.target === refs.notificationModal) {
            closeAllModals();
        }
    }

    function closeModalOnEscape(event) {
        if (event.key === "Escape") {
            closeAllModals();
        }
    }

    function handleSubmit(event) {
        event.preventDefault(); // Остановить стандартное поведение формы

        fetch(refs.contactForm.action, {
            method: 'POST',
            body: new FormData(refs.contactForm),
        })
        .then(response => response.text()) // Изменяем на .text() для PHP
        .then(data => {
            // Показать уведомление с текстом от сервера
            refs.notificationText.textContent = data; // Заполнить текст уведомления
            refs.contactForm.reset(); // Очистить форму
            closeAllModals(); // Закрыть форму
            toggleModal(refs.notificationModal); // Показать уведомление
        })
        .catch(error => {
            console.error('Errore:', error);
            alert("Qualcosa è andato storto. Prova di nuovo!");
        });
    }
})();
