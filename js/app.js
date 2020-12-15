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
const navUL = document.querySelector("#navbar__list");
const nav = document.querySelector("nav");
const main = document.querySelector("main");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//  Checks if element is in the viewport

let inViewport = () => {
  const sections = document.querySelectorAll("section");
  const section1 = document.querySelector("#section1");

  const OFFSET_TOP = section1.offsetTop;

  const viewportLog = {};

  sections.forEach((section) => {
    const bounds = section.getBoundingClientRect();
    if (
      bounds.top >= bounds.bottom - bounds.height &&
      bounds.top <= OFFSET_TOP &&
      bounds.bottom >= OFFSET_TOP &&
      bounds.bottom <= OFFSET_TOP + bounds.height
    ) {
      viewportLog[section.id] = true;
    } else {
      viewportLog[section.id] = false;
    }
  });
  return viewportLog;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

let buildContent = (numOfSections = 4) => {
  // Create Fragment
  const frag = document.createDocumentFragment();

  for (let i = 1; i <= numOfSections; i++) {
    const text = `Section ${i}`;
    const para1 =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
    const para2 =
      "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";

    // Create Section
    const section = document.createElement("SECTION");
    section.id = `section${i}`;
    section.dataset.nav = `${text}`;
    if (i === 1) {
      section.classList.add("active");
    }

    frag.append(section);

    //  Create Div
    const div = document.createElement("DIV");
    div.classList.add("landing__container");

    section.append(div);

    // Create H2
    const h2 = document.createElement("h2");
    h2.textContent = `${text}`;

    div.append(h2);

    for (let a = 1; a < 2; a++) {
      if (a === 1) {
        let p = document.createElement("p");
        p.textContent = `${para1}`;

        div.append(p);
      } else {
        let p = document.createElement("p");
        p.textContent = `${para2}`;

        div.append(p);
      }
    }
  }
  main.append(frag);
};

// buildContent has parameter numOfSections (default = 4)
buildContent();

// build the nav
let buildNav = () => {
  const sections = document.querySelectorAll("section");

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
};

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event
function scroll(top, left) {
  window.scrollTo({
    top: top,
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

  if (e.target.nodeName === "A") {
    target_link = e.target;
  } else {
    target_link = e.target.parentElement;
  }
  const href = target_link.getAttribute("href");
  const section = document.querySelector(`${href}`);

  const top = section.offsetTop - nav.offsetHeight;
  const left = section.offsetLeft;
  window.scrollTo({
    top: top,
    left: left,
    behavior: "smooth",
  });
  console.log("Window");
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
