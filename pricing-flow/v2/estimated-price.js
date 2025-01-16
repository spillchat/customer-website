window.addEventListener('load', () => {
	const form = document.querySelector('#wf-form-Build-Your-Plan');
	const submitButton = document.querySelector('#form-submit');

	//pricing variables
	let noOfEmployees = 10;
	let sessionsPerMonth = 1;
	let pricePerSession = 79;
	let pricePerMonth = 100;

	//adons pricing
	const addonSet = new Set();
	let healthInsuranceIntegrationPrice = 39,
		teamCheckinsPrice = 39,
		askTherapistPrice = 49,
		selfGuidedContentPrice = 18,
		adhdSupportPrice = 90,
		mentalHealthTrainingPrice = 195;

	const employeeButtons = [
		...document.querySelectorAll('#input-employees .price-num_btn'),
	];
	const employeeNum = document.querySelector('#input-employees input');

	employeeButtons[0].addEventListener('click', countDown);
	employeeButtons[1].addEventListener('click', countUp);
	employeeNum.addEventListener('keyup', updateEmployees);

	function updateEmployees() {
		if (employeeNum.value < 2) {
			employeeNum.value = 1;
			noOfEmployees = 1;
		} else {
			noOfEmployees = parseInt(employeeNum.value);
		}

		updateUI();
	}

	function countDown() {
		if (noOfEmployees < 2) {
			return false;
		} else {
			noOfEmployees -= 1;
		}

		updateUI();
	}

	function countUp() {
		noOfEmployees += 1;

		updateUI();
	}

	//manage addons
	const addonChecks = [
		...document.querySelectorAll("#addon-cols input[type='checkbox']"),
	];

	const addonRows = [...document.querySelectorAll('#addon-rows .feature-row')];

	for (let i = 0; i < addonChecks.length; i++) {
		addonChecks[i].addEventListener('change', function () {
			checkChanged(addonChecks[i], i);
		});
	}

	function checkChanged(checkbox, index) {
		if (checkbox.checked) {
			addonSet.add(addonRows[index].dataset.addon);
			addonRows[index].dataset.toggle = 'on';
		} else {
			addonSet.delete(addonRows[index].dataset.addon);
			addonRows[index].dataset.toggle = 'off';
		}

		updateUI();
	}

	//Update UI
	const displayEmployees = document.querySelector('#display-employees');
	const displaySalesBlock = document.querySelector('#sales-block');
	const displayAddonCols = document.querySelector('#addon-cols');
	const displayAddonRowsContainer = document.querySelector('#addon-rows');
	const displaySessionsCol = document.querySelector('#sessions-col');
	const displayThreshold = [...document.querySelectorAll('.display-threshold')];

	//update pricing
	const displayPricePerSession = document.querySelector('#price-per-session');
	const displaySessionsPerMonth = document.querySelector(
		'#display-sessions-pm'
	);
	const displayPricePerMonth = document.querySelector('#display-price-monthly');

	//update addons pricing
	const displayAskTherpaist = document.querySelector('#display-ask-therapist');
	const displaySelfGuidedContent = document.querySelector('#display-sgc');
	const displayMentalHealth = document.querySelector('#display-mental-health');
	const displayCheckIn = document.querySelector('#display-check-in');
	const displayHealthInsuranceIntegration = document.querySelector(
		'#display-integration'
	);
	const displayAdhd = document.querySelector('#display-adhd');

	function hideElements(elements) {
		elements.forEach((element) => (element.style.display = 'none'));
	}

	function showElements(elements) {
		elements.forEach((element) => (element.style.disply = 'block'));
	}

	function updateUI() {
		calcPrice();

		addonRows.forEach((row) => {
			if (row.dataset.toggle === 'on') {
				row.style.display = 'flex';
			} else {
				row.style.display = 'none';
			}
		});

		//employees
		employeeNum.value = noOfEmployees;
		displayEmployees.textContent = noOfEmployees;

		if (noOfEmployees >= 1200) {
			displaySalesBlock.style.display = 'block';
			displayThreshold[1].style.display = 'block';

			displayAddonCols.style.display = 'none';
			displayAddonRowsContainer.style.display = 'none';
			displaySessionsCol.style.display = 'none';
			displayEmployees.style.display = 'none';
			displayThreshold[0].style.display = 'none';
		} else {
			displaySalesBlock.style.display = 'none';
			displayThreshold[1].style.display = 'none';

			displayAddonCols.style.display = 'block';
			displayAddonRowsContainer.style.display = 'block';
			displaySessionsCol.style.display = 'block';
			displayEmployees.style.display = 'inline';
			displayThreshold[0].style.display = 'block';
		}

		//update prices
		displayPricePerMonth.textContent = pricePerMonth;
		displaySessionsPerMonth.textContent = sessionsPerMonth;
		displayPricePerSession.textContent = pricePerSession;

		//update addons
		displayAdhd.textContent = adhdSupportPrice;
		displayHealthInsuranceIntegration.textContent =
			healthInsuranceIntegrationPrice;
		displayCheckIn.textContent = teamCheckinsPrice;
		displayMentalHealth.textContent = mentalHealthTrainingPrice;
		displaySelfGuidedContent.textContent = selfGuidedContentPrice;
		displayAskTherpaist.textContent = askTherapistPrice;
	}

	function calcPrice() {
		//calculate addons
		selfGuidedContentPrice = getSelfGuidedContentPrice(noOfEmployees);
		askTherapistPrice = getAskTherapistPrice(noOfEmployees);
		teamCheckinsPrice = getTeamCheckinsPrice(noOfEmployees);
		healthInsuranceIntegrationPrice =
			getHealthInsuranceIntegrationPrice(noOfEmployees);

		// get sessions
		sessionsPerMonth = (Math.ceil((noOfEmployees * 0.6) / 12) * 12) / 12;
		pricePerSession = getPricePerSession(sessionsPerMonth);

		if (addonSet.has('adhd')) {
			pricePerSession += adhdSupportPrice;
		}

		//update price
		pricePerMonth = sessionsPerMonth * pricePerSession;

		if (addonSet.has('ask-therapist')) {
			pricePerMonth += askTherapistPrice;
		}

		if (addonSet.has('sgc')) {
			pricePerMonth += selfGuidedContentPrice;
		}

		if (addonSet.has('mental-health')) {
			pricePerMonth += mentalHealthTrainingPrice;
		}

		if (addonSet.has('check-in')) {
			pricePerMonth += teamCheckinsPrice;
		}

		if (addonSet.has('integration')) {
			pricePerMonth += healthInsuranceIntegrationPrice;
		}
	}

	function getPricePerSession(sessions) {
		let price = 79;

		if (sessions === 1) {
			price = 79;
		} else if (sessions === 2) {
			price = 70;
		} else if (sessions === 3) {
			price = 66;
		} else if (sessions === 4) {
			price = 65;
		} else if (sessions === 5) {
			price = 64;
		} else if (sessions === 6) {
			price = 62;
		} else if (sessions === 7) {
			price = 60;
		} else if (sessions === 8) {
			price = 59;
		} else if (sessions === 9) {
			price = 58;
		} else if (sessions === 10) {
			price = 57;
		} else if (sessions === 11 || sessions === 12) {
			price = 56;
		} else if (sessions >= 47) {
			price = 51;
		} else if (sessions >= 28) {
			price = 52;
		} else if (sessions >= 20) {
			price = 53;
		} else if (sessions >= 16) {
			price = 54;
		} else if (sessions >= 13) {
			price = 55;
		} else {
			price = 79;
		}

		return price;
	}

	function getTeamCheckinsPrice(employees) {
		let price;

		if (employees >= 0 && employees <= 100) {
			price = 39;
		} else if (employees >= 101 && employees <= 200) {
			price = 59;
		} else if (employees >= 201 && employees <= 400) {
			price = 89;
		} else if (employees >= 401) {
			price = 149;
		} else {
			price = 39;
		}

		return price;
	}

	function getAskTherapistPrice(employees) {
		let price;

		if (employees >= 0 && employees <= 30) {
			price = 49;
		} else if (employees >= 31 && employees <= 200) {
			price = 95;
		} else if (employees >= 201 && employees <= 350) {
			price = 149;
		} else if (employees >= 351) {
			price = 199;
		} else {
			price = 49;
		}

		return price;
	}

	function getSelfGuidedContentPrice(employees) {
		let price;

		if (employees >= 0 && employees <= 10) {
			price = 18;
		} else if (employees >= 11 && employees <= 30) {
			price = 18;
		} else if (employees >= 31 && employees <= 50) {
			price = 38;
		} else if (employees >= 51 && employees <= 70) {
			price = 38;
		} else if (employees >= 71 && employees <= 200) {
			price = 78;
		} else if (employees >= 201 && employees <= 400) {
			price = 118;
		} else if (employees >= 401) {
			price = 178;
		} else {
			price = 18;
		}

		return price;
	}

	function getHealthInsuranceIntegrationPrice(employees) {
		let price;

		if (employees >= 0 && employees <= 100) {
			price = 39;
		} else if (employees >= 101 && employees <= 200) {
			price = 59;
		} else if (employees >= 201 && employees <= 400) {
			price = 89;
		} else if (employees >= 401) {
			price = 149;
		} else {
			price = 39;
		}

		return price;
	}

	updateUI();
});
