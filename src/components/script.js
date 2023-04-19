import {
  popupAvatar, popupProfile, popupPlace, popupAcceptDelete,
  namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
  buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
  templateSelector, galleryListSelector,
  endpoints,
  api,
  formValidators,
} from './constants.js';
import {
  renderLoading,
} from './utils.js';
import {
  initializePageData,
} from './initialize.js';
import Card from './Card.js';
import Section from './Section.js';

const { profile: profileUrl, cards: cardsUrl, avatar: avatarUrl } = endpoints;
const [ formEditAvatarValidator, formEditProfileValidator, formAddCardValidator ] = formValidators;

// Основная функция запускающая все
export default function main(){
  // Получим с сервера и отобразим данные профиля и карточки
  initializePageData(profileUrl, cardsUrl);

  // Добавление события аватару открытия попапа по  клику
  buttonOpenAvatarPopup.addEventListener('click', () => {
    formEditAvatarValidator.resetEnableValidation();
    
    popupAvatar.openPopup();
  });

  // Добавление события кнопке редактирования профиля для открытия попапа по клику
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    // popupProfile.setInputsValues();
    fillInEditProfileFormInputs();

    formEditProfileValidator.resetEnableValidation();

    popupProfile.openPopup();
  });

  // Добавление события кнопке добавления карточек для открытия попапа по клику
  buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCardValidator.resetEnableValidation();

    popupPlace.openPopup();
  });

  setValidation();
}

// Подтягивание значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Сохранение аватара
function submitEditAvatarForm(evt, data) {
  evt.preventDefault();

  popupAvatar.submitButton.disabled = true;
  renderLoading(popupAvatar.submitButton, 'Сохранение...');

  api.createAvatarPatchFetch(avatarUrl, data.avatar)
    .then(() => {
      buttonOpenAvatarPopup.style = `background-image: url("${data.avatar}")`;

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
    .then(() => {
      nameProfile.textContent = data.name;
      activityProfile.textContent = data.about;

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
      document.getElementById(sessionStorage.getItem('delete-card-id')).remove();

      sessionStorage.removeItem('delete-card-id');
      popupAcceptDelete.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => renderLoading(popupAcceptDelete.submitButton, 'Да'));
}

// Добавление карточки в список с её созданием при добавлении пользователем
function addCard(cardData) {
  const section = new Section({ items: [cardData], renderer: (item) => {
    const card = new Card(item, templateSelector, api.createLikeFetch.bind(api));
    section.addItemReverse(card.createCard());
  } }, galleryListSelector);
  section.renderItems();
}

// Добавление карточки в список с её созданием при загрузке страницы
export function addInitialCards(cards) {
  const section = new Section({ items: cards, renderer: (item) => {
    const card = new Card(item, templateSelector, api.createLikeFetch.bind(api));
    section.addItem(card.createCard());
  } }, galleryListSelector);
  section.renderItems();
}

function setValidation() {
  formValidators.forEach(form => {
    form.enableValidation();
  })
}

export {
  submitEditAvatarForm, submitEditProfileForm, submitAddCardForm, submitDeleteCardForm,
};