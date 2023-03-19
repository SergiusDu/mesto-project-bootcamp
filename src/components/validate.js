"use strict";

const hasInvalidInput = function (inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = function (
  inputList,
  buttonElement,
  inactiveButtonClass
) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
const showError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};
const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = function (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (inputElement.validity.valid) {
    hideError(
      formElement,
      inputElement,
      inputErrorClass,
      inputErrorClass,
      errorClass
    );
  } else {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  }
};

const setEventListeners = function (
  formElement,
  inputSelector,
  buttonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(buttonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (evt) {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
const enableValidation = function (configObject) {
  const forms = document.querySelectorAll(configObject.formSelector);
  forms.forEach((formElement) => {
    setEventListeners(
      formElement,
      configObject.inputSelector,
      configObject.submitButtonSelector,
      configObject.inactiveButtonClass,
      configObject.inputErrorClass,
      configObject.errorClass
    );
  });
};

export { enableValidation, hasInvalidInput, toggleButtonState };
