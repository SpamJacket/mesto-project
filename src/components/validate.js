// Проход по всем формам с дальнейшим добавлением слушателей для полей формы
function enableFormValidation(enableValidation) {
  const forms = Array.from(document.querySelectorAll(enableValidation.formSelector));

  forms.forEach(formElement => {
    setEventListeners(formElement, enableValidation);
  });
}

// Проход по всем полям формы с добавлением слушателя проверки валидации
// Вызов функции включения/выключения кнопки при валидных/невалидных полях формы
function setEventListeners(formElement, enableValidation) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = enableValidation;

  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputs, buttonElement, inactiveButtonClass);

  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass });
      toggleButtonState(inputs, buttonElement, inactiveButtonClass);
    });
  });
}

// Проверка на валидность поля формы
// Включение/выключение отображения ошибки поля ввода
function checkInputValidity(formElement, inputElement, classesToError) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.textError);
  } else {
    inputElement.setCustomValidity('');
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classesToError);
  } else {
    hideInputError(formElement, inputElement, classesToError);
  }
}

// Включение отображения ошибки поля ввода
function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Выключение отображения ошибки поля ввода
function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(inputErrorClass);

  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// Включение/выключение кнопки при валидных/невалидных полях формы
function toggleButtonState(inputs, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

// Проверка на невалидность хотя бы одного поля формы
function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Сброс валидации
function resetEnableFormValidation(formElement, enableValidation) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = enableValidation;

  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputs, buttonElement, inactiveButtonClass);

  inputs.forEach(inputElement => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  });
}

export { enableFormValidation, resetEnableFormValidation }