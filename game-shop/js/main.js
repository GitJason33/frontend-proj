// how many levels of folders exist
let lvls = 2;

// the header has the page name (id) and level (class)
const header = document.querySelector("header[id]");
const head = document.head;

// social media
let whatsapp = "+96112345678";
let instagram = "Instagram";

/*------------ loading section ------------*/

// main loading
function load(){
  addGoogleFont();
  addIcon();
  createHeader();
  createNavBar();
  createFooter();
  createSidebarMenu();
  addJavaScript();
}
function homeLoad(){
  load();
  createBG_Image();
  createCatalog();
}
/*------------ loading section end ------------*/

// array of svg icons
const icons = _checkLinks({
  logo: "media/images/logo.png",
  home: "media/images/svg/home.svg",
  search: "media/images/svg/search.svg",
  sidebar: "media/images/svg/sidebar.svg",
  cart: "media/images/svg/cart.svg",

  whatsapp: "media/images/svg/whatsapp.svg",
  instagram: "media/images/svg/instagram.svg",
});

const pages = _checkLinks({
  home: "shopping.html",
  cart: "cart.html",
  login: "account/sign-in.html",
  register: "account/sign-up.html",

  keyboard: "categories/keyboards/keyboard-1.html",
});

// google font for main components
function addGoogleFont(){
  let fonts = "https://fonts.googleapis.com/css?family=Audiowide&effect=neon";

  head.innerHTML += `<link rel="stylesheet" href="${fonts}"/>`;
}

// add icon to the page
function addIcon(){
  head.innerHTML += `<link rel="icon" href="${ icons['logo'] }"/>`;
}

// add header to the page
function createHeader(){
  header.innerHTML = `
  <section id="logo">
    <img src="${ icons['logo'] }" alt="logo" />
  </section>
  <section id="account">
    <button class="acct" onclick="window.open('${ pages['login'] }', '_self')">SIGN IN</button>
    <button class="acct" onclick="window.open('${ pages['register'] }', '_self')">SIGN UP</button>
  </section>
  `;
}

// add navigation bar to page
function createNavBar(){
  let nav = document.querySelector("nav");

  nav.innerHTML = `
  <div id="left">
    <section id="homeTab" onclick="window.open('${ pages['home'] }', '_self');">
      <aside>HOME</aside>
      <img src='${ icons['home'] }' class='icon' />
    </section>
  </div>

  <div id="right">
    <section id="search" onclick="openSearch()" title="search">
      <img src='${ icons['search'] }' class='icon' />
      <input type="text" placeholder="Search..." />
    </section>

    <section id="cart" onclick="window.open('${ pages['cart'] }', '_self');" title="Cart">
      <img src='${ icons['cart'] }' class='icon' />
    </section>

    <section id="sidebar" onclick="openSidebarMenu()" title="Categories">
      <img src='${ icons['sidebar'] }' class='icon' />
    </section>
  </div>
  ` + nav.innerHTML;
}

// add footer to page
function createFooter(){
  let footer = document.querySelector("footer");
  footer.innerHTML = `
  <section id="copyright">copyright &copy; 2023</section>
  <section id="locate">We are located in Lebanon</section>

  <section class="social-whatsapp">
    <a href="http://wa.me/${ whatsapp }">
      <img src='${ icons['whatsapp'] }' class='icon' />
      +961 12 345 678
    </a>
  </section>
  <section class="social-instagram">
    <a href="https://ig.me/${ instagram }">
      <img src='${ icons['instagram'] }' class='icon' />
      Instagram
    </a>
  </section>
  `;
}

// make the side bar menu
function createSidebarMenu(){
  let side = document.querySelector("#menu");

  side.innerHTML = `
  <span onclick="closeSidebarMenu()">x</span>
  <h2 class="font-effect-neon">Categories</h2>
  <a href="${ pages['keyboard'] }">Keyboard</a>
  <a href="#">Mouse</a>
  <a href="#">Headphones</a>
  <a href="#">Gaming-Chair</a>
  <a href="#">Finger-Sleeves</a>
  <a href="#">Gift-Cards</a>
  `;
}
function openSidebarMenu(){
  let menu = document.querySelector("#menu");
  menu.style.height = "100%";
}
function closeSidebarMenu(){
  let menu = document.querySelector("#menu");
  menu.style.height = "0";
}

// for categories: javascript
const addJavaScript = ()=> {
  if(header.id == "category"){
    document.body.innerHTML += `
    <script src="../../js/category.js"></script>
    `; 
  }
}



/*------------ home functions ------------*/
// add the background of luffy
function createBG_Image(){
  let bg = document.querySelector("#bg");
  
  bg.innerHTML = `
  <div id="bg-image">
    <section class="font-effect-neon">
      Explore a world of excitement
    </section>
  </div>
  `;
}

// home catalog
function createCatalog(){
  let catalog = document.querySelector("#main-content");
  catalog.innerHTML += `<div id='img-contain'></div>`;

  let labels = [
    "Keyboards",
    "Mice",
    "Headphones",
    "Gaming Chairs",
    "Finger Sleeves",
    "Gift Cards"
  ];
  let sources = [
    "keyboard.png",
    "mouse.png",
    "headphones.png",
    "gaming-chair.png",
    "finger-sleeves.jpg",
    "gift-cards.png"
  ];
  let links = [
    "keyboards/keyboard-1.html",
    "mice/mouse-1.html",
    "headphones/headphone-1.html",
    "gaming-chairs/gaming_chair-1.html",
    "finger-sleeves/finger_sleeves-1.html",
    "gift-cards/gift_card-1.html",
  ];

  for(let i = 0; i < labels.length; i++){
    catalog.children[ catalog.children.length - 1 ].innerHTML += `
    <section class="img-card" onclick="window.open('categories/${links[i]}', '_self')">
      <div>
        <img src="./media/images/${sources[i]}" />
        <article>${labels[i]}</article>
      </div>
    </section>
    `;
  }
}
/*------------ home functions end ------------*/




/*------------ sub-functions sections --------------*/ 

// checks in which folder level we are for the links
function _checkLinks(links){
  let updated = {};
  let checkLevel = header.className.slice(header.className.length - 1);

  for(let x in links){
    updated[x] = links[x];
    for(let i = 0; i < checkLevel; i++)
      updated[x] = "../" + updated[x];
  }
  return updated;
}
/*------------ sub-functions sections end --------------*/ 