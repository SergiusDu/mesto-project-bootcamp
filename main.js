/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/utils.js


function checkServerResponseKeys(object, expectedKeysArray) {
  if (!expectedKeysArray.every((key) => object.hasOwnProperty(key))) {
    throw new ReferenceError(
      `Объект ${object} не содержит одного или более свойств из списка ${expectedKeysArray}`
    );
  }
}



;// CONCATENATED MODULE: ./src/components/card.js







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



;// CONCATENATED MODULE: ./src/components/validate.js


const hasInvalidInput = function (inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = function (
  inputList,
  buttonElement,
  inactiveButtonClass
) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
const showError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};
const hideError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = function (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (inputElement.validity.valid) {
    hideError(
      formElement,
      inputElement,
      inputErrorClass,
      inputErrorClass,
      errorClass
    );
  } else {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  }
};

const setEventListeners = function (
  formElement,
  inputSelector,
  buttonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(buttonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (evt) {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
const enableValidation = function (configObject) {
  const forms = document.querySelectorAll(configObject.formSelector);
  forms.forEach((formElement) => {
    setEventListeners(
      formElement,
      configObject.inputSelector,
      configObject.submitButtonSelector,
      configObject.inactiveButtonClass,
      configObject.inputErrorClass,
      configObject.errorClass
    );
  });
};



;// CONCATENATED MODULE: ./src/components/modal.js






const showImagePopUp = document.querySelector(".popup_for-image");
const showPopUpImage = showImagePopUp.querySelector(".popup__image");
const showPopUpImageCaption = showImagePopUp.querySelector(
  ".popup__image-caption"
);

function resetPopUp(popUp) {
  const popupInputs = popUp.querySelectorAll(".popup__input");
  const popUpForm = popUp.querySelector(".popup__form");
  popUpForm.reset();
  popupInputs.forEach((inputElement) => {
    inputElement.classList.remove("popup__input_type_error");
  });
  const popupErrors = popUp.querySelectorAll(".popup__error");
  popupErrors.forEach((errorElement) => {
    errorElement.classList.remove(".popup__error_visible");
    errorElement.textContent = "";
  });
  const submitButton = popUp.querySelector(".popup__button");
  toggleButtonState(popupInputs, submitButton, "popup__button_disabled");
}

function openPopUp(popUp) {
  popUp.classList.remove("popup_state_closed");
  popUp.classList.add("popup_state_opened");
  window.addEventListener("keydown", handleEscapeKeyEvent);
}
function closePopUp(popUp) {
  popUp.classList.add("popup_state_closed");
  popUp.classList.remove("popup_state_opened");
  window.removeEventListener("keydown", handleEscapeKeyEvent);
}
async function uploadProfileData(profileObject) {
  try {
    return await uploadUserProfileToServer(
      profileObject.name,
      profileObject.about
    );
  } catch (error) {
    console.log(
      `Ошибка обновления информации профиля. Ошибка: ${error.message}`
    );
  }
}

function showLoadingAnimationOnButton(buttonElement) {
  buttonElement.classList.add("popup__button_loading");
  buttonElement.disabled = true;
}
function hideLoadingAnimationOnButton(buttonElement) {
  buttonElement.classList.remove("popup__button_loading");
  buttonElement.disabled = false;
}

const editProfilePopUp = document.querySelector(".popup_for-editing-profile");
const popUpNameInput = editProfilePopUp.querySelector(".popup__name-input");
const popUpAboutInput = editProfilePopUp.querySelector(
  ".popup__profession-input"
);
function setNameAndAboutToEditPopUp(name, about) {
  popUpNameInput.value = name;
  popUpAboutInput.value = about;
}
const handleEditProfilePopUp = function () {
  const saveButton = editProfilePopUp.querySelector(".popup__button");
  const editProfilePopUpForm = editProfilePopUp.querySelector(".popup__form");
  editProfilePopUpForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const inputList = [popUpNameInput, popUpAboutInput];
    if (!hasInvalidInput(inputList)) {
      showLoadingAnimationOnButton(saveButton);
      try {
        const profileDataFromServer = await uploadProfileData({
          name: popUpNameInput.value,
          about: popUpAboutInput.value,
        });
        updateProfileInfoOnPage(profileDataFromServer);
        closePopUp(editProfilePopUp);
      } catch (error) {
        console.log(
          `Не удалось обновить данные профиля. Ошибка: ${error.message}`
        );
      } finally {
        hideLoadingAnimationOnButton(saveButton);
      }
    }
  });
};

const changeImagePopUpData = function (imageURL, imageCaption) {
  showPopUpImage.src = imageURL;
  showPopUpImage.alt = imageCaption;
  showPopUpImageCaption.textContent = imageCaption;
};
const addNewPlacePopUp = document.querySelector(".popup_for-adding-place");
const handleNewPlacePopUp = function () {
  const addNewPlaceBtn = addNewPlacePopUp.querySelector(".popup__button");
  const placeName = addNewPlacePopUp.querySelector(".popup__place-name-input");
  const placeUrl = addNewPlacePopUp.querySelector(".popup__place-url-input");
  const newPlacePopUpForm = addNewPlacePopUp.querySelector(".popup__form");
  newPlacePopUpForm.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    showLoadingAnimationOnButton(addNewPlaceBtn);
    try {
      const cardFromServer = await uploadCardOnServer(
        placeName.value,
        placeUrl.value
      );
      createCard(cardFromServer);
      closePopUp(addNewPlacePopUp);
    } catch (error) {
      console.log(`Ошибка создания карточки. ${error.message}`);
    } finally {
      hideLoadingAnimationOnButton(addNewPlaceBtn);
    }
  });
};

