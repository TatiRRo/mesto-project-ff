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
    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('click', closeByOverlay);
};

const closePopup = modal => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
    document.removeEventListener('click', closeByOverlay);
};

export { closePopup, openPopup };
