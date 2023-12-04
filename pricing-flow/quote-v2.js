document.addEventListener("DOMContentLoaded", () => {
  let clientInfo = {
    name: "",
    email: "",
    plan: "",
    employees: 32,
    struggling: 2,
    sessions: 6,
  };

  let planInfo = {};

  //load data from params
  function loadParamsData() {
    const params = new URLSearchParams(window.location.search);

    if (params.has("name")) {
      clientInfo.name = params.get("name");
    }

    if (params.has("email")) {
      clientInfo.email = params.get("email");
    }

    if (params.has("plan")) {
      clientInfo.plan = params.get("plan");
    }

    if (params.has("employees")) {
      clientInfo.employees = params.get("employees");
    }

    if (params.has("struggling")) {
      clientInfo.struggling = params.get("struggling");
    }
  }
  loadParamsData();

  //set ui
  function setUI() {
    const starterUI = [...document.querySelectorAll(".is-starter-ui")];
    const teamUI = [...document.querySelectorAll(".is-team-ui")];

    if (clientInfo.plan === "starter") {
      teamUI.forEach((ui) => {
        ui.style.display = "none";
      });
      starterUI.forEach((ui) => {
        ui.style.display = "block";
      });
    }

    if (clientInfo.plan === "team") {
      teamUI.forEach((ui) => {
        ui.style.display = "block";
      });
      starterUI.forEach((ui) => {
        ui.style.display = "none";
      });
    }
  }

  setUI();

  //set sliders
  function setSliders() {
    const sliderComponents = [
      ...document.querySelectorAll(".q-slider_component"),
    ];

    sliderComponents.forEach((slider) => {
      const quoteSlider = new Swiper(slider.querySelector(".swiper.is-quote"), {
        speed: 500,
        effect: "slide",
        direction: "horizontal",
        slidesPerView: "auto",
        loop: true,
        keyboard: true,
        navigation: {
          nextEl: slider.querySelector(".q-slider-button.is-next"),
          prevEl: slider.querySelector(".q-slider-button.is-prev"),
        },
      });
    });
  }

  setSliders();

  //calc plan
  function calcPlan() {
    if (clientInfo.plan === "team") {
      //calc platform access
      const platAccessFee = 5 * clientInfo.employees;

      //calc session p/m
      const monthlySessions = Math.round((clientInfo.employees * 2 + 6) / 12);

      //calc cost per sessions
      const costPerSession = 65;

      //calc monthly cost
      const monthlyCost = platAccessFee + monthlySessions * costPerSession;

      //calc yearly cost
      const yearlyCost = monthlyCost * 12;

      planInfo.platAcessFee = platAccessFee;
      planInfo.costPerSession = costPerSession;
      planInfo.monthlySessions = monthlySessions;
      planInfo.monthlyCost = monthlyCost;
      planInfo.yearlyCost = yearlyCost;
    }

    if (clientInfo.plan === "starter") {
      const yearlyCost = clientInfo.struggling * clientInfo.sessions * 90;

      planInfo.yearlyCost = yearlyCost;
    }
  }

  calcPlan();

  //update ui
  function updateUI() {
    const planInfos = [...document.querySelectorAll("[data-quote='plan']")];
    planInfos.forEach((planInfo) => {
      planInfo.innerText = clientInfo.plan.toString();
    });

    const emps = [...document.querySelectorAll("[data-quote='employees']")];
    emps.forEach((emp) => {
      emp.innerText = clientInfo.employees.toString();
    });

    //update team UI
    if (clientInfo.plan === "team") {
      const uiSessions = [
        ...document.querySelectorAll("[data-quote='sessions']"),
      ];

      uiSessions.forEach((sessions) => {
        sessions.innerText = planInfo.monthlySessions;
      });

      //plat access
      const uiPlatAccess = [
        ...document.querySelectorAll("[data-quote='plat-access']"),
      ];

      uiPlatAccess.forEach((platAccess) => {
        platAccess.innerText = planInfo.platAcessFee.toLocaleString("en-US");
      });

      //monthly cost
      const uiMonthlyCost = [
        ...document.querySelectorAll("[data-quote='monthly-cost']"),
      ];

      uiMonthlyCost.forEach((monthlyCost) => {
        monthlyCost.innerText = planInfo.monthlyCost.toLocaleString("en-US");
      });

      //yearly cost
      const uiYearlyCost = [
        ...document.querySelectorAll("[data-quote='yearly-cost']"),
      ];

      uiYearlyCost.forEach((yearlyCost) => {
        yearlyCost.innerText = planInfo.yearlyCost.toLocaleString("en-US");
      });
    }

    if (clientInfo.plan === "starter") {
      //update struggling
      const uiStruggling = [
        ...document.querySelectorAll("[data-quote='struggling']"),
      ];

      uiStruggling.forEach((struggling) => {
        struggling.innerText = clientInfo.struggling.toString();
      });

      //update sessions
      const uiSessions = [
        ...document.querySelectorAll("[data-quote='sessions']"),
      ];

      uiSessions.forEach((sessions) => {
        sessions.innerText = clientInfo.sessions.toString();
      });

      //update cost
      const uiCost = [...document.querySelectorAll("[data-quote='cost']")];

      uiCost.forEach((cost) => {
        cost.innerText = planInfo.yearlyCost.toLocaleString("en-US");
      });
    }
  }

  updateUI();

  //edit plans

  //update button when you change plans
  const sendQuoteButton = document.querySelector("[data-quote='resend']");
  sendQuoteButton.classList.remove("is-active");

  function makeQuoteActive() {
    sendQuoteButton.classList.add("is-active");
    sendQuoteButton.querySelector(".send-quote-text").innerText =
      "Send my updated quote to me by email";
    sendQuoteButton.addEventListener("click", sendQuote);
  }

  //add/subtract values
  document.querySelector("[data-quote='minus-support']").onclick = () => {
    if (clientInfo.struggling <= 1) {
      return false;
    } else {
      clientInfo.struggling = parseInt(clientInfo.struggling) - 1;
      calcPlan();
      updateUI();
    }
  };

  document.querySelector("[data-quote='plus-support']").onclick = () => {
    clientInfo.struggling = parseInt(clientInfo.struggling) + 1;
    calcPlan();
    updateUI();
  };

  document.querySelector("[data-quote='minus-sessions']").onclick = () => {
    if (clientInfo.sessions <= 1) {
      return false;
    } else {
      clientInfo.sessions = parseInt(clientInfo.sessions) - 1;
      calcPlan();
      updateUI();
    }
  };

  document.querySelector("[data-quote='plus-sessions']").onclick = () => {
    clientInfo.sessions = parseInt(clientInfo.sessions) + 1;
    calcPlan();
    updateUI();
  };

  //change plans
  document.querySelector("[data-quote='load-starter']").onclick = () => {
    clientInfo.plan = "starter";
    makeQuoteActive();
    setUI();
    calcPlan();
    updateUI();
  };

  document.querySelector("[data-quote='load-team']").onclick = () => {
    clientInfo.plan = "team";
    makeQuoteActive();
    setUI();
    calcPlan();
    updateUI();
  };

  console.log(clientInfo);

  //send quote
  const form = document.querySelector(".hidden-form");

  //update form submit on submit
  form.onsubmit = () => {
    sendQuoteButton.querySelector(".send-quote-text").innerText = "Email sent!";
    sendQuoteButton.removeEventListener("click", sendQuote);
  };

  function sendQuote() {
    const formSubmit = document.querySelector("[data-form='submit']");
    const formName = document.querySelector("[data-form='name']");
    const formEmail = document.querySelector("[data-form='email']");
    const formEmployees = document.querySelector("[data-form='employees']");
    const formStruggling = document.querySelector("[data-form='struggling']");
    const formCost = document.querySelector("[data-form='cost']");
    const formPlan = document.querySelector("[data-form='plan']");
    const formURL = document.querySelector("[data-form='url']");

    formName.value = clientInfo.name;
    formEmail.value = clientInfo.email;
    formEmployees.value = clientInfo.employees;
    formStruggling.value = clientInfo.struggling;
    formCost.value = planInfo.yearlyCost;
    formPlan.value = clientInfo.plan;
    formURL.value = generateURL();

    formSubmit.click();
  }

  //generate URL
  function generateURL() {
    let url =
      "https://" +
      window.location.hostname +
      window.location.pathname +
      `?name=${clientInfo.name}&email=${clientInfo.email}&employees=${clientInfo.employees}&struggling=${clientInfo.struggling}&plan=${clientInfo.plan}`;

    console.log(url);

    return url;
  }

  generateURL();
});

