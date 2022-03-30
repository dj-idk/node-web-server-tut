console.log("Starting");

fetch("http://localhost:3000/weather?address=!").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.location);
      console.log(data.forecast);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading weather...";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error.message;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    });
  });
});
