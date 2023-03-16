"use strict";

// ДЛЯ РЕВЬЮЕРА
// Даю своё согласие на письменное ревью, так как у меня уже 5 утра, ответ в пачке предоставить оперативно не смогу.
// Надеюсь нет критических замечаний, из-за которых возможно будет откланить ревью, так как из-за часовой разницы потеряю день.
// Буду рад любым комментариям, единственно modal.js делал в торопях, работает, написано криво, перепишу по утру :-)

import { updateProfileFromServer } from "./profile";

const authorizationKey = "99d97c75-629e-46fe-8490-24ad8926f786";

const initHeader = new Headers();
initHeader.append("authorization", authorizationKey);
const profileObjectExpectedKeys = ["name", "about", "avatar", "_id", "cohort"];
const cardObjectExpectedKeys = [
  "likes",
  "_id",
  "name",
  "link",
  "owner",
  "createdAt",
];

const getRequestOptions = {
  method: "get",
  headers: initHeader,
};
function checkServerResponseKeys(object, expectedKeysArray) {
  if (!expectedKeysArray.every((key) => object.hasOwnProperty(key))) {
    throw new ReferenceError(
      `Объект ${object} не содержит одного или более свойств из списка ${expectedKeysArray}`
    );
  }
}

/**
 * @param {string} requestUrl
 * @param {RequestInit} options
 */
async function fetchData(requestUrl, options) {
  try {
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      throw new Error("HTTP error: ${response.status}");
    } else {
      return await response.json();
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(`Type Error: ${error.message}`);
    } else if (error.name === "AbortError") {
      console.error(`Запрос был прерван: ${error.message}`);
    } else if (error.message.startsWith("HTTP error")) {
      console.log(`Ошибка HTTP: ${error.message}`);
    } else {
      console.log(`Неизвестная ошибка: ${error.message}`);
    }
  }
}
async function getProfileDataFromServer() {
  const getProfileApiPAth = `https://nomoreparties.co/v1/wbf-cohort-6/users/me`;
  return await fetchData(getProfileApiPAth, getRequestOptions)
    .then((data) => {
      // Проверка, правильные ли данные приходят от сервера.
      checkServerResponseKeys(data, profileObjectExpectedKeys);
      return data;
    })
    .catch((error) => {
      console.log(
        `При получении данных профиля возникла ошибка. Ошибка: ${error.message}`
      );
      return null;
    });
}

async function uploadUserProfileToServer(name, about) {
  const updateProfileApiPAth = `https://nomoreparties.co/v1/wbf-cohort-6/users/me`;
  const options = {
    method: "PATCH",
    headers: {
      authorization: authorizationKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  };
  try {
    const response = await fetchData(updateProfileApiPAth, options);
    checkServerResponseKeys(response, profileObjectExpectedKeys);
    await updateProfileFromServer();
  } catch (error) {
    console.log(
      `Ошибка загрузки данных о профиле на сервер. Ошибка: ${error.message}`
    );
  }
}

async function uploadNewAvatar(avatarUrl) {
  const uploadNewAvatarApiUrl =
    "https://nomoreparties.co/v1/wbf-cohort-6/users/me/avatar";
  const options = {
    method: "PATCH",
    headers: {
      authorization: authorizationKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  };
  try {
    return await fetchData(uploadNewAvatarApiUrl, options);
  } catch (error) {
    console.log(`Не удалось изменить аватар. Ошибка: ${error.message}`);
  }
}

async function getCardsFromServer() {
  const getCardsFromServerUrl =
    "https://nomoreparties.co/v1/wbf-cohort-6/cards";
  const options = {
    method: "GET",
    headers: {
      authorization: authorizationKey,
    },
  };
  return await fetchData(getCardsFromServerUrl, options);
}
async function uploadCardOnServer(name, link) {
  const uploadCardOnServerApiUrl = `https://nomoreparties.co/v1/wbf-cohort-6/cards `;
  const options = {
    method: "POST",
    headers: {
      authorization: authorizationKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  };
  const response = await fetchData(uploadCardOnServerApiUrl, options);
  try {
    checkServerResponseKeys(response, cardObjectExpectedKeys);
    return response;
  } catch (error) {
    console.log(`Не удалось создать карточку. Ошибка: ${error.message}`);
    return null;
  }
}
async function deleteCardFromServer(cardId) {
  const deleteCardApiURL = `https://nomoreparties.co/v1/wbf-cohort-6/cards/${cardId}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: authorizationKey,
    },
  };
  return await fetchData(deleteCardApiURL, options);
}

async function setLikeOnCard(cardId) {
  const deleteCardApiURL = `https://nomoreparties.co/v1/wbf-cohort-6/cards/likes/${cardId}`;
  const options = {
    method: "PUT",
    headers: {
      authorization: authorizationKey,
    },
  };
  return await fetchData(deleteCardApiURL, options);
}
async function removeLikeFromCard(cardId) {
  const deleteCardApiURL = `https://nomoreparties.co/v1/wbf-cohort-6/cards/likes/${cardId}`;
  const options = {
    method: "DELETE",
    headers: {
      authorization: authorizationKey,
    },
  };
  return await fetchData(deleteCardApiURL, options);
}
export {
  getProfileDataFromServer,
  uploadUserProfileToServer,
  getCardsFromServer,
  uploadCardOnServer,
  deleteCardFromServer,
  uploadNewAvatar,
  setLikeOnCard,
  removeLikeFromCard,
};
