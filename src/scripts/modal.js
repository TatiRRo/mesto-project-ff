import {
    inputUserName,
    inputUserProfession,
    profileName,
    descriptionProfile,
    formEditProfile,
} from '../index.js';

// Открытие и закрытие попапа добавления карточки

const popupAdd = modal => {
    modal.classList.add('popup_is-opened');
    modal.classList.remove('popup_is-animated');
};

const popupDelete = modal => {
    modal.classList.add('popup_is-animated');
    modal.classList.remove('popup_is-opened');
};

// При отправке формы попап автоматически закрывается
const closePopUpafterSave = form => {
    const popup = form.closest('.popup');
    popupDelete(popup);
};

// ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
// Функция для отображения ранее сохраненных данных(Жак Ив-Кусто,Исследователь океана)

const changePlaceholder = () => {
    inputUserName.placeholder = profileName.textContent;
    inputUserProfession.placeholder = descriptionProfile.textContent;
};

// Функция для записи новых данных в профиль

const editProfile = evt => {
    evt.preventDefault();

    inputUserName.placeholder = inputUserName.value;
    inputUserProfession.placeholder = inputUserProfession.value;

    profileName.textContent = inputUserName.value;
    descriptionProfile.textContent = inputUserProfession.value;

    closePopUpafterSave(formEditProfile);
};

// ПОПАП С КАРТИНКОЙ
// Функция для создания попапа предпросмотра

const buildImageTypePopup = image => {
    const imagePopup = document.querySelector('.popup_type_image');
    const imageCard = imagePopup.querySelector('.popup__image');
    const captionCard = imagePopup.querySelector('.popup__caption');

    const parentCard = image.closest('.card');
    const cardImage = parentCard.querySelector('.card__image');
    const cardTitle = parentCard.querySelector('.card__title');

    imageCard.src = cardImage.src;
    captionCard.textContent = cardTitle.textContent;

    popupAdd(imagePopup);
};

export {
    popupDelete,
    popupAdd,
    closePopUpafterSave,
    changePlaceholder,
    editProfile,
    buildImageTypePopup,
};
