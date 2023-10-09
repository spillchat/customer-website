const tempCompanySize = document.querySelector("#temp-company-size");
const companySizeInput = document.querySelector("#company-size");

tempCompanySize.onchange = () => {
  companySizeInput.value = tempCompanySize.value;
};

const modalForm = document.querySelector(".modal-form");
modalForm.onsubmit = (e) => {
  unlockPricing();
};

function unlockPricing() {
  document.querySelector(".modal-close").click();

  const beforeStates = [...document.querySelectorAll(".state-before")];
  const afterStates = [...document.querySelectorAll(".state-after")];

  beforeStates.forEach((state) => {
    state.style.display = "none";
  });

  afterStates.forEach((state) => {
    state.style.display = "block";
  });
}
