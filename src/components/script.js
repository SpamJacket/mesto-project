import { page,
        popupAvatar, popupProfile, popupPlace,
        formEditAvatar, formEditProfile, formAddCard,
        buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
        initialCards, validationConfig } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { addCard } from './cards.js';
import { submitEditAvatarForm, submitEditProfileForm, submitAddCardForm, fillInEditProfileFormInputs, getCards } from './utils.js';
import { enableValidation, resetEnableValidation } from './validate.js';
import { getUserProfileData } from './utils.js';

// Основная функция запускающая все
export default function main(){
  getUserProfileData('/users/me');

  // Добавление карточек из начального списка при загрузке страницы
  initialCards.forEach(item => {
    addCard(item.name, item.link)
  });

  // Добавление события аватару открытия попапа по  клику
  buttonOpenAvatarPopup.addEventListener('click', () => {
    formEditAvatar.reset();

    resetEnableValidation(formEditAvatar, validationConfig);
    
    openPopup(popupAvatar);
  });

  // Добавление события кнопке сохранения попапа редактирования аватара
  formEditAvatar.addEventListener('submit', submitEditAvatarForm);

  // Добавление события кнопке редактирования профиля для открытия попапа по клику
  buttonOpenEditProfilePopup.addEventListener('click', () => {
    fillInEditProfileFormInputs();

    resetEnableValidation(formEditProfile, validationConfig);

    openPopup(popupProfile);
  });

  // Добавление события кнопке сохранения попапа редактирования профиля
  formEditProfile.addEventListener('submit', submitEditProfileForm);

  // Добавление события кнопке добавления карточек для открытия попапа по клику
  buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCard.reset();
    
    resetEnableValidation(formAddCard, validationConfig);

    openPopup(popupPlace);
  });

  // Добавление события кнопке создания карточки
  formAddCard.addEventListener('submit', submitAddCardForm);

  // Добавление события кнопкам закрытия попапа
  page.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => {
      closePopup(buttonsPopup);
    })
  })

  // Добавление события закрытия попапа нажатием на оверлэй или esc
  page.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  });

  enableValidation(validationConfig);
}