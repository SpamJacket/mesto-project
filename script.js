const page = document.querySelector('.page');
const content = page.querySelector('.content');

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

let like = content.querySelectorAll('.gallery__like');
for (let i = 0; i < like.length; i++){
  like[i].addEventListener('click', function () {
    like[i].classList.toggle('gallery__like_active');
  })
}