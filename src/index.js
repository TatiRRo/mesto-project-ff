import './pages/index.css';
import {
    initialCards,
    createCard,
    handleDeleteCard,
    toggleLike,
} from './scripts/cards.js';
import {
    closePopup,
    openPopup,
    sendForm,
    editProfile,
    buildImageTypePopup,
} from './scripts/modal.js';

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
    openPopup(addCardPopup);
});

// Добавление pop-up для редактирования профиля

editButtonProfile.addEventListener('click', () => {
    inputUserName.placeholder = profileName.textContent;
    inputUserProfession.placeholder = descriptionProfile.textContent;
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

// LIKE
// Обработчик для каждой кнопки Like

likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        toggleLike(button);
    });
});

// ПОПАП С КАРТИНКОЙ
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
    imagePopup,
    imageCard,
    captionCard,
};
