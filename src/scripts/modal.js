// Открытие и закрытие попапа добавления карточки

const closeByOverlay = evt => {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.target === openedPopup) {
        closePopup(openedPopup);
    }
};

const closeByEscape = evt => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
};

const openPopup = modal => {
    modal.classList.add('popup_is-opened');
    modal.classList.remove('popup_is-animated');

    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlay);
};

const closePopup = modal => {
    modal.classList.add('popup_is-animated');
    modal.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlay);
};

// При отправке формы попап автоматически закрывается

const sendForm = form => {
    const popup = form.closest('.popup');
    closePopup(popup);
};

export { closePopup, openPopup, sendForm };
