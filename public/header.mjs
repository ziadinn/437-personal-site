const routes = [
  { headerTitle: "Ziadin", title: "Home Page", path: "./index.html" },
  {
    headerTitle: "Another Page",
    title: "Another Page",
    path: "./another-page.html",
  },
];

let headerTitle = "Ziadin";
for (const route of routes) {
  if (route.path === `.${window.location.pathname}`) {
    headerTitle = route.headerTitle;
    break;
  }
}

const navPaths = routes
  .map((route) => `<a href="${route.path}">${route.title}</a>`)
  .join("");

const initialHeaderContent = `
  <div class="header-content">
    <h1>${headerTitle}</h1>
    <button id="burger-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
        <path
          d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z">
        </path>
      </svg>
    </button>
  </div>
  <nav>
    ${navPaths}
  </nav>
`;

let isVisibleNavPaths = false;
const body = document.querySelector("body");
const header = document.createElement("header");
header.innerHTML = initialHeaderContent;
body.prepend(header);

const burgerButton = document.querySelector("#burger-button");
burgerButton.addEventListener("click", () => {
  const nav = document.querySelector("header nav");
  isVisibleNavPaths = !isVisibleNavPaths;
  nav.style.display = isVisibleNavPaths ? "flex" : "none";
});

body.addEventListener("click", (event) => {
  const header = document.querySelector("header");
  const clickedInsideHeader = header.contains(event.target);
  if (isVisibleNavPaths && !clickedInsideHeader) {
    const nav = document.querySelector("header nav");
    isVisibleNavPaths = false;
    nav.style.display = "none";
  }
});
