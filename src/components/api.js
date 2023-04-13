export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

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

  createGetFetch(endpoint) {
    return this._createFetch({ endpoint, method: 'GET' });
  }

  createProfileInfoPatchFetch(endpoint, name, about) {
    return this._createFetch({ endpoint, data: { name, about }, method: 'PATCH' });
  }

  createAvatarPatchFetch(endpoint, avatar) {
    return this._createFetch({ endpoint, data: { avatar }, method: 'PATCH' });
  }

  createCardPostFetch(endpoint, name, link) {
    return this._createFetch({ endpoint, data: { name, link }, method: 'POST' });
  }

  createCardDeleteFetch(endpoint) {
    return this._createFetch({ endpoint, method: 'DELETE' });
  }

  createLikeFetch(endpoint, method) {
    return this._createFetch({ endpoint, method });
  }
}