export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {   
    this._inputSelector = inputSelector;
    this._inactiveButtonClass = inactiveButtonClass;
		this._inputErrorClass = inputErrorClass;
		this._errorClass = errorClass;
		this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
		this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
	}

	// Проверка валидности полей ввода
	_hasInvalidInput() {
		return this._inputs.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	// Смена состояния кнопки сабмита
	_toggleButtonState() {
		if (!this._hasInvalidInput()) {
			this._buttonElement.classList.remove(this._inactiveButtonClass);
			this._buttonElement.disabled = false;
		} else {
			this._buttonElement.classList.add(this._inactiveButtonClass);
			this._buttonElement.disabled = true;
		}
	}

	// Показать ошибку
	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.add(this._inputErrorClass);

		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}

	// Спрятать ошибку
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.remove(this._inputErrorClass);
	
		errorElement.textContent = '';
		errorElement.classList.remove(this._errorClass);
	}

	// Проверка валидности поля ввода
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

	// УКстановка слушателей полям ввода
	_setEventListeners() {
		this._toggleButtonState();
		this._inputs.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}

	// Основаной метод включающий валидацию форме
	enableValidation() {
		this._setEventListeners();
	}

	// Метод сбрасывающий валидацию (используется при открытии попапа)
	resetEnableValidation() {
		this._inputs.forEach(inputElement => {
			this._checkInputValidity(inputElement);
			this._hideInputError(inputElement);
		});

		this._toggleButtonState();
	}
}
