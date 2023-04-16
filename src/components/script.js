import {
  popupAvatar, popupProfile, popupPlace, popupAcceptDelete,
  formEditAvatar, formEditProfile, formAddCard, formDeleteCard,
  buttonSubmitAvatarForm, buttonSubmitProfileForm, buttonSubmitCardForm, buttonSubmitDeleteCardForm,
  namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
  linkPopupAvatar,
  titlePopupPlace, linkPopupPlace,
  buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  templateSelector, galleryList,
  endpoints,
  api,
  formValidators,
} from './constants.js';
import {
  openPopup, closePopup,
  addClosingPopupByClickingOnOverlay, addClosingPopupByClickingOnCloseButton,
} from './modal.js';
import {
  renderLoading,
} from './utils.js';
import {
  initializePageData,
} from './initialize.js';
import Card from './Card.js';

const { profile: profileUrl, cards: cardsUrl, avatar: avatarUrl } = endpoints;
const [ formEditAvatarValidator, formEditProfileValidator, formAddCardValidator ] = formValidators;

// Основная функция запускающая все
export default function main(){
  // Получим с сервера и отобразим данные профиля и карточки
  initializePageData(profileUrl, cardsUrl);

  // Добавление события аватару открытия попапа по  клику
  buttonOpenAvatarPopup.addEventListener('click', () => {
    formEditAvatar.reset();

    formEditAvatarValidator.resetEnableValidation();
    
    openPopup(popupAvatar);
  });

  // Добавление события кнопке сохранения попапа редактирования аватара
  formEditAvatar.addEventListener('submit', submitEditAvatarForm);

  // Добавление события кнопке редактирования профиля для открытия попапа по клику
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    fillInEditProfileFormInputs();

    formEditProfileValidator.resetEnableValidation();

    openPopup(popupProfile);
  });

  // Добавление события кнопке сохранения попапа редактирования профиля
  formEditProfile.addEventListener('submit', submitEditProfileForm);

  // Добавление события кнопке добавления карточек для открытия попапа по клику
  buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCard.reset();
    
    formAddCardValidator.resetEnableValidation();

    openPopup(popupPlace);
  });

  // Добавление события кнопке создания карточки
  formAddCard.addEventListener('submit', submitAddCardForm);

  // Добавление события удаления карточке при подтверждении
  formDeleteCard.addEventListener('submit', submitDeleteCardForm);

  addClosingPopupByClickingOnOverlay();

  addClosingPopupByClickingOnCloseButton();

  setValidation();
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

  api.createAvatarPatchFetch(avatarUrl, linkPopupAvatar.value)
    .then(() => {
      buttonOpenAvatarPopup.style = `background-image: url("${linkPopupAvatar.value}")`;

      closePopup(popupAvatar);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitAvatarForm, 'Сохранить'));
}

// Сохранение новых значений полей профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  renderLoading(buttonSubmitProfileForm, 'Сохранение...');

  // Отправка на сервер новых данных о инофрмации в профиле
  api.createProfileInfoPatchFetch(profileUrl, namePopupProfile.value, activityPopupProfile.value)
    .then(() => {
      nameProfile.textContent = namePopupProfile.value;
      activityProfile.textContent = activityPopupProfile.value;

      closePopup(popupProfile);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitProfileForm, 'Сохранить'));
}

// Добавление карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  
  renderLoading(buttonSubmitCardForm, 'Создание...');

  // Отправка на сервер данных новой карточки
  api.createCardPostFetch(cardsUrl, titlePopupPlace.value, linkPopupPlace.value)
    .then(res => {
      addCard(res);

      closePopup(popupPlace);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitCardForm, 'Создать'));
}

// Удаление карточки
function submitDeleteCardForm(evt) {
  evt.preventDefault();

  renderLoading(buttonSubmitDeleteCardForm, 'Удаление...');

  // Удаление с сервера карточки
  api.createCardDeleteFetch(`${cardsUrl}/${formDeleteCard._cardId}`)
    .then(() => {
      document.getElementById(formDeleteCard._cardId).remove();

      closePopup(popupAcceptDelete);
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(buttonSubmitDeleteCardForm, 'Да'));
}

// Добавление карточки в список с её созданием при добавлении пользователем
function addCard(cardData) {
  const card = new Card(cardData, templateSelector, api.createLikeFetch.bind(api));
  galleryList.prepend(card.createCard());
}

// Добавление карточки в список с её созданием при загрузке страницы
function addInitialCard(cardData) {
  const card = new Card(cardData, templateSelector, api.createLikeFetch.bind(api));
  galleryList.append(card.createCard());
}

function setValidation() {
  formValidators.forEach(form => {
    form.enableValidation();
  })
}

export {
  addCard, addInitialCard,
};