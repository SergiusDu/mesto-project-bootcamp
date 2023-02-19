"use strict";
/**
 * Класс для облегчения работы с элементами.
 **/
class ElementHandler {
  /**
   * Получить первый элемент, соответствующий указанному селектору.
   *
   * @param {string} selector - CSS-селектор элемента.
   * @param {Element} [context=document] - Родительский элемент, в котором нужно искать.
   * @throws {Error} Если элемент не найден.
   *
   * @returns {Element} Найденный элемент.
   */
  static getByQuerySelector(selector, context = document) {
    const block = context.querySelector(selector);
    if (!context) {
      console.error(`Контекстный элемент ${context} не найден.`);
      throw new Error(`Контекстный элемент ${context} не найден.`);
    }
    if (!block) {
      console.error(`Элемент ${selector} не найден в контексте ${context}.`);
      throw new Error(`Элемент ${selector} не найден.`);
    } else {
      return block;
    }
  }
}

/**
 * Класс блока Page. Используется для блокировки скрола.
 **/
class Page {
  constructor() {
    this.node = document.querySelector(".page");
  }
  enableScroll() {
    this.node.classList.remove("page_block-scroll");
  }
  disableScroll() {
    this.node.classList.add("page_block-scroll");
  }
}

class PopUp {
  /**
   * Класс описывающий логику работы блока pop-up.
   * @param {string} selector - CSS-селектор блока.
   */
  constructor(selector = ".pop-up") {
    // Initialization
    this.node = ElementHandler.getByQuerySelector(".pop-up");
    this.relatedProfile = undefined;
    this.closeBtn = ElementHandler.getByQuerySelector(
      ".pop-up__close-btn",
      this.node
    );
    this.inputName = ElementHandler.getByQuerySelector(
      '.pop-up__text-input[name="name"]',
      this.node
    );
    this.inputProfession = ElementHandler.getByQuerySelector(
      '.pop-up__text-input[name="profession"]',
      this.node
    );
    this.saveBtn = ElementHandler.getByQuerySelector(
      ".pop-up__save-btn",
      this.node
    );
    // Setting Event Listeners
    this.saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.saveNameAndProfession(this);
    });
    this.closeBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        this.hidePopUp();
      },
      false
    );
  }
  // Methods
  /**
   * Скрывает блок для пользователя.
   * Разблокирует скрол страницы
   * **/
  hidePopUp() {
    IndexPage.enableScroll();
    this.node.classList.remove("pop-up_opened");
  }
  /**
   * Скрывает блок для пользователя.
   * Блокирует скрол страницы.
   * **/
  showPopUp() {
    IndexPage.disableScroll();
    this.node.classList.add("pop-up_opened");
  }
  /**
   * Сохраняет введенные данные об имени и профессии в html блока.
   * **/
  saveNameAndProfession() {
    if (!this.relatedProfile) {
      throw new Error("Связанный профиль не найден");
    }
    this.relatedProfile.profileName.textContent = this.inputName.value;
    this.relatedProfile.profileProfession.textContent =
      this.inputProfession.value;
    this.hidePopUp();
  }
  /**
   * Загружает первоначальные данные из html страницы в блок pop-up
   * **/
  loadNameAndProfessionFromProfile() {
    this.inputName.value = this.relatedProfile.profileName.textContent;
    this.inputProfession.value =
      this.relatedProfile.profileProfession.textContent;
  }
}

/**
 * Класс блока profile. На данный момент вся логика работы блока обусловлена взаимодействием с блоком pop-up.
 * @param {string} popUp - CSS селектор связанного блока pop-up.
 **/
class Profile {
  constructor(popUp) {
    this.popUpBlock = popUp;
    this.node = ElementHandler.getByQuerySelector(".profile");
    this.profileName = ElementHandler.getByQuerySelector(
      ".profile__name",
      this.node
    );
    this.profileProfession = ElementHandler.getByQuerySelector(
      ".profile__profession",
      this.node
    );
    this.editBtn = ElementHandler.getByQuerySelector(
      ".profile__edit-btn",
      this.node
    );

    this.connectWithPopUp();
    this.popUpBlock.loadNameAndProfessionFromProfile();
    this.editBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        this.popUpBlock.showPopUp();
      },
      false
    );
  }

  /**
   * Добавляет связь из блока pop-up с текущим блоком
   **/
  connectWithPopUp() {
    this.popUpBlock.relatedProfile = this;
  }
}
class likeBtn {
  constructor(node) {
    const CHECKEDCLASS = "gallery__card-like-btn_checked";
    this.node = node;
    this.node.addEventListener(
      "click",
      () => {
        const classList = this.node.classList;
        if (!classList.contains(CHECKEDCLASS)) {
          classList.add(CHECKEDCLASS);
        } else {
          classList.remove(CHECKEDCLASS);
        }
      },
      false
    );
  }
}
const IndexPage = new Page();
const popUp = new PopUp(".pop-up");
const profile = new Profile(popUp);

const likeBtns = Array.from(
  document.querySelectorAll(".gallery__card-like-btn")
).map((element) => {
  new likeBtn(element);
});
