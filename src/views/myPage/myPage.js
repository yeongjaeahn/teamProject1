import * as Api from "/api.js";

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

//추가내용

const emailInput = document.querySelector("#input-text-email");
const nameInput = document.querySelector("#input-text-name");
const phoneNumberInput = document.querySelector("#input-text-number");
const postcodeInput = document.querySelector("#sample6_postcode");
const address1Input = document.querySelector("#sample6_address");
const address2Input = document.querySelector("#sample6_detailAddress");
const 주소찾기버튼 = document.querySelector("#주소찾기버튼");
const saveButton = document.querySelector("#save");
const quitButton = document.querySelector("#quit");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  saveButton.addEventListener("click", save);
  주소찾기버튼.addEventListener("clcik", sample6_execDaumPostcode);
}

const Id = window.location.pathname;
console.log(Id);
const _Id = Id.slice(11, Id.length - 1);
console.log(_Id);

async function save(e) {
  e.preventDefault();

  const email = emailInput.value;
  const name = nameInput.value;
  const phoneNumber = phoneNumberInput.value;
  const postcode = postcodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;

  try {
    const address = { postcode, address1, address2 };
    const data = { email, name, phoneNumber, address };
    const result = await Api.patch(`/api/users/${_Id}`, data);
    console.log(result);
    alert("정상적으로 수정되었습니다.");
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
