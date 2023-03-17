"use strict";

import { updateProfileFromServer } from "./profile";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "99d97c75-629e-46fe-8490-24ad8926f786",
    "Content-Type": "application/json",
  },
};
const profileObjectExpectedKeys = ["name", "about", "avatar", "_id", "cohort"];

async function fetchData(requestUrl, options) {
  try {
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      throw new Error("HTTP error: ${response.status}");
    } else {
      return await response.json();
    }
  } catch (error) {
    const errorMessage = `${error.name}: ${error.message}\\nСтек вызовов: ${error.stack}\\nФайл: ${error.fileName}\\nСтрока: ${error.lineNumber}\\nКолонка: ${error.columnNumber}\\nОписание: ${error.description}`;
    if (error instanceof TypeError) {
      throw new TypeError(`Type Error: ${errorMessage}. `);
    } else if (error.name === "AbortError") {
      throw new Error(`Запрос был прерван: ${errorMessage}`);
    } else if (error.message.startsWith("HTTP error")) {
      throw new Error(`Ошибка HTTP: ${errorMessage}`);
    } else {
      throw new Error(`Неизвестная ошибка: ${errorMessage}`);
    }
  }
}
async function getProfileDataFromServer() {
  const getProfileApiPAth = `${config.baseUrl}/users/me`;
  const options = {
    headers: config.headers,
  };
  return await fetchData(getProfileApiPAth, options);
}

async function uploadUserProfileToServer(name, about) {
  const updateProfileApiPAth = `${config.baseUrl}/users/me`;
  const options = {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  };
  try {
    return await fetchData(updateProfileApiPAth, options);
  } catch (error) {
    const errorMessage = `${error.name}: ${error.message}\\nСтек вызовов: ${error.stack}\\nФайл: ${error.fileName}\\nСтрока: ${error.lineNumber}\\nКолонка: ${error.columnNumber}\\nОписание: ${error.description}`;
    throw new Error(
      `Ошибка загрузки данных о профиле на сервер. \n` + errorMessage
    );
  }
}

async function uploadNewAvatar(avatarUrl) {
  const uploadNewAvatarApiUrl = `${config.baseUrl}/users/me/avatar`;
  const options = {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  };
  try {
    return await fetchData(uploadNewAvatarApiUrl, options);
  } catch (error) {
    const errorMessage = `${error.name}: ${error.message}\\nСтек вызовов: ${error.stack}\\nФайл: ${error.fileName}\\nСтрока: ${error.lineNumber}\\nКолонка: ${error.columnNumber}\\nОписание: ${error.description}`;
    throw new Error(`Не удалось изменить аватар. \n` + errorMessage);
  }
}

async function getCardsFromServer() {
  const getCardsFromServerUrl = `${config.baseUrl}/cards`;
  const options = Object.assign({ method: "GET" }, config);
  return await fetchData(getCardsFromServerUrl, options);
}
async function uploadCardOnServer(name, link) {
  const uploadCardOnServerApiUrl = `${config.baseUrl}/cards`;
  const options = {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  };
  const response = await fetchData(uploadCardOnServerApiUrl, options);
  try {
    return response;
  } catch (error) {
    const errorMessage = `${error.name}: ${error.message}\\nСтек вызовов: ${error.stack}\\nФайл: ${error.fileName}\\nСтрока: ${error.lineNumber}\\nКолонка: ${error.columnNumber}\\nОписание: ${error.description}`;
    throw new Error(`Не удалось создать карточку. \n` + errorMessage);
  }
}
async function deleteCardFromServer(cardId) {
  const deleteCardApiURL = `${config.baseUrl}/cards/${cardId}`;
  const options = {
    method: "DELETE",
    headers: config.headers,
  };
  return await fetchData(deleteCardApiURL, options);
}

async function setLikeOnCard(cardId) {
  const deleteCardApiURL = `${config.baseUrl}/cards/likes/${cardId}`;
  const options = {
    method: "PUT",
    headers: config.headers,
  };
  return await fetchData(deleteCardApiURL, options);
}
async function removeLikeFromCard(cardId) {
  const deleteCardApiURL = `${config.baseUrl}/cards/likes/${cardId}`;
  const options = {
    method: "DELETE",
    headers: config.headers,
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
