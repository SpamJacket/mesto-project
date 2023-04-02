import {
  createGetFetch,
} from "./api.js";
import {
  nameProfile, activityProfile,
  buttonOpenAvatarPopup,
} from "./constants.js";
import {
  addInitialCard,
} from "./script.js";

// Получим данные профиля с сервера
function getUserProfileData(url) {
  createGetFetch(url)
    .then(setProfileInfo)
    .catch(err => console.log(err));
}

// Установим данные профиля с сервера на сайте
function setProfileInfo(data) {
  nameProfile.textContent = data.name;
  nameProfile.userId = data._id;
  activityProfile.textContent = data.about;
  buttonOpenAvatarPopup.style = `background-image: url('${data.avatar}');`
}

// Получим массив карточек с сервера
function getInitialCards(url) {
  createGetFetch(url)
    .then(setCard)
    .catch(err => console.log(err));
}

// Добавим все карточки на сайт
function setCard(cards) {
  cards.forEach(card => addInitialCard(card));
}

export {
  getUserProfileData,
  getInitialCards,
};