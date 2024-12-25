// @todo: Открытие и закрытие попапа добавления карточки

const popupAdd = modal => {
    modal.style.display = 'flex';
};

const popupDelete = modal => {
    modal.style.display = 'none';
};

const closePopUpafterSave = form => {
    const popup = form.closest('.popup');
    popupDelete(popup);
};

export { popupDelete, popupAdd, closePopUpafterSave };
