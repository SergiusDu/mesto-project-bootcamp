"use strict";

function checkServerResponseKeys(object, expectedKeysArray) {
  if (!expectedKeysArray.every((key) => object.hasOwnProperty(key))) {
    throw new ReferenceError(
      `Объект ${object} не содержит одного или более свойств из списка ${expectedKeysArray}`
    );
  }
}

export { checkServerResponseKeys };
