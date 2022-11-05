let baketBtn = document.querySelector("#baket");

baketBtn.addEventListener("click", function () {
  if (confirm("카트에 담겼습니다 카트로 넘어가시겠습니까?")) {
    window.location.href = "/cart";
  }

  localStorage.setItem();
});
