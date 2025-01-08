document.addEventListener("DOMContentLoaded", () => {
    const companyTestimonialSwiper = new Swiper(".swiper.is-test", {
      speed: 800,
      effect: "slide",
      spaceBetween: 30,
      direction: "horizontal",
      slideToClickedSlide: true,
      slidesPerView: "auto",
      loop: true,
      keyboard: true,
      navigation: {
        nextEl: document.querySelector(".swiper-slide-button.is-test.is-next"),
        prevEl: document.querySelector(".swiper-slide-button.is-test.is-prev")
      }
    });
  });