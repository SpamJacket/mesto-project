import { createFetch } from "./api.js";
import { nameProfile, activityProfile,
        buttonOpenAvatarPopup } from "./constants.js";
import { addCard } from "./cards.js";

// Получим данные профиля с сервера
function getUserProfileData(url) {
  createFetch(url, 'GET')
    .then(setProfileInfo)
    .catch(err => console.log(err));
}

// Установим данные профиля с сервера на сайте
function setProfileInfo(data) {
  nameProfile.textContent = data.name;
  activityProfile.textContent = data.about;
  buttonOpenAvatarPopup.style = `background-image: url('${data.avatar}');`
}

// Получим массив карточек с сервера
function getInitialCards(url) {
  createFetch(url, 'GET')
    .then(setCard)
    .catch(err => console.log(err));
}

// Добавим все карточки на сайт
function setCard(cards) {
  cards.forEach(card => {
    addCard(card.name, card.link);
  });
}

export { getUserProfileData, getInitialCards }