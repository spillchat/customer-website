document.addEventListener("DOMContentLoaded", () => {
  //update name/company when entered
  const nameBlocks = [...document.querySelectorAll(".form-name")];
  const companyBlocks = [...document.querySelectorAll(".form-comany")];

  const nameInput = document.querySelector(".is-form-name");
  let name = "";
  const companyInput = document.querySelector(".is-company-name");
  let company = "";
  const employeeInput = document.querySelector("#Employees");
  let employees = 0;
  const strugglingInput = document.querySelector("#struggling");
  let struggling;
  const plans = document.querySelector("#plans-group");
  let plan;
  let email;

  const estimateInput = document.querySelector("#estimate-quote");

  //set input
  nameInput.onkeyup = () => {
    name = nameInput.value;
    nameBlocks.forEach((nameBlock) => {
      nameBlock.innerHTML = name.trim();
    });
  };

  companyInput.onkeyup = () => {
    company = companyInput.value;
    companyBlocks.forEach((companyBlock) => {
      companyBlock.innerHTML = company.trim();
    });
  };

  employeeInput.onkeyup = () => {
    employees = employeeInput.value;
  };

  strugglingInput.onchange = () => {
    const choices = [...strugglingInput.querySelectorAll("input")];
    choices.forEach((choice) => {
      if (choice.checked === true) {
        struggling = choice.value;
      }
    });
  };

  plans.onchange = () => {
    plan = "starter";

    if (document.querySelector("#Option-1").checked) {
      plan = "starter";
    }
    if (document.querySelector("#Option-2").checked) {
      plan = "team";
    }
  };

  //progress
  const progressButtons = [
    ...document.querySelectorAll('[superform-element="next"]')
  ];
  const progressDots = [...document.querySelectorAll(".step-dot")];

  let progress = 0;
  const total = progressButtons.length;

  progressButtons.forEach((progressButton) => {
    progressButton.onclick = () => {
      const index = progressButtons.indexOf(progressButton) + 1;
      progress = (index / total) * 100;
      updateSteps();
      customScrollTop();
    };
  });

  function updateSteps() {
    if (progress >= 10) {
      makeComplete(progressDots[0]);
      makeActive(progressDots[1]);
    }

    if (progress >= 88) {
      makeComplete(progressDots[1]);
      makeActive(progressDots[2]);
    }

    if (progress >= 100) {
      makeComplete(progressDots[2]);
      makeActive(progressDots[3]);
    }
  }

  function customScrollTop() {
    $('[superform-element="form"]').parents().animate({ scrollTop: 0 }, 500);
  }

  function makeActive(el) {
    el.classList.add("is-active");
  }

  function makeComplete(el) {
    el.classList.add("is-complete");
  }

  //validate email
  const formSubmit = document.querySelector("#form-submit");
  const validateCheck = document.querySelector("#submit-check");
  const companyEmail = $("#Company-Email");
  const invalidDomains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com"];

  validateCheck.onclick = () => {
    // split email at '@' character to get domain
    const domainPart = companyEmail.val().split("@")[1];

    // if the domain exists in the invalidDomains array
    if (invalidDomains.indexOf(domainPart) !== -1) {
      // clear email field
      companyEmail.val("");
      // add a 'use business mail' placeholder
      companyEmail.attr("placeholder", "Please enter a business email");
      // prevent form submission
      return false;
    } else {
      // else if email is not invalid
      // submit form
      email = companyEmail.val();
      loadEstimate();
      formSubmit.click();
      return true;
    }
  };

  //check what happens when form submits
  const form = document.querySelector(".flow-form");
  form.addEventListener("submit", (e) => {
    let seconds = 5;
    const timer = document.querySelector("#seconds-timer");

    let interval = setInterval(() => {
      if (seconds === 0) {
        loadQuote();
        clearInterval(interval);
        return false;
      }
      seconds = seconds -= 1;
      timer.innerHTML = seconds.toString();
    }, 1000);
  });

  function loadEstimate() {
    let people = 0;
    let sessions = 0;
    let sum = 0;

    if (plan === "starter") {
      people = struggling;
      sessions = 6;
      sum = (sessions * 90 * people) / 3;
    } else {
      people = employees;
      sessions = people * 2 + 6;
      sum = (sessions * 65) / 12 + people * 5;
    }

    estimateInput.value = sum.toString();
    console.log(people, sessions, sum);
  }

  //validation
  function validateRadios() {
    const radioSteps = document.querySelectorAll('[superform-radio="true"]');
    radioSteps.forEach((step) => {
      const nextButton = step.querySelector(".step-next");
      disableButton(nextButton);
      const radioButtons = step.querySelectorAll("input");
      radioButtons.forEach((radioButton) => {
        radioButton.onclick = () => {
          enableButton(nextButton);
        };
      });
    });
  }

  validateRadios();

  function disableButton(button) {
    button.classList.add("is-disabled");
  }

  function enableButton(button) {
    button.classList.remove("is-disabled");
  }

  function loadQuote() {
    const quoteLink = document.querySelector(".quote-link");
    let url = quoteLink.getAttribute("href");

    let newUrl =
      url +
      `/?name=${name}&email=${email}&company=${company}&employees=${employees}&struggling=${struggling}&plan=${plan}`;
    quoteLink.setAttribute("href", newUrl);
    console.log(quoteLink);
    quoteLink.click();
  }
});
