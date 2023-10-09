document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.querySelector("#nav-button");
  const navMobile = document.querySelector(".nav-mobile");

  navButton.onclick = () => {
    if (navButton.classList.contains("is-open")) {
      closeNav();
      navButton.classList.remove("is-open");
    } else {
      navButton.classList.add("is-open");
      openNav();
    }
  };

  const tl = new gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.paused(true);

  tl.to(navMobile, { height: "auto" });

  function openNav() {
    tl.restart();
  }

  function closeNav() {
    tl.reverse();
  }
});