// document.addEventListener("DOMContentLoaded", () => {
//   let name,
//     company,
//     plan,
//     peoplesum = 0,
//     employees,
//     struggling,
//     email,
//     sessionSum,
//     annualSum = 0,
//     monthlyFee = 0;

//   //LOAD DATA FROM QUERY PARAMS

//   const params = new URLSearchParams(window.location.search);
//   if (params.has("name")) {
//     name = params.get("name");
//     const nameTexts = document.querySelectorAll("#is-name");
//     nameTexts.forEach((nameText) => {
//       nameText.innerHTML = name;
//     });
//   }

//   if (params.has("company")) {
//     company = params.get("company");
//   }

//   if (params.has("email")) {
//     email = params.get("email");
//   }

//   if (params.has("plan")) {
//     plan = params.get("plan");
//     if (plan === "starter") {
//       if (params.has("struggling")) {
//         employees = parseInt(params.get("struggling"));
//       }
//     }

//     if (plan === "team") {
//       if (params.has("employees")) {
//         employees = parseInt(params.get("employees"));
//       }
//     }
//   }

//   //store ui
//   const openSuccess = document.querySelector(".open-success");

//   //UI UPDATE
//   //--People
//   const peopleMinus = document.querySelector(".people-minus");
//   const peoplePlus = document.querySelector(".people-plus");

