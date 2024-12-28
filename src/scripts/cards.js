import { cardTemplate, buildImageTypePopup } from '../index.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
];

// Функция создания карточки

const createCard = ({ name, link }, onDeleteClick, onLikeClick, typePopup) => {
    const cardElement = cardTemplate
        .querySelector('.places__item')
        .cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = `На фото изображен город ${name}`;
    cardTitle.textContent = name;

    deleteButton.addEventListener('click', () => onDeleteClick(cardElement));
    cardImage.addEventListener('click', () => buildImageTypePopup(cardImage));
    likeButton.addEventListener('click', () => toggleLike(likeButton));

    return cardElement;
};

// Функция удаления карточки

const handleDeleteCard = cardElement => {
    cardElement.remove();
};

// LIKE
// Функция для добавления/удаления Like на фото

const toggleLike = button => {
    const currentStyle = getComputedStyle(button).backgroundImage;

    if (currentStyle.includes('like-active.svg')) {
        button.setAttribute(
            'style',
            'background-image: url(./images/like-inactive.svg);'
        );
    } else {
        button.setAttribute(
            'style',
            'background-image: url(./images/like-active.svg);'
        );
    }
};

export { initialCards, createCard, handleDeleteCard };
