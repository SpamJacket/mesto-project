import { page } from './constants.js';

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');

  // Добавление события закрытия попапа по нажатию на esc 
  document.addEventListener('keydown', checkEscapePress);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  // Удаление события закрытия попапа по нажатию на esc
  document.removeEventListener('keydown', checkEscapePress);
}

// Проверка esc ли нажат и закрытие попапа, если нажат он
function checkEscapePress(evt) {
  // Переменная для открытого сейчас попапа
  const popup = page.querySelector('.popup_opened');

  if (evt.key === 'Escape' && popup) {    
    closePopup(popup);
  }
}

export { openPopup, closePopup, checkEscapePress };