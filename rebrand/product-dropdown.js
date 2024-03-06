document.addEventListener("DOMContentLoaded", () => {
  //initialize dropdown
  dropdownInit();

  function dropdownInit() {
    const dropdowns = [...document.querySelectorAll(".product-dropdown")];

    dropdowns.forEach((dropdown) => {
      dropdown.onclick = () => {
        if (dropdown.classList.contains("show")) {
          closeDropdowns();
        } else {
          closeDropdowns();
          dropdown.classList.add("show");
        }
      };

      // dropdown.addEventListener("blur", () => {
      //   closeDropdowns();
      // });
    });

    function closeDropdowns() {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    }
  }

  //initialize ripple animation

  initRipple();

  function initRipple() {
    const wrappers = [...document.querySelectorAll(".ripple-animation")];

    wrappers.forEach((wrapper, index) => {
      setTimeout(() => {
        const tl = new gsap.timeline({
          defaults: {
            duration: 2.75,
            ease: "power3.inOut",
            repeat: -1,
            stagger: {
              each: 0.2
            }
          }
        });

        const ripples = [...wrapper.querySelectorAll(".ripple")];

        tl.to(ripples, { scale: 1.2, opacity: 0 });
      }, 500 * index);
    });
  }
});
