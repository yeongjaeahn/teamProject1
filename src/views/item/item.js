let baketBtn = document.querySelector("#baket");
const itemDetailName = document.querySelector(".name");
const itemDetailPrice = document.querySelector(".price");

baketBtn.addEventListener("click", function () {
  if (confirm("장바구니로 넘어가시겠습니까?")) {
    console.log("dd");
    // window.location = '/cart'
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

    console.log(itemName, itemPrice);

    itemDetailName.innerHTML = itemName;
    itemDetailPrice.innerHTML = itemPrice;
  } catch (err) {
    console.log(err);
  }
}
getDetailData();
