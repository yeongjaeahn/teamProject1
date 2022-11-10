import { addCommas } from "/useful-functions.js";
import { getFromDB } from "/indexed-db.js";
import * as Api from "/api.js";

const addressFinder = document.querySelector(".adress-btn");
const itemName = document.querySelector("#item-name");
const itemQuantity = document.querySelector("#item-quantity");
const itemPrice = document.querySelector("#item-price");
const itemImage = document.querySelector(".item-image");
const itemShipPrice = document.querySelector(".item-ship-price");
const itemTotalPrice = document.querySelector(".item-total-price");
const orderTotalPrice = document.querySelector(".order-total-price");
const receiverNameInput = document.querySelector("#input-text-name");
const receiverPhoneInput = document.querySelector("#input-text-number");

addAllEvents();
addAllElements();

function addAllElements() {
  insertOrderSummary();
  // insertUserData();
}

function addAllEvents() {
  addressFinder.addEventListener("click", sample6_execDaumPostcode);
}

function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
}

async function insertOrderSummary() {
  const { ids, selectedIds, productsTotal } = await getFromDB(
    "order",
    "summary"
  );

  // 구매할 아이템 없으면 다른 페이지로 이동
  const hasItemInCart = ids.length !== 0;
  const hasItemToCheckout = selectedIds.length !== 0;

  if (!hasItemInCart) {
    alert("구매할 제품이 없습니다. 제품을 선택해주세요");
  }

  if (!hasItemToCheckout) {
    alert("구매할 제품이 없습니다. 장바구니에서 선택해 주세요.");

    return window.location.replace("/cart");
  }

  let productsName = "";
  for (const id of selectedIds) {
    const { name, quantity, image } = await getFromDB("cart", id);
    if (productsName) {
      productsName += "\n";
    }
    itemImage.src = `${image}`;
    productsName += `${name} / ${quantity}개`;
  }

  itemName.innerHTML = productsName;
  itemTotalPrice.innerHTML = `${addCommas(productsTotal)}원`;

  if (hasItemToCheckout) {
    itemShipPrice.innerHTML = `3,000원`;
    orderTotalPrice.innerHTML = `${addCommas(productsTotal + 3000)}원`;
  } else {
    itemShipPrice.innerHTML = `0원`;
    orderTotalPrice.innerHTML = `0원`;
  }

  receiverNameInput.focus();
}

// async function insertUserData() {
//   const userData = await Api.get("/api/user");
//   const { name, phone, address } = userData;

//   // 만약 db에 데이터 값이 있었다면, 배송지정보에 삽입
//   if (name) {
//     receiverNameInput.value = name;
//   }

//   if (phone) {
//     receiverPhoneInput.value = phone;
//   }

//   if (address) {
//     postalCode.value = address.postalCode;
//     address1Input.value = address.address1;
//     address2Input.value = address.address2;
//   }
// }
