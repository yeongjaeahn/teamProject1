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
    <div class="product" data-type="${item[i].category}">
      <div class="product-info">
          <a href="/item/${item[i]._id}">
            <img src="${item[i].image}" alt="" />
          </a>
          <p class="name"><div class="product-info-p">${item[i].name}</div></p>
          <p class="price"><div class="product-info-p">${item[i].price}</div></p>
          <div class="product-info-p"><button class="wish">찜하기</button></div>
      </div>
    </div>
    `;
  }
  itemList.innerHTML = html;

  let wish = document.querySelectorAll(".wish");
  for (let i = 0; i < wish.length; i++) {
    let wish = document.querySelectorAll(".wish")[i];
    wish.addEventListener("click", function (e) {
      let price = e.target.previousElementSibling.innerText;
      let name =
        e.target.previousElementSibling.previousElementSibling.innerText;
      let sumnail =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.firstElementChild.src;
      if (localStorage.getItem("name") != null) {
        let takeName = JSON.parse(localStorage.name);
        let takePrice = JSON.parse(localStorage.price);
        let takeImg = JSON.parse(localStorage.img);
        takeName.push(name);
        takePrice.push(price);
        takeImg.push(sumnail);
        localStorage.setItem("name", JSON.stringify(takeName));
        localStorage.setItem("price", JSON.stringify(takePrice));
        localStorage.setItem("img", JSON.stringify(takeImg));
      } else {
        localStorage.setItem("name", JSON.stringify([name]));
        localStorage.setItem("price", JSON.stringify([price]));
        localStorage.setItem("img", JSON.stringify([sumnail]));
      }
    });
  }

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
