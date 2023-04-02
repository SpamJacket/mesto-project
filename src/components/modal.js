import {
  page,
} from './constants.js';

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
  if (evt.key === 'Escape') {    
    closePopup(page.querySelector('.popup_opened'));
  }
}

// Добавление события закрытия попапа нажатием на оверлэй
function addClosingPopupByClickingOnOverlay() {
  page.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  });
}

// Добавление события кнопкам закрытия попапа
function addClosingPopupByClickingOnCloseButton() {
  page.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => {
      closePopup(buttonsPopup);
    })
  });
}

export {
  openPopup, closePopup,
  checkEscapePress,
  addClosingPopupByClickingOnOverlay, addClosingPopupByClickingOnCloseButton,
};