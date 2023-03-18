"use strict";
import "./pages/index.css";
import {
  getCardsFromServer,
  getProfileDataFromServer,
} from "./components/api.js";
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
  handleNewPlacePopUp,
  handleEditAvatarPopUp,
  handleCloseButtonsAndPopUpOverlay,
} from "./components/modal.js";
import { cardsHandler, createCardsFromList } from "./components/card.js";
import { enableValidation } from "./components/validate.js";

async function handleIndex() {
  try {
    try {
      await updateProfileFromServer();
    } catch (error) {
      console.log(
        `Не удалось обновить профиль пользователя. Ошибка: ${error.message}`
      );
    }
    handleCloseButtonsAndPopUpOverlay();
    handleEditProfilePopUp();
    handleProfileBlock();
    handleEditAvatarPopUp();
    handleNewPlacePopUp();
    enableValidation({
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
    createCardsFromList(await getCardsFromServer());
  } catch (error) {
    console.log(`Ошибка на странице: ${error.message}`);
  }
}

handleIndex();
