document.addEventListener("DOMContentLoaded", () => {
  let name;
  let company;
  let plan;
  let peopleSum = 0;
  let email;
  let sessionSum;
  const quoteTotals = document.querySelectorAll(".quote-total");
  const peopleBlocks = document.querySelectorAll("#people-sum");


  //load variables
  const params = new URLSearchParams(window.location.search);
  if (params.has("name")) {
    name = params.get("name");
    document.querySelector("#is-name").innerHTML = name;
    document.querySelector("#name").value = name;
  }

  if (params.has("company")) {
    company = params.get("company");
    document.querySelector("#is-company").innerHTML = company;
    document.querySelector("#company").value = company;
  }

  if (params.has("email")) {
    email = params.get("email");
    document.querySelector("#email").value = email;
  }

  if (params.has("plan")) {
    plan = params.get("plan");
    document.querySelector("#plan").value = plan;

    const teamUI = [...document.querySelectorAll(".is-team-ui")];
    const starterUI = [...document.querySelectorAll(".is-starter-ui")];

    if (plan === "team") {
      teamUI.forEach((item) => (item.style.display = "flex"));
      starterUI.forEach((item) => (item.style.display = "none"));

      if (params.has("employees")) {
        peopleSum = parseInt(params.get("employees"));
        setPeople(peopleSum);
        setRecommended();
      }
    }

    if (plan === "starter") {
      teamUI.forEach((item) => (item.style.display = "none"));
      starterUI.forEach((item) => (item.style.display = "flex"));

      if (params.has("struggling")) {
        peopleSum = parseInt(params.get("struggling"));
        setPeople(peopleSum);
        setRecommended();
      }
    }
  }

  function setPeople(num) {
    peopleSum = num;
    document.querySelector("#employees").value = peopleSum;
    peopleBlocks.forEach((block) => {
      block.innerText = peopleSum.toString();
    });
  }

  //setup inputs
  const saveQuotes = document.querySelectorAll('[data-quote="submit"]');

  saveQuotes.forEach((saveButton) => {
    saveButton.onclick = () => {
      document.querySelector("#hidden-submit").click();
    };
  });

  document.querySelector("#hidden-form").onsubmit = () => {
    console.log("submitted");
  };

  const inputBlocks = [...document.querySelectorAll(".quote-caps-content")];
  inputBlocks.forEach((inputBlock) => {
    //plus
    if (inputBlock.querySelector("#people-plus")) {
      inputBlock.querySelector("#people-plus").onclick = () => {
        peopleSum = parseInt(inputBlock.querySelector("#people-sum").innerText);
        peopleSum = peopleSum += 1;
        inputBlock.querySelector("#people-sum").innerText = peopleSum;
        updateCalc();
      };
    }

    if (inputBlock.querySelector("#people-minus")) {
      inputBlock.querySelector("#people-minus").onclick = () => {
        peopleSum = parseInt(inputBlock.querySelector("#people-sum").innerText);
        if (peopleSum < 2) {
          return false;
        }
        peopleSum = peopleSum -= 1;
        inputBlock.querySelector("#people-sum").innerText = peopleSum;
        updateCalc();
      };
    }

    inputBlock.querySelector("#session-plus").onclick = () => {
      sessionSum = parseInt(inputBlock.querySelector("#session-sum").innerText);
      sessionSum = sessionSum += 2;
      inputBlock.querySelector("#session-sum").innerText = sessionSum;
      updateCalc();
    };

    inputBlock.querySelector("#session-minus").onclick = () => {
      sessionSum = parseInt(inputBlock.querySelector("#session-sum").innerText);
      if (sessionSum < 3) {
        return false;
      }
      sessionSum = sessionSum -= 2;
      inputBlock.querySelector("#session-sum").innerText = sessionSum;
      updateCalc();
    };
  });

  //calculate
  function updateCalc() {
    if (plan === "team") {
      calcTeam();
    } else {
      calcStarter();
    }
  }

  function calcTeam() {
    const sum = (sessionSum * 65) / 12 + peopleSum * 5;
    updateTotal(sum);
  }

  function calcStarter() {
    const sum = (sessionSum * 90 * peopleSum) / 3;
    console.log(peopleSum, sessionSum, sum);
    updateTotal(sum);
  }

  //update total
  function updateTotal(sum) {
    const currentSum = Math.ceil(sum);
    document.querySelector("#cost").value = currentSum;
    quoteTotals.forEach((quoteTotal) => {
      quoteTotal.innerText = currentSum.toString();
    });
  }

  //set recommended
  function setRecommended() {
    if (plan === "team") {
      sessionSum = peopleSum * 2 + 6;
    } else {
      sessionSum = 6;
    }
    const sums = document.querySelectorAll("#session-sum");

    sums.forEach((sum) => {
      sum.innerText = sessionSum;
    });

    updateCalc();
  }
});
