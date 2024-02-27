document.addEventListener("DOMContentLoaded", () => {
    const companyTestimonialSwiper = new Swiper(".swiper.is-test", {
      speed: 800,
      effect: "slide",
      spaceBetween: 30,
      direction: "horizontal",
      slideActiveClass: "is-active",
      slideToClickedSlide: true,
      slidesPerView: "auto",
      loop: true,
      keyboard: true
    });
  });