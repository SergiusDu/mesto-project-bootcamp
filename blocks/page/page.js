"use strict";

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
