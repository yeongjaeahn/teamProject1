import { addToDB, putToDB } from "/indexed-db.js";
import { createNavbar } from "/navbar.js";

addAllElements();

async function addAllElements() {
  createNavbar();
}
const itemDetailName = document.querySelector(".name");
const itemDetailPrice = document.querySelector(".price");
const itemDetailImage = document.querySelector(".image");
const purchaseButton = document.querySelector("#purchaseButton");
const baketBtn = document.querySelector("#baket");

// baketBtn.addEventListener("click", function () {
//   if (confirm("카트에 담겼습니다 카트로 넘어가시겠습니까?")) {
//     window.location.href = "/cart";
//   }

//   localStorage.setItem();
// });

let item;
const id = window.location.pathname;
const Id = id.slice(6, id.length - 1);
async function getDetailData() {
  try {
    let response = await fetch(`/api/item/${Id}`);
    item = await response.json();

    const { name, shortName, price, category, image } = item;
    console.log(item);

    itemDetailName.innerHTML = name;
    itemDetailPrice.innerHTML = price.toLocaleString("en");
    itemDetailImage.src = image;

    baketBtn.addEventListener("click", async () => {
      try {
        await insertDB(item);

        alert("장바구니에 추가되었습니다.");
      } catch (err) {
        // Key already exists 에러면 아래와 같이 alert함
        if (err.message.includes("Key")) {
          alert("이미 장바구니에 추가되어 있습니다.");
        }
        console.log(err);
      }
    });

    purchaseButton.addEventListener("click", async () => {
      try {
        await insertDB(item);
        window.location.href = "/order";
      } catch (err) {
        console.log(err);

        window.location.href = "/order";
      }
    });
  } catch (err) {
    console.log(err);
  }
}
getDetailData();

async function insertDB(item) {
  const { _id: id, price } = item;

  await addToDB("cart", { ...item, quantity: 1 }, id);

  await putToDB("order", "summary", (data) => {
    const count = data.productsCount;
    const total = data.productsTotal;
    const ids = data.ids;
    const selectedIds = data.selectedIds;

    data.productsCount = count ? count + 1 : 1;
    data.productsTotal = total ? total + price : price;
    data.ids = ids ? [...ids, id] : [id];
    data.selectedIds = selectedIds ? [...selectedIds, id] : [id];
  });
}
