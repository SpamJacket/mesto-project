import { page, content,
        popupImg, popupAcceptDelete,
        formDeleteCard,
        imagePopupImg, captionPopupImg,
        cardTemplate, galleryList } from './constants.js'

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Проверка esc ли нажат и закрытие попапа, если нажат он
function checkEscapePress(evt) {
  // Переменная для открытого сейчас попапа
  const popup = page.querySelector('.popup_opened');

  if (evt.key === 'Escape' && popup) {
    closePopup(popup);

    // Удаление события закрытия попапа по нажатию на esc
    document.removeEventListener('keydown', checkEscapePress);
  }
}

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

    // Добавление события закрытия попапа по нажатию на esc
    document.addEventListener('keydown', checkEscapePress);

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

  // Добавление события удаления карточки по клику с открытием попапа подтверждения
  cardElement.querySelector('.gallery__delete-button').addEventListener('click', () => {
    openPopup(popupAcceptDelete);

    // Добавление события закрытия попапа по нажатию на esc
    document.addEventListener('keydown', checkEscapePress);

    // Добавление события подвержадющего удаления по сабмиту
    formDeleteCard.addEventListener('submit', evt => {
      evt.preventDefault();

      cardElement.remove();

      closePopup(popupAcceptDelete);
    });
  })

  return cardElement;
}

// Добавление карточки в список с её созданием
function addCard(name, link) {
  galleryList.prepend(createCard(name, link));
}

export { addCard, openPopup, closePopup, checkEscapePress };