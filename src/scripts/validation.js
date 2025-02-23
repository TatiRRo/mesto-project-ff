// Функция отображения ошибки ввода

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Функция скрытия ошибки ввода

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
};

// Проверка валидности ввода в поле

const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            config
        );
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

// Проверка, есть ли невалидные поля в списке

const hasInvalidInput = inputList => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

// Включение/выключение состояния кнопки отправки формы

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

// Установка слушателей событий на ввод в поля формы

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(
        formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        config.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Включение валидации всех форм на странице

const enableValidation = config => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        setEventListeners(formElement, config);
    });
};

// Очистка ошибок валидации и сброс состояния кнопки отправки формы

const clearValidation = (formElement, config) => {
    formElement.reset();
    const inputList = Array.from(
        formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        config.submitButtonSelector
    );

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, config);
    });

    toggleButtonState(inputList, buttonElement, config);
};

export { enableValidation, clearValidation };
