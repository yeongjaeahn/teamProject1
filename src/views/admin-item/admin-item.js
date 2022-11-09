import * as Api from "/api.js";
import { addImageToS3 } from "/aws-s3.js";

const nameInput = document.querySelector("#nameInput");
const shortNameInput = document.querySelector("#shortNameInput");
const priceInput = document.querySelector("#priceInput");
const categoryInput = document.querySelector("#categoryInput");
const imageEl = document.querySelector("#imageInput");
const thumbnailEl = document.querySelector("#thumbnailInput");
const submitButton = document.querySelector("#submitButton");
// const registerItemForm = document.querySelector("#registerItemForm");

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
  const price = parseInt(priceInput.value);
  const category = categoryInput.value;
  const image = imageEl.files[0];
  const thumbnail = thumbnailEl.files[0];

  if (image.size > 3e6) {
    return alert("사진은 최대 2.5MB 크기까지 업로드 가능합니다.");
  }

  // S3에 이미지가 속할 폴더 이름은 카테고리명으로 함.
  const categoryName = category;

  try {
    // await Api.post(
    //   "/api/register-item",
    //   upload.single("image"),
    //   async (res, req) => {
    //     const imgFile = req.file;
    //     console.log(imgFile);
    //   }
    // );
    const imageKey = await addImageToS3(imageEl, categoryName);
    const data = { name, shortName, price, category, imageKey };

    await Api.post("/api/register-item", data);

    alert(`정상적으로 물품이 등록되었습니다.`);

    // window.location = "/api/itemlist";
    // registerItemForm.reset();
  } catch (err) {
    console.log(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
