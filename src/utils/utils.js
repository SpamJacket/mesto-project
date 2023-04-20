import {
  endpoints,
  api,
} from './constants.js';

const { profile: profileUrl, likes: likesUrl } = endpoints;

// const likesUrl = '/cards/likes';
// const profileUrl = '/users/me';

function renderLoading(submitButton, loadingMessage) {
  submitButton.textContent = loadingMessage;
}

function likeHandler(id, method) {
  return api.createLikeFetch(`${likesUrl}/${id}`, method);
}

function getUserData() {
  return api.createGetFetch(profileUrl);
}

function editUserData(name, about, nameElement, aboutElement) {
  api.createProfileInfoPatchFetch(profileUrl, name, about)
      .then((data) => {
        nameElement.textContent = data.name;
        aboutElement.textContent = data.about;
      })
      .catch(err => console.log(err));
}

function renderOpenPopup(popup, formValidator) {
  formValidator.resetEnableValidation();
  popup.openPopup();
}

export {
  renderLoading,
  likeHandler,
  getUserData, editUserData,
  renderOpenPopup,
}