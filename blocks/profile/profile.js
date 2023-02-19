"use strict";

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
