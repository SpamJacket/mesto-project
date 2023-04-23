export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Получение json объекта или ошибки при запросе
  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  // Функция создающая запрос
  async _createFetch({ endpoint, data, method }) {
    const options = {
      headers: this._headers,
      method,
    };

    if(data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(this._baseUrl + endpoint, options);
    return this._getResponseData(response);
  }

  // Get-запрос
  createGetFetch(endpoint) {
    return this._createFetch({ endpoint, method: 'GET' });
  }

  // Patch-запрос данных профиля
  createProfileInfoPatchFetch(endpoint, name, about) {
    return this._createFetch({ endpoint, data: { name, about }, method: 'PATCH' });
  }

  // Patch-запрос аватара
  createAvatarPatchFetch(endpoint, avatar) {
    return this._createFetch({ endpoint, data: { avatar }, method: 'PATCH' });
  }

  // Post-запрос карточки
  createCardPostFetch(endpoint, name, link) {
    return this._createFetch({ endpoint, data: { name, link }, method: 'POST' });
  }

  // Delete-запрос карточки
  createCardDeleteFetch(endpoint) {
    return this._createFetch({ endpoint, method: 'DELETE' });
  }

  // Put/Delete-запрос лайка
  createLikeFetch(endpoint, method) {
    return this._createFetch({ endpoint, method });
  }
}