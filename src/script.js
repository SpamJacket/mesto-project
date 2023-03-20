// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');

// Переменные для попапов
const popupAvatar = page.querySelector('.popup_type_avatar');
const popupProfile = page.querySelector('.popup_type_profile');
const popupPlace = page.querySelector('.popup_type_place');
const popupAcceptDelete = page.querySelector('.popup_type_accept-delete')
const popupImg = page.querySelector('.popup_type_img');

// Переменная для аватара
const avatar = content.querySelector('.profile__avatar');

// Переменные для формы попапа редактирования аватара, полей ввода попапа редактирования аватара
const formEditAvatar = document.forms.avatarForm;
const linkPopupAvatar = formEditAvatar.elements.avatarLink;

// Переменные для шаблона карточки и списка карточек
const cardTemplate = document.querySelector('#gallery-item').content;
const galleryList = content.querySelector('.gallery__list');

// Переменная для кнопки редактирования профиля
const buttonOpenEditProfilePopup = content.querySelector('.profile__edit-button');

// Переменные для формы попапа редактирования профиля, полей ввода попапа редактирования профиля, имени и активности в профиле
const formEditProfile = document.forms.profileForm;
const namePopupProfile = formEditProfile.elements.profileName;
const activityPopupProfile = formEditProfile.elements.profileActivity;
const nameProfile = content.querySelector('.profile__name');
const activityProfile = content.querySelector('.profile__activity');

// Переменная для кнопки добавления карточки
const buttonOpenAddCardPopup = content.querySelector('.profile__add-button');

// Переменные формы добавления карточки, поля заголовка и ссылки на изображение
const formAddCard = document.forms.placeForm;
const titlePopupPlace = formAddCard.elements.placeTitle;
const linkPopupPlace = formAddCard.elements.placeLink;

// Переменная формы подтверждения удаления карточки
const formDeleteCard = document.forms.acceptDeleteForm;

// Переменные фигуры попапа просмотра изображения
const imagePopupImg = popupImg.querySelector('.popup__image');
const captionPopupImg = popupImg.querySelector('.popup__caption');

// Переменная для кнопки закрытия попапа редактирования аватара
const buttonCloseEditAvatarPopup = page.querySelector('.popup_type_avatar .popup__close-button')
// Переменная для кнопки закрытия попапа редактирования профиля
const buttonCloseEditProfilePopup = page.querySelector('.popup_type_profile .popup__close-button');
// Переменная для кнопки закрытия попапа добавления карточки
const buttonCloseAddCardPopup = page.querySelector('.popup_type_place .popup__close-button');
// Переменная для кнопки закрытия попапа подверждения удаления
const buttonCloseAcceptDeletePopup = page.querySelector('.popup_type_accept-delete .popup__close-button');
// Переменная для кнопки закрытия попапа просмотра изображений
const buttonCloseImgPopup = page.querySelector('.popup_type_img .popup__close-button');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция подтягивания значений из профиля в попап редактирования профиля
function fillInEditProfileFormInputs() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Функция сохранения аватара из попапа редактирования аватара
function submitEditAvatarForm(evt) {
  evt.preventDefault();

  if (linkPopupAvatar.value !== '') {
    avatar.style = `background-image: url("${linkPopupAvatar.value}")`;

    formEditAvatar.reset();

    closePopup(popupAvatar);
  }
}

// Функция сохранения значений из попапа редактирования профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();

  nameProfile.textContent = namePopupProfile.value;
  activityProfile.textContent = activityPopupProfile.value;

  closePopup(popupProfile);
}

// Функция создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const imageCardElement = cardElement.querySelector('.gallery__image');

  imageCardElement.src = link;
  cardElement.querySelector('.gallery__title').textContent = name;
  imageCardElement.alt = name;

  // Добавление события открытия попапа полного изображения
  imageCardElement.addEventListener('click', () => {
    openPopup(popupImg);

    imagePopupImg.src = link;
    captionPopupImg.textContent = name;
    imagePopupImg.alt = name;
  });

  const likeCardElement = cardElement.querySelector('.gallery__like');

  // Добавление события переключения состояния лайка
  likeCardElement.addEventListener('click', () => {
    likeCardElement.classList.toggle('gallery__like_active');
  });

  // Добавление события удаления карточки
  cardElement.querySelector('.gallery__delete-button').addEventListener('click', () => {
    openPopup(popupAcceptDelete);

    // Открытие и работа попапа подтверждения удаления
    formDeleteCard.addEventListener('submit', evt => {
      evt.preventDefault();

      cardElement.remove();

      closePopup(popupAcceptDelete);
    });
  })

  return cardElement;
}

// Функция добавления карточки в список
function addCard(name, link) {
  galleryList.prepend(createCard(name, link));
}

// Добавления карточек из списка при загрузке страницы
initialCards.forEach(item => {
  addCard(item.name, item.link)
});

// Функция добавления карточки из формы
function submitAddCardForm(evt) {
  evt.preventDefault();

  if (titlePopupPlace.value !== '' && linkPopupPlace.value !== '') {
    addCard(titlePopupPlace.value, linkPopupPlace.value);

    formAddCard.reset();

    closePopup(popupPlace);
  }
}

// Добавление события аватару открытия попапа по клику
avatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

// Добавление события кнопке сохранения попапа редактирования аватара
formEditAvatar.addEventListener('submit', submitEditAvatarForm);

// Добавление события кнопке редактирования профиля для открытия попапа по клику
buttonOpenEditProfilePopup.addEventListener('click', () => {
  openPopup(popupProfile);

  fillInEditProfileFormInputs();
});

// Добавление события кнопке сохранения попапа редактирования профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Добавление события кнопке добавления карточек для открытия попапа по клику
buttonOpenAddCardPopup.addEventListener('click', () => {
  openPopup(popupPlace);
});

// Добавление события кнопке создания карточки
formAddCard.addEventListener('submit', submitAddCardForm);

// Добавление события кнопке закрытия попапа редактирования профиля
buttonCloseEditAvatarPopup.addEventListener('click', () => {
  formEditAvatar.reset();

  closePopup(popupAvatar);
});

// Добавление события кнопке закрытия попапа редактирования профиля
buttonCloseEditProfilePopup.addEventListener('click', () => {
  closePopup(popupProfile);
});

// Добавление события кнопке закрытия попапа добавления карточки
buttonCloseAddCardPopup.addEventListener('click', () => {
  formAddCard.reset();

  closePopup(popupPlace);
});

// Добавление события кнопке закрытия попапа подтверждения удаления
buttonCloseAcceptDeletePopup.addEventListener('click', () => {
  closePopup(popupAcceptDelete);
});

// Добавление события кнопке закрытия попапа просмотра изображений
buttonCloseImgPopup.addEventListener('click', () => {
  closePopup(popupImg);
});

// Добавление события закрытия попапа нажатием на оверлэй или esc
page.querySelectorAll('.popup').forEach(pop => {
  pop.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      formEditAvatar.reset();
      formAddCard.reset();

      closePopup(pop);
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape' && pop.classList.contains('popup_opened')) {
      formEditAvatar.reset();
      formAddCard.reset();

      closePopup(pop);
    }
  });
});