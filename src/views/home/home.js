import { createNavbar } from "../navbar.js";

addAllElements();

async function addAllElements() {
  createNavbar();
}

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
  for (let i = 0; i < item.length; i++) {
    html += `
          <div class="product">
            <div class="product-info"">
              <img src="img/b6ce11f84cd989d835461e5736a5e503.jpg" alt="" />
              <p class="name">${item[i].name}</p>
              <p class="price">${item[i].price}</p>
              <button class="wish">찜하기<button>
            </div>
          </div>
        `;
  }
  // document.querySelector("#first-name").innerHTML = itemName;
  // document.querySelector(".price").innerHTML = itemPrice;
  itemList.innerHTML = html;

  // section2 찜하기 버튼 클릭시  로컬스토리지에 해당 클릭아이템 저장

  let wish = document.querySelectorAll(".wish");
  for (let i = 0; i < wish.length; i++) {
    let wish = document.querySelectorAll(".wish")[i];
    wish.addEventListener("click", function (e) {
      let price = e.target.previousElementSibling.innerText;
      let name =
        e.target.previousElementSibling.previousElementSibling.innerText;
      let sumnail =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.src;
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
}

getData();
//  로그인 상태변경에 따른 나비바 표현

// if 문으로 로그인 여부에 따라 메뉴 li - 로그아웃 , 마이페이지 , 관리자 로그인 hidden 클래스 제거 , 로그인 은 hidden 클래스 부여
