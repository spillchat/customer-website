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
	const displayPlan = document.querySelectorAll('#display-plan');
	const displayAddons = document.querySelectorAll('#display-addons');
	const displayBundle = document.querySelectorAll('#display-bundle');

	function updateElements(elements, content) {
		elements.forEach((element) => (element.textContent = content));
	}

	function updateUI() {
		//update plan
		if (therapyPlan === 'monthly') {
			updateElements(displayPlan, 'Monthly bundle');
			updateElements(displayBundle, 'Tailored to your team size');
		}

		if (therapyPlan === 'payg') {
			updateElements(displayPlan, 'Pay-as-you-go');
			updateElements(displayBundle, 'Choose the number of sessions');
			
		}

		//update addons
		const addons = [...addonSet].length;
		if (addons > 0) {
			if (addons === 1) {
				updateElements(displayAddons, `${addons} additional feature`);
			} else {
				updateElements(displayAddons, `${addons} additional features`);
			}
		} else {
			updateElements(displayAddons, `No features selected`);
		}
	}

	updateUI();
});
