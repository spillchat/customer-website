window.addEventListener('load', () => {
	console.log('mobile menu');
	const toggle = document.querySelector('.price-bd_dropdown-trigger');
	const content = document.querySelector('.price-bd_dropdown-content');
	const dropdownToggleText = document.querySelector('#dropdown-toggle-text');
	const dropdownArrow = document.querySelector('.price_toggle-arrow');
	content.dataset.dropdown = 'open';

	toggle.addEventListener('click', checkDropdown);

	function checkDropdown() {
		if (content.dataset.dropdown === 'open') {
			closeDropdown();
			content.dataset.dropdown = 'close';
		} else {
			openDropdown();
			content.dataset.dropdown = 'open';
		}
	}

	function closeDropdown() {
		content.style.overflow = 'hidden';
		dropdownToggleText.textContent = 'Show Plan Breakdown';
		gsap.to(content, { height: 0 });
		gsap.to(dropdownArrow, { rotateZ: 180 });
	}

	function openDropdown() {
		dropdownToggleText.textContent = 'Hide Plan Breakdown';
		gsap.to(content, {
			height: 'auto',
			onComplete: () => {
				content.style.overflow = 'visible';
			},
		});
		gsap.to(dropdownArrow, { rotateZ: 0 });
	}

	checkDropdown();
});
