import {
  popupImg,
  imagePopupImg, captionPopupImg,
  cardTemplate, popupAcceptDelete,
  nameProfile,
  formDeleteCard,
  endpoints,
  api,
} from './constants.js';
import {
  openPopup,
} from './modal.js';

const { likes: likesUrl } = endpoints;

// Создание карточки
function createCard(card) {
  // Переменные для создаваемой карточки и её изобаржения
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageCardElement = cardElement.querySelector('.gallery__image');

  cardElement.id = card._id;

  imageCardElement.src = card.link;
  cardElement.querySelector('.gallery__title').textContent = card.name;
  imageCardElement.alt = card.name;

  // Добавление события открытия попапа полного изображения по клику
  imageCardElement.addEventListener('click', () => {
    openPopup(popupImg);

    imagePopupImg.src = card.link;
    captionPopupImg.textContent = card.name;
    imagePopupImg.alt = card.name;
  });

  // Переменная лайка
  const likeCardElement = cardElement.querySelector('.gallery__like');
  // Переменная счетчика лайков
  const likeCounterCardElement = cardElement.querySelector('.gallery__like-counter');
  // Переменная массива людей лайкнувших карточку
  let likesOwners;

  // Функция обновления списка людей лайкнувших карточку
  function setLikesOwners(newCard) {
    likesOwners = newCard.likes.map(owner => owner._id);
  }

  function renderLikeCounter(newCard) {
    setLikesOwners(newCard);
    likeCounterCardElement.textContent = likesOwners.length;
  }

  renderLikeCounter(card);  

  if(likesOwners.includes(nameProfile._userId)) {
    likeCardElement.classList.add('gallery__like_active');
  }
  
  // Добавление события переключения состояния лайка по клику
  likeCardElement.addEventListener('click', () => {
    if(!likesOwners.includes(nameProfile._userId)) {
      // Отправка на сервер нашего лайка
      api.createLikeFetch(`${likesUrl}/${card._id}`, 'PUT')
        .then(newCard => {
          // Обновляем список людей лайкнувших карточку
          renderLikeCounter(newCard);

          likeCardElement.classList.add('gallery__like_active');
        })
        .catch(err => console.log(err));
    } else {
      // Удаление с сервер нашего лайка
      api.createLikeFetch(`${likesUrl}/${card._id}`, 'DELETE')
        .then(newCard => {
          // Обновляем список людей лайкнувших карточку
          renderLikeCounter(newCard);

          likeCardElement.classList.remove('gallery__like_active');
        })
        .catch(err => console.log(err));
    }
  });

  // Переменная кнопки удаления карточки
  const deleteCardElement = cardElement.querySelector('.gallery__delete-button');
  
  // Удаление кнопки удаления на не наших карточках
  if(card.owner._id !== nameProfile._userId) {
    deleteCardElement.remove();
  }

  // Добавление кнопке удаления карточки слушателя клика
  deleteCardElement.addEventListener('click', () => {
    openPopup(popupAcceptDelete);

    formDeleteCard._cardId = card._id;
  });

  return cardElement;
}

export {
  createCard,
};