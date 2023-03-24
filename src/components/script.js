import { page, content,
        popupAvatar, popupProfile, popupPlace, popupImg, popupAcceptDelete,
        formEditAvatar, formEditProfile, formAddCard,
        buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
        buttonCloseEditAvatarPopup, buttonCloseEditProfilePopup, buttonCloseAddCardPopup, buttonCloseAcceptDeletePopup, buttonCloseImgPopup,
        initialCards, enableValidation } from './constants.js';
import { addCard, openPopup, closePopup, checkEscapePress } from './utils.js';
import { submitEditAvatarForm, submitEditProfileForm, submitAddCardForm, fillInEditProfileFormInputs } from './modal.js';
import { enableFormValidation, resetEnableFormValidation } from './validate.js';

// Основная функция запускающая все
export default function main(){
  // Добавление карточек из начального списка при загрузке страницы
  initialCards.forEach(item => {
    addCard(item.name, item.link)
  });

  // Добавление события аватару открытия попапа по  клику
  buttonOpenAvatarPopup.addEventListener('click', () => {
    formEditAvatar.reset();

    resetEnableFormValidation(formEditAvatar, enableValidation);
    
    openPopup(popupAvatar);

    document.addEventListener('keydown', checkEscapePress);
  });

  // Добавление события кнопке сохранения попапа редактирования аватара
  formEditAvatar.addEventListener('submit', submitEditAvatarForm);

  // Добавление события кнопке редактирования профиля для открытия попапа по клику
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    fillInEditProfileFormInputs();

    formAddCard.reset();
    
    resetEnableFormValidation(formEditProfile, enableValidation);

    openPopup(popupProfile);

    document.addEventListener('keydown', checkEscapePress);
  });

  // Добавление события кнопке сохранения попапа редактирования профиля
  formEditProfile.addEventListener('submit', submitEditProfileForm);

  // Добавление события кнопке добавления карточек для открытия попапа по клику
  buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCard.reset();
    
    resetEnableFormValidation(formAddCard, enableValidation);

    openPopup(popupPlace);

    document.addEventListener('keydown', checkEscapePress);
  });

  // Добавление события кнопке создания карточки
  formAddCard.addEventListener('submit', submitAddCardForm);

  // Добавление события кнопке закрытия попапа редактирования профиля
  buttonCloseEditAvatarPopup.addEventListener('click', () => {
    closePopup(popupAvatar);
  });

  // Добавление события кнопке закрытия попапа редактирования профиля
  buttonCloseEditProfilePopup.addEventListener('click', () => {
    closePopup(popupProfile);
  });

  // Добавление события кнопке закрытия попапа добавления карточки
  buttonCloseAddCardPopup.addEventListener('click', () => {
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
  page.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  });

  enableFormValidation(enableValidation);
}