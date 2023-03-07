"use strict";

const popUpTemplate = document.querySelector(
  ".popup__template_for-edit-profile"
).content;
const popUpElement = popUpTemplate.cloneNode(true);
popUpElement.querySelector(".popup").classList.add("popup_for-profile");
document.querySelector(".page").append(popUpElement);
const popUp = document.querySelector(".popup_for-profile");

const popUpNameInput = popUp.querySelector(".popup__name-input");
const popUpProfessionInput = popUp.querySelector(".popup__profession-input");
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
const openPopUp = function () {
  syncDataWithProfile();
  popUp.classList.add("popup_opened");
};
const closePopUp = function () {
  popUp.classList.remove("popup_opened");
};
const popUpHandler = function () {
  const popUpCloseBtn = popUp.querySelector(".popup__close-btn");
  const popUpSaveBtn = popUp.querySelector(".popup__save-btn");
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopUp();
    }
  });
  popUp.addEventListener("click", (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    switch (evt.target) {
      case popUp:
      case popUpCloseBtn:
        closePopUp();
        break;
      case popUpSaveBtn:
        updateProfileData();
        closePopUp();
        break;
      default:
        break;
    }
  });
};
export { openPopUp, popUpHandler };
