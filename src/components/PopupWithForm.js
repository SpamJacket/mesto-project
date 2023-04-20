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

  get form() {
    return this._form;
  }

  get submitButton() {
    return this._submitButton;
  }

  _getInputsValues() {
    return this._inputs.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {});
  }

  setInputsValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name];
    });
  }

  _submitHandler(evt) {
    this._submitForm(evt, this._getInputsValues());
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._submitHandler);
  }

  closePopup() {
    this._form.reset();

    super.closePopup();
  }
}