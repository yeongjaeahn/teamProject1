let basket = {
  totalCount: 0,
  totalPrice: 0,
  //체크한 장바구니 상품 비우기
  delCheckedItem: function () {
    document
      .querySelectorAll("input[name=buy]:checked")
      .forEach(function (item) {
        item.parentElement.parentElement.parentElement.remove();
      });
    //AJAX 서버 업데이트 전송

    //전송 처리 결과가 성공이면
    this.reCalc();
    this.updateUI();
  },
  //장바구니 전체 비우기
  delAllItem: function () {
    document.querySelectorAll(".row.data").forEach(function (item) {
      item.remove();
      localStorage.removeItem("name");
      localStorage.removeItem("price");
      localStorage.removeItem("img");
    });

    //전송 처리 결과가 성공이면
    this.totalCount = 0;
    this.totalPrice = 0;
    this.reCalc();
    this.updateUI();
  },
  //재계산
  reCalc: function () {
    this.totalCount = 0;
    this.totalPrice = 0;
    document.querySelectorAll(".p_num").forEach(function (item) {
      if (
        item.parentElement.parentElement.parentElement.previousElementSibling
          .firstElementChild.firstElementChild.checked == true
      ) {
        var count = parseInt(item.getAttribute("value"));
        this.totalCount += count;
        var price =
          item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute(
            "value"
          );
        this.totalPrice += count * price;
      }
    }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
  },
  //화면 업데이트
  updateUI: function () {
    document.querySelector("#sum_p_num").textContent =
      "상품갯수: " + this.totalCount.formatNumber() + "개";
    document.querySelector("#sum_p_price").textContent =
      "합계금액: " + this.totalPrice.formatNumber() + "원";
  },
  //개별 수량 변경
  changePNum: function (pos) {
    var item = document.querySelector("input[name=p_num" + pos + "]");
    var p_num = parseInt(item.getAttribute("value"));
    var newval = event.target.classList.contains("up")
      ? p_num + 1
      : event.target.classList.contains("down")
      ? p_num - 1
      : event.target.value;

    if (parseInt(newval) < 1 || parseInt(newval) > 99) {
      return false;
    }

    item.setAttribute("value", newval);
    item.value = newval;

    var price =
      item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute(
        "value"
      );
    item.parentElement.parentElement.nextElementSibling.textContent =
      (newval * price).formatNumber() + "원";

    //전송 처리 결과가 성공이면
    this.reCalc();
    this.updateUI();
  },
  checkItem: function () {
    this.reCalc();
    this.updateUI();
  },
  delItem: function () {
    event.target.parentElement.parentElement.parentElement.remove();
    this.reCalc();
    this.updateUI();
  },
};

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function () {
  if (this == 0) return 0;
  let regex = /(^[+-]?\d+)(\d{3})/;
  let nstr = this + "";
  while (regex.test(nstr)) nstr = nstr.replace(regex, "$1" + "," + "$2");
  return nstr;
};

// ----------------로컬 스토리지 데이터 반영
// html = "";

for (let i = 0; i < localStorage.length; i++) {
  let rowWrap = document.querySelector(".row-wrap");
  let name = JSON.parse(localStorage.getItem("name"));
  let price = JSON.parse(localStorage.getItem("price"));
  let image = JSON.parse(localStorage.getItem("img"));
  console.log(name[i]);
  rowWrap.insertAdjacentHTML(
    "beforeend",
    `<div class="row data">
  <div class="subdiv">
    <div class="check">
      <input
        type="checkbox"
        name="buy"
        value="260"
        checked=""
        onclick="javascript:basket.checkItem();"
      />&nbsp;
    </div>
    <div class="img"><img src="${image[i]}" width="60px"  /></div>
    <div class="pname">
      <span>${name[i]}</span>
    </div>
  </div>
  <div class="subdiv">
    <div class="basketprice">
      <input
        type="hidden"
        name="p_price"
        id="p_price1"
        class="p_price"
        value="20000"
      />${price[i]}원
    </div>
    <div class="num">
      <div class="updown">
        <input
          type="text"
          name="p_num1"
          id="p_num1"
          size="2"
          maxlength="4"
          class="p_num"
          value="2"
          onkeyup="javascript:basket.changePNum(1);"
        />
        <span onclick="javascript:basket.changePNum(1);"
          ><i class="fas fa-arrow-alt-circle-up up"></i
        ></span>
        <span onclick="javascript:basket.changePNum(1);"
          ><i class="fas fa-arrow-alt-circle-down down"></i
        ></span>
      </div>
    </div>
    <div class="sum">0 원</div>
  </div>
  <div class="subdiv">
    <div class="basketcmd">
      <a
        href="javascript:void(0)"
        class="abutton"
        onclick="javascript:basket.delItem();"
        >삭제</a
      >
    </div>
  </div>
  </div>
  `
  );
}

// let itemList = document.querySelector(".item-list");
//   for (let i = 0; i < item.length; i++) {
//     html += `
//           <div class="product">
//             <div class="product-info"">
//               <img src="img/b6ce11f84cd989d835461e5736a5e503.jpg" alt="" />
//               <p class="name">${item[i].name}</p>
//               <p class="price">${item[i].price}</p>
//               <button class="wish">찜하기<button>
//             </div>
//           </div>
//         `;
//   }

// let wish = document.querySelectorAll(".wish");
//   for (let i = 0; i < wish.length; i++) {
//     let wish = document.querySelectorAll(".wish")[i];
//     wish.addEventListener("click", function (e) {
//       let price = e.target.previousElementSibling.innerText;
//       let name =
//         e.target.previousElementSibling.previousElementSibling.innerText;
//       let sumnail =
//         e.target.previousElementSibling.previousElementSibling
//           .previousElementSibling.src;
//       if (localStorage.getItem("name") != null) {
//         let takeName = JSON.parse(localStorage.name);
//         let takePrice = JSON.parse(localStorage.price);
//         let takeImg = JSON.parse(localStorage.img);
//         takeName.push(name);
//         takePrice.push(price);
//         takeImg.push(sumnail);
//         localStorage.setItem("name", JSON.stringify(takeName));
//         localStorage.setItem("price", JSON.stringify(takePrice));
//         localStorage.setItem("img", JSON.stringify(takeImg));
//       } else {
//         localStorage.setItem("name", JSON.stringify([name]));
//         localStorage.setItem("price", JSON.stringify([price]));
//         localStorage.setItem("img", JSON.stringify([sumnail]));
//       }
//     });
//   }
