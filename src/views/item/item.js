let baketBtn = document.querySelector("#baket");

baketBtn.addEventListener("click", function () {
  if (confirm("장바구니로 넘어가시겠습니까?")) {
    console.log("dd");
    // window.location = '/cart'
  }

  localStorage.setItem();
});
