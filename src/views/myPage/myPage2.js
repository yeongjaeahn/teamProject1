//추가내용

import * as Api from "/api.js";

const emailInput = document.querySelector("#input-text-email");
const nameInput = document.querySelector("#input-text-name");
const phoneNumberInput = document.querySelector("#input-text-number");
const postcodeInput = document.querySelector("#sample6_postcode");
const address1Input = document.querySelector("#sample6_address");
const address2Input = document.querySelector("#sample6_detailAddress");
const saveButton = document.querySelector("#save");
const quitButton = document.querySelector("#quit");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  saveButton.addEventListener("click", save);
}

const Id = window.location.pathname;
console.log(Id);
const _Id = Id.slice(11, Id.length - 1);
console.log(_Id);

emailInput.value = _Id;

async function save(e) {
  e.preventDefault();

  const email = emailInput.value;
  const name = nameInput.value;
  const phoneNumber = phoneNumberInput.value;
  const postalCode = postcodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;

  try {
    const address = { postalCode, address1, address2 };
    const data = { email, name, phoneNumber, address };
    const result = await Api.patch(`/api/users/${_Id}`, data);
    console.log(result);
    alert("정상적으로 수정되었습니다.");
  } catch (err) {
    // console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
