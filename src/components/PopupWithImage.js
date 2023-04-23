import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  // Помимо открытия попапа устанавливается картинка и её подпись
  openPopup(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.openPopup();
  }
}