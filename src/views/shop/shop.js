let item;
let html = "";
async function getData() {
  try {
    let response = await fetch("/api/itemlist");
    item = await response.json();
    console.log(item);
  } catch (err) {
    console.log(err);
  }

  let itemList = document.querySelector(".item-list");
  for (let i = 0; i < item.length; i++) {
    html += `
      <div class="product">
        <div class="sumnail">
        
          <img src="img/b6ce11f84cd989d835461e5736a5e503.jpg" alt="" />
        </div>
        <div class="product-info">
          <p class="name">${item[i].name}</p>
          <p class="price">${item[i].price}</p>
        </div>
      </div>
    `;
  }

  // document.querySelector("#first-name").innerHTML = itemName;
  // document.querySelector(".price").innerHTML = itemPrice;
  itemList.innerHTML = html;
}

getData();
