"use strict";

import { openPopUp, popUpHandler } from "./modal.js";
function profileHandler() {
  const profileBlock = document.querySelector(".profile");
  const editProfileBtn = profileBlock.querySelector(".profile__edit-btn");
  const addNewPictureBtn = profileBlock.querySelector(".profile__add-btn");
  profileBlock.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    switch (evt.target) {
      case editProfileBtn:
        openPopUp();
        break;
      case addNewPictureBtn:
        console.log(evt.target);
        break;
      default:
        console.log("Error");
        break;
    }
  });
}
popUpHandler();
profileHandler();
