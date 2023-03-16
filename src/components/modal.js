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
} from "./api.js";
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
  window.addEventListener("keydown", closeOpenedPopUp);
}
function closePopUp(popUp) {
  popUp.classList.add("popup_state_closed");
  popUp.classList.remove("popup_state_opened");
  resetPopUp(popUp);
  window.removeEventListener("keydown", closeOpenedPopUp);
}

async function setActualProfileDataToPopup() {
  const profileDataFromServer = await getProfileDataFromServer();
  popUpNameInput.value = profileDataFromServer.name;
  popUpAboutInput.value = profileDataFromServer.about;
}
async function uploadProfileData(profileObject) {
  try {
    if (profileObject.avatar === "") {
      profileObject.avatar = getLocalProfileObject().avatar;
    }
    await uploadUserProfileToServer(
      profileObject.name,
      profileObject.about,
      profileObject.avatar
    );
    await updateProfileFromServer();
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
      await uploadProfileData({
        name: popUpNameInput.value,
        about: popUpAboutInput.value,
      });
      hideLoadingAnimationOnButton(saveButton);
      closePopUp(editProfilePopUp);
    }
  });
};

const showImagePopUp = document.querySelector(".popup_for-image");

const changeImagePopUpData = function (imageURL, imageCaption) {
  const image = showImagePopUp.querySelector(".popup__image");
  image.src = imageURL;
  image.alt = imageCaption;
  showImagePopUp.querySelector(".popup__image-caption").textContent =
    imageCaption;
};
const handleImagePopUpBlock = function () {
  const closeButton = showImagePopUp.querySelector(".popup__close-btn");
  showImagePopUp.addEventListener("click", (evt) => {
    switch (evt.target) {
      case showImagePopUp:
      case closeButton:
        closePopUp(showImagePopUp);
        break;
    }
  });
};

const addNewPlacePopUp = document.querySelector(".popup_for-adding-place");
const newPlacePopUpHandler = function () {
  const closeButton = addNewPlacePopUp.querySelector(".popup__close-btn");
  const addNewPlaceBtn = addNewPlacePopUp.querySelector(".popup__button");
  const placeName = addNewPlacePopUp.querySelector(".popup__place-name-input");
  const placeUrl = addNewPlacePopUp.querySelector(".popup__place-url-input");
  addNewPlacePopUp.addEventListener("click", async function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const clickedElement = evt.target;
    switch (clickedElement) {
      case addNewPlacePopUp:
      case closeButton:
        closePopUp(addNewPlacePopUp);
        break;
      case addNewPlaceBtn:
        showLoadingAnimationOnButton(addNewPlaceBtn);
        await createCard({ name: placeName.value, link: placeUrl.value }, true);
        hideLoadingAnimationOnButton(addNewPlaceBtn);
        closePopUp(addNewPlacePopUp);
        break;
    }
  });
  window.addEventListener("keydown", async function (evt) {
    switch (evt.key) {
      case "Enter":
        const inputList = [placeName, placeUrl];
        if (!hasInvalidInput(inputList)) {
          await createCard(
            { name: placeName.value, link: placeUrl.value },
            true
          );
          closePopUp(addNewPlacePopUp);
        }
        break;
    }
  });
};

const editAvatarPopUp = document.querySelector(
  ".popup_for-updating-profile-avatar"
);
function handleEditAvatarPopUp() {
  const form = editAvatarPopUp.querySelector(
    ".popup__form-for-updating-profile-avatar"
  );
  const avatarUrlInput = editAvatarPopUp.querySelector(
    ".popup__avatar-link-input"
  );
  const submitButton = form.querySelector(".popup__button");
  async function handelSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      showLoadingAnimationOnButton(submitButton);
      await uploadNewAvatar(avatarUrlInput.value);
      hideLoadingAnimationOnButton(submitButton);
      await updateProfileFromServer();
      closePopUp(editAvatarPopUp);
    } catch (error) {
      console.log(
        `Не удалось обновить аватар пользователя. Ошибка: ${error.message}`
      );
    }
  }
  form.addEventListener("submit", handelSubmit);
}

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopUp(popup));
});
function closeOpenedPopUp(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_state_opened");
    openedPopUp.classList.add("popup_state_closed");
    openedPopUp.classList.remove("popup_state_opened");
  }
}

export {
  handleEditAvatarPopUp,
  editAvatarPopUp,
  handleEditProfilePopUp,
  handleImagePopUpBlock,
  editProfilePopUp,
  openPopUp,
  changeImagePopUpData,
  addNewPlacePopUp,
  showImagePopUp,
  newPlacePopUpHandler,
  setActualProfileDataToPopup,
};
