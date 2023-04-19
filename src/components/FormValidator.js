export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {   
    this._inputSelector = inputSelector;
    this._inactiveButtonClass = inactiveButtonClass;
		this._inputErrorClass = inputErrorClass;
		this._errorClass = errorClass;
		this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
	}

	_hasInvalidInput() {
		return this._inputs.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._inactiveButtonClass);
			this._buttonElement.disabled = true;
		} else {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.disabled = false;
		}
	}

	_showInputError(inputElement, errorMessage) {
		this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.add(this._inputErrorClass);

		this._errorElement.textContent = errorMessage;
		this._errorElement.classList.add(this._errorClass);
	}

	_hideInputError(inputElement) {
		this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.remove(this._inputErrorClass);
	
		this._errorElement.textContent = '';
		this._errorElement.classList.remove(this._errorClass);
	}

	_checkInputValidity(inputElement) {
		if (inputElement.validity.patternMismatch) {
			inputElement.setCustomValidity(inputElement.dataset.textError);
		} else {
			inputElement.setCustomValidity('');
		}
		
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_setEventListeners() {
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));

		this._toggleButtonState();
		this._inputs.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}

	enableValidation() {
		this._setEventListeners();
	}

	resetEnableValidation() {
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));

		this._toggleButtonState();

		this._inputs.forEach(inputElement => {
			this._hideInputError(inputElement);
		});
	}
}
