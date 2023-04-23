export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, getUserDataHandler, editUserDataHandler, editAvatarHandler) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._getUserDataHandler = getUserDataHandler;
    this._editUserDataHandler = editUserDataHandler;
    this._editAvatarHandler = editAvatarHandler;
    this._mainUserId = '';
  }

  // Сеттер для id юзера
  set mainUserId(userId) {
    this._mainUserId = userId;
  }

  // Геттер id юзера
  get mainUserId() {
    return this._mainUserId;
  }

  // Геттер эллемента аватарки
  get editAvatarButton() {
    return this._avatarElement;
  }

  // Вызывает get запрос данных профиля
  getUserInfo() {
    return this._getUserDataHandler();
  }

  // Вызывает patch запрос для изменения данных профиля
  setUserInfo({ name, about }) {
    this._editUserDataHandler(name, about, this._nameElement, this._aboutElement);
  }

  // Вызывает patch запрос для изменения аватарки
  setAvatar({ avatar }) {
    this._editAvatarHandler(avatar, this._avatarElement);
  }
}