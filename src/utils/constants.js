import Api from '../components/Api.js';

// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');

// Переменные для шаблона карточки и списка карточек
const templateSelector = '#gallery-item';
const galleryListSelector = '.gallery__list';

// Кнопки открытия попапов
// редактирования аватара
const buttonOpenAvatarPopup = content.querySelector('.profile__avatar');
// редактирования профиля
const buttonOpenEditProfilePopup = content.querySelector('.profile__edit-button');
// добавления карточки
const buttonOpenAddCardPopup = content.querySelector('.profile__add-button');

// Объект настроек для валидации
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Конфиг для создания fetch запросов
const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'cb17d783-a9d0-4eeb-a054-218c1a23615d',
    'Content-Type': 'application/json'
  }
};

const endpoints = {
  profile: '/users/me',
  cards: '/cards',
  avatar: '/users/me/avatar',
  likes: '/cards/likes'
}

const api = new Api(fetchConfig);

export {
  page, content,
  templateSelector, galleryListSelector,
  buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  validationConfig, endpoints, 
  api,
};
