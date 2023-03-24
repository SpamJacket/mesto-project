import { page, content,
        popupAvatar, popupProfile, popupPlace,
        formEditAvatar, formEditProfile, formAddCard,
        linkPopupAvatar,
        namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
        titlePopupPlace, linkPopupPlace,
        buttonOpenAvatarPopup } from './constants.js'
import { closePopup, addCard } from './utils.js';

// Подтягивание значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Сохранение аватара
function submitEditAvatarForm(evt) {
  evt.preventDefault();

  if (linkPopupAvatar.value !== '') {
    buttonOpenAvatarPopup.style = `background-image: url("${linkPopupAvatar.value}")`;

    closePopup(popupAvatar);
  }
}

// Сохранение новых значений полей профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  nameProfile.textContent = namePopupProfile.value;
  activityProfile.textContent = activityPopupProfile.value;

  closePopup(popupProfile);
}

// Добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();

  if (titlePopupPlace.value !== '' && linkPopupPlace.value !== '') {
    addCard(titlePopupPlace.value, linkPopupPlace.value);

    closePopup(popupPlace);
  }
}

export { fillInEditProfileFormInputs, submitEditAvatarForm, submitEditProfileForm, submitAddCardForm };