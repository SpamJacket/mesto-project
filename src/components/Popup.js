export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Открыть попап
  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрыть попап
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Проверка нажит esc или нет
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  // Установка слушателя на оверлей и кнопку закрытия
  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if(evt.target === evt.currentTarget) {
        this.closePopup();
      }
    });

    this._closeButton.addEventListener('click', () => {
      this.closePopup();
    })
  }
}