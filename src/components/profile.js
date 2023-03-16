"use strict";
import { getProfileDataFromServer } from "./api.js";
import {
  addNewPlacePopUp,
  editProfilePopUp,
  editAvatarPopUp,
  openPopUp,
  setActualProfileDataToPopup,
} from "./modal";
const localProfileObject = {
  name: "",
  about: "",
  avatar: "",
  _id: "",
  cohort: "",
};
function getLocalProfileObject() {
  return localProfileObject;
}
function setLocalProfileObject(name, about, avatar) {
  localProfileObject.name = name;
  localProfileObject.about = about;
  localProfileObject.avatar = avatar;
}

function updateProfileInfoOnPage(profileObject) {
  const profileNameElement = document.querySelector(".profile__name");
  const profileAboutElement = document.querySelector(".profile__profession");
  const profileImageElement = document.querySelector(".profile__picture");

  profileNameElement.textContent = profileObject.name;
  profileAboutElement.textContent = profileObject.about;
  profileImageElement.src = profileObject.avatar;
}

async function updateProfileFromServer() {
  const profileDataFromServer = await getProfileDataFromServer();
  Object.assign(localProfileObject, profileDataFromServer);
  updateProfileInfoOnPage(getLocalProfileObject());
  return profileDataFromServer;
}

function handleProfileBlock() {
  const profileBlock = document.querySelector(".profile");
  const avatarButton = document.querySelector(".profile__change-avatar-button");
  const editProfileBtn = profileBlock.querySelector(".profile__edit-btn");
  const addNewPictureBtn = profileBlock.querySelector(".profile__add-btn");
  profileBlock.addEventListener("click", async function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    switch (evt.target) {
      case editProfileBtn:
        await setActualProfileDataToPopup();
        openPopUp(editProfilePopUp);
        break;
      case addNewPictureBtn:
        openPopUp(addNewPlacePopUp);
        break;
      case avatarButton:
        openPopUp(editAvatarPopUp);
        break;
      default:
        break;
    }
  });
}

export {
  updateProfileFromServer,
  handleProfileBlock,
  getLocalProfileObject,
  setLocalProfileObject,
  localProfileObject,
};