//   peopleMinus.onclick = () => {
//     minusPeople();
//   };

//   peoplePlus.onclick = () => {
//     plusPeople();
//   };

//   function minusPeople() {
//     if (employees < 2) {
//       return false;
//     }
//     employees = employees - 1;
//     calcPlan();
//     updateUI();
//   }
//   function plusPeople() {
//     employees = employees + 1;
//     calcPlan();
//     updateUI();
//   }

//   //--THERAPY CAP
//   const uiSessionSum = document.querySelector(".session-sum");
//   let therapyCap = parseInt(uiSessionSum.innerHTML);
//   const capMinus = document.querySelector(".cap-minus");
//   const capPlus = document.querySelector(".cap-plus");

//   capMinus.onclick = () => {
//     minusCap();
//   };

//   capPlus.onclick = () => {
//     plusCap();
//   };

//   function plusCap() {
//     therapyCap = therapyCap + 1;
//     calcPlan();
//     updateUI();
//   }

//   function minusCap() {
//     if (therapyCap < 2) {
//       return false;
//     }
//     therapyCap = therapyCap - 1;
//     calcPlan();
//     updateUI();
//   }

//   //--SUMMARY
//   const minMonthFee = document.querySelector(".monthly-fee");
//   const perSessionFee = document.querySelectorAll(".session-fee");
//   const annualMax = document.querySelectorAll(".annual-max");
//   const peopleSupported = document.querySelector(".people-supported");
//   const employeesSupported = document.querySelector(".employees-supported");

//   //--INVOICE
//   //----min
//   const minPlatAccess = document.querySelector(".min-plat-access");
//   const minTherapySessions = document.querySelector(".min-therapy-sessions");
//   const minTherapyCoursesTotal = document.querySelector(".min-therapy-courses");
//   const minPayPerYear = document.querySelector(".min-ppy");
//   const minPayPerMonth = document.querySelector(".min-ppm");
//   const minCourses = document.querySelector(".min-courses");
//   const minSessions = document.querySelector(".min-sessions");

//   //----max
//   const maxPlatAccess = document.querySelector(".max-plat-access");
//   const maxTherapySessions = document.querySelector(".max-therapy-sessions");
//   const maxTherapyCourses = document.querySelector(".max-therapy-courses");
//   const maxPayPerYear = document.querySelector(".max-ppy");
//   const maxPayPerMonth = document.querySelector(".max-ppm");
//   const maxCourses = document.querySelector(".max-courses");
//   const maxSessions = document.querySelector(".max-sessions");

//   //----starter
//   const starterSubFee = document.querySelector(".starter-sub-fee");
//   const starterTherapySessions = document.querySelector(
//     ".starter-therapy-sessions"
//   );
//   const starterPayPerMonth = document.querySelector(".starter-ppm");

