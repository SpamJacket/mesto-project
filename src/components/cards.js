import { popupImg,
        formDeleteCard,
        imagePopupImg, captionPopupImg,
        cardTemplate, galleryList, popupAcceptDelete,
        nameProfile } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { createLikeFetch } from './api.js';

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
  const likeCounterCardElement = cardElement.querySelector('.gallery__like-counter');
  let likesOwners;

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
      createLikeFetch(`/cards/likes/${card._id}`, 'PUT')
        .then(newCard => {
          setLikesOwners(newCard);
          likeCounterCardElement.textContent = likesOwners.length;
        });

      likeCardElement.classList.add('gallery__like_active');
    } else {
      createLikeFetch(`/cards/likes/${card._id}`, 'DELETE')
        .then(newCard => {
          setLikesOwners(newCard);
          likeCounterCardElement.textContent = likesOwners.length;
        });
      
      likeCardElement.classList.remove('gallery__like_active');
    }
  });

  cardElement.querySelector('.gallery__delete-button').addEventListener('click', () => {
    openPopup(popupAcceptDelete);

    formDeleteCard.addEventListener('submit', evt => {
      evt.preventDefault();

      // Тут должен быть функционал удаления карточки

      closePopup(popupAcceptDelete);
    });
  })

  return cardElement;
}

// Добавление карточки в список с её созданием
function addCard(card) {
  galleryList.prepend(createCard(card));
}

function addInitialCard(card) {
  galleryList.append(createCard(card));
}

export { addCard, addInitialCard };