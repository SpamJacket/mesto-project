// Конфиг для создания fetch запросов
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'cb17d783-a9d0-4eeb-a054-218c1a23615d',
    'Content-Type': 'application/json'
  }
}

// Функция создания get fetch запроса
async function createGetFetch(url) {
  return fetch(config.baseUrl + url, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
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
  });
}

// Функция создания patch fetch запроса для аватара
async function createAvatarPatchFetch(url, avatarUrl) {
  return fetch(config.baseUrl + url, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  });
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
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
}

// Функция создания delete fetch запроса для карточки
async function createCardDeleteFetch(url) {
  return fetch(config.baseUrl + url, {
    method: 'DELETE',
    headers: config.headers
  })
}

// Функция создания запроса для добавления или удаления лайка
async function createLikeFetch(url, met) {
  return fetch(config.baseUrl + url, {
    method: met,
    headers: config.headers
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
}

export { createGetFetch, createProfileInfoPatchFetch, createAvatarPatchFetch, createCardPostFetch, createLikeFetch, createCardDeleteFetch };