import './pages/index.css';
import {
    initialCards,
    createCard,
    handleDeleteCard,
    renderCard,
    addCard,
    likeCard,
} from './scripts/cards.js';
import {
    popupDelete,
    popupAdd,
    closePopUpafterSave,
    changePlaceholder,
    editProfile,
    buildImageTypePopup,
} from './scripts/modal.js';

// Вывести карточки на страницу, используем цикл forEach

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

initialCards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard);
    renderCard(cardElement, cardList);
});

// Добавление pop-up для создания новой карточки

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

addCardButton.addEventListener('click', () => {
    popupAdd(addCardPopup);
});

// Добавление pop-up для редактирования профиля

const editButtonProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');

editButtonProfile.addEventListener('click', () => {
    popupAdd(editProfilePopup);
});

// ЗАКРЫТИЕ POP-UP
// Закрытие через нажатие на 'крестик'

const closePopupButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

closePopupButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        const form = popup.querySelector('form');
        if (form) {
            form.reset();
        }
        popupDelete(popup);
    });
});

// Закрытие popup при нажатии на оверлей

document.addEventListener('click', evt => {
    popups.forEach(popup => {
        if (evt.target === popup) {
            const form = popup.querySelector('form');
            if (form) {
                form.reset();
            }
            popupDelete(popup);
        }
    });
});

// Закрытие popup при нажатии на esc

document.addEventListener('keydown', evt => {
    popups.forEach(popup => {
        if (evt.key === 'Escape') {
            const form = popup.querySelector('form');
            if (form) {
                form.reset();
            }
            popupDelete(popup);
        }
    });
});

// ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
// Редактирование профиля пользователя

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const profileName = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const inputUserName = formEditProfile.elements['name'];
const inputUserProfession = formEditProfile.elements['description'];

// Вызов функции для отображения ранее сохраненных данных(Жак Ив-Кусто,Исследователь океана)

changePlaceholder();

// Вызов функции для записи новых данных в профиль

formEditProfile.addEventListener('submit', editProfile);

// НОВАЯ КАРТОЧКА
// Добавление новой карточки пользователем

const formAddNewCard = document.querySelector('form[name="new-place"]');
const inputPlaceName = formAddNewCard.elements['place-name'];
const inputPlaceLink = formAddNewCard.elements['link'];

// Обработчик отправки формы добавления новой карточки
formAddNewCard.addEventListener('submit', event => {
    event.preventDefault();

    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;

    if (name && link) {
        addCard(name, link);
        formAddNewCard.reset();
        closePopUpafterSave(formAddNewCard);
    }
});

// LIKE
// Добавление лайка на фото
const likeButtons = document.querySelectorAll('.card__like-button');

// Обработчик для каждой кнопки Like

likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        likeCard(button);
    });
});

// ПОПАП С КАРТИНКОЙ
// Просмотр попапа с картинкой

const cardImages = document.querySelectorAll('.card__image');

// Обработчик для показа попапа с картинкой

cardImages.forEach(image => {
    image.addEventListener('click', () => {
        buildImageTypePopup(image);
    });
});

export {
    cardTemplate,
    inputUserName,
    inputUserProfession,
    profileName,
    descriptionProfile,
    formEditProfile,
    cardList,
};
