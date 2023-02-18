let page = document.querySelector('.page');
let content = page.querySelector('.content');

let editBtn = content.querySelector('.profile__edit-button');
let addBtn = content.querySelector('.profile__add-button');

editBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: visible; opacity: 1;';
})

addBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: visible; opacity: 1;';
})


let closeEditBtn = page.querySelector('.popup_type_profile .popup__close-button');
let closeAddBtn = page.querySelector('.popup_type_place .popup__close-button');

closeEditBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_profile');
  popup.style = 'visibility: hidden; opacity: 0;';
})

closeAddBtn.addEventListener('click', function () {
  let popup = page.querySelector('.popup_type_place');
  popup.style = 'visibility: hidden; opacity: 0;';
})