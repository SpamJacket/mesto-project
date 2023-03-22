// Переменные для блоков page и content
const page = document.querySelector('.page');
const content = page.querySelector('.content');

// Попапы
const popupAvatar = page.querySelector('.popup_type_avatar');
const popupProfile = page.querySelector('.popup_type_profile');
const popupPlace = page.querySelector('.popup_type_place');
const popupAcceptDelete = page.querySelector('.popup_type_accept-delete')
const popupImg = page.querySelector('.popup_type_img');

// Формы
// попапа редактирования аватара
const formEditAvatar = document.forms.avatarForm;
// попапа редактирования профиля
const formEditProfile = document.forms.profileForm;
// попапа добавления карточки
const formAddCard = document.forms.placeForm;
// попапа подтверждения удаления 
const formDeleteCard = document.forms.acceptDeleteForm;

// Поля ввода попапа редактирования аватара
const linkPopupAvatar = formEditAvatar.elements.avatarLink;

// Поля ввода попапа редактирования профиля и элементы полей профиля
const namePopupProfile = formEditProfile.elements.profileName;
const activityPopupProfile = formEditProfile.elements.profileActivity;
const nameProfile = content.querySelector('.profile__name');
const activityProfile = content.querySelector('.profile__activity');

// Поля ввода попапа добавления карточек
const titlePopupPlace = formAddCard.elements.placeTitle;
const linkPopupPlace = formAddCard.elements.placeLink;

// Изображение и подпись в попапе просмотра фото
const imagePopupImg = popupImg.querySelector('.popup__image');
const captionPopupImg = popupImg.querySelector('.popup__caption');

// Переменные для шаблона карточки и списка карточек
const cardTemplate = document.querySelector('#gallery-item').content;
const galleryList = content.querySelector('.gallery__list');

// Кнопки открытия попапов
// редактирования аватара
const buttonOpenAvatarPopup = content.querySelector('.profile__avatar');
// редактирования профиля
const buttonOpenEditProfilePopup = content.querySelector('.profile__edit-button');
// добавления карточки
const buttonOpenAddCardPopup = content.querySelector('.profile__add-button');

// Кнопки закрытия попапов
// редактирования аватара
const buttonCloseEditAvatarPopup = page.querySelector('.popup_type_avatar .popup__close-button')
// редактирования профиля
const buttonCloseEditProfilePopup = page.querySelector('.popup_type_profile .popup__close-button');
// добавления карточки
const buttonCloseAddCardPopup = page.querySelector('.popup_type_place .popup__close-button');
// подверждения удаления
const buttonCloseAcceptDeletePopup = page.querySelector('.popup_type_accept-delete .popup__close-button');
// просмотра полного изображения
const buttonCloseImgPopup = page.querySelector('.popup_type_img .popup__close-button');

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

// Объект настроек для валидации
const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export { page, content,
        popupAvatar, popupProfile, popupPlace, popupImg, popupAcceptDelete,
        formEditAvatar, formEditProfile, formAddCard, formDeleteCard,
        linkPopupAvatar,
        namePopupProfile, activityPopupProfile, nameProfile, activityProfile,
        titlePopupPlace, linkPopupPlace,
        imagePopupImg, captionPopupImg,
        cardTemplate, galleryList,
        buttonOpenAvatarPopup, buttonOpenEditProfilePopup, buttonOpenAddCardPopup,
        buttonCloseEditAvatarPopup, buttonCloseEditProfilePopup, buttonCloseAddCardPopup, buttonCloseAcceptDeletePopup, buttonCloseImgPopup,
        initialCards, enableValidation }