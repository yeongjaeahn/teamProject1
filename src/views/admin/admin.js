import * as Api from "/api.js";

const nameInput = document.querySelector("#nameInput");
const shortNameInput = document.querySelector("#shortNameInput");
const priceInput = document.querySelector("#priceInput");
const imageEl = document.querySelector("#imageInput");
const thumbnailEl = document.querySelector("#thumbnailInput");
const submitButton = document.querySelector("#submitButton");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const name = nameInput.value;
  const shortName = shortNameInput.value;
  const price = priceInput.value;
  const image = imageEl.value;
  const thumbnail = thumbnailEl.value;

  // 여기서부터 작업 시작해야함.
  console.log(image);
  console.log(thumbnail);

  console.log(name + " " + shortName + " " + price + " " + thumbnail); //  console
}
