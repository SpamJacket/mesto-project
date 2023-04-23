import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));

    this._getInputsValues = this._getInputsValues.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this.setInputsValues = this.setInputsValues.bind(this);
  }

  // Геттер формы
  get form() {
    return this._form;
  }

  // Геттер кнопки сабмита
  get submitButton() {
    return this._submitButton;
  }

  // Получение данных из полей формы
  _getInputsValues() {
    return this._inputs.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {});
  }

  // Установка данных в поля ввода
  setInputsValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name];
    });
  }

  // Метод сабмита формы
  _submitHandler(evt) {
    this._submitForm(evt, this._getInputsValues());
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._submitHandler);
  }

  // Помимо просто закрытия ещй и очищает форму
  closePopup() {
    this._form.reset();

    super.closePopup();
  }
}