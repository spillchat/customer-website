document.addEventListener("DOMContentLoaded", () => {
    let name,
      company,
      plan,
      peoplesum = 0,
      employees,
      struggling,
      email,
      sessionSum,
      annualSum = 0,
      monthlyFee = 0;
  
    //LOAD DATA FROM QUERY PARAMS
  
    const params = new URLSearchParams(window.location.search);
    if (params.has("name")) {
      name = params.get("name");
      const nameTexts = document.querySelectorAll("#is-name");
      nameTexts.forEach((nameText) => {
        nameText.innerHTML = name;
      });
    }
  
    if (params.has("company")) {
      company = params.get("company");
    }
  
    if (params.has("email")) {
      email = params.get("email");
    }
  
    if (params.has("plan")) {
      plan = params.get("plan");
      if (plan === "starter") {
        if (params.has("struggling")) {
          employees = parseInt(params.get("struggling"));
        }
      }
  
      if (plan === "team") {
        if (params.has("employees")) {
          employees = parseInt(params.get("employees"));
        }
      }
    }
  
    //store ui
    const openSuccess = document.querySelector(".open-success");
  
    //UI UPDATE
    //--THERAPY CAP
    const uiSessionSum = document.querySelector(".session-sum");
    let therapyCap = parseInt(uiSessionSum.innerHTML);
    const capMinus = document.querySelector(".cap-minus");
    const capPlus = document.querySelector(".cap-plus");
  
    capMinus.onclick = () => {
      minusCap();
    };
  
    capPlus.onclick = () => {
      plusCap();
    };
  
    function plusCap() {
      therapyCap = therapyCap + 1;
      calcPlan();
      updateUI();
    }
  
    function minusCap() {
      if (therapyCap < 2) {
        return false;
      }
      therapyCap = therapyCap - 1;
      calcPlan();
      updateUI();
    }
  
    //--SUMMARY
    const minMonthFee = document.querySelector(".monthly-fee");
    const perSessionFee = document.querySelectorAll(".session-fee");
    const annualMax = document.querySelectorAll(".annual-max");
    const peopleSupported = document.querySelector(".people-supported");
    const employeesSupported = document.querySelector(".employees-supported");
  
    //--INVOICE
    //----min
    const minPlatAccess = document.querySelector(".min-plat-access");
    const minTherapySessions = document.querySelector(".min-therapy-sessions");
    const minTherapyCoursesTotal = document.querySelector(".min-therapy-courses");
    const minPayPerYear = document.querySelector(".min-ppy");
    const minPayPerMonth = document.querySelector(".min-ppm");
    const minCourses = document.querySelector(".min-courses");
    const minSessions = document.querySelector(".min-sessions");
  
    //----max
    const maxPlatAccess = document.querySelector(".max-plat-access");
    const maxTherapySessions = document.querySelector(".max-therapy-sessions");
    const maxTherapyCourses = document.querySelector(".max-therapy-courses");
    const maxPayPerYear = document.querySelector(".max-ppy");
    const maxPayPerMonth = document.querySelector(".max-ppm");
    const maxCourses = document.querySelector(".max-courses");
    const maxSessions = document.querySelector(".max-sessions");
  
    //----starter
    const starterSubFee = document.querySelector(".starter-sub-fee");
    const starterTherapySessions = document.querySelector(
      ".starter-therapy-sessions"
    );
    const starterPayPerMonth = document.querySelector(".starter-ppm");
  
    //set initial state
    function setInit() {
      if (plan === "starter") {
        setStarter();
      }
  
      if (plan === "team") {
        setTeam();
      }
  
      updateUI();
    }
  
    function setStarter() {
      therapyCap = 6;
      $(".recommended-sessions").text(therapyCap);
      $(".is-team-ui").remove();
    }
  
    function setTeam() {
      $(".is-starter-ui").remove();
      therapyCap = employees * 2 + 6;
      annualSum = 5 * employees * 12 + 65 * therapyCap;
      $(".recommended-sessions").text(therapyCap);
  
      calcMax();
      calcMin();
    }
  
    setInit();
    //plan calculations
  
    function calcPlan() {
      if (plan === "starter") {
        calcStarter();
      }
  
      if (plan === "team") {
        calcTeam();
      }
  
      updateUI();
    }
  
    function calcTeam() {
      annualSum = 5 * employees * 12 + 65 * therapyCap;
      monthlyFee = 5 * employees;
      $(".starter-sessions").text(therapyCap);
  
      calcMax();
      calcMin();
    }
  
    function calcMax() {
      const platFormAccess = 5 * employees * 12;
  
      const courses = Math.floor((therapyCap * 0.8) / 6);
      const coursesTotal = courses * 65 * 6;
  
      const oneOffSessions = Math.round(therapyCap * 1.1 - courses * 6);
      const oneOffSessionsTotal = oneOffSessions * 65;
  
      const total = platFormAccess + coursesTotal + oneOffSessionsTotal;
      const totalPm = Math.round(total / 12);
  
      maxPlatAccess.innerHTML = platFormAccess;
      maxCourses.innerHTML = courses;
      maxTherapyCourses.innerHTML = coursesTotal;
      maxSessions.innerHTML = oneOffSessions;
      maxTherapySessions.innerHTML = oneOffSessionsTotal;
      maxPayPerYear.innerHTML = total;
      maxPayPerMonth.innerHTML = totalPm;
    }
  
    function calcMin() {
      const platFormAccess = 5 * employees * 12;
      const courses = Math.floor((therapyCap * 0.7) / 6);
      const coursesTotal = courses * 65 * 6;
  
      const oneOffSessions = Math.round(therapyCap * 0.9 - courses * 6);
      const oneOffSessionsTotal = oneOffSessions * 65;
  
      const total = platFormAccess + coursesTotal + oneOffSessionsTotal;
      const totalPm = Math.round(total / 12);
  
      minPlatAccess.innerHTML = platFormAccess;
      minCourses.innerHTML = courses;
      minTherapyCoursesTotal.innerHTML = coursesTotal;
      minSessions.innerHTML = oneOffSessions;
      minTherapySessions.innerHTML = oneOffSessionsTotal;
      minPayPerYear.innerHTML = total;
      minPayPerMonth.innerHTML = totalPm;
    }
  
    function calcStarter() {
      annualSum = therapyCap * 90 * employees;
  
      const starterTherapySessionsTotal = employees * 90 * 2;
  
      $(".starter-sessions").text(therapyCap);
      starterPayPerMonth.innerHTML = starterTherapySessionsTotal;
      starterTherapySessions.innerHTML = starterTherapySessionsTotal;
    }
  
    calcPlan();
  
    function updateUI() {
      uiSessionSum.innerHTML = therapyCap;
      $(".annual-max").text(annualSum.toString());
      peopleSupported.innerHTML = employees;
      $(".employees-supported").text(employees.toString());
      $(".monthly-fee").text(monthlyFee);
    }
  
    function updateForm() {
      $(".form-username").val(name);
      $(".form-company").val(company);
      $(".form-email").val(email);
      $(".form-cost").val(annualSum);
      $(".form-plan").val(plan);
      $(".form-employees").val(employees);
    }
  
    updateForm();
  
    function submitForm() {
      $(".hidden-form-submit").click();
    }
  
    const hiddenForm = document.querySelector("#hidden-form");
    hiddenForm.onsubmit = () => {
      openSuccess.click();
    };
  
    $(".send-quote").click(function () {
      updateForm();
      submitForm();
    });
  });
  