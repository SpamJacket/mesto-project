// Проход по всем формам с дальнейшим добавлением слушателей для полей формы
function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  });
}

// Проход по всем полям формы с добавлением слушателя проверки валидации
// Вызов функции включения/выключения кнопки при валидных/невалидных полях формы
function setEventListeners(formElement, validationConfig) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validationConfig;

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
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Проверка на невалидность хотя бы одного поля формы
function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Сброс валидации
function resetEnableValidation(formElement, validationConfig) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validationConfig;

  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputs, buttonElement, inactiveButtonClass);

  inputs.forEach(inputElement => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  });
}

export {
  enableValidation, resetEnableValidation
};