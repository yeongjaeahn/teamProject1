export const createNavbar = () => {
  const pathname = window.location.pathname;
  const pathname2 = pathname.slice(0, pathname.length - 1);
  console.log(pathname);
  console.log(pathname2);

  switch (pathname) {
    case "/":
      addNavElements("admin register shop login account cart logout");
      break;
    case "/login/":
      addNavElements("register");
      break;
    case "/register/":
      addNavElements("login");
      break;
    case "/shop/":
      addNavElements("account login register logout");
      break;
    case "/mypage/":
      addNavElements("admin shop cart logout");
      break;
    case "/item/":
      addNavElements("account login register logout");
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
    register: '<li><a href = "/register">Sign Up</a></li>',
    login: '<li><a href = "/login">Sign In</a></li>',
    shop: '<li><a href = "/shop">Shop</a></li>',
    cart: '<li><a href = "/cart">Cart</a></li>',
  };

  const itemsAfterLogin = {
    account: '<li><a href="/myPage">Account</a></li>',
    logout: '<li><a href="#" id="logout">Log Out</a></li>',
    productAdd: '<li><a href="/admin/item">Add Items</a></li>',
    categoryAdd: '<li><a href="/admin/category">Add Category</a></li>',
    shop: '<li><a href = "/shop">Shop</a></li>',
    cart: '<li><a href = "/cart">Cart</a></li>',
  };

  const itemsForAdmin = {
    admin: '<li><a href = "/admin">Admin</a></li>',
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
