import {
  endpoints,
  api,
} from './constants';

export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return api.createGetFetch(endpoints.profile);
  }

  setUserInfo({ name, about }) {
    api.createProfileInfoPatchFetch(endpoints.profile, name, about)
      .then(() => {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
      })
      .catch(err => console.log(err));
  }
}