// Site behavior. Based on Beautiful Jekyll by Dean Attali (MIT).

document.addEventListener('DOMContentLoaded', function () {
  // Multi-level navbar menus: toggle child links on click (touch and keyboard).
  var parents = document.querySelectorAll('#main-navbar .navlinks-parent');
  Array.prototype.forEach.call(parents, function (button) {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function () {
      Array.prototype.forEach.call(parents, function (other) {
        var open = other === button && !other.parentNode.classList.contains('show-children');
        other.parentNode.classList.toggle('show-children', open);
        other.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  });
});
