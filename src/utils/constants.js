import Api from '../components/Api.js';

// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');

// Кнопки открытия попапов редактирования профиля и добавления карточки
const buttonOpenEditProfilePopup = content.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = content.querySelector('.profile__add-button');

// Переменные для селекторов шаблона карточки и списка карточек
const templateSelector = '#gallery-item';
const galleryListSelector = '.gallery__list';

// Объект настроек для валидации
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Конфиг для создания запросов
const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'cb17d783-a9d0-4eeb-a054-218c1a23615d',
    'Content-Type': 'application/json'
  }
};

// Объект с эндпоинтами для запросов
const endpoints = {
  profile: '/users/me',
  cards: '/cards',
  avatar: '/users/me/avatar',
  likes: '/cards/likes'
}

// Экземляр класса Api
const api = new Api(fetchConfig);

export {
  page, content,
  templateSelector, galleryListSelector,
  buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  validationConfig, endpoints, 
  api,
};
