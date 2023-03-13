"use strict";

import { createNewElementFromTemplate } from "./utils.js";
import { openPopUp, showImagePopUp, changeImagePopUpData } from "./modal.js";

const createCard = function (name, imageUrl) {
  const cardElement = createNewElementFromTemplate(
    ".card__template",
    ".gallery__cards",
    "prepend"
  );
  const imageElement = cardElement.querySelector(".card__image");
  const nameElement = cardElement.querySelector(".card__title");
  imageElement.src = imageUrl;
  imageElement.alt = name;
  nameElement.textContent = name;
};

const deleteCard = function (clickedDeleteButton) {
  clickedDeleteButton.closest(".card").remove();
};
function createCardsFromList(listWithCards) {
  listWithCards.forEach((card) => {
    createCard(card.name, card.link);
  });
}

const cardsHandler = function () {
  const cardsGallery = document.querySelector(".gallery__cards");
  cardsGallery.addEventListener("click", (evt) => {
    const target = evt.target;
    const targetClassList = target.classList;
    targetClassList.forEach((className) => {
      switch (className) {
        case "card__image":
          const imageUrl = target.src;
          const imageCaption = target
            .closest(".card")
            .querySelector(".card__image-caption").textContent;
          changeImagePopUpData(imageUrl, imageCaption);
          openPopUp(showImagePopUp);
          break;
        case "card__delete-btn":
          deleteCard(evt.target);
          break;
        case "card__like-btn":
          targetClassList.toggle("card__like-btn_checked");
          break;
      }
    });
  });
};
export { createCard, createCardsFromList, cardsHandler };
