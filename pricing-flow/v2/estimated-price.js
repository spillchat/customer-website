window.addEventListener('load', () => {
	const form = document.querySelector('#wf-form-Build-Your-Plan');
	const submitButton = document.querySelector('#form-submit');

	//manage employees
	let noOfEmployees = 10;
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

	const addonRows = [...document.querySelectorAll('#addons-rows .feature-row')];

	const addonSet = new Set();

	for (let i = 0; i < addonChecks.length; i++) {
		addonChecks[i].addEventListener('change', function () {
			checkChanged(addonChecks[i], i);
		});
	}

	function checkChanged(checkbox, index) {
		if (checkbox.checked) {
			addonSet.add(checkbox.dataset.name);
			addonRows[index].dataset.toggle = 'on';
		} else {
			addonSet.delete(checkbox.dataset.name);
			addonRows[index].dataset.toggle = 'off';
		}

		updateUI();
	}

	//Update UI
	const displayEmployees = document.querySelector("#display-employees");

	function updateUI() {
		addonRows.forEach((row) => {
			if (row.dataset.toggle === 'on') {
				row.style.display = 'flex';
			} else {
				row.style.display = 'none';
			}

			//employees
			employeeNum.value = noOfEmployees;
			displayEmployees.textContent = noOfEmployees;
		
		});
	}

	updateUI();
});
