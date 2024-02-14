
document.addEventListener('DOMContentLoaded', () => {
	//form element
	const form = document.querySelector("[superform-element='form']");

	const events = ['change', 'keyup', 'keypress', 'blur', 'keydown', 'click'];

	//track plan
	// const planInputs = [...document.querySelectorAll("[data-selection='plan']")];
	let plan = 'team';

	// planInputs.forEach((input) => {
	//   events.forEach((event) => {
	//     input.addEventListener(event, () => {
	//       plan = input.dataset.plan;
	//       validateSteps();
	//     });
	//   });
	// });

	//track struggling
	const strugglingInputs = [
		...document.querySelectorAll("[data-selection='struggling']"),
	];
	let struggling;

	strugglingInputs.forEach((input) => {
		events.forEach((event) => {
			input.addEventListener(event, () => {
				struggling = input.dataset.no;
				validateSteps();
			});
		});
	});

	//track team size
	const teamSizeInput = document.querySelector("[data-selection='team-size']");
	let teamSize = 0;

	events.forEach((event) => {
		teamSizeInput.addEventListener(event, (e) => {
			teamSize = Number(teamSizeInput.value);
			validateSteps();
		});
	});

	//track name
	const nameInput = document.querySelector("[data-selection='name']");
	let name;

	events.forEach((event) => {
		nameInput.addEventListener(event, () => {
			name = nameInput.value;
			validateSteps();
		});
	});

	//track email
	const emailInput = document.querySelector("[data-selection='email']");
	let email;

	events.forEach((event) => {
		emailInput.addEventListener(event, () => {
			email = emailInput.value;
			emailInput.classList.remove('is-error');
			validateSteps();
		});
	});

	//check for changes
	const validateCheckboxes = [
		...document.querySelectorAll("[data-validate='changed']"),
	];

	events.forEach((event) => {
		validateCheckboxes.forEach((checkbox) => {
			checkbox.addEventListener(event, () => {
				validateSteps();
			});
		});
	});

	//generate quote
	const loadQuoteButton = document.querySelector(
		"[data-selection='load-quote']"
	);

	loadQuoteButton.addEventListener('click', () => {
		loadQuote();
	});

	function loadQuote() {

		const formSubmitButton = document.querySelector("[data-form='submit']");

		const quoteLink = document.querySelector('.quote-link');
		let url = quoteLink.getAttribute('href');

		//validate quote data

		let newUrl =
			'https://' +
			window.location.hostname +
			url +
			`/?name=${name}&email=${email}&employees=${teamSize}&struggling=${struggling}&plan=${plan}`;

		quoteLink.setAttribute('href', newUrl); 
		document.querySelector("[data-selection='url']").value = newUrl;

		formSubmitButton.click();

		redirectURL(8000);
	}

	//countdown timer
	const countdownTimer = document.querySelector('.countdown-timer');

	function redirectURL(time) {
		let counter = Number(time / 1000);
		countdownTimer.innerText = counter.toString();

		setInterval(() => {
			counter--;
			countdownTimer.innerText = counter.toString();
		}, 1000);

		setTimeout(() => {
			document.querySelector('.quote-link').click();
		}, time);
	}

	document.querySelector("[data-selection='load-url']").onclick = () => {
		redirectURL(100);
	};

	//LOAD SLIDER
	// const testimonialSwiper = new Swiper(
	//   document.querySelector(".swiper.is-step"),
	//   {
	//     speed: 800,
	//     effect: "slide",
	//     direction: "horizontal",
	//     slideActiveClass: "is-active",
	//     slideToClickedSlide: true,
	//     slidesPerView: "auto",
	//     loop: true,
	//     keyboard: true,
	//     pagination: {
	//       el: ".step-slider_pagination",
	//       // bulletElement: ".step-slider-dot",
	//       bulletClass: "step-slider-dot",
	//       clickable: true,
	//       bulletActiveClass: "is-active",
	//     },
	//     // navigation: {
	//     //   nextEl: slider.querySelector(".swiper-arrow.is-testimonial.is-next"),
	//     //   prevEl: slider.querySelector(".swiper-arrow.is-testimonial.is-prev"),
	//     // },
	//   },
	// );

	//UI
	//FORM PROGRESS DOT

	const headerProgressDots = [...document.querySelectorAll('.form-header-dot')];
	let currIndex = 0;

	const nextSlideButtons = [
		...document.querySelectorAll("[superform-element='next']"),
	];

	const prevSlideButtons = [
		...document.querySelectorAll("[superform-element='back']"),
	];

	nextSlideButtons.forEach((button, index) => {
		button.addEventListener('click', () => {
			currIndex = index;
			updateProgressDots();
		});
	});

	prevSlideButtons.forEach((button, index) => {
		button.addEventListener('click', () => {
			currIndex = index - 1;
			updateProgressDots();
		});
	});

	function updateProgressDots() {
		headerProgressDots.forEach((progressDot, progressIndex) => {
			if (progressIndex <= currIndex + 1) {
				progressDot.classList.add('is-active');
			} else {
				progressDot.classList.remove('is-active');
			}
		});
	}

	//show loading
	const finalStepButton = document.querySelector("[data-form='last-step']");

	finalStepButton.addEventListener('click', () => {
		['.form-header-text', '.form-header_loading'].forEach((item) => {
			document.querySelector(item).classList.remove('is-hidden');
		});

		document.querySelector('.form-header-dots').remove();
		document.querySelector('.form-step_header-logo').remove();
	});

	//validate email
	const validateCheck = document.querySelector("[data-form='validate-email']");
	const invalidDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com'];
	const companyEmail = $("[data-selection='email']");

	validateCheck.onclick = () => {
		// split email at '@' character to get domain
		const domainPart = companyEmail.val().split('@')[1];

		// if the domain exists in the invalidDomains array
		if (invalidDomains.indexOf(domainPart) !== -1) {
			// clear email field
			companyEmail.val('');
			// add a 'use business mail' placeholder
			companyEmail.attr('placeholder', 'Please enter a business email');
			emailInput.classList.add('is-error');
			// prevent form submission
			return false;
		} else {
			// else if email is not invalid
			// submit form
			email = emailInput.value;

			finalStepButton.click();

			return true;
		}
	};
	/////

	//validate steps

	const stepsToValidate = [
		...document.querySelectorAll("[superform-element='step']"),
	];

	function validateSteps() {
		stepsToValidate.forEach((stepToValidate, index) => {
			const stepButton = stepToValidate.querySelector('.step-next');
			if (stepButton) {
				stepButton.classList.add('is-disabled');
			}
			let valid = false;

			//validate radios
			if (stepToValidate.querySelector("[data-validate='radio']")) {
				const radiosToValidate = [...stepToValidate.querySelectorAll('input')];
				radiosToValidate.forEach((radioToValidate) => {
					if (radioToValidate.checked) {
						valid = true;
					}
				});
			}

			//validate single input
			if (stepToValidate.querySelector("[data-validate='input']")) {
				const inputToValidate = stepToValidate.querySelector(
					"[data-validate='input']"
				);

				if (inputToValidate.value.length > 0) {
					valid = true;
				}
			}

			//validate checkboxes
			if (stepToValidate.querySelector("[data-validate='checkbox']")) {
				const checkboxesToValidate = [
					...stepToValidate.querySelectorAll('input'),
				];
				checkboxesToValidate.forEach((checkbox) => {
					if (checkbox.checked) {
						valid = true;
					}
				});
			}

			//validate multiple inputs
			if (stepToValidate.querySelector("[data-validate='inputs']")) {
				const inputsToValidate = [...stepToValidate.querySelectorAll('input')];
				valid = true;
				inputsToValidate.forEach((input) => {
					if (input.value.length < 1) {
						valid = false;
					}
				});
			}

			if (valid) {
				stepButton.classList.remove('is-disabled');
			}
		});
	}

	validateSteps();
});