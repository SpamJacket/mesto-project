// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');

// Переменные для попапов
const popupProfile = page.querySelector('.popup_type_profile');
const popupPlace = page.querySelector('.popup_type_place');
const popupImg = page.querySelector('.popup_type_img');

// Переменные для шаблона карточки и списка карточек
const cardTemplate = document.querySelector('#gallery-item').content;
const galleryList = content.querySelector('.gallery__list');

// Переменная для кнопки редактирования профиля
const editBtn = content.querySelector('.profile__edit-button');

// Переменные для формы попапа редактирования профиля, полей ввода попапа редактирования профиля, имени и активности в профиле
const editForm = page.querySelector('.popup__form_type_profile');
const namePopupProfile = editForm.querySelector('.popup__input_text_name');
const activityPopupProfile = editForm.querySelector('.popup__input_text_activity');
const nameProfile = content.querySelector('.profile__name');
const activityProfile = content.querySelector('.profile__activity');

// Переменная для кнопки добавления карточки
const addBtn = content.querySelector('.profile__add-button');

// Переменные формы добавления карточки, поля заголовка и ссылки на изображение
const addForm = page.querySelector('.popup__form_type_place');
const titlePopupPlace = addForm.querySelector('.popup__input_text_title');
const linkPopupPlace = addForm.querySelector('.popup__input_text_link');

// Переменные фигуры попапа просмотра изображения
const imagePopupImg = popupImg.querySelector('.popup__image');
const captionPopupImg = popupImg.querySelector('.popup__caption');

// Переменная для кнопки закрытия попапа редактирования профиля
const closeEditBtn = page.querySelector('.popup_type_profile .popup__close-button');
// Переменная для кнопки закрытия попапа добавления карточки
const closeAddBtn = page.querySelector('.popup_type_place .popup__close-button');
// Переменная для кнопки закрытия попапа просмотра изображений
const closeImgBtn = page.querySelector('.popup_type_img .popup__close-button');

// Функция открытия попапа
function openPopup(popup) {
  popup.style = 'visibility: visible; opacity: 1;';
}
// Функция закрытия попапа
function closePopup(popup) {
  popup.style = 'visibility: hidden; opacity: 0;';
}

// Функция подтягивания значений из профиля в попап редактирования профиля
function autofillFormInput() {
  namePopupProfile.value = nameProfile.textContent;
  activityPopupProfile.value = activityProfile.textContent;
}

// Функция сохранения значений из попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = namePopupProfile.value;
  activityProfile.textContent = activityPopupProfile.value;

  closePopup(popupProfile);
}

// Функция создания карточки
function createCard (name, link) {
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  cardElement.querySelector('.gallery__image').src = link;
  cardElement.querySelector('.gallery__title').textContent = name;
  cardElement.querySelector('.gallery__image').alt = name;

  // Добавление события открытия попапа полного изображения
  cardElement.querySelector('.gallery__image').addEventListener('click', function () {
    openPopup(popupImg);

    imagePopupImg.src = link;
    captionPopupImg.textContent = name;
    imagePopupImg.alt = name;
  });

  // Добавление события переключения состояния лайка
  cardElement.querySelector('.gallery__like').addEventListener('click', function () {
    cardElement.querySelector('.gallery__like').classList.toggle('gallery__like_active');
  });

  // Добавление события удаления карточки
  cardElement.querySelector('.gallery__delete-button').addEventListener('click', function () {
    cardElement.remove();
  })

  return cardElement;
}

// Функция добавления карточки в список
function addCard (cardElem) {
  galleryList.prepend(cardElem);
}

// Функция добавления карточки в список из попапа
function addingCard (name, link) {
  addCard(createCard(name, link));  
}

// Добавления карточек из списка при загрузке страницы
for (let i = 0; i < initialCards.length; i++) {
  addingCard(initialCards[i].name, initialCards[i].link);
}

// Функция добавления карточки из формы
function handleFormAdded(evt) {
  evt.preventDefault();

  if (titlePopupPlace.value !== '' && linkPopupPlace.value !== '') {
    addingCard(titlePopupPlace.value, linkPopupPlace.value);
    
    addForm.reset();

    closePopup(popupPlace);
  }
}

// Добавление события кнопке редактирования профиля для открытия попапа по клику
editBtn.addEventListener('click', function () {
  openPopup(popupProfile);

  autofillFormInput();
})

// Добавление события кнопке сохранения попапа редактирования профиля
editForm.addEventListener('submit', handleFormSubmit);

// Добавление события кнопке добавления карточек для открытия попапа по клику
addBtn.addEventListener('click', function () {
  openPopup(popupPlace);
})

// Добавление события кнопке создания карточки
addForm.addEventListener('submit', handleFormAdded);

// Добавление события кнопке закрытия попапа редактирования профиля
closeEditBtn.addEventListener('click', function () {
  closePopup(popupProfile);
})

// Добавление события кнопке закрытия попапа добавления карточки
closeAddBtn.addEventListener('click', function () {
  addForm.reset();

  closePopup(popupPlace);
})

// Добавление события кнопке закрытия попапа просмотра изображений
closeImgBtn.addEventListener('click', function () {
  closePopup(popupImg);
})