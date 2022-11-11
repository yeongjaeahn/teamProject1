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
  var scrolled = $window.scrollTop() >= pageOffsetTop - 2000; //스크롤된 상태; true or false
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
              <div class="product-wrap"">
                <a href="/item/${item[i]._id}">
                  <img src="${item[i].image}" alt="상품이미지" />
                </a>
              </div>
              <p class="name">${item[i].name}</p>
              <p class="price">${item[i].price.toLocaleString("en")}</p> 
              <button class="wish">찜<button>
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
      // 찜하기 이모션
      wish.classList.toggle("toggle");
      // --------

      let price = e.target.previousElementSibling.innerText;
      let name =
        e.target.previousElementSibling.previousElementSibling.innerText;
      let sumnail =
        e.target.previousElementSibling.previousElementSibling
          .previousElementSibling.firstElementChild.firstElementChild.src;
      if (localStorage.getItem("name") != null) {
        let takeName = JSON.parse(localStorage.name);
        let takePrice = JSON.parse(localStorage.price);
        let takeImg = JSON.parse(localStorage.img);
        takeName.push(name);
        takePrice.push(price);
        takeImg.push(sumnail);
        localStorage.setItem("price", JSON.stringify(takePrice));
        localStorage.setItem("name", JSON.stringify(takeName));
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

// -----------------디자인 범위

let text1 = document.querySelector(".content-box > div");
let img1 = document.querySelector(".img-box img");
let observer = new IntersectionObserver((e) => {
  console.log(e);

  e.forEach((박스) => {
    if (박스.isIntersecting) {
      박스.target.style.opacity = 1;
    } else {
      박스.target.style.opacity = 0;
    }
  });
});

observer.observe(text1);
observer.observe(img1);

// ------------두번쨰 setion 7
let text2 = document.querySelector(".content-box1 .text2");
let img2 = document.querySelector(".img-box1 img");
let observer1 = new IntersectionObserver((e) => {
  console.log(e);

  e.forEach((박스) => {
    if (박스.isIntersecting) {
      박스.target.style.opacity = 1;
    } else {
      박스.target.style.opacity = 0;
    }
  });
});

observer1.observe(text2);
observer1.observe(img2);

// --------3번쨰 setion 7
let text3 = document.querySelector(".content-box2 .text3");
let text4 = document.querySelector(".content-box2 .text4");
let img3 = document.querySelector(".img-box2 ");
let observer2 = new IntersectionObserver((e) => {
  console.log(e);

  e.forEach((박스) => {
    if (박스.isIntersecting) {
      박스.target.style.opacity = 1;
    } else {
      박스.target.style.opacity = 0;
    }
  });
});

observer2.observe(text3);
observer2.observe(text4);
observer2.observe(img3);

// -----------section 3 타이머
const title = document.querySelector(".d-day");

const getDDay = () => {
  // D-Day 날짜 지정
  const setDate = new Date("2022-11-25T00:00:00+0900");
  // D-day 날짜의 연,월,일 구하기
  const setDateYear = setDate.getFullYear();
  // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();

  // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
  const now = new Date();

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
  const distance = setDate.getTime() - now.getTime();

  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  // 밀리초 값이기 때문에 1000을 곱한다.
  // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
  // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // D-Day 날짜를 가져오고,
  // ${setDateYear}년 ${setDateMonth} ${setDateDay}일까지
  // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
  title.innerText = `${day}D ${hours < 10 ? `0${hours}` : hours}H ${
    minutes < 10 ? `0${minutes}` : minutes
  }M ${seconds < 10 ? `0${seconds}` : seconds}S`;
};

const init = () => {
  // init 함수 생성해서 getDDay함수 호출하고,
  getDDay();
  // setInterval 메서드에서 getDDay함수를 1초(1000밀리초)마다 호출한다.
  setInterval(getDDay, 1000);
};

init();
