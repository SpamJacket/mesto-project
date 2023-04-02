import { popupImg,
        formDeleteCard,
        imagePopupImg, captionPopupImg,
        cardTemplate, galleryList, popupAcceptDelete,
        nameProfile } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { renderDeleteLoading } from './utils.js';
import { createLikeFetch, createCardDeleteFetch } from './api.js';

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

  setLikesOwners(card);

  if(likesOwners.includes(nameProfile.userId)) {
    likeCardElement.classList.add('gallery__like_active');
  }
  likeCounterCardElement.textContent = likesOwners.length;
  
  // Добавление события переключения состояния лайка по клику
  likeCardElement.addEventListener('click', () => {
    if(!likesOwners.includes(nameProfile.userId)) {
      // Отправка на сервер нашего лайка
      createLikeFetch(`/cards/likes/${card._id}`, 'PUT')
        .then(newCard => {
          // Обновляем список людей лайкнувших карточку
          setLikesOwners(newCard);
          likeCounterCardElement.textContent = likesOwners.length;
        });

      likeCardElement.classList.add('gallery__like_active');
    } else {
      // Удаление с сервер нашего лайка
      createLikeFetch(`/cards/likes/${card._id}`, 'DELETE')
        .then(newCard => {
          // Обновляем список людей лайкнувших карточку
          setLikesOwners(newCard);
          likeCounterCardElement.textContent = likesOwners.length;
        });
      
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

      renderDeleteLoading(true);

      // Проверка ту ли карточку удаляем
      if(formDeleteCard.cardId === card._id) {
        createCardDeleteFetch(`/cards/${formDeleteCard.cardId}`)
          .catch(err => console.log(err))
          .finally(() => renderDeleteLoading(false));
        cardElement.remove();
      }

      closePopup(popupAcceptDelete);
    });
  })

  return cardElement;
}

// Добавление карточки в список с её созданием при добавлении пользователем
function addCard(card) {
  galleryList.prepend(createCard(card));
}

// Добавление карточки в список с её созданием при загрузке страницы
function addInitialCard(card) {
  galleryList.append(createCard(card));
}

export { addCard, addInitialCard };