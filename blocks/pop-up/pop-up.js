"use strict";
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
  saveNameAndProfession(e) {
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
