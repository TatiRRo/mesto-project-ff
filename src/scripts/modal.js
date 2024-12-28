import {
    inputUserName,
    inputUserProfession,
    profileName,
    descriptionProfile,
    formEditProfile,
    imagePopup,
    imageCard,
    captionCard,
} from '../index.js';

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

// ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
// Функция для записи новых данных в профиль

const editProfile = evt => {
    evt.preventDefault();

    inputUserName.placeholder = inputUserName.value;
    inputUserProfession.placeholder = inputUserProfession.value;

    profileName.textContent = inputUserName.value;
    descriptionProfile.textContent = inputUserProfession.value;

    sendForm(formEditProfile);
};

// ПОПАП С КАРТИНКОЙ
// Функция для создания попапа предпросмотра

const buildImageTypePopup = image => {
    const parentCard = image.closest('.card');
    const cardImage = parentCard.querySelector('.card__image');
    const cardTitle = parentCard.querySelector('.card__title');

    imageCard.src = cardImage.src;
    imageCard.alt = `На фото изображен город ${cardTitle.textContent}`;
    captionCard.textContent = cardTitle.textContent;

    openPopup(imagePopup);
};

export { closePopup, openPopup, sendForm, editProfile, buildImageTypePopup };
