import { cardTemplate } from '../index.js';

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

// @todo: Функция создания карточки

const createCard = ({ name, link }, onDelete) => {
    const cardElement = cardTemplate
        .querySelector('.places__item')
        .cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardImageTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = 'На фото изображен город ${name}';
    cardImageTitle.textContent = name;

    deleteButton.addEventListener('click', () => onDelete(cardElement));

    return cardElement;
};

// @todo: Функция удаления карточки

const handleDeleteCard = cardElement => {
    cardElement.remove();
};

// @todo: Функция вставки карточки на страницу

const renderCard = (cardElement, container) => {
    container.append(cardElement);
};

export { initialCards, createCard, handleDeleteCard, renderCard };