const editAvatarPopUp = document.querySelector(
  ".popup_for-updating-profile-avatar"
);
function handleEditAvatarPopUp() {
  const editAvatarPopUpForm = editAvatarPopUp.querySelector(
    ".popup__form-for-updating-profile-avatar"
  );
  const avatarUrlInput = editAvatarPopUp.querySelector(
    ".popup__avatar-link-input"
  );
  const submitButton = editAvatarPopUpForm.querySelector(".popup__button");
  async function handelSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      showLoadingAnimationOnButton(submitButton);
      const profileFromServer = await uploadNewAvatar(avatarUrlInput.value);
      updateProfileInfoOnPage(profileFromServer);
      closePopUp(editAvatarPopUp);
    } catch (error) {
      console.log(
        `Не удалось обновить аватар пользователя. Ошибка: ${error.message}`
      );
    } finally {
      hideLoadingAnimationOnButton(submitButton);
    }
  }
  editAvatarPopUpForm.addEventListener("submit", handelSubmit);
}
function handleCloseButtonsAndPopUpOverlay() {
  const closeButtons = document.querySelectorAll(".popup__close-btn");
  closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        closePopUp(popup);
      }
    });
    button.addEventListener("click", () => closePopUp(popup));
  });
}

function handleEscapeKeyEvent(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_state_opened");
    closePopUp(openedPopUp);
  }
}



;// CONCATENATED MODULE: ./src/components/profile.js



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



;// CONCATENATED MODULE: ./src/components/api.js




const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "99d97c75-629e-46fe-8490-24ad8926f786",
    "Content-Type": "application/json",
  },
};
const profileObjectExpectedKeys = (/* unused pure expression or super */ null && (["name", "about", "avatar", "_id", "cohort"]));

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


;// CONCATENATED MODULE: ./src/index.js









async function handleIndex() {
  try {
    try {
      await updateProfileFromServer();
    } catch (error) {
      console.log(
        `Не удалось обновить профиль пользователя. Ошибка: ${error.message}`
      );
    }
    handleCloseButtonsAndPopUpOverlay();
    handleEditProfilePopUp();
    handleProfileBlock();
    handleEditAvatarPopUp();
    handleNewPlacePopUp();
    enableValidation({
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    });
    createCardsFromList(await getCardsFromServer());
  } catch (error) {
    console.log(`Ошибка на странице: ${error.message}`);
  }
}

handleIndex();

/******/ })()
;
//# sourceMappingURL=main.js.map