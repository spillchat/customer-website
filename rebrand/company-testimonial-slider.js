document.addEventListener("DOMContentLoaded", () => {
  const companyTestimonialSwiper = new Swiper(".swiper.is-company", {
    speed: 800,
    effect: "slide",
    spaceBetween: 30,
    direction: "horizontal",
    slideActiveClass: "is-active",
    slideToClickedSlide: true,
    slidesPerView: "auto",
    loop: true,
    keyboard: true,
    navigation: {
      nextEl: ".swiper-arrow.is-company.is-next",
      prevEl: ".swiper-arrow.is-company.is-prev"
    }
  });
});
