const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

initialCards.forEach(({ name, link }) => {
    const cardItem = cardTemplate
        .querySelector('.places__item')
        .cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardImageTitle = cardItem.querySelector('.card__title');

    cardImage.src = link;
    cardImageTitle.textContent = name;

    cardList.append(cardItem);
});

const addCardButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_type_new-card');

addCardButton.addEventListener('click', function () {
    popupAddPlace.style.display = 'flex';
});

const closePopUpdButton = popupAddPlace.querySelector('.popup__close');

closePopUpdButton.addEventListener('click', function () {
    popupAddPlace.style.display = 'none';
});

cardList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__delete-button')) {
        const cardItem = evt.target.closest('.places__item');
        if (cardItem) {
            cardItem.remove();
        }
    }
});
