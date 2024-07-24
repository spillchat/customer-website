document.addEventListener('DOMContentLoaded', () => {
	const sliders = [...document.querySelectorAll('.swiper_component, .swiper-component')];

	sliders.forEach((slider) => {
		const testimonialSwiper = new Swiper(
			slider.querySelector('.swiper.is-testimonial'),
			{
				speed: 800,
				effect: 'slide',
				direction: 'horizontal',
				slideActiveClass: 'is-active',
				slideToClickedSlide: true,
				slidesPerView: 'auto',
				loop: true,
				keyboard: true,
				navigation: {
					nextEl: slider.querySelector('.swiper-arrow.is-testimonial.is-next'),
					prevEl: slider.querySelector('.swiper-arrow.is-testimonial.is-prev'),
				},
			}
		);

		const testSwiper = new Swiper(slider.querySelector('.swiper.is-test'), {
			speed: 800,
			effect: 'slide',
			direction: 'horizontal',
			slideActiveClass: 'is-active',
			slideToClickedSlide: true,
			spaceBetween: 40,
			slidesPerView: 'auto',
			loop: true,
			keyboard: true,
			navigation: {
				nextEl: slider.querySelector('.swiper-slide-button.is-test.is-next'),
				prevEl: slider.querySelector('.swiper-slide-button.is-test.is-prev'),
			},
		});
	});

});
