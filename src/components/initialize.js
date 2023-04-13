import {
  nameProfile, activityProfile,
  buttonOpenAvatarPopup,
  api,
} from "./constants.js";
import {
  addInitialCard,
} from "./script.js";

// Установим данные профиля с сервера на сайте
function setProfileInfo(data) {
  nameProfile.textContent = data.name;
  nameProfile._userId = data._id;
  activityProfile.textContent = data.about;
  buttonOpenAvatarPopup.style = `background-image: url('${data.avatar}');`
}

// Добавим все карточки на сайт
function setCard(cards) {
  cards.forEach(card => addInitialCard(card));
}

function initializePageData(urlProfileData, urlCards) {
  Promise.all([
    // Получим данные профиля с сервера
    api.createGetFetch(urlProfileData),
    // Получим массив карточек с сервера
    api.createGetFetch(urlCards)
  ])
    .then(values => {
      // Если все данные с сервера пришли, отобразим их
      setProfileInfo(values[0]);
      setCard(values[1]);
    })
    .catch(err => console.log(err));
}

export {
  initializePageData,
};