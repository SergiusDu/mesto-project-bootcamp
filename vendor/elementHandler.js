"use strict";
// Эту "библиотеку" написал я собственноручно, дабы стандартизировать некоторые методы, которые буду использовать
// в дальнейшем.

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

class ScrollHandler {
  /**
   * Блокирует Скрол
   **/
  static disableScroll() {
    document.body.style.overflow = "hidden";
  }
  /**
   * Разблокирует Скрол
   **/
  static enableScroll() {
    document.body.style.overflow = "auto";
  }
}
