window.addEventListener('load', () => {
	const form = document.querySelector('#wf-form-Build-Your-Plan');
	const submitButton = document.querySelector('#form-submit');

	const planRadios = [...document.querySelectorAll('#therapy-plans input')];
	let therapyPlan = 'monthly';

	planRadios.forEach((radio) => {
		radio.addEventListener('change', function () {
			radioChanged(radio);
		});
	});

	function radioChanged(radio) {
		therapyPlan = '';
		therapyPlan = radio.value;
		updateUI();
	}

	//manage addons
	const addonChecks = [
		...document.querySelectorAll("#addon-cols input[type='checkbox']"),
	];
	const addonSet = new Set();

	addonChecks.forEach((check) => {
		check.addEventListener('change', function () {
			checkChanged(check);
		});
	});

	function checkChanged(checkbox) {
		if (checkbox.checked) {
			addonSet.add(checkbox.dataset.name);
		} else {
			addonSet.delete(checkbox.dataset.name);
		}

		updateUI();
	}

	//Update UI
	const displayPlan = document.querySelector('#display-plan');
	const displayAddons = document.querySelector('#display-addons');

	function updateUI() {
		//update plan
		if (therapyPlan === 'monthly') {
			displayPlan.textContent = 'Monthly bundle';
		}

		if (therapyPlan === 'payg') {
			displayPlan.textContent = 'Pay-as-you-go';
		}

		//update addons
		const addons = [...addonSet].length;
		if (addons > 0) {
			displayAddons.textContent = `${addons} additional features`;
		} else {
			displayAddons.textContent = `No features selected`;
		}
	}

	updateUI();
});
