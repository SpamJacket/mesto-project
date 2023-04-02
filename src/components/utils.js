import { popupAvatar, popupProfile, popupPlace, popupAcceptDelete,
        linkPopupAvatar,
        namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
        titlePopupPlace, linkPopupPlace,
        buttonOpenAvatarPopup} from './constants.js';
import { closePopup } from './modal.js';
import { addCard } from './cards.js'
import { createProfileInfoPatchFetch, createAvatarPatchFetch, createCardPostFetch } from './api.js';

// Подтягивание значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Сохранение аватара
function submitEditAvatarForm(evt) {
  evt.preventDefault();

  renderAvatarLoading(true);

  createAvatarPatchFetch('/users/me/avatar', linkPopupAvatar.value)
    .catch(err => console.log(err))
    .finally(() => renderAvatarLoading(false));

  buttonOpenAvatarPopup.style = `background-image: url("${linkPopupAvatar.value}")`;

  closePopup(popupAvatar);
}

// Сохранение новых значений полей профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  renderProfileLoading(true);

  // Отправка на сервер новых данных о инофрмации в профиле
  createProfileInfoPatchFetch('/users/me', namePopupProfile.value, activityPopupProfile.value)
    .catch(err => console.log(err))
    .finally(() => renderProfileLoading(false));

  nameProfile.textContent = namePopupProfile.value;
  activityProfile.textContent = activityPopupProfile.value;

  closePopup(popupProfile);
}

// Добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  
  renderPlaceLoading(true);

  // Отправка на сервер данных новой карточки
  createCardPostFetch('/cards', titlePopupPlace.value, linkPopupPlace.value)
    .then(addCard)
    .catch(err => console.log(err))
    .finally(() => renderPlaceLoading(false));

  closePopup(popupPlace);
}

function renderProfileLoading(isLoading) {
  const submitButton = popupProfile.querySelector('.popup__submit-button');
  if(isLoading) {
    submitButton.textContent = 'Сохранение...'; 
  } else {
    submitButton.textContent = 'Сохранить'; 
  }
}

function renderAvatarLoading(isLoading) {
  const submitButton = popupAvatar.querySelector('.popup__submit-button');
  if(isLoading) {
    submitButton.textContent = 'Сохранение...'; 
  } else {
    submitButton.textContent = 'Сохранить'; 
  }
}

function renderPlaceLoading(isLoading) {
  const submitButton = popupPlace.querySelector('.popup__submit-button');
  if(isLoading) {
    submitButton.textContent = 'Создание...'; 
  } else {
    submitButton.textContent = 'Создать'; 
  }
}

function renderDeleteLoading(isLoading) {
  const submitButton = popupAcceptDelete.querySelector('.popup__submit-button');
  if(isLoading) {
    submitButton.textContent = 'Удаление...'; 
  } else {
    submitButton.textContent = 'Да'; 
  }
}

export { fillInEditProfileFormInputs, submitEditAvatarForm, submitEditProfileForm, submitAddCardForm, renderDeleteLoading };