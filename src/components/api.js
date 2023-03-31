const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'cb17d783-a9d0-4eeb-a054-218c1a23615d',
    'Content-Type': 'application/json'
  }
}

async function createFetch(url, met) {
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

export { createFetch };