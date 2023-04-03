import {
  fetchConfig as config,
} from "./constants";

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
}

// Функция создания get fetch запроса
async function createGetFetch(url) {
  return fetch(config.baseUrl + url, {
    method: 'GET',
    headers: config.headers
  })
    .then(getResponseData);
}

// Функция создания patch fetch запроса для информации в профиле
async function createProfileInfoPatchFetch(url, name, about) {
  return fetch(config.baseUrl + url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(getResponseData);
}

// Функция создания patch fetch запроса для аватара
async function createAvatarPatchFetch(url, avatarUrl) {
  return fetch(config.baseUrl + url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
    .then(getResponseData);
}

// Функция создания post fetch запроса для карточки
async function createCardPostFetch(url, name, link) {
  return fetch(config.baseUrl + url, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(getResponseData);
}

// Функция создания delete fetch запроса для карточки
async function createCardDeleteFetch(url) {
  return fetch(config.baseUrl + url, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getResponseData);
}

// Функция создания запроса для добавления или удаления лайка
async function createLikeFetch(url, met) {
  return fetch(config.baseUrl + url, {
    method: met,
    headers: config.headers
  })
    .then(getResponseData);
}

export { 
  createGetFetch,
  createProfileInfoPatchFetch,
  createAvatarPatchFetch,
  createCardPostFetch, createCardDeleteFetch,
  createLikeFetch,
};