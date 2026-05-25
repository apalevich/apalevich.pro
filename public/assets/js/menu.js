const menu = document.querySelector(".menu-block");
const menuMain = menu.querySelector(".site-menu-main");
const submenuAll = menu.querySelectorAll(".sub-menu");
const goBack = menu.querySelector(".go-back");
const menuTrigger = document.querySelector(".mobile-menu-trigger");
const closeMenu = menu.querySelector(".mobile-menu-close");
let subMenu;
let subMenuArray = [];
let subMenuTextArray = [];

function last(array) {
  return array[array.length - 1];
}
function last2(array) {
  return array[array.length - 2];
}

menuMain.addEventListener("click", (e) => {
  if (!menu.classList.contains("active")) {
    return;
  }
  if (e.target.closest(".nav-item-has-children")) {
    const hasChildren = e.target.closest(".nav-item-has-children");

    showSubMenu(hasChildren);
  }
});
goBack.addEventListener("click", () => {
  const lastItem = last(subMenuArray);
  const lastItemText = last2(subMenuTextArray);
  subMenuArray.pop();
  subMenuTextArray.pop();
  if (subMenuArray.length >= 0) {
    document.getElementById(lastItem).style.animation =
      "slideRight 0.5s ease forwards";
    menu.querySelector(".current-menu-title").innerHTML = lastItemText;
    setTimeout(() => {
      document.getElementById(lastItem).classList.remove("active");
    }, 300);
  }
  if (subMenuArray.length == 0) {
    menu.querySelector(".mobile-menu-head").classList.remove("active");
  }
});
menuTrigger.addEventListener("click", () => {
  toggleMenu();
});
closeMenu.addEventListener("click", () => {
  toggleMenu();
});
document.querySelector(".menu-overlay").addEventListener("click", () => {
  toggleMenu();
});
function toggleMenu() {
  menu.classList.toggle("active");
  document.querySelector(".menu-overlay").classList.toggle("active");
}
function showSubMenu(hasChildren) {
  for (let i = 0; submenuAll.length < i; i++) {
    submenuAll[i].classList.remove("active");
  }
  subMenu = hasChildren.querySelector(".sub-menu");
  subMenuArray.push(subMenu.id);
  subMenu.classList.add("active");
  subMenu.style.animation = "slideLeft 0.5s ease forwards";
  const menuTitle = hasChildren.querySelector(".drop-trigger").textContent;
  subMenuTextArray.push(menuTitle);

  menu.querySelector(".current-menu-title").innerHTML = menuTitle;
  // menu.querySelector(".mobile-menu-head").classList.add("active");
}
window.onresize = function () {
  if (this.innerWidth > 991) {
    if (menu.classList.contains("active")) {
      toggleMenu();
    }
  }
};

// Desktop: click-to-toggle dropdowns. First click on a parent link opens the
// dropdown; second click follows the href so it stays SEO friendly.
const desktopDropTriggers = document.querySelectorAll(
  ".site-menu-main > .nav-item-has-children > .drop-trigger"
);
desktopDropTriggers.forEach((trigger) => {
  const parent = trigger.closest(".nav-item-has-children");
  const submenu = parent && parent.querySelector(".sub-menu");
  if (!parent || !submenu) return;

  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (e) => {
    if (window.innerWidth <= 991) return; // mobile uses the existing menu logic
    if (!parent.classList.contains("open")) {
      e.preventDefault();
      desktopDropTriggers.forEach((other) => {
        const otherParent = other.closest(".nav-item-has-children");
        if (otherParent && otherParent !== parent) {
          otherParent.classList.remove("open");
          other.setAttribute("aria-expanded", "false");
        }
      });
      parent.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (e) => {
  if (window.innerWidth <= 991) return;
  if (e.target.closest(".nav-item-has-children")) return;
  document.querySelectorAll(".nav-item-has-children.open").forEach((item) => {
    item.classList.remove("open");
    const trigger = item.querySelector(".drop-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".nav-item-has-children.open").forEach((item) => {
    item.classList.remove("open");
    const trigger = item.querySelector(".drop-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
});
