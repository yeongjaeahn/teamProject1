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
      <div class="product-info">
        <div>${item[i].category}</div>
          <a href="/item/${item[i]._id}">
            <img src="${item[i].image}" alt="" />
          </a>
          <p class="name">${item[i].name}</p>
          <p class="price">${item[i].price}</p>
        <button class="wish">찜하기</button>
      </div>
    </div>
    `;
  }

  itemList.innerHTML = html;
}

getData();
