"use strict";
import "./pages/index.css";
const initialCards = [
  {
    name: "Джошуа-Три",
    link: "https://images.unsplash.com/photo-1577915109618-275b946b9687?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Йосимити",
    link: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=704&q=80",
  },
  {
    name: "Биг-Сур",
    link: "https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
  },
  {
    name: "Сан-Франциско",
    link: "https://images.unsplash.com/photo-1471306224500-6d0d218be372?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Золотые ворота",
    link: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
  },
  {
    name: "Вудбридж",
    link: "https://images.unsplash.com/photo-1677793225529-1f089ed52792?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
  },
];
import {
  openPopUp,
  editProfilePopUpHandler,
  editProfilePopUp,
  imagePopUpHandler,
  addNewPlacePopUp,
  newPlacePopUpHandler,
} from "./components/modal.mjs";
import { createCardsFromList, cardsHandler } from "./components/card.mjs";

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
        openPopUp(addNewPlacePopUp);
        break;
      default:
        break;
    }
  });
}
editProfilePopUpHandler();
profileHandler();
imagePopUpHandler();
newPlacePopUpHandler();
cardsHandler();

createCardsFromList(initialCards);
