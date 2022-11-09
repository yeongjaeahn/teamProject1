export const createNavbar = () => {
  const pathname = window.location.pathname;
  const pathname2 = pathname.slice(0, pathname.length - 1);
  console.log(pathname);
  console.log(pathname2);

  switch (pathname) {
    case "/":
      addNavElements("admin register login account logout");
      break;
    case "/login/":
      addNavElements("register");
      break;

    default:
  }
};

const addNavElements = (keyString) => {
  const keys = keyString.split(" ");

  // 각 html header 부분은 navbar로 통일
  const container = document.querySelector("#navbar");
  const isLogin = sessionStorage.getItem("token") ? true : false;
  const isAdmin = sessionStorage.getItem("admin") ? true : false;

  const itemsBeforeLogin = {
    register: '<li><a href = "/register">회원가입</a></li>',
    login: '<li><a href = "/login">로그인</a></li>',
  };

  const itemsAfterLogin = {
    account: '<li><a href="/myPage">계정관리</a></li>',
    logout: '<li><a href="#" id="logout">로그아웃</a></li>',
    productAdd: '<li><a href="/admin/item">제품 추가</a></li>',
    categoryAdd: '<li><a href="/admin/category">카테고리 추가</a></li>',
  };

  const itemsForAdmin = {
    admin: '<li><a href = "/admin">관리 페이지</a></li>',
  };

  const logoutScript = document.createElement("script");
  logoutScript.innerText = `
      const logoutElem = document.querySelector('#logout'); 
      
      if (logoutElem) {
        logoutElem.addEventListener('click', () => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('admin');

          window.location.href = '/';
        });
      }
  `;

  let items = "";
  for (const key of keys) {
    if (isAdmin) {
      items += itemsForAdmin[key] ?? "";
    }
    if (isLogin) {
      items += itemsAfterLogin[key] ?? "";
    } else {
      items += itemsBeforeLogin[key] ?? "";
    }
  }

  container.insertAdjacentHTML("afterbegin", items);

  container.after(logoutScript);
};
