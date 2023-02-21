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
]

// Переменная для списка карточек
const galleryList = content.querySelector('.gallery__list');

// Функция добавления карточки на страницу
function addingCard (i) {
  galleryList.insertAdjacentHTML('afterbegin', `<li class="gallery__item">
                                                <button class="gallery__delete-button" type="button" aria-label="Удалить"></button>

                                                <img class="gallery__image" src="${initialCards[i].link}" alt="Собор в Карачаевске">

                                                <h2 class="gallery__title">${initialCards[i].name}</h2>

                                                <button class="gallery__like" type="button" aria-label="Лайк"></button>
                                              </li>`);
}

// Добавляем на страницу все карточки из массива карточек при загрузке страницы
for (let i = 0; i < initialCards.length; i++){
  addingCard(i);
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


// Переменная для кнопки закрытия попапа редактирования профиля
const closeEditBtn = page.querySelector('.popup_type_profile .popup__close-button');
// Добавление события кнопке закрытия попапа редактирования профиля
closeEditBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: hidden; opacity: 0;';
})



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

// Функция добавления карточки
function handleFormAdded(evt) {
  evt.preventDefault();

  if (titlePopup.value !== '' && linkPopup.value !== '') {
    initialCards[initialCards.length] = {name: `${titlePopup.value}`, link: `${linkPopup.value}`};

    addingCard(initialCards.length - 1);
    
    titlePopup.value = '';
    linkPopup.value = '';

    const popup = page.querySelector('.popup_type_place');
    popup.style = 'visibility: hidden; opacity: 0;';
  }
}

// Добавление события кнопке создания карточки
addForm.addEventListener('submit', handleFormAdded);


// Переменная для кнопки закрытия попапа добавления карточки
const closeAddBtn = page.querySelector('.popup_type_place .popup__close-button');
// Добавление события кнопке закрытия попапа добавления карточки
closeAddBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: hidden; opacity: 0;';

  titlePopup.value = '';
  linkPopup.value = '';
})



// Переменная для всех DOM-элементов изображений и их заголовков в галлерее
const image = content.querySelectorAll('.gallery__image');
const title = content.querySelectorAll('.gallery__title');
// Открытие попапа просмотра изображений
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function () {
    const popup = page.querySelector('.popup_type_img');
    popup.style = 'visibility: visible; opacity: 1;';

    const popupImage = popup.querySelector('.popup__image');
    popupImage.src = image[i].src;
    const popupCaption = popup.querySelector('.popup__caption');
    popupCaption.textContent = title[i].textContent;
  })
}


// Переменная для кнопки закрытия попапа просмотра изображений
const closeImgBtn = page.querySelector('.popup_type_img .popup__close-button');
// Добавление события кнопке закрытия попапа просмотра изображений
closeImgBtn.addEventListener('click', function () {
  const popup = page.querySelector('.popup_type_img');
  popup.style = 'visibility: hidden; opacity: 0;';
})



// Переменная для всех DOM-элементов лайков всех карточек
const like = content.querySelectorAll('.gallery__like');
// Включение и выключение лайка
for (let i = 0; i < like.length; i++){
  like[i].addEventListener('click', function () {
    like[i].classList.toggle('gallery__like_active');
  })
}