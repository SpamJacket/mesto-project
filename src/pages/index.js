import './index.css';
import {
  buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  templateSelector, galleryListSelector,
  validationConfig, endpoints,
  api,
} from '../utils/constants.js';
import {
  renderLoading,
  likeHandler,
  getUserData, editUserData, editAvatar,
  renderOpenPopup,
} from '../utils/utils.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

// Эндпоинты для запросов
const { profile: profileUrl, cards: cardsUrl, avatar: avatarUrl } = endpoints;

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

// Валидаторы форм
const formEditAvatarValidator = new FormValidator(validationConfig, popupAvatar.form);
formEditAvatarValidator.enableValidation();
const formEditProfileValidator = new FormValidator(validationConfig, popupProfile.form);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, popupPlace.form);
formAddCardValidator.enableValidation();

// Экземпляр класса UserInfo
const userInfo = new UserInfo(
  { nameSelector:'.profile__name', aboutSelector: '.profile__activity', avatarSelector: '.profile__avatar' },
  getUserData, editUserData, editAvatar
);

// Сохранение аватара
function submitEditAvatarForm(evt, data) {
  evt.preventDefault();

  popupAvatar.submitButton.disabled = true;
  renderLoading(popupAvatar.submitButton, 'Сохранение...');

  api.createAvatarPatchFetch(avatarUrl, data.avatar)
    .then((res) => {
      userInfo.setAvatar(res);

      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAvatar.submitButton, 'Сохранить'));
}

// Сохранение данных профиля
function submitEditProfileForm(evt, data) {
  evt.preventDefault();

  popupProfile.submitButton.disabled = true;
  renderLoading(popupProfile.submitButton, 'Сохранение...');

  api.createProfileInfoPatchFetch(profileUrl, data.name, data.about)
    .then((res) => {
      userInfo.setUserInfo(res);

      popupProfile.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupProfile.submitButton, 'Сохранить'));
}

// Добавление карточки из формы
function submitAddCardForm(evt, data) {
  evt.preventDefault();
  
  popupPlace.submitButton.disabled = true;
  renderLoading(popupPlace.submitButton, 'Создание...');

  api.createCardPostFetch(cardsUrl, data.title, data.link)
    .then(res => {
      addCard(res);

      popupPlace.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupPlace.submitButton, 'Создать'));
}

// Удаление карточки
function submitDeleteCardForm(evt) {
  evt.preventDefault();

  renderLoading(popupAcceptDelete.submitButton, 'Удаление...');

  api.createCardDeleteFetch(`${cardsUrl}/${sessionStorage.getItem('delete-card-id')}`)
    .then(() => {
      deleteCard();

      popupAcceptDelete.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAcceptDelete.submitButton, 'Да'));
}

// Установка данных профиля и аватара
function setProfileInfo(data) {
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data);
  userInfo.mainUserId = data._id;
}

// Заполнение страницы контентом при закрузке 
function initializePageData(urlProfileData, urlCards) {
  Promise.all([
    // Получим данные профиля с сервера
    api.createGetFetch(urlProfileData),
    // Получим массив карточек с сервера
    api.createGetFetch(urlCards)
  ])
    .then(([ profileInfo, cards ]) => {
      setProfileInfo(profileInfo);
      addInitialCards(cards);
    })
    .catch(err => console.log(err));
}

// Создание карточки
function createCardElement(item) {
  const card = new Card(item, templateSelector, userInfo.mainUserId, likeHandler, popupImg, popupAcceptDelete);
  return card.createCard();
}

// Преэкземпляр класса Section
let section;

// Добавление карточки в список при добавлении пользователем
function addCard(cardData) {
  section.addItemReverse(createCardElement(cardData));
}

// Добавление карточки в список с при загрузке страницы
function addInitialCards(cards) {
  section = new Section({ items: cards, renderer: (item) => {
    section.addItem(createCardElement(item));
  } }, galleryListSelector);
  section.renderItems();
}

// Удаление карточки
function deleteCard() {
  document.getElementById(sessionStorage.getItem('delete-card-id')).remove();
  sessionStorage.removeItem('delete-card-id');
}

// Основная функция запускающая все
function main(){
  initializePageData(profileUrl, cardsUrl);

  // Добавление события аватару открытия попапа по  клику
  userInfo.editAvatarButton.addEventListener('click', () => renderOpenPopup(popupAvatar, formEditAvatarValidator));

  // Добавление события кнопке редактирования профиля для открытия попапа по клику
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    userInfo.getUserInfo()
      .then(popupProfile.setInputsValues)
      .catch(err => console.log(err));

    renderOpenPopup(popupProfile, formEditProfileValidator);
  });

  // Добавление события кнопке добавления карточек для открытия попапа по клику
  buttonOpenAddCardPopup.addEventListener('click', () => renderOpenPopup(popupPlace, formAddCardValidator));
}

main();