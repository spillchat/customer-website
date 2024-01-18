document.addEventListener("DOMContentLoaded", () => {
  //form element
  const form = document.querySelector("[superform-element='form']");

  const events = ["change", "keyup", "keypress", "blur", "keydown", "click"];

  //track plan
  const planInputs = [...document.querySelectorAll("[data-selection='plan']")];
  let plan;

  planInputs.forEach((input) => {
    events.forEach((event) => {
      input.addEventListener(event, () => {
        plan = input.dataset.plan;
        validateSteps();
        console.log(plan);
      });
    });
  });

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
        console.log(struggling);
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
      console.log(teamSize);
    });
  });

  //track name
  const nameInput = document.querySelector("[data-selection='name']");
  let name;

  events.forEach((event) => {
    nameInput.addEventListener(event, () => {
      name = nameInput.value;
      validateSteps();
      console.log(name);
    });
  });

  //track email
  const emailInput = document.querySelector("[data-selection='email']");
  let email;

  events.forEach((event) => {
    emailInput.addEventListener(event, () => {
      email = emailInput.value;
      emailInput.classList.remove("is-error");
      validateSteps();
      console.log(email);
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

  loadQuoteButton.addEventListener("click", () => {
    loadQuote();
  });

  function loadQuote() {
    console.log("load quote");

    const formSubmitButton = document.querySelector("[data-form='submit']");

    const quoteLink = document.querySelector(".quote-link");
    let url = quoteLink.getAttribute("href");

    //validate quote data

    let newUrl =
      url +
      `/?name=${name}&email=${email}&employees=${teamSize}&struggling=${struggling}&plan=${plan}`;
    quoteLink.setAttribute("href", newUrl);

    let formURL =
      "https://" +
      window.location.hostname +
      window.location.pathname +
      `-quote?name=${name}&email=${email}&employees=${teamSize}&struggling=${struggling}&plan=${plan}`;

    document.querySelector("[data-selection='url']").value = formURL;

    formSubmitButton.click();

    redirectURL(8000);
  }

  //countdown timer
  const countdownTimer = document.querySelector(".countdown-timer");

  function redirectURL(time) {
    let counter = Number(time / 1000);
    countdownTimer.innerText = counter.toString();

    setInterval(() => {
      counter--;
      countdownTimer.innerText = counter.toString();
    }, 1000);

    setTimeout(() => {
      document.querySelector(".quote-link").click();
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

  const headerProgressDots = [...document.querySelectorAll(".form-header-dot")];
  let currIndex = 0;

  const nextSlideButtons = [
    ...document.querySelectorAll("[superform-element='next']"),
  ];

  const prevSlideButtons = [
    ...document.querySelectorAll("[superform-element='back']"),
  ];

  nextSlideButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currIndex = index;
      console.log("clicked");
      updateProgressDots();
    });
  });

  prevSlideButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currIndex = index - 1;
      console.log(index);
      updateProgressDots();
    });
  });

  function updateProgressDots() {
    headerProgressDots.forEach((progressDot, progressIndex) => {
      if (progressIndex <= currIndex + 1) {
        progressDot.classList.add("is-active");
      } else {
        progressDot.classList.remove("is-active");
      }
    });
  }

  //show loading
  const finalStepButton = document.querySelector("[data-form='last-step']");

  finalStepButton.addEventListener("click", () => {
    [".form-header-text", ".form-header_loading"].forEach((item) => {
      document.querySelector(item).classList.remove("is-hidden");
    });

    document.querySelector(".form-header-dots").remove();
    document.querySelector(".form-step_header-logo").remove();
  });

  //validate email
  const validateCheck = document.querySelector("[data-form='validate-email']");
  const invalidDomains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com"];
  const companyEmail = $("[data-selection='email']");

  validateCheck.onclick = () => {
    // split email at '@' character to get domain
    const domainPart = companyEmail.val().split("@")[1];

    // if the domain exists in the invalidDomains array
    if (invalidDomains.indexOf(domainPart) !== -1) {
      // clear email field
      companyEmail.val("");
      // add a 'use business mail' placeholder
      companyEmail.attr("placeholder", "Please enter a business email");
      emailInput.classList.add("is-error");
      console.log("error");
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
      const stepButton = stepToValidate.querySelector(".step-next");
      if (stepButton) {
        stepButton.classList.add("is-disabled");
      }
      let valid = false;

      //validate radios
      if (stepToValidate.querySelector("[data-validate='radio']")) {
        const radiosToValidate = [...stepToValidate.querySelectorAll("input")];
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
          ...stepToValidate.querySelectorAll("input"),
        ];
        checkboxesToValidate.forEach((checkbox) => {
          if (checkbox.checked) {
            valid = true;
          }
        });
      }

      //validate multiple inputs
      if (stepToValidate.querySelector("[data-validate='inputs']")) {
        const inputsToValidate = [...stepToValidate.querySelectorAll("input")];
        valid = true;
        inputsToValidate.forEach((input) => {
          if (input.value.length < 1) {
            valid = false;
          }
        });
      }

      if (valid) {
        stepButton.classList.remove("is-disabled");
      }
    });
  }

  validateSteps();
});

// document.addEventListener("DOMContentLoaded", () => {
//   //update name/company when entered
//   const nameBlocks = [...document.querySelectorAll(".form-name")];
//   const companyBlocks = [...document.querySelectorAll(".form-comany")];

