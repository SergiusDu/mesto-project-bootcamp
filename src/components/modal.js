"use strict";

import { createCard } from "./card.js";
import { hasInvalidInput, toggleButtonState } from "./validate.js";
import { updateProfileInfoOnPage } from "./profile.js";
import {
  uploadUserProfileToServer,
  uploadNewAvatar,
  uploadCardOnServer,
} from "./api.js";
const showImagePopUp = document.querySelector(".popup_for-image");
const showPopUpImage = showImagePopUp.querySelector(".popup__image");
const showPopUpImageCaption = showImagePopUp.querySelector(
  ".popup__image-caption"
);

function resetPopUp(popUp) {
  const popupInputs = popUp.querySelectorAll(".popup__input");
  const popUpForm = popUp.querySelector(".popup__form");
  popUpForm.reset();
  popupInputs.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
  const popupErrors = popUp.querySelectorAll(".popup__error");
  popupErrors.forEach((errorElement) => {
    errorElement.classList.remove(".popup__error_visible");
    errorElement.textContent = "";
  });
  const submitButton = popUp.querySelector(".popup__button");
  toggleButtonState(popupInputs, submitButton, "popup__button_disabled");
}

function openPopUp(popUp) {
  popUp.classList.remove("popup_state_closed");
  popUp.classList.add("popup_state_opened");
  window.addEventListener("keydown", handleEscapeKeyEvent);
}
function closePopUp(popUp) {
  popUp.classList.add("popup_state_closed");
  popUp.classList.remove("popup_state_opened");
  window.removeEventListener("keydown", handleEscapeKeyEvent);
}
async function uploadProfileData(profileObject) {
  try {
    return await uploadUserProfileToServer(
      profileObject.name,
      profileObject.about
    );
  } catch (error) {
    console.log(
      `Ошибка обновления информации профиля. Ошибка: ${error.message}`
    );
  }
}

function showLoadingAnimationOnButton(buttonElement) {
  buttonElement.classList.add("popup__button_loading");
  buttonElement.disabled = true;
}
function hideLoadingAnimationOnButton(buttonElement) {
  buttonElement.classList.remove("popup__button_loading");
  buttonElement.disabled = false;
}

const editProfilePopUp = document.querySelector(".popup_for-editing-profile");
const popUpNameInput = editProfilePopUp.querySelector(".popup__name-input");
const popUpAboutInput = editProfilePopUp.querySelector(
  ".popup__profession-input"
);
function setNameAndAboutToEditPopUp(name, about) {
  popUpNameInput.value = name;
  popUpAboutInput.value = about;
}
const handleEditProfilePopUp = function () {
  const saveButton = editProfilePopUp.querySelector(".popup__button");
  const editProfilePopUpForm = editProfilePopUp.querySelector(".popup__form");
  editProfilePopUpForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const inputList = [popUpNameInput, popUpAboutInput];
    if (!hasInvalidInput(inputList)) {
      showLoadingAnimationOnButton(saveButton);
      try {
        const profileDataFromServer = await uploadProfileData({
          name: popUpNameInput.value,
          about: popUpAboutInput.value,
        });
        updateProfileInfoOnPage(profileDataFromServer);
        closePopUp(editProfilePopUp);
      } catch (error) {
        console.log(
          `Не удалось обновить данные профиля. Ошибка: ${error.message}`
        );
      } finally {
        hideLoadingAnimationOnButton(saveButton);
      }
    }
  });
};

const changeImagePopUpData = function (imageURL, imageCaption) {
  showPopUpImage.src = imageURL;
  showPopUpImage.alt = imageCaption;
  showPopUpImageCaption.textContent = imageCaption;
};
const addNewPlacePopUp = document.querySelector(".popup_for-adding-place");
const handleNewPlacePopUp = function () {
  const addNewPlaceBtn = addNewPlacePopUp.querySelector(".popup__button");
  const placeName = addNewPlacePopUp.querySelector(".popup__place-name-input");
  const placeUrl = addNewPlacePopUp.querySelector(".popup__place-url-input");
  const newPlacePopUpForm = addNewPlacePopUp.querySelector(".popup__form");
  newPlacePopUpForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    showLoadingAnimationOnButton(addNewPlaceBtn);
    try {
      const cardFromServer = await uploadCardOnServer(
        placeName.value,
        placeUrl.value
      );
      createCard(cardFromServer);
      closePopUp(addNewPlacePopUp);
    } catch (error) {
      console.log(`Ошибка создания карточки. ${error.message}`);
    } finally {
      hideLoadingAnimationOnButton(addNewPlaceBtn);
    }
  });
};

const editAvatarPopUp = document.querySelector(
  ".popup_for-updating-profile-avatar"
);
function handleEditAvatarPopUp() {
  const editAvatarPopUpForm = editAvatarPopUp.querySelector(
    ".popup__form-for-updating-profile-avatar"
  );
  const avatarUrlInput = editAvatarPopUp.querySelector(
    ".popup__avatar-link-input"
  );
  const submitButton = editAvatarPopUpForm.querySelector(".popup__button");
  async function handelSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      showLoadingAnimationOnButton(submitButton);
      const profileFromServer = await uploadNewAvatar(avatarUrlInput.value);
      updateProfileInfoOnPage(profileFromServer);
      closePopUp(editAvatarPopUp);
    } catch (error) {
      console.log(
        `Не удалось обновить аватар пользователя. Ошибка: ${error.message}`
      );
    } finally {
      hideLoadingAnimationOnButton(submitButton);
    }
  }
  editAvatarPopUpForm.addEventListener("submit", handelSubmit);
}
function handleCloseButtonsAndPopUpOverlay() {
  const closeButtons = document.querySelectorAll(".popup__close-btn");
  closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closePopUp(popup);
      }
    });
    button.addEventListener("click", () => closePopUp(popup));
  });
}

function handleEscapeKeyEvent(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_state_opened");
    closePopUp(openedPopUp);
  }
}

export {
  handleEditAvatarPopUp,
  editAvatarPopUp,
  handleEditProfilePopUp,
  editProfilePopUp,
  openPopUp,
  changeImagePopUpData,
  addNewPlacePopUp,
  showImagePopUp,
  handleNewPlacePopUp,
  setNameAndAboutToEditPopUp,
  resetPopUp,
  handleCloseButtonsAndPopUpOverlay,
};
