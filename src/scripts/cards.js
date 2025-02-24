import { cardTemplate, buildImageTypePopup } from '../index.js';
import { deleteCard, likeCard, unlikeCard } from './api.js';

//Функция создания карточки

const createCard = (cardData, userId, onDeleteClick, onLikeClick) => {
    const cardElement = cardTemplate
        .querySelector('.places__item')
        .cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = `На фото изображен город ${cardData.name}`;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    if (cardData.owner._id !== userId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () =>
            onDeleteClick(cardElement, cardData._id, cardData.owner._id, userId)
        );
    }

    cardImage.addEventListener('click', () => buildImageTypePopup(cardImage));
    likeButton.addEventListener('click', () =>
        onLikeClick(likeButton, cardData._id)
    );

    return cardElement;
};

// Функция для обработки лайков

const handleLikeClick = (likeButton, cardId) => {
    const isLiked = likeButton.classList.contains(
        'card__like-button_is-active'
    );
    const likeAction = isLiked ? unlikeCard : likeCard;

    likeAction(cardId)
        .then(updatedCard => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeButton.nextElementSibling.textContent =
                updatedCard.likes.length;
        })
        .catch(err => console.error(`Ошибка лайка: ${err}`));
};

// Функция для удаления карточки, если она не принадлежит текущему пользователю

const handleDeleteCard = (element, cardId, ownerId, userId) => {
    if (ownerId === userId) {
        deleteCard(cardId)
            .then(() => element.remove())
            .catch(err => console.error(`Ошибка удаления: ${err}`));
    }
};

export { createCard, handleLikeClick, handleDeleteCard };
