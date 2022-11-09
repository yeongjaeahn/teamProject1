let baketBtn = document.querySelector("#baket");
const itemDetailName = document.querySelector(".name");
const itemDetailPrice = document.querySelector(".price");
const itemDetailImage = document.querySelector(".image");

baketBtn.addEventListener("click", function () {
  if (confirm("카트에 담겼습니다 카트로 넘어가시겠습니까?")) {
    window.location.href = "/cart";
  }

  localStorage.setItem();
});

let item;
let name = "";
const id = window.location.pathname;
const _id = id.slice(6, id.length - 1);
console.log(_id);
async function getDetailData() {
  try {
    let response = await fetch(`/api/item/${_id}`);
    item = await response.json();
    console.log(item);

    const itemName = item.name;
    const itemPrice = item.price;
    const itemImage = item.image;

    console.log(itemName, itemPrice);

    itemDetailName.innerHTML = itemName;
    itemDetailPrice.innerHTML = itemPrice;
    itemDetailImage.src = itemImage;
  } catch (err) {
    console.log(err);
  }
}
getDetailData();
