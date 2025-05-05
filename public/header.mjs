const routes = [
  { title: "Home Page", path: "./index.html" },
  { title: "Another Page", path: "./another-page.html" },
];

let isVisibleNavPaths = false;

const navPaths = routes
  .map((route) => `<a href="${route.path}">${route.title}</a>`)
  .join("");

const nav = document.querySelector("header nav");
nav.innerHTML = navPaths;

const burgerButton = document.querySelector("#burger-button");
burgerButton.addEventListener("click", () => {
  isVisibleNavPaths = !isVisibleNavPaths;
  nav.style.display = isVisibleNavPaths ? "flex" : "none";
});
