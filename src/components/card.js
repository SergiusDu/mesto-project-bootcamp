"use strict";

import { changeImagePopUpData, openPopUp, showImagePopUp } from "./modal.js";
import {
  deleteCardFromServer,
  getCardsFromServer,
  removeLikeFromCard,
  setLikeOnCard,
  uploadCardOnServer,
} from "./api.js";
import { getLocalProfileObject } from "./profile.js";

async function createCard(cardObject, isNewCard = false) {
  function checkIfUserAlreadyLikedCard(cardObject) {
    const userId = getLocalProfileObject()._id;
    return cardObject.likes.some((like) => like._id === userId);
  }
  async function handleLikeButton(cardObject, likeButton, likesCountElement) {
    try {
      const cardId = cardObject._id;
      const isUserAlreadyLikedCard = likeButton.classList.contains(
        "card__like-btn_checked"
      );
      if (isUserAlreadyLikedCard) {
        const cardFromServer = await removeLikeFromCard(cardId);
        likesCountElement.textContent = cardFromServer.likes.length;
        likeButton.classList.remove("card__like-btn_checked");
      } else {
        const cardFromServer = await setLikeOnCard(cardId);
        likesCountElement.textContent = cardFromServer.likes.length;
        likeButton.classList.add("card__like-btn_checked");
      }
    } catch (error) {
      console.log(
        `Не удалось поставить или убрать лайк у карточки. Ошибка: ${error.message}`
      );
    }
  }
  try {
    if (isNewCard) {
      cardObject = await uploadCardOnServer(cardObject.name, cardObject.link);
    }
    const placeToInsert = document.querySelector(".gallery__cards");
    const cardTemplate = document.querySelector(".card__template").content;
    const clonedTemplate = cardTemplate.cloneNode(true);
    const imageElement = clonedTemplate.querySelector(".card__image");
    const nameElement = clonedTemplate.querySelector(".card__title");
    const deleteCardButton = clonedTemplate.querySelector(".card__delete-btn");
    const likeButton = clonedTemplate.querySelector(".card__like-btn");
    const isUserAlreadyLikedCard = checkIfUserAlreadyLikedCard(cardObject);
    if (isUserAlreadyLikedCard) {
      likeButton.classList.add("card__like-btn_checked");
    }
    likeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleLikeButton(cardObject, likeButton, likesCountElement);
    });

    const likesCountElement =
      clonedTemplate.querySelector(".card__likes-count");
    likesCountElement.textContent = cardObject.likes.length;
    imageElement.src = cardObject.link;
    imageElement.alt = cardObject.name;
    nameElement.textContent = cardObject.name;
    if (cardObject.owner._id !== getLocalProfileObject()._id) {
      deleteCardButton.remove();
    } else {
      deleteCardButton.addEventListener("click", (event) => {
        deleteCardFromServer(cardObject._id);
        deleteCardButton.closest(".card").remove();
      });
    }

    placeToInsert.prepend(clonedTemplate);
  } catch (error) {
    console.log(`Не удалось создать карточку. Ошибка: ${error.message}`);
  }
}

function createCardsFromList(listWithCards) {
  listWithCards.forEach(async function (card) {
    await createCard(card);
  });
}

async function cardsHandler() {
  const cardsArray = await getCardsFromServer();
  createCardsFromList(cardsArray);
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
            .querySelector(".card__title").textContent;
          changeImagePopUpData(imageUrl, imageCaption);
          openPopUp(showImagePopUp);
          break;
      }
    });
  });
}
export { createCard, createCardsFromList, cardsHandler };
