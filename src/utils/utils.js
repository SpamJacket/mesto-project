import {
  endpoints,
  api,
} from './constants.js';

// Эндпоинты для запросов
const { profile: profileUrl, likes: likesUrl, avatar: avatarUrl } = endpoints;

// Изменение текста в кнопке сабмита попапов
function renderLoading(submitButton, loadingMessage) {
  submitButton.textContent = loadingMessage;
}

// Создание запроса для лайка (put или delete)
function likeHandler(id, method) {
  return api.createLikeFetch(`${likesUrl}/${id}`, method);
}

// Создание get запроса данных профиля
function getUserData() {
  return api.createGetFetch(profileUrl);
}

// Создание patch запроса для изменения данных профиля
function editUserData(name, about, nameElement, aboutElement) {
  api.createProfileInfoPatchFetch(profileUrl, name, about)
      .then(data => {
        nameElement.textContent = data.name;
        aboutElement.textContent = data.about;
      })
      .catch(err => console.log(err));
}

// Рендер открытия попапа
function renderOpenPopup(popup, formValidator) {
  formValidator.resetEnableValidation();
  popup.openPopup();
}

// Создание patch запроса для изменения аватара
function editAvatar(avatar, avatarElement) {
  api.createAvatarPatchFetch(avatarUrl, avatar)
    .then(res => {
      avatarElement.style = `background-image: url("${res.avatar}")`;
    })
    .catch(err => console.log(err));
}

export {
  renderLoading,
  likeHandler,
  getUserData, editUserData, editAvatar,
  renderOpenPopup,
}