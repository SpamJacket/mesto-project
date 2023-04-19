import {
  nameProfile,
  buttonOpenAvatarPopup,
  api,
  userInfo,
} from "./constants.js";
import {
  addInitialCards,
} from "./script.js";

// Установим данные профиля с сервера на сайте
function setProfileInfo(data) {
  nameProfile._userId = data._id;
  userInfo.setUserInfo(data);
  buttonOpenAvatarPopup.style = `background-image: url('${data.avatar}');`
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
      const [ profileInfo, cards ] = values;

      setProfileInfo(profileInfo);
      addInitialCards(cards);
    })
    .catch(err => console.log(err));
}

export {
  initializePageData,
};