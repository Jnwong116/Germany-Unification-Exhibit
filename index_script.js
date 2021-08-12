const body = document.body;
const collapseButton = document.querySelector(".menu .collapse");
const collapsedClass = "collapsed";

collapseButton.addEventListener("click", function() {
    body.classList.toggle(collapsedClass);
    this.getAttribute("aria-expanded") == "true"
    ? this.setAttribute("aria-expanded", "false")
    : this.setAttribute("aria-expanded", "true");
  this.getAttribute("aria-label") == "collapse menu"
    ? this.setAttribute("aria-label", "expand menu")
    : this.setAttribute("aria-label", "collapse menu");
});