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

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

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

    // Create ListItem
    const listItem = document.createElement("LI");
    listItem.textContent = `${section.dataset.nav}`;

    link.append(listItem);
    frag.append(link);
  });
}

// Add class 'active' to section when near top of viewport
function activeClass() {
  sections.forEach((section) => {
    const bounds = section.getBoundingClientRect();
    console.info(bounds);
    if (
      bounds.top >= 0 &&
      bounds.left >= 0 &&
      bounds.right <=
        (window.innerWidth || document.documentElement.clientWidth) &&
      bounds.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      section.className = "active";
    } else {
      section.className = "";
    }
  });
}
activeClass();

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();

// Scroll to section on link click

// Set sections as active
