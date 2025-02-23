import { cardTemplate, buildImageTypePopup } from '../index.js';

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
            onDeleteClick(cardElement, cardData._id)
        );
    }

    cardImage.addEventListener('click', () => buildImageTypePopup(cardImage));
    likeButton.addEventListener('click', () =>
        onLikeClick(likeButton, cardData._id)
    );

    return cardElement;
};

export { createCard };
