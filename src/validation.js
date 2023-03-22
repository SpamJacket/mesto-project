function enableFormValidation(enableValidation) {
  const forms = Array.from(document.querySelectorAll(enableValidation.formSelector));

  forms.forEach(formElement => {
    setEventListeners(formElement, enableValidation);
  });
}

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

function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(inputErrorClass);

  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function toggleButtonState(inputs, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function resetEnableValidation(formElement, enableValidation) {
  const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = enableValidation;

  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputs, buttonElement, inactiveButtonClass);

  inputs.forEach(inputElement => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  });
}

export { enableFormValidation, resetEnableValidation }