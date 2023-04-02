import {
  popupAvatar, popupProfile, popupPlace,
  formEditAvatar, formEditProfile, formAddCard,
  buttonSubmitAvatarForm, buttonSubmitProfileForm, buttonSubmitCardForm,
  namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
  linkPopupAvatar,
  titlePopupPlace, linkPopupPlace,
  buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  galleryList,
  validationConfig as config,
} from './constants.js';
import {
  openPopup, closePopup,
  addClosingPopupByClickingOnOverlay, addClosingPopupByClickingOnCloseButton,
} from './modal.js';
import {
  renderLoading,
} from './utils.js';
import {
  createCard,
} from './cards.js';
import {
  enableValidation, resetEnableValidation,
} from './validate.js';
import {
  getUserProfileData,
  getInitialCards,
} from './initialize.js';
import {
  createProfileInfoPatchFetch,
  createAvatarPatchFetch,
  createCardPostFetch,
} from './api.js';

// Основная функция запускающая все
export default function main(){
  // Получаем и устанавливаем имя и хобби профиля с сервера
  getUserProfileData('/users/me');

  // Получаем и добавляем карточки с сервера
  getInitialCards('/cards');

  // Добавление события аватару открытия попапа по  клику
  buttonOpenAvatarPopup.addEventListener('click', () => {
    formEditAvatar.reset();

    resetEnableValidation(formEditAvatar, config);
    
    openPopup(popupAvatar);
  });

  // Добавление события кнопке сохранения попапа редактирования аватара
  formEditAvatar.addEventListener('submit', submitEditAvatarForm);

  // Добавление события кнопке редактирования профиля для открытия попапа по клику
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    fillInEditProfileFormInputs();

    resetEnableValidation(formEditProfile, config);

    openPopup(popupProfile);
  });

  // Добавление события кнопке сохранения попапа редактирования профиля
  formEditProfile.addEventListener('submit', submitEditProfileForm);

  // Добавление события кнопке добавления карточек для открытия попапа по клику
  buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCard.reset();
    
    resetEnableValidation(formAddCard, config);

    openPopup(popupPlace);
  });

  // Добавление события кнопке создания карточки
  formAddCard.addEventListener('submit', submitAddCardForm);

  addClosingPopupByClickingOnOverlay();

  addClosingPopupByClickingOnCloseButton();

  enableValidation(config);
}

// Подтягивание значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Сохранение аватара
function submitEditAvatarForm(evt) {
  evt.preventDefault();

  renderLoading(buttonSubmitAvatarForm, 'Сохранение...');

  createAvatarPatchFetch('/users/me/avatar', linkPopupAvatar.value)
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitAvatarForm, 'Сохранить'));

  buttonOpenAvatarPopup.style = `background-image: url("${linkPopupAvatar.value}")`;

  closePopup(popupAvatar);
}

// Сохранение новых значений полей профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  renderLoading(buttonSubmitProfileForm, 'Сохранение...');

  // Отправка на сервер новых данных о инофрмации в профиле
  createProfileInfoPatchFetch('/users/me', namePopupProfile.value, activityPopupProfile.value)
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitProfileForm, 'Сохранить'));

  nameProfile.textContent = namePopupProfile.value;
  activityProfile.textContent = activityPopupProfile.value;

  closePopup(popupProfile);
}

// Добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  
  renderLoading(buttonSubmitCardForm, 'Создание...');

  // Отправка на сервер данных новой карточки
  createCardPostFetch('/cards', titlePopupPlace.value, linkPopupPlace.value)
    .then(addCard)
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitCardForm, 'Создать'));

  closePopup(popupPlace);
}

// Добавление карточки в список с её созданием при добавлении пользователем
function addCard(card) {
  galleryList.prepend(createCard(card));
}

// Добавление карточки в список с её созданием при загрузке страницы
function addInitialCard(card) {
  galleryList.append(createCard(card));
}

export {
  addCard, addInitialCard,
};