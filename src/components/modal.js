"use strict";

function createPopUp(templateSelector, newClass) {
  const popUpTemplate = document.querySelector(templateSelector).content;
  const popUpElement = popUpTemplate.cloneNode(true);
  popUpElement.querySelector(".popup").classList.add(newClass);
  document.querySelector(".page").append(popUpElement);
  const x = document.querySelector("." + newClass);
  return x;
}

const editProfilePopUp = createPopUp(
  ".popup__template_for-edit-profile",
  "popup_for-profile"
);
const popUpNameInput = editProfilePopUp.querySelector(".popup__name-input");
const popUpProfessionInput = editProfilePopUp.querySelector(
  ".popup__profession-input"
);
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const syncDataWithProfile = function () {
  popUpNameInput.value = profileName.textContent;
  popUpProfessionInput.value = profileProfession.textContent;
};
const updateProfileData = function () {
  profileName.textContent = popUpNameInput.value;
  profileProfession.textContent = popUpProfessionInput.value;
};
const openPopUp = function (popUp) {
  if (popUp === editProfilePopUp) {
    syncDataWithProfile();
  }
  popUp.classList.add("popup_opened");
};
const closePopUp = function (popUp) {
  popUp.classList.remove("popup_opened");
};
const editProfilePopUpHandler = function () {
  const closeButton = editProfilePopUp.querySelector(".popup__close-btn");
  const saveButton = editProfilePopUp.querySelector(".popup__save-btn");
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopUp(editProfilePopUp);
    }
  });
  editProfilePopUp.addEventListener("click", (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    switch (evt.target) {
      case editProfilePopUp:
      case closeButton:
        closePopUp(editProfilePopUp);
        break;
      case saveButton:
        updateProfileData();
        closePopUp(editProfilePopUp);
        break;
      default:
        break;
    }
  });
};

const imagePopUp = createPopUp(
  ".popup__template_for_opening_image",
  "popup_for_images"
);

// imagePopUp.classList.add("popup_opened");

const getNewImage = function (placeName, placeUrl) {
  return { placeName, placeUrl };
};
const imagePopUpHandler = function () {
  const closeButton = imagePopUp.querySelector(".popup__close-btn");
  const uploadButton = imagePopUp.querySelector(".popup__save-btn");
  const addImageButton = document.querySelector(".profile__add-btn");
  const placeName = imagePopUp.querySelector(".popup__name-input");
  const placeUrl = imagePopUp.querySelector(".popup__profession-input"); //TODO: @kanchikov Fix class name
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopUp(imagePopUp);
    }
  });
  imagePopUp.addEventListener("click", (evt) => {
    switch (evt.target) {
      case closeButton:
        console.log(evt.target);
        closePopUp(imagePopUp);
        break;
      case uploadButton:
        break;
      case addImageButton:
        openPopUp(imagePopUp);
        break;
    }
  });
};

export {
  editProfilePopUp,
  openPopUp,
  editProfilePopUpHandler,
  imagePopUpHandler,
  imagePopUp,
};
