export default class UserInfo {
  constructor({ nameSelector, aboutSelector }, getUserDataHandler, editUserDataHandler) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._getUserDataHandler = getUserDataHandler;
    this._editUserDataHandler = editUserDataHandler;
    this._mainUserId = '';
  }

  set mainUserId(userId) {
    this._mainUserId = userId;
  }

  get mainUserId() {
    return this._mainUserId;
  }

  getUserInfo() {
    return this._getUserDataHandler();
  }

  setUserInfo({ name, about }) {
    this._editUserDataHandler(name, about, this._nameElement, this._aboutElement);
  }
}