const API_CONFIG = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-32',
    headers: {
        authorization: '20d722b1-333e-4684-b120-0411f45ec832',
        'Content-Type': 'application/json',
    },
};

// Функция обработки ответа сервера

const handleResponse = res =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

// Получение информации о пользователе с сервера

const getUserProfile = () => {
    return fetch(`${API_CONFIG.baseUrl}/users/me`, {
        headers: API_CONFIG.headers,
    }).then(handleResponse);
};

// Получение карточек с сервера

const getInitialCards = () => {
    return fetch(`${API_CONFIG.baseUrl}/cards`, {
        headers: API_CONFIG.headers,
    }).then(handleResponse);
};

// Загрузка данных пользователя и карточек при старте

const loadInitialData = () => {
    return Promise.all([getUserProfile(), getInitialCards()]);
};

// Обновление профиля пользователя

const updateUserProfile = (name, about) => {
    return fetch(`${API_CONFIG.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ name, about }),
    }).then(handleResponse);
};

// Обновление аватара пользователя

const updateUserAvatar = avatarUrl => {
    return fetch(`${API_CONFIG.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ avatar: avatarUrl }),
    }).then(handleResponse);
};

// Добавление новой карточки на сервер

const addNewCard = (name, link) => {
    return fetch(`${API_CONFIG.baseUrl}/cards`, {
        method: 'POST',
        headers: API_CONFIG.headers,
        body: JSON.stringify({ name, link }),
    }).then(handleResponse);
};

// Удаление карточки с сервера

const deleteCard = cardId => {
    return fetch(`${API_CONFIG.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: API_CONFIG.headers,
    }).then(handleResponse);
};

// Лайк карточки

const likeCard = cardId => {
    return fetch(`${API_CONFIG.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: API_CONFIG.headers,
    }).then(handleResponse);
};

// Дизлайк карточки

const unlikeCard = cardId => {
    return fetch(`${API_CONFIG.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: API_CONFIG.headers,
    }).then(handleResponse);
};

export {
    API_CONFIG,
    getUserProfile,
    getInitialCards,
    loadInitialData,
    updateUserProfile,
    addNewCard,
    deleteCard,
    likeCard,
    unlikeCard,
    updateUserAvatar,
};
