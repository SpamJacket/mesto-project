import Api from './Api.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

import {
  submitEditAvatarForm, submitEditProfileForm, submitAddCardForm, submitDeleteCardForm,
} from './script.js';

// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');

// Попапы
const popupAvatar = new PopupWithForm('.popup_type_avatar', submitEditAvatarForm);
popupAvatar.setEventListeners();
const popupProfile = new PopupWithForm('.popup_type_profile', submitEditProfileForm);
popupProfile.setEventListeners();
const popupPlace = new PopupWithForm('.popup_type_place', submitAddCardForm);
popupPlace.setEventListeners();
const popupAcceptDelete = new PopupWithForm('.popup_type_accept-delete', submitDeleteCardForm);
popupAcceptDelete.setEventListeners();
const popupImg = new PopupWithImage('.popup_type_img');
popupImg.setEventListeners();

// Формы
// попапа редактирования аватара
const formEditAvatar = document.forms.avatarForm;
// попапа редактирования профиля
const formEditProfile = document.forms.profileForm;
// попапа добавления карточки
const formAddCard = document.forms.placeForm;

// Поля ввода попапа редактирования аватара
const linkPopupAvatar = formEditAvatar.elements.avatar;

// Поля ввода попапа редактирования профиля и элементы полей профиля
const nameProfile = content.querySelector('.profile__name');

// Переменные для шаблона карточки и списка карточек
const templateSelector = '#gallery-item';
const galleryListSelector = '.gallery__list';
const galleryList = content.querySelector('.gallery__list');

// Кнопки открытия попапов
// редактирования аватара
const buttonOpenAvatarPopup = content.querySelector('.profile__avatar');
// редактирования профиля
const buttonOpenEditProfilePopup = content.querySelector('.profile__edit-button');
// добавления карточки
const buttonOpenAddCardPopup = content.querySelector('.profile__add-button');

// Кнопки закрытия попапов
// редактирования аватара
const buttonCloseEditAvatarPopup = page.querySelector('.popup_type_avatar .popup__close-button')
// редактирования профиля
const buttonCloseEditProfilePopup = page.querySelector('.popup_type_profile .popup__close-button');
// добавления карточки
const buttonCloseAddCardPopup = page.querySelector('.popup_type_place .popup__close-button');
// подверждения удаления
const buttonCloseAcceptDeletePopup = page.querySelector('.popup_type_accept-delete .popup__close-button');
// просмотра полного изображения
const buttonCloseImgPopup = page.querySelector('.popup_type_img .popup__close-button');

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

const formEditAvatarValidator = new FormValidator(validationConfig, formEditAvatar);
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formAddCardValidator = new FormValidator(validationConfig, formAddCard);

const formValidators = [ formEditAvatarValidator, formEditProfileValidator, formAddCardValidator ];

const userInfo = new UserInfo({ nameSelector:'.profile__name', aboutSelector: '.profile__activity' });

export {
  page, content,
  popupAvatar, popupProfile, popupPlace, popupImg, popupAcceptDelete,
  linkPopupAvatar,
  nameProfile,
  templateSelector, galleryListSelector, galleryList,
  buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  buttonCloseEditAvatarPopup, buttonCloseEditProfilePopup, buttonCloseAddCardPopup, buttonCloseAcceptDeletePopup, buttonCloseImgPopup,
  validationConfig, endpoints, 
  api,
  formValidators,
  userInfo,
};
