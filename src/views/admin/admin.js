// import { upload } from "../../utils/multer";
import * as Api from "/api.js";

const nameInput = document.querySelector("#nameInput");
const shortNameInput = document.querySelector("#shortNameInput");
const priceInput = document.querySelector("#priceInput");
const categoryInput = document.querySelector("#categoryInput");
const imageEl = document.querySelector("#imageInput");
const thumbnailEl = document.querySelector("#thumbnailInput");
const submitButton = document.querySelector("#submitButton");
const fReader = new FileReader();

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
  const category = categoryInput.value;
  let image = imageEl.files[0];
  let thumbnail = thumbnailEl.value;

  try {
    // await Api.post(
    //   "/api/register-item",
    //   upload.single("image"),
    //   async (res, req) => {
    //     const imgFile = req.file;
    //     console.log(imgFile);
    //   }
    // );
    console.log(image);
    const data = { name, shortName, price, category, image, thumbnail };

    await Api.post("/api/register-item", data);

    alert(`정상적으로 물품이 등록되었습니다.`);

    // window.location = "/api/itemlist";
  } catch (err) {
    console.log(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
