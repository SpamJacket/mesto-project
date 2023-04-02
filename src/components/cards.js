import {
  popupImg,
  formDeleteCard,
  imagePopupImg, captionPopupImg,
  cardTemplate, popupAcceptDelete,
  nameProfile,
  buttonSubmitDeleteCardForm,
} from './constants.js';
import {
  openPopup, closePopup,
} from './modal.js';
import {
  renderLoading,
} from './utils.js';
import {
  createLikeFetch,
  createCardDeleteFetch,
} from './api.js';

// Создание карточки
function createCard(card) {
  // Переменные для создаваемой карточки и её изобаржения
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageCardElement = cardElement.querySelector('.gallery__image');

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

  if(likesOwners.includes(nameProfile.userId)) {
    likeCardElement.classList.add('gallery__like_active');
  }
  
  // Добавление события переключения состояния лайка по клику
  likeCardElement.addEventListener('click', () => {
    if(!likesOwners.includes(nameProfile.userId)) {
      // Отправка на сервер нашего лайка
      createLikeFetch(`/cards/likes/${card._id}`, 'PUT')
        .then(newCard => {
          // Обновляем список людей лайкнувших карточку
          renderLikeCounter(newCard);
        })
        .catch(err => console.log(err));

      likeCardElement.classList.add('gallery__like_active');
    } else {
      // Удаление с сервер нашего лайка
      createLikeFetch(`/cards/likes/${card._id}`, 'DELETE')
        .then(newCard => {
          // Обновляем список людей лайкнувших карточку
          renderLikeCounter(newCard);
        })
        .catch(err => console.log(err));
      
      likeCardElement.classList.remove('gallery__like_active');
    }
  });

  // Переменная кнопки удаления карточки
  const deleteCardElement = cardElement.querySelector('.gallery__delete-button');
  
  // Удаление кнопки удаления на не наших карточках
  if(card.owner._id !== nameProfile.userId) {
    deleteCardElement.remove();
  }

  // Добавление кнопке удаления карточки слушателя клика
  deleteCardElement.addEventListener('click', () => {
    openPopup(popupAcceptDelete);

    // Присваеваем форме id карточки
    formDeleteCard.cardId = card._id;

    // Добавление события удаления карточке при подтверждении
    formDeleteCard.addEventListener('submit', evt => {
      evt.preventDefault();

      renderLoading(buttonSubmitDeleteCardForm, 'Удаление...');

      // Проверка ту ли карточку удаляем
      if(formDeleteCard.cardId === card._id) {
        createCardDeleteFetch(`/cards/${formDeleteCard.cardId}`)
          .catch(err => console.log(err))
          .finally(() => renderLoading(buttonSubmitDeleteCardForm, 'Да'));
        cardElement.remove();
      }

      closePopup(popupAcceptDelete);
    });
  })

  return cardElement;
}

export {
  createCard,
};