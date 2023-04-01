import { popupAvatar, popupProfile, popupPlace,
        linkPopupAvatar,
        namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
        titlePopupPlace, linkPopupPlace,
        buttonOpenAvatarPopup} from './constants.js';
import { closePopup } from './modal.js';
import { addCard } from './cards.js';
import { createProfileInfoPatchFetch, createAvatarPatchFetch, createCardPostFetch } from './api.js';

// Подтягивание значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Сохранение аватара
function submitEditAvatarForm(evt) {
  evt.preventDefault();

  createAvatarPatchFetch('/users/me/avatar', linkPopupAvatar.value);

  buttonOpenAvatarPopup.style = `background-image: url("${linkPopupAvatar.value}")`;

  closePopup(popupAvatar);
}

// Сохранение новых значений полей профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  // Отправка на сервер новых данных о инофрмации в профиле
  createProfileInfoPatchFetch('/users/me', namePopupProfile.value, activityPopupProfile.value);

  nameProfile.textContent = namePopupProfile.value;
  activityProfile.textContent = activityPopupProfile.value;

  closePopup(popupProfile);
}

// Добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();
  
  // Отправка на сервер данных новой карточки
  createCardPostFetch('/cards', titlePopupPlace.value, linkPopupPlace.value);

  addCard(titlePopupPlace.value, linkPopupPlace.value);

  closePopup(popupPlace);
}

export { fillInEditProfileFormInputs, submitEditAvatarForm, submitEditProfileForm, submitAddCardForm };