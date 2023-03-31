import { popupAvatar, popupProfile, popupPlace,
        linkPopupAvatar,
        namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
        titlePopupPlace, linkPopupPlace,
        buttonOpenAvatarPopup} from './constants.js';
import { closePopup } from './modal.js';
import { addCard } from './cards.js';

// Подтягивание значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Сохранение аватара
function submitEditAvatarForm(evt) {
  evt.preventDefault();

  buttonOpenAvatarPopup.style = `background-image: url("${linkPopupAvatar.value}")`;

  closePopup(popupAvatar);
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
  
  addCard(titlePopupPlace.value, linkPopupPlace.value);

  closePopup(popupPlace);
}

export { fillInEditProfileFormInputs, submitEditAvatarForm, submitEditProfileForm, submitAddCardForm };