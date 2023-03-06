// how many levels of folders exist
let lvls = 2;

// the header has the page name (id) and level (class)
const header = document.querySelector("header[id]");
const head = document.head;

/*------------ loading section ------------*/

// main loading
function load(){
  addGoogleFont();
  addIcon();
  createHeader();
  createNavBar();
  createFooter();
}
function homeLoad(){
  load();
  createBG_Image();
  addHomeCatalogSrc();
}
/*------------ loading section end ------------*/


// common css for main components
function addGoogleFont(){
  let cssFiles = [
    // google fonts
    "https://fonts.googleapis.com/css?family=Audiowide&effect=neon"
  ];
  head.innerHTML += `
  <link rel="stylesheet" href="${cssFiles[0]}"/>`;
}

// add icon to the page
function addIcon(){
  let icons = ["media/images/logo.png", ""];
  _checkLinks(icons);

  head.innerHTML += `
    <link rel="icon" href="${icons[0]}"/>`;
}

// add header to the page
function createHeader(){
  let links = [
    "media/images/logo.png",
    "account/sign-in.html",
    "account/sign-up.html",
    ""
  ];
  _checkLinks(links);

  header.innerHTML = `
  <section id="logo">
    <img src="${links[0]}" alt="logo" />
  </section>
  <section id="account">
    <button class="acct" onclick="window.open('${links[1]}', '_self')">SIGN IN</button>
    <button class="acct" onclick="window.open('${links[2]}', '_self')">SIGN UP</button>
  </section>
  `;
}

// array of svg icons
const svgs = [
  // home icon
  `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-home"
  viewBox="0 0 24 24"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
  </svg>`,

  // search icon
  `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-search"
  viewBox="0 0 24 24"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
    <path d="M21 21l-6 -6"></path>
  </svg>`,

  // cart icon
  `<svg 
  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 17h-11v-14h-2"></path>
    <path d="M6 5l14 1l-1 7h-13"></path>
  </svg>`,

  // sidebar icon
  `<svg 
  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M9 6l11 0"></path>
    <path d="M9 12l11 0"></path>
    <path d="M9 18l11 0"></path>
    <path d="M5 6l0 .01"></path>
    <path d="M5 12l0 .01"></path>
    <path d="M5 18l0 .01"></path>
  </svg>`,

  // whatsapp icon
  `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-brand-whatsapp"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
    <path
      d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"
    ></path>
  </svg>`,

  // instagram icon
  `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-brand-instagram"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path
      d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    <path d="M16.5 7.5l0 0"></path>
  </svg>`
];

// add navigation bar to page
function createNavBar(){
  let nav = document.querySelector("nav");
  let links = [
    "shopping.html",
    "cart.html",
    ""
  ];
  _checkLinks(links);

  nav.innerHTML = `
  <div id="left">
    <section id="homeTab" onclick="window.open('${links[0]}', '_self');">
      <aside>HOME</aside>
      ${svgs[0]}
    </section>
  </div>

  <div id="right">
    <section id="search" onclick="openSearch()">
      ${svgs[1]}
      <input type="text" />
    </section>

    <section id="cart" onclick="window.open('${links[1]}', '_self');">
      ${svgs[2]}
    </section>

    <section id="sidebar" onclick="openRightMenu()">
      ${svgs[3]}
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
    <a href="http://wa.me/+96112345678">
      ${svgs[4]}
      +961 12 345 678
    </a>
  </section>
  <section class="social-instagram">
    <a href="https://ig.me/instagram">
      ${svgs[5]}
      Instagram
    </a>
  </section>
  `;
}

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

// add image sources to maintain website performance
function addHomeCatalogSrc(){
  let sources = [
    // catalog
    "./media/images/keyboard.png",
    "./media/images/mouse.png",
    "./media/images/headphones.png",
    "./media/images/gaming-chair.png",
    "./media/images/finger-sleeves.jpg",
    "./media/images/gift-cards.png"
  ];
  let cards = document.querySelectorAll(".img-card img");
  for(let i in cards){
    cards[i].src = sources[i];
  }
}




/*------------ sub-functions sections --------------*/ 

// checks in which folder level we are for the links
function _checkLinks(files){
  // first check the level-number
  let level = header.className;
  level = parseInt(level.substring(level.length-1));

  // then add in each row of 'files' a backward return to the level-0
  for(let i = 0; i < files.length-1; i++){
    for(let j = 0; j < level; j++)
      files[i] = "../" + files[i];
  }
}
/*------------ sub-functions sections end --------------*/ 