const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_new-card');
const closePopupButton = popupAddPlace.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard({ name, link }, onDelete) {
    const cardElement = cardTemplate
        .querySelector('.places__item')
        .cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardImageTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = `На фото изображен город ${name}`;
    cardImageTitle.textContent = name;

    deleteButton.addEventListener('click', () => onDelete(cardElement));

    return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Функция вставки карточки на страницу
function renderCard(cardElement, container) {
    container.append(cardElement);
}

// @todo: Вывести карточки на страницу, используем цикл forEach
initialCards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard);
    renderCard(cardElement, cardList);
});

// @todo: Открытие и закрытие попапа добавления карточки
addCardButton.addEventListener('click', function () {
    popupAddPlace.style.display = 'flex';
});

closePopupButton.addEventListener('click', function () {
    popupAddPlace.style.display = 'none';
});
