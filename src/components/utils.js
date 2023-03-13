"use strict";
/**
 * Создает новый элемент из шаблона, вставляет его в документ и возвращает на него ссылку.
 * @param {string} templateSelectorQuery - Селектор шаблона
 * @param {string} insertLocationQuery - Селектор элемента, относительно которого будет происходить вставка нового элемента в документ
 * @param {string} insertionMethod - Метод вставки (append, prepend).
 * @returns {HTMLElement} Указатель на новый элемент.
 */
function createNewElementFromTemplate(
  templateSelectorQuery,
  insertLocationQuery,
  insertionMethod
) {
  const elementTemplate = document.querySelector(templateSelectorQuery).content;
  const elementClone = elementTemplate.cloneNode(true);
  const locationToInsert = document.querySelector(insertLocationQuery);
  let pointerToNewElement;
  switch (insertionMethod) {
    case "append":
      locationToInsert.append(elementClone);
      pointerToNewElement = locationToInsert.lastElementChild;
      break;
    case "prepend":
      locationToInsert.prepend(elementClone);
      pointerToNewElement = locationToInsert.firstElementChild;
      break;
  }
  return pointerToNewElement;
}

export { createNewElementFromTemplate };
