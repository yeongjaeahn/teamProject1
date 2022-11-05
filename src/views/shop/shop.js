// load item list

let itemList = document.querySelector(".item-list");

insertProductElement();

async function insertProductElement() {
  const res = await fetch(`localhost:5000/itemlist`);
  const products = await res.json();

  products.forEach((product) => {
    const title = product.title;
    const price = product.price;
    const image = product.img;

    itemList.insertAdjacentHTML(
      "beforeend",
      `
    <div class="product">
            <div class="sumnail">
              <img src="${image}" alt="clothes-image" />
            </div>
            <div class="product-info">
              <p class="name">${title}</p>
              <p class="price">${price} 원</p>
            </div>
    `
    );
  });
}