//   const nameInput = document.querySelector(".is-form-name");
//   let name = "";
//   const companyInput = document.querySelector(".is-company-name");
//   let company = "";
//   const employeeInput = document.querySelector("#Employees");
//   let employees = 0;
//   const strugglingInput = document.querySelector("#struggling");
//   let struggling;
//   const plans = document.querySelector("#plans-group");
//   let plan;
//   let email;

//   const estimateInput = document.querySelector("#estimate-quote");

//   //set input
//   nameInput.onkeyup = () => {
//     name = nameInput.value;
//     nameBlocks.forEach((nameBlock) => {
//       nameBlock.innerHTML = name.trim();
//     });
//   };

//   companyInput.onkeyup = () => {
//     company = companyInput.value;
//     companyBlocks.forEach((companyBlock) => {
//       companyBlock.innerHTML = company.trim();
//     });
//   };

//   employeeInput.onkeyup = () => {
//     employees = employeeInput.value;
//   };

//   strugglingInput.onchange = () => {
//     const choices = [...strugglingInput.querySelectorAll("input")];
//     choices.forEach((choice) => {
//       if (choice.checked === true) {
//         struggling = choice.value;
//       }
//     });
//   };

//   plans.onchange = () => {
//     plan = "starter";

//     if (document.querySelector("#Option-1").checked) {
//       plan = "starter";
//     }
//     if (document.querySelector("#Option-2").checked) {
//       plan = "team";
//     }
//   };

//   //progress
//   const progressButtons = [
//     ...document.querySelectorAll('[superform-element="next"]'),
//   ];
//   const progressDots = [...document.querySelectorAll(".step-dot")];

//   let progress = 0;
//   const total = progressButtons.length;

//   progressButtons.forEach((progressButton) => {
//     progressButton.onclick = () => {
//       const index = progressButtons.indexOf(progressButton) + 1;
//       progress = (index / total) * 100;
//       updateSteps();
//       customScrollTop();
//     };
//   });

//   function updateSteps() {
//     if (progress >= 10) {
//       makeComplete(progressDots[0]);
//       makeActive(progressDots[1]);
//     }

//     if (progress >= 88) {
//       makeComplete(progressDots[1]);
//       makeActive(progressDots[2]);
//     }

//     if (progress >= 100) {
//       makeComplete(progressDots[2]);
//       makeActive(progressDots[3]);
//     }
//   }

//   function customScrollTop() {
//     $('[superform-element="form"]').parents().animate({ scrollTop: 0 }, 500);
//   }

//   function makeActive(el) {
//     el.classList.add("is-active");
//   }

//   function makeComplete(el) {
//     el.classList.add("is-complete");
//   }

//   //validate email
//   const formSubmit = document.querySelector("#form-submit");
//   const validateCheck = document.querySelector("#email");
//   const companyEmail = $("#Company-Email");
//   const invalidDomains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com"];

//   validateCheck.onclick = () => {
//     // split email at '@' character to get domain
//     const domainPart = companyEmail.val().split("@")[1];

//     // if the domain exists in the invalidDomains array
//     if (invalidDomains.indexOf(domainPart) !== -1) {
//       // clear email field
//       companyEmail.val("");
//       // add a 'use business mail' placeholder
//       companyEmail.attr("placeholder", "Please enter a business email");
//       // prevent form submission
//       return false;
//     } else {
//       // else if email is not invalid
//       // submit form
//       email = companyEmail.val();
//       loadEstimate();
//       formSubmit.click();
//       return true;
//     }
//   };

//   //check what happens when form submits
//   const form = document.querySelector(".flow-form");
//   form.addEventListener("submit", (e) => {
//     let seconds = 5;
//     const timer = document.querySelector("#seconds-timer");

//     let interval = setInterval(() => {
//       if (seconds === 0) {
//         loadQuote();
//         clearInterval(interval);
//         return false;
//       }
//       seconds = seconds -= 1;
//       timer.innerHTML = seconds.toString();
//     }, 1000);
//   });

//   function loadEstimate() {
//     let people = 0;
//     let sessions = 0;
//     let sum = 0;

//     if (plan === "starter") {
//       people = struggling;
//       sessions = 6;
//       sum = (sessions * 90 * people) / 3;
//     } else {
//       people = employees;
//       sessions = people * 2 + 6;
//       sum = (sessions * 65) / 12 + people * 5;
//     }

//     estimateInput.value = sum.toString();
//     console.log(people, sessions, sum);
//   }

//   //validation
//   function validateRadios() {
//     const radioSteps = document.querySelectorAll('[superform-radio="true"]');
//     radioSteps.forEach((step) => {
//       const nextButton = step.querySelector(".step-next");
//       disableButton(nextButton);
//       const radioButtons = step.querySelectorAll("input");
//       radioButtons.forEach((radioButton) => {
//         radioButton.onclick = () => {
//           enableButton(nextButton);
//         };
//       });
//     });
//   }

//   validateRadios();

//   function disableButton(button) {
//     button.classList.add("is-disabled");
//   }

//   function enableButton(button) {
//     button.classList.remove("is-disabled");
//   }

//   function loadQuote() {
//     const quoteLink = document.querySelector(".quote-link");
//     let url = quoteLink.getAttribute("href");

//     let newUrl =
//       url +
//       `/?name=${name}&email=${email}&company=${company}&employees=${employees}&struggling=${struggling}&plan=${plan}`;
//     quoteLink.setAttribute("href", newUrl);
//     console.log(quoteLink);
//     quoteLink.click();
//   }
// });
