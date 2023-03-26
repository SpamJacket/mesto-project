import { popupImg,
        formDeleteCard,
        imagePopupImg, captionPopupImg,
        cardTemplate, galleryList, popupAcceptDelete } from './constants.js';
import { openPopup, closePopup } from './modal.js';

// Создание карточки
function createCard(name, link) {
  // Переменные для создаваемой карточки и её изобаржения
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageCardElement = cardElement.querySelector('.gallery__image');

  imageCardElement.src = link;
  cardElement.querySelector('.gallery__title').textContent = name;
  imageCardElement.alt = name;

  // Добавление события открытия попапа полного изображения по клику
  imageCardElement.addEventListener('click', () => {
    openPopup(popupImg);

    imagePopupImg.src = link;
    captionPopupImg.textContent = name;
    imagePopupImg.alt = name;
  });

  // Переменная лайка
  const likeCardElement = cardElement.querySelector('.gallery__like');

  // Добавление события переключения состояния лайка по клику
  likeCardElement.addEventListener('click', () => {
    likeCardElement.classList.toggle('gallery__like_active');
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
function addCard(name, link) {
  galleryList.prepend(createCard(name, link));
}

export { addCard };