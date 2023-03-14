"use strict";
const myHeaders = new Headers();
myHeaders.append("authorization", "99d97c75-629e-46fe-8490-24ad8926f786");

const getRequestOptions = {
  method: "get",
  headers: myHeaders,
};

function getUserInfo() {
  fetch(
    "https://nomoreparties.co/v1/wbf-cohort-6/users/me",
    getRequestOptions
  ).then((response) => console.log(response.json()));
}
