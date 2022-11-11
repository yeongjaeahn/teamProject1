// 모달
const modalTotal = document.querySelector('.modal-total');
const description = document.querySelector('.description'); // 모달창 메시지
const modalOpenButton = document.querySelector('.modal-open-button');
const modalCloseButton = document.querySelector('.modal-close-button'); 

modalOpenButton.addEventListener("click", function(){
    modalTotal.style.display = "block";
})

modalCloseButton.addEventListener("click", function(){
    modalTotal.style.display = "none";
})