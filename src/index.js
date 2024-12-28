import './pages/index.css';
import {
    initialCards,
    createCard,
    handleDeleteCard,
    toggleLike,
} from './scripts/cards.js';
import { closePopup, openPopup, sendForm } from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const addCardButton = document.querySelector('.profile__add-button');
const editButtonProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const inputUserName = formEditProfile.elements['name'];
const inputUserProfession = formEditProfile.elements['description'];

const formAddNewCard = document.querySelector('form[name="new-place"]');
const inputPlaceName = formAddNewCard.elements['place-name'];
const inputPlaceLink = formAddNewCard.elements['link'];

const likeButtons = document.querySelectorAll('.card__like-button');
const cardImages = document.querySelectorAll('.card__image');

const addCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const imageCard = imagePopup.querySelector('.popup__image');
const captionCard = imagePopup.querySelector('.popup__caption');

// Функция вставки карточки на страницу

const renderCard = (cardElement, container) => {
    container.append(cardElement);
};

// Функция добавления новой карточки в начало списка
const addCard = (name, link) => {
    const cardElement = createCard({ name, link }, card => {
        card.remove();
    });
    cardList.prepend(cardElement);
};

// Вывести карточки на страницу, используем цикл forEach

initialCards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard);
    renderCard(cardElement, cardList);
});

// Добавление pop-up для создания новой карточки

addCardButton.addEventListener('click', () => {
    formAddNewCard.reset();
    openPopup(addCardPopup);
});

// Добавление pop-up для редактирования профиля

editButtonProfile.addEventListener('click', () => {
    inputUserName.placeholder = profileName.textContent;
    inputUserProfession.placeholder = descriptionProfile.textContent;
    formEditProfile.reset();
    openPopup(editProfilePopup);
});

// ЗАКРЫТИЕ POP-UP
// Закрытие через нажатие на 'крестик'

const closePopupButtons = document.querySelectorAll('.popup__close');

closePopupButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopup(popup);
    });
});

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

// Вызов функции для записи новых данных в профиль

formEditProfile.addEventListener('submit', editProfile);

// НОВАЯ КАРТОЧКА
// Обработчик отправки формы добавления новой карточки
formAddNewCard.addEventListener('submit', event => {
    event.preventDefault();

    const name = inputPlaceName.value;
    const link = inputPlaceLink.value;

    if (name && link) {
        addCard(name, link);
        formAddNewCard.reset();
        sendForm(formAddNewCard);
    }
});

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

// Обработчик для показа попапа с картинкой

cardImages.forEach(image => {
    image.addEventListener('click', () => {
        buildImageTypePopup(image);
    });
});

export { cardTemplate, buildImageTypePopup };
