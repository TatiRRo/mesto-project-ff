import './pages/index.css';
import { createCard } from './scripts/cards.js';
import { closePopup, openPopup, sendForm } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import {
    API_CONFIG,
    validationConfig,
    loadInitialData,
    updateUserProfile,
    addNewCard,
    deleteCard,
    likeCard,
    unlikeCard,
    updateUserAvatar,
} from './scripts/api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const addCardButton = document.querySelector('.profile__add-button');
const editButtonProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const inputUserName = formEditProfile.elements['name'];
const inputUserProfession = formEditProfile.elements['description'];
const submitButtonProfile = formEditProfile.querySelector('.popup__button');

const formAddCard = document.querySelector('form[name="new-place"]');
const inputPlaceName = formAddCard.elements['place-name'];
const inputPlaceLink = formAddCard.elements['link'];
const submitButtonCard = formAddCard.querySelector('.popup__button');

const addCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');
const imageCard = imagePopup.querySelector('.popup__image');
const captionCard = imagePopup.querySelector('.popup__caption');
const closePopupButtons = document.querySelectorAll('.popup__close');

const updateAvatarPopup = document.querySelector('.popup_type_avatar');
const formAvatarUpdate = document.querySelector('form[name="update-avatar"]');
const inputAvatarLink = formAvatarUpdate.elements['avatar'];
const avatarPopup = document.querySelector('.popup_type_avatar');
const submitButtonAvatar = updateAvatarPopup.querySelector('.popup__button');

// Функция вставки карточки на страницу

const renderCard = (cardElement, container) => {
    container.append(cardElement);
};

// Добавление pop-up для создания новой карточки

addCardButton.addEventListener('click', () => {
    formAddCard.reset();
    openPopup(addCardPopup);
});

// Добавление pop-up для редактирования профиля

editButtonProfile.addEventListener('click', () => {
    inputUserName.placeholder = profileName.textContent;
    inputUserProfession.placeholder = profileDescription.textContent;
    formEditProfile.reset();
    openPopup(editProfilePopup);
});

// Добавление pop-up для редактирования аватара профиля

profileAvatar.addEventListener('click', () => {
    openPopup(updateAvatarPopup);
});

// ЗАКРЫТИЕ POP-UP
// Закрытие через нажатие на 'крестик'

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
    profileDescription.textContent = inputUserProfession.value;

    sendForm(formEditProfile);
};

// Вызов функции для записи новых данных в профиль

formEditProfile.addEventListener('submit', editProfile);

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

//ВАЛИДАЦИЯ

enableValidation(validationConfig);

// Очистки ошибок валидации при открытии формы профиля

editButtonProfile.addEventListener('click', () => {
    clearValidation(formEditProfile, validationConfig);
    openPopup(editProfilePopup);
});

// Очистки ошибок валидации при открытии формы добавления карточки

addCardButton.addEventListener('click', () => {
    clearValidation(formAddCard, validationConfig);
    openPopup(addCardPopup);
});

// Очистки ошибок валидации при открытии формы редактирования аватара

profileAvatar.addEventListener('click', () => {
    clearValidation(formAvatarUpdate, validationConfig);
    openPopup(updateAvatarPopup);
});

//API
// Загрузка данных пользователя и карточек

loadInitialData()
    .then(([userData, cards]) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cards.forEach(card => {
            const cardElement = createCard(
                card,
                userData._id,
                (element, cardId, ownerId) => {
                    if (ownerId === userData._id) {
                        deleteCard(cardId)
                            .then(() => element.remove())
                            .catch(err =>
                                console.error(`Ошибка удаления: ${err}`)
                            );
                    }
                },
                (likeButton, cardId) => {
                    const isLiked = likeButton.classList.contains(
                        'card__like-button_is-active'
                    );
                    const likeAction = isLiked ? unlikeCard : likeCard;
                    likeAction(cardId)
                        .then(updatedCard => {
                            likeButton.classList.toggle(
                                'card__like-button_is-active'
                            );
                            likeButton.nextElementSibling.textContent =
                                updatedCard.likes.length;
                        })
                        .catch(err => console.error(`Ошибка лайка: ${err}`));
                },
                () => console.log('Открытие попапа')
            );
            renderCard(cardElement, cardList);
        });
    })
    .catch(err => console.error(err));

// Обновление профиля пользователя

formEditProfile.addEventListener('submit', evt => {
    evt.preventDefault();
    submitButtonProfile.textContent = 'Сохранение...';
    updateUserProfile(inputUserName.value, inputUserProfession.value)
        .then(updatedUser => {
            profileName.textContent = updatedUser.name;
            profileDescription.textContent = updatedUser.about;
        })
        .catch(err => console.error(`Ошибка обновления профиля: ${err}`))
        .finally(() => (submitButtonProfile.textContent = 'Сохранить'));
});

// Добавление новой карточки

formAddCard.addEventListener('submit', evt => {
    evt.preventDefault();
    submitButtonCard.textContent = 'Сохранение...';
    addNewCard(inputPlaceName.value, inputPlaceLink.value)
        .then(newCard => {
            const userId = newCard.owner._id;
            const cardElement = createCard(
                newCard,
                element => {
                    if (newCard.owner._id === userId) {
                        deleteCard(newCard._id)
                            .then(() => element.remove())
                            .catch(err =>
                                console.error(`Ошибка удаления: ${err}`)
                            );
                    }
                },
                () => console.log('Лайк'),
                () => console.log('Открытие попапа')
            );

            renderCard(cardElement, cardList);
            formAddCard.reset();
            closePopup(addCardPopup);
        })
        .catch(err => console.error(`Ошибка добавления карточки: ${err}`))
        .finally(() => (submitButtonCard.textContent = 'Сохранить'));
});

// Обновление аватара пользователя

formAvatarUpdate.addEventListener('submit', evt => {
    evt.preventDefault();
    submitButtonAvatar.textContent = 'Сохранение...';
    updateUserAvatar(inputAvatarLink.value)
        .then(updatedUser => {
            profileAvatar.style.backgroundImage = `url(${updatedUser.avatar})`;
            formAvatarUpdate.reset();
            closePopup(avatarPopup);
        })
        .catch(err => console.error(`Ошибка обновления аватара: ${err}`))
        .finally(() => (submitButtonAvatar.textContent = 'Сохранить'));
});

export { cardTemplate, buildImageTypePopup, API_CONFIG };