//   //set initial state
//   function setInit() {
//     if (plan === "starter") {
//       setStarter();
//     }

//     if (plan === "team") {
//       setTeam();
//     }

//     updateUI();
//   }

//   function setStarter() {
//     therapyCap = 6;
//     $(".recommended-sessions").text(therapyCap);
//     $(".is-team-ui").remove();
//   }

//   function setTeam() {
//     $(".is-starter-ui").remove();
//     therapyCap = employees * 2 + 6;
//     annualSum = 5 * employees * 12 + 65 * therapyCap;
//     $(".recommended-sessions").text(therapyCap);

//     calcMax();
//     calcMin();
//   }

//   setInit();
//   //plan calculations

//   function calcPlan() {
//     if (plan === "starter") {
//       calcStarter();
//     }

//     if (plan === "team") {
//       calcTeam();
//     }

//     updateUI();
//   }

//   function calcTeam() {
//     annualSum = 5 * employees * 12 + 65 * therapyCap;
//     monthlyFee = 5 * employees;
//     $(".starter-sessions").text(therapyCap);

//     calcMax();
//     calcMin();
//   }

//   function calcMax() {
//     const platFormAccess = 5 * employees * 12;

//     const courses = Math.floor((therapyCap * 0.8) / 6);
//     const coursesTotal = courses * 65 * 6;

//     const oneOffSessions = Math.round(therapyCap * 1.1 - courses * 6);
//     const oneOffSessionsTotal = oneOffSessions * 65;

//     const total = platFormAccess + coursesTotal + oneOffSessionsTotal;
//     const totalPm = Math.round(total / 12);

//     maxPlatAccess.innerHTML = platFormAccess;
//     maxCourses.innerHTML = courses;
//     maxTherapyCourses.innerHTML = coursesTotal;
//     maxSessions.innerHTML = oneOffSessions;
//     maxTherapySessions.innerHTML = oneOffSessionsTotal;
//     maxPayPerYear.innerHTML = total;
//     maxPayPerMonth.innerHTML = totalPm;
//   }

//   function calcMin() {
//     const platFormAccess = 5 * employees * 12;
//     const courses = Math.floor((therapyCap * 0.7) / 6);
//     const coursesTotal = courses * 65 * 6;

//     const oneOffSessions = Math.round(therapyCap * 0.9 - courses * 6);
//     const oneOffSessionsTotal = oneOffSessions * 65;

//     const total = platFormAccess + coursesTotal + oneOffSessionsTotal;
//     const totalPm = Math.round(total / 12);

//     minPlatAccess.innerHTML = platFormAccess;
//     minCourses.innerHTML = courses;
//     minTherapyCoursesTotal.innerHTML = coursesTotal;
//     minSessions.innerHTML = oneOffSessions;
//     minTherapySessions.innerHTML = oneOffSessionsTotal;
//     minPayPerYear.innerHTML = total;
//     minPayPerMonth.innerHTML = totalPm;
//   }

//   function calcStarter() {
//     annualSum = therapyCap * 90 * employees;

//     const starterTherapySessionsTotal = employees * 90 * 2;

//     $(".starter-sessions").text(therapyCap);
//     starterPayPerMonth.innerHTML = starterTherapySessionsTotal;
//     starterTherapySessions.innerHTML = starterTherapySessionsTotal;
//   }

//   calcPlan();

//   function updateUI() {
//     uiSessionSum.innerHTML = therapyCap;
//     $(".annual-max").text(annualSum.toString());
//     peopleSupported.innerHTML = employees;
//     $(".people-supported-sessions").text(employees * 2);
//     $(".employees-supported").text(employees.toString());
//     $(".monthly-fee").text(monthlyFee);
//   }

//   function updateForm() {
//     $(".form-username").val(name);
//     $(".form-company").val(company);
//     $(".form-email").val(email);
//     $(".form-cost").val(annualSum);
//     $(".form-plan").val(plan);
//     $(".form-employees").val(employees);
//   }

//   updateForm();

//   function submitForm() {
//     $(".hidden-form-submit").click();
//   }

//   const hiddenForm = document.querySelector("#hidden-form");
//   hiddenForm.onsubmit = () => {
//     openSuccess.click();
//   };

//   $(".send-quote").click(function () {
//     updateForm();
//     submitForm();
//   });
// });