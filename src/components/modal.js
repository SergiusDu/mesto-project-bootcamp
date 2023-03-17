"use strict";

import { createCard } from "./card.js";
import { hasInvalidInput } from "./validate.js";
import {
  getLocalProfileObject,
  updateProfileFromServer,
  updateProfileInfoOnPage,
  setLocalProfileObject,
  localProfileObject,
} from "./profile.js";
import {
  getProfileDataFromServer,
  uploadUserProfileToServer,
  uploadNewAvatar,
  setLikeOnCard,
  removeLikeFromCard,
  uploadCardOnServer,
} from "./api.js";
const showImagePopUp = document.querySelector(".popup_for-image");
const showPopUpImage = showImagePopUp.querySelector(".popup__image");
const showPopUpImageCaption = showImagePopUp.querySelector(
  ".popup__image-caption"
);
const showPopUpImageCloseButton =
  showImagePopUp.querySelector(".popup__close-btn");

function resetPopUp(popUp) {
  const popupInputs = popUp.querySelectorAll(".popup__input");
  popupInputs.forEach((inputElement) => {
    inputElement.value = "";
    inputElement.classList.remove("popup__input_type_error");
  });
  const popupErrors = popUp.querySelectorAll(".popup__error");
  popupErrors.forEach((errorElement) => {
    errorElement.classList.remove(".popup__error_visible");
    errorElement.textContent = "";
  });
}
function openPopUp(popUp) {
  popUp.classList.remove("popup_state_closed");
  popUp.classList.add("popup_state_opened");
  window.addEventListener("keydown", handleEscapeKeyEvent);
}
function closePopUp(popUp) {
  popUp.classList.add("popup_state_closed");
  popUp.classList.remove("popup_state_opened");
  resetPopUp(popUp);
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
}
function hideLoadingAnimationOnButton(buttonElement) {
  buttonElement.classList.remove("popup__button_loading");
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
  const closeButton = editProfilePopUp.querySelector(".popup__close-btn");
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
      } catch (error) {
        console.log(
          `Не удалось обновить данные профиля. Ошибка: ${error.message}`
        );
      } finally {
        hideLoadingAnimationOnButton(saveButton);
        closePopUp(editProfilePopUp);
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
    } catch (error) {
      console.log(`Ошибка создания карточки. ${error.message}`);
    } finally {
      hideLoadingAnimationOnButton(addNewPlaceBtn);
      closePopUp(addNewPlacePopUp);
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
    } catch (error) {
      console.log(
        `Не удалось обновить аватар пользователя. Ошибка: ${error.message}`
      );
    } finally {
      hideLoadingAnimationOnButton(submitButton);
      closePopUp(editAvatarPopUp);
    }
  }
  editAvatarPopUpForm.addEventListener("submit", handelSubmit);
}
function handleCloseButtons() {
  const closeButtons = document.querySelectorAll(".popup__close-btn");
  closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
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
  handleCloseButtons,
};
