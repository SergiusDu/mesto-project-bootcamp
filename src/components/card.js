"use strict";

import { changeImagePopUpData, openPopUp, showImagePopUp } from "./modal.js";
import {
  deleteCardFromServer,
  getCardsFromServer,
  removeLikeFromCard,
  setLikeOnCard,
} from "./api.js";
import { getLocalProfileObject, updateProfileFromServer } from "./profile.js";
import { checkServerResponseKeys } from "./utils.js";

const placeToInsert = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector(".card__template").content;
const cardObjectExpectedKeys = [
  "likes",
  "_id",
  "name",
  "link",
  "owner",
  "createdAt",
];
function getCard(cardObject) {
  checkServerResponseKeys(cardObject, cardObjectExpectedKeys);
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
  function checkIfUserAlreadyLikedCard(cardObject) {
    const userId = getLocalProfileObject()._id;
    return cardObject.likes.some((like) => like._id === userId);
  }

  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const nameElement = cardElement.querySelector(".card__title");
  const deleteCardButton = cardElement.querySelector(".card__delete-btn");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const likesCountElement = cardElement.querySelector(".card__likes-count");
  const isUserAlreadyLikedCard = checkIfUserAlreadyLikedCard(cardObject);
  if (isUserAlreadyLikedCard) {
    likeButton.classList.add("card__like-btn_checked");
  }
  likesCountElement.textContent = cardObject.likes.length;
  const imageLink = cardObject.link;
  const imageName = cardObject.name;
  imageElement.src = imageLink;
  imageElement.alt = imageName;
  function openImagePopUp() {
    changeImagePopUpData(imageLink, imageName);
    openPopUp(showImagePopUp);
  }
  imageElement.addEventListener("click", openImagePopUp);
  nameElement.textContent = cardObject.name;
  likeButton.addEventListener("click", async (event) => {
    try {
      await handleLikeButton(cardObject, likeButton, likesCountElement);
    } catch (error) {
      console.log(`Ошибка: ${error.message}`);
    }
  });
  if (cardObject.owner._id !== getLocalProfileObject()._id) {
    deleteCardButton.remove();
  } else {
    deleteCardButton.addEventListener("click", async (event) => {
      try {
        await deleteCardFromServer(cardObject._id);
        deleteCardButton.closest(".card").remove();
      } catch (error) {
        console.log(`Не удалось удалить карточку с сервера. ${error.message}`);
      }
    });
  }
  return cardElement;
}
function createCard(cardObject) {
  const clonedTemplate = getCard(cardObject);
  placeToInsert.prepend(clonedTemplate);
}
function createCardsFromList(listWithCards) {
  listWithCards.forEach(function (card) {
    createCard(card);
  });
}

export { createCard, createCardsFromList };
