"use strict";

import { createNewElementFromTemplate } from "./utils.mjs";
import {createCard} from "./card.mjs";

const editProfilePopUp = createNewElementFromTemplate(
  ".popup__template_for-edit-profile",
  ".page",
  "append"
);
editProfilePopUp.classList.add("popup_for-profile");
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

const showImagePopUp = createNewElementFromTemplate(
  ".popup__template_for_opening_image",
  ".page",
  "append"
);

const changeImagePopUpData = function (imageURL, imageCaption) {
  showImagePopUp.querySelector(".popup__image").src = imageURL;
  showImagePopUp.querySelector(".popup__image-caption").textContent = imageCaption;
};
// imagePopUp.classList.add("popup_opened");

const getNewImage = function (placeName, placeUrl) {
  return { placeName, placeUrl };
};
const imagePopUpHandler = function () {
  const closeButton = showImagePopUp.querySelector(".popup__close-btn");
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopUp(showImagePopUp);
    }
  });
  showImagePopUp.addEventListener("click", (evt) => {
    switch (evt.target) {
      case showImagePopUp:
      case closeButton:
        closePopUp(showImagePopUp);
        break;
    }
  });
};

const addNewPlacePopUp = createNewElementFromTemplate(
  ".popup__template_for-adding-place",
  ".page",
  "append"
);

const newPlacePopUpHandler = function () {
  const closeButton = addNewPlacePopUp.querySelector(".popup__close-btn");
  const addNewPlaceBtn = addNewPlacePopUp.querySelector(".popup__save-btn");
  const placeName = addNewPlacePopUp.querySelector(".popup__name-input");
  const placeUrl = addNewPlacePopUp.querySelector(".popup__profession-input"); //TODO: @kanchikov Fix class name
  addNewPlacePopUp.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const clickedElement = evt.target;
    switch (clickedElement) {
      case addNewPlacePopUp:
      case closeButton:
        closePopUp(addNewPlacePopUp);
        break;
      case addNewPlaceBtn:
        createCard(placeName.value, placeUrl.value);
        closePopUp(addNewPlacePopUp);
        break;
    }
  });
};

export {
  editProfilePopUp,
  openPopUp,
  editProfilePopUpHandler,
  imagePopUpHandler,
  changeImagePopUpData,
  addNewPlacePopUp,
  showImagePopUp,
  newPlacePopUpHandler
};
