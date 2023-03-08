"use strict";

import {
  openPopUp,
  editProfilePopUpHandler,
  editProfilePopUp,
  imagePopUpHandler,
  imagePopUp,
} from "./modal.js";
function profileHandler() {
  const profileBlock = document.querySelector(".profile");
  const editProfileBtn = profileBlock.querySelector(".profile__edit-btn");
  const addNewPictureBtn = profileBlock.querySelector(".profile__add-btn");
  profileBlock.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    switch (evt.target) {
      case editProfileBtn:
        openPopUp(editProfilePopUp);
        break;
      case addNewPictureBtn:
        openPopUp(imagePopUp);
        break;
      default:
        console.log("Error");
        break;
    }
  });
}
editProfilePopUpHandler();
profileHandler();
imagePopUpHandler();
