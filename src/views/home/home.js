// navibar 스크롤시 색상변경

window.addEventListener("scroll", function () {
  console.log(window.scrollY);
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
