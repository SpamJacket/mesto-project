const page = document.querySelector('.page');
const content = page.querySelector('.content');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]
const galleryList = content.querySelector('.gallery__list');

for (let i = 0; i < initialCards.length; i++){
  galleryList.insertAdjacentHTML('beforeend', `<li class="gallery__item">
                                                <button class="gallery__delete-button" type="button" aria-label="Удалить"></button>

                                                <img class="gallery__image" src="${initialCards[i].link}" alt="Собор в Карачаевске">

                                                <h2 class="gallery__title">${initialCards[i].name}</h2>

                                                <button class="gallery__like" type="button" aria-label="Лайк"></button>
                                              </li>`)
}

const editBtn = content.querySelector('.profile__edit-button');

const editForm = page.querySelector('.popup__form_type_profile');
const namePopup = editForm.querySelector('.popup__input_text_name');
const activityPopup = editForm.querySelector('.popup__input_text_activity');
const nameProfile = content.querySelector('.profile__name');
const activityProfile = content.querySelector('.profile__activity');

function autofillFormInput() {
  namePopup.value = nameProfile.textContent;
  activityPopup.value = activityProfile.textContent;
}

editBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: visible; opacity: 1;';

  autofillFormInput();
})

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = namePopup.value;
  activityProfile.textContent = activityPopup.value;
}

editForm.addEventListener('submit', handleFormSubmit);

const closeEditBtn = page.querySelector('.popup_type_profile .popup__close-button');
closeEditBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: hidden; opacity: 0;';
})


const addBtn = content.querySelector('.profile__add-button');
addBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: visible; opacity: 1;';
})

const closeAddBtn = page.querySelector('.popup_type_place .popup__close-button');
closeAddBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: hidden; opacity: 0;';
})


const image = content.querySelectorAll('.gallery__image');
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function () {
    let popup = page.querySelector('.popup_type_img');
    popup.style = 'visibility: visible; opacity: 1;';

    let popupImage = popup.querySelector('.popup__image');
    popupImage.src = image[i].src;
  })
}

const closeImgBtn = page.querySelector('.popup_type_img .popup__close-button');
closeImgBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_img');
  popup.style = 'visibility: hidden; opacity: 0;';
})


let like = content.querySelectorAll('.gallery__like');
for (let i = 0; i < like.length; i++){
  like[i].addEventListener('click', function () {
    like[i].classList.toggle('gallery__like_active');
  })
}