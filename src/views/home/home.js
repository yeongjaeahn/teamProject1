// navibar 스크롤시 색상변경

window.addEventListener("scroll", function () {
  // console.log(window.scrollY);
});
var $header = $("header"); //헤더를 변수에 넣기
var $header1 = $("header a"); //헤더 글씨
var $page = $(".section3"); //색상이 변할 부분
var $window = $(window);
var pageOffsetTop = $page.offset().top; //색상 변할 부분의 top값 구하기

$window.resize(function () {
  //반응형을 대비하여 리사이즈시 top값을 다시 계산
  pageOffsetTop = $page.offset().top;
});
$window.on("scroll", function () {
  //스크롤시
  var scrolled = $window.scrollTop() >= pageOffsetTop - 1200; //스크롤된 상태; true or false
  $header.toggleClass("down", scrolled); //클래스 토글
  $header1.toggleClass("down1", scrolled);
});

// section 2 상품 목록 가져오기
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
  for (let i = 0; i < 9; i++) {
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

// sec
