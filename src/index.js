import './pages/index.css';
import {
    initialCards,
    createCard,
    handleDeleteCard,
    renderCard,
} from './scripts/cards.js';
import { popupDelete, popupAdd, closePopUpafterSave } from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу, используем цикл forEach

initialCards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard);
    renderCard(cardElement, cardList);
});

// Добавление pop-up для создания новой карточки

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const editButtonProfile = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');

addCardButton.addEventListener('click', () => {
    popupAdd(addCardPopup);
});

// Добавление pop-up для редактирования профиля

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
        resetInputValues();
        popupDelete(popup);
    });
});

// Закрытие popup при нажатии на оверлей

document.addEventListener('click', evt => {
    popups.forEach(popup => {
        if (evt.target === popup) {
            resetInputValues();
            popupDelete(popup);
        }
    });
});

// Закрытие popup при нажатии на esc

document.addEventListener('keydown', evt => {
    popups.forEach(popup => {
        if (evt.key === 'Escape') {
            resetInputValues();
            popupDelete(popup);
        }
    });
});

// Редактирование имени и информации о себе

const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameProfil = document.querySelector('.profile__title');
const descriptionProfil = document.querySelector('.profile__description');

const nameInput = formEditProfile.elements['name'];
const professionInput = formEditProfile.elements['description'];

// Функция для отображения ранее сохраненных данных(Жак Ив-Кусто,Исследователь океана)

function changePlaceholder() {
    nameInput.placeholder = nameProfil.textContent;
    professionInput.placeholder = descriptionProfil.textContent;
}

changePlaceholder();

// Функция для записи новых данных в профиль

function editProfile(evt) {
    evt.preventDefault();

    nameInput.placeholder = nameInput.value;
    professionInput.placeholder = professionInput.value;

    nameProfil.textContent = nameInput.value;
    descriptionProfil.textContent = professionInput.value;

    closePopUpafterSave(formEditProfile);
}

formEditProfile.addEventListener('submit', editProfile);

// Функция для сброса изменений, если форма закрывается без сохранения
function resetInputValues() {
    nameInput.value = nameInput.placeholder;
    professionInput.value = professionInput.placeholder;
}

export { cardTemplate };
