// ----------------------------------
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
    
    <div class="product-info"">
      <div data-type=" ${item[i].category}" href=#>${item[i].category}</div>
      <a href="/item/${item[i]._id}"> <img src="img/b6ce11f84cd989d835461e5736a5e503.jpg" alt="" /></a>
      <p class="name">${item[i].name}</p>
      <p class="price">${item[i].price}</p>
      <button class="wish">찜하기<button>
    </div>
    
  </div>
  
    `;
  }

  itemList.innerHTML = html;

  // 탭 필터 메뉴
  const itemTab = document.querySelector(".item-tab");
  const items = document.querySelector(".item-list");
  const product = document.querySelectorAll(".product");

  itemTab.addEventListener("click", (e) => {
    const filter =
      e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
      return;
    }
    product.forEach((product) => {
      if (filter === "*" || filter === product.dataset.type) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
}

getData();
