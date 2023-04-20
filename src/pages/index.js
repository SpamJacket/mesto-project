import './index.css';
import {
  buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  templateSelector, galleryListSelector,
  validationConfig, endpoints,
  api,
} from '../utils/constants.js';
import {
  renderLoading,
  likeHandler,
  getUserData, editUserData,
  renderOpenPopup,
} from '../utils/utils.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

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

const formEditAvatarValidator = new FormValidator(validationConfig, popupAvatar.form);
formEditAvatarValidator.enableValidation();
const formEditProfileValidator = new FormValidator(validationConfig, popupProfile.form);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, popupPlace.form);
formAddCardValidator.enableValidation();

const userInfo = new UserInfo({ nameSelector:'.profile__name', aboutSelector: '.profile__activity' }, getUserData, editUserData);

// Сохранение аватара
function submitEditAvatarForm(evt, data) {
  evt.preventDefault();

  popupAvatar.submitButton.disabled = true;
  renderLoading(popupAvatar.submitButton, 'Сохранение...');

  api.createAvatarPatchFetch(avatarUrl, data.avatar)
    .then((res) => {
      buttonOpenAvatarPopup.style = `background-image: url("${res.avatar}")`;

      popupAvatar.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAvatar.submitButton, 'Сохранить'));
}

// Сохранение новых значений полей профиля
function submitEditProfileForm(evt, data) {
  evt.preventDefault();

  popupProfile.submitButton.disabled = true;
  renderLoading(popupProfile.submitButton, 'Сохранение...');

  // Отправка на сервер новых данных о инофрмации в профиле
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

  // Отправка на сервер данных новой карточки
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

  // Удаление с сервера карточки
  api.createCardDeleteFetch(`${cardsUrl}/${sessionStorage.getItem('delete-card-id')}`)
    .then(() => {
      deleteCard();

      popupAcceptDelete.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAcceptDelete.submitButton, 'Да'));
}

function setProfileInfo(data) {
  userInfo.setUserInfo(data);
  userInfo.mainUserId = data._id;
  buttonOpenAvatarPopup.style = `background-image: url('${data.avatar}');`
}

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

// Добавление карточки в список с её созданием при добавлении пользователем
function addCard(cardData) {
  const section = new Section({ items: [cardData], renderer: (item) => {
    const card = new Card(item, templateSelector, userInfo.mainUserId, likeHandler, popupImg, popupAcceptDelete);
    section.addItemReverse(card.createCard());
  } }, galleryListSelector);
  section.renderItems();
}

// Добавление карточки в список с её созданием при загрузке страницы
function addInitialCards(cards) {
  const section = new Section({ items: cards, renderer: (item) => {
    const card = new Card(item, templateSelector, userInfo.mainUserId, likeHandler, popupImg, popupAcceptDelete);
    section.addItem(card.createCard());
  } }, galleryListSelector);
  section.renderItems();
}

function deleteCard() {
  document.getElementById(sessionStorage.getItem('delete-card-id')).remove();
  sessionStorage.removeItem('delete-card-id');
}

// Основная функция запускающая все
function main(){
  // Получим с сервера и отобразим данные профиля и карточки
  initializePageData(profileUrl, cardsUrl);

  // Добавление события аватару открытия попапа по  клику
  buttonOpenAvatarPopup.addEventListener('click', () => renderOpenPopup(popupAvatar, formEditAvatarValidator));

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