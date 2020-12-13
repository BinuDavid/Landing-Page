/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navUL = document.querySelector("#navbar__list");
const nav = document.querySelector("nav");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//  Checks if element is in the viewport
function inViewport() {
  const viewportLog = {};
  sections.forEach((section) => {
    const bounds = section.getBoundingClientRect();
    if (
      bounds.top >= 0 &&
      bounds.left >= 0 &&
      bounds.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      viewportLog[section.id] = true;
    } else {
      viewportLog[section.id] = false;
    }
  });
  return viewportLog;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function buildNav() {
  // Create Fragment
  const frag = document.createDocumentFragment();

  sections.forEach((section) => {
    // Create Link
    const link = document.createElement("A");
    link.setAttribute("href", `#${section.id}`);
    link.className = "menu__link";

    // Create ListItem
    const listItem = document.createElement("LI");
    listItem.className = `${section.id}`;
    listItem.textContent = `${section.dataset.nav}`;

    link.append(listItem);
    frag.append(link);
    navUL.append(frag);
  });
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event
function scroll(top, left) {
  window.scrollTo({
    top: top,
    // bottom: bottom,
    left: left,
    behavior: "smooth",
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();

// Scroll to section on link click
navUL.addEventListener("click", (e) => {
  e.preventDefault();
  let target_link;

  if (e.target.className === "menu__link") {
    target_link = e.target;
  } else {
    target_link = e.target.parentElement;
  }
  const href = target_link.getAttribute("href");
  const section = document.querySelector(`${href}`);
  if (section != null) {
    const top = section.offsetTop - nav.offsetHeight;
    const left = section.offsetLeft;
    scroll(top, left);
  }
});
// Set sections as active
window.addEventListener("scroll", () => {
  const viewportLog = inViewport();
  for (const section in viewportLog) {
    const li = document.querySelector(`.${section}`);
    const a = li.parentElement;
    if (viewportLog[section] === true) {
      document.querySelector(`#${section}`).className = "active";
      a.classList.add("highlighted");
      li.classList.add("inView");
    } else {
      document.querySelector(`#${section}`).className = "";
      a.classList.remove("highlighted");
      li.classList.remove("inView");
    }
  }
});
