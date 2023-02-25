// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');



// Создание массива объектов с названием и ссылкой для карточки
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

// Переменные для шаблона карточки и списка карточек
const cardTemplate = document.querySelector('#gallery-item').content;
const galleryList = content.querySelector('.gallery__list');

// Функция добавления карточки в список
function addingCard (name, link) {
  const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

  cardElement.querySelector('.gallery__image').src = link;
  cardElement.querySelector('.gallery__title').textContent = name;

  // Добавление события открытия попапа полного изображения
  cardElement.querySelector('.gallery__image').addEventListener('click', function () {
    const popup = page.querySelector('.popup_type_img');
    popup.style = 'visibility: visible; opacity: 1;';

    popup.querySelector('.popup__image').src = link;
    popup.querySelector('.popup__caption').textContent = name;
  });

  // Добавление события переключения состояния лайка
  cardElement.querySelector('.gallery__like').addEventListener('click', function () {
    cardElement.querySelector('.gallery__like').classList.toggle('gallery__like_active');
  });

  galleryList.prepend(cardElement);
}

// Добавления карточек из списка при загрузке страницы
for (let i = 0; i < initialCards.length; i++) {
  addingCard(initialCards[i].name, initialCards[i].link);
}



// Переменная для кнопки редактирования профиля
const editBtn = content.querySelector('.profile__edit-button');

// Переменные для формы попапа редактирования профиля, полей ввода попапа редактирования профиля, имени и активности в профиле
const editForm = page.querySelector('.popup__form_type_profile');
const namePopup = editForm.querySelector('.popup__input_text_name');
const activityPopup = editForm.querySelector('.popup__input_text_activity');
const nameProfile = content.querySelector('.profile__name');
const activityProfile = content.querySelector('.profile__activity');

// Функция подтягивания значений из профиля в попап редактирования профиля
function autofillFormInput() {
  namePopup.value = nameProfile.textContent;
  activityPopup.value = activityProfile.textContent;
}


// Добавление события кнопке редактирования профиля для открытия попапа по клику
editBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: visible; opacity: 1;';

  autofillFormInput();
})

// Функция сохранения значений из попапа редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = namePopup.value;
  activityProfile.textContent = activityPopup.value;
}

// Добавление события кнопке сохранения попапа редактирования профиля
editForm.addEventListener('submit', handleFormSubmit);


// Переменная для кнопки добавления карточки
const addBtn = content.querySelector('.profile__add-button');
// Добавление события кнопке добавления карточек для открытия попапа по клику
addBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: visible; opacity: 1;';
})

// Переменные формы добавления карточки, поля заголовка и ссылки на изображение
const addForm = page.querySelector('.popup__form_type_place');
const titlePopup = addForm.querySelector('.popup__input_text_title');
const linkPopup = addForm.querySelector('.popup__input_text_link');

// Функция добавления карточки из формы
function handleFormAdded(evt) {
  evt.preventDefault();

  if (titlePopup.value !== '' && linkPopup.value !== '') {
    addingCard(titlePopup.value, linkPopup.value);
    
    titlePopup.value = '';
    linkPopup.value = '';

    const popup = page.querySelector('.popup_type_place');
    popup.style = 'visibility: hidden; opacity: 0;';
  }
}

// Добавление события кнопке создания карточки
addForm.addEventListener('submit', handleFormAdded);



// Переменная для кнопки закрытия попапа редактирования профиля
const closeEditBtn = page.querySelector('.popup_type_profile .popup__close-button');
// Добавление события кнопке закрытия попапа редактирования профиля
closeEditBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: hidden; opacity: 0;';
})

// Переменная для кнопки закрытия попапа добавления карточки
const closeAddBtn = page.querySelector('.popup_type_place .popup__close-button');
// Добавление события кнопке закрытия попапа добавления карточки
closeAddBtn.addEventListener('click', function () {
  titlePopup.value = '';
  linkPopup.value = '';

  const popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: hidden; opacity: 0;';
})

// Переменная для кнопки закрытия попапа просмотра изображений
const closeImgBtn = page.querySelector('.popup_type_img .popup__close-button');
// Добавление события кнопке закрытия попапа просмотра изображений
closeImgBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_img');
  popup.style = 'visibility: hidden; opacity: 0;';
})