"use strict";

const PopUp = function () {
  this.node = document.querySelector(".popup");
  this.typeOfProfile = undefined;
  this.header = this.node.querySelector(".popup__header");
  this.closeButton = this.node.querySelector(".popup__close-btn");
  this.saveButton = this.node.querySelector(".popup__save-btn");
  this.firstTextInput = this.node.querySelector(".popup__name-input");
  this.secondTextInput = this.node.querySelector(".popup__profession-input");
  this.onEditProfile = function () {
    this.type = "editProfile";
    this.header.textContent = "Редактировать профиль";
    this.firstTextInput.value =
      document.querySelector(".profile__name").textContent;
    this.secondTextInput.value = document.querySelector(
      ".profile__profession"
    ).textContent;
    this.node.classList.add("popup_opened");
  };
  this.onCloseButton = function () {
    this.node.classList.remove("popup_opened");
  };
  this.clickOnSaveButton = function () {
    switch (this.typeOfProfile) {
      case "editProfile":
        const profileName = document.querySelector(".profile__name");
        const profileProfession = document.querySelector(
          ".profile__profession"
        );
        profileName.textContent = this.firstTextInput.value;
        profileProfession.textContent = this.secondTextInput.value;
        this.onCloseButton();
        break;
      default:
        break;
    }
  };
  this.saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    this.clickOnSaveButton();
  });

  const profileEditButton = document.querySelector(".profile__edit-btn");
  profileEditButton.addEventListener("click", (event) => {
    event.preventDefault();
    this.onEditProfile();
  });
  this.closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    this.onCloseButton();
  });
};

const popUp = new PopUp();
