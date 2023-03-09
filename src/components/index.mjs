"use strict";

import {
  openPopUp,
  editProfilePopUpHandler,
  editProfilePopUp,
  imagePopUpHandler,
  addNewPlacePopUp,
  showImagePopUp,
  newPlacePopUpHandler
} from "./modal.mjs";
import {createCard, createCardsFromList, cardsHandler} from "./card.mjs";
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
        console.log("Error");
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
