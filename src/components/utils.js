import { popupAvatar, popupProfile, popupPlace,
        linkPopupAvatar,
        namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
        titlePopupPlace, linkPopupPlace,
        buttonOpenAvatarPopup} from './constants.js';
import { closePopup } from './modal.js';
import { addCard } from './cards.js';
import { createFetch } from './api.js';

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

function setProfileInfo(data) {
  nameProfile.textContent = data.name;
  activityProfile.textContent = data.about;
  buttonOpenAvatarPopup.style = `background-image: url('${data.avatar}');`
}

function getUserProfileData(url) {
  createFetch(url, 'GET')
    .then(setProfileInfo)
    .catch(err => console.log(err));
}

export { fillInEditProfileFormInputs, submitEditAvatarForm, submitEditProfileForm, submitAddCardForm, getUserProfileData };