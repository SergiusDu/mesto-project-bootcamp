"use strict";
import "./pages/index.css";
import { getProfileDataFromServer } from "./components/api.js";
import {
  updateProfileFromServer,
  handleProfileBlock,
} from "./components/profile.js";

import {
  openPopUp,
  handleEditProfilePopUp,
  editProfilePopUp,
  handleImagePopUpBlock,
  addNewPlacePopUp,
  newPlacePopUpHandler,
  handleEditAvatarPopUp,
} from "./components/modal.js";
import { cardsHandler } from "./components/card.js";
import { enableValidation } from "./components/validate.js";

async function handleIndex() {
  try {
    await updateProfileFromServer();
    handleProfileBlock();
    handleEditAvatarPopUp();
    handleEditProfilePopUp();
    handleProfileBlock();
    handleImagePopUpBlock();
    newPlacePopUpHandler();
    await cardsHandler();
    enableValidation({
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
  } catch (error) {
    console.log(`Ошибка на странице: ${error.message}`);
  }
}

handleIndex();
