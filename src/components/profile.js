"use strict";
import { getProfileDataFromServer } from "./api.js";
import {
  addNewPlacePopUp,
  editProfilePopUp,
  editAvatarPopUp,
  openPopUp,
  resetPopUp,
  setNameAndAboutToEditPopUp,
} from "./modal.js";
const localProfileObject = {
  name: "",
  about: "",
  avatar: "",
  _id: "",
  cohort: "",
};
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__profession");
const profileImageElement = document.querySelector(".profile__picture");
function getLocalProfileObject() {
  return localProfileObject;
}
function setLocalProfileObject(name, about, avatar) {
  localProfileObject.name = name;
  localProfileObject.about = about;
  localProfileObject.avatar = avatar;
}

function updateProfileInfoOnPage(profileObject) {
  profileNameElement.textContent = profileObject.name;
  profileAboutElement.textContent = profileObject.about;
  profileImageElement.src = profileObject.avatar;
}

async function updateProfileFromServer() {
  try {
    const profileDataFromServer = await getProfileDataFromServer();
    Object.assign(localProfileObject, profileDataFromServer);
    updateProfileInfoOnPage(getLocalProfileObject());
    return profileDataFromServer;
  } catch (error) {
    console.log(`Ошибка : ${error.message}`);
  }
}

function handleProfileBlock() {
  const profileBlock = document.querySelector(".profile");
  const avatarButton = document.querySelector(".profile__change-avatar-button");
  const editProfileBtn = profileBlock.querySelector(".profile__edit-btn");
  const addNewPictureBtn = profileBlock.querySelector(".profile__add-btn");
  function openEditProfilePopUp() {
    resetPopUp(editProfilePopUp);
    setNameAndAboutToEditPopUp(
      profileNameElement.textContent,
      profileAboutElement.textContent
    );
    openPopUp(editProfilePopUp);
  }
  editProfileBtn.addEventListener("click", openEditProfilePopUp);
  addNewPictureBtn.addEventListener("click", (evt) => {
    evt.stopPropagation();
    resetPopUp(addNewPlacePopUp);
    openPopUp(addNewPlacePopUp);
  });
  avatarButton.addEventListener("click", (evt) => {
    evt.stopPropagation();
    resetPopUp(editAvatarPopUp);
    openPopUp(editAvatarPopUp);
  });
}

export {
  updateProfileFromServer,
  handleProfileBlock,
  getLocalProfileObject,
  setLocalProfileObject,
  localProfileObject,
  updateProfileInfoOnPage,
};
