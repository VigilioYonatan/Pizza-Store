import { ref, watchEffect } from "vue";

function useDropdown() {
	const dropdownOpen = ref<boolean>(false);

	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const trigger = ref<any>(null);
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	const dropdown = ref<any>(null);

	function onClose() {
		dropdownOpen.value = false;
	}
	function onOpen() {
		dropdownOpen.value = !dropdownOpen.value;
	}
	function onOpenClose() {
		dropdownOpen.value = true;
	}
	// close on click outside
	watchEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!dropdown.value) return;
			if (
				!dropdownOpen ||
				dropdown.value.contains(target) ||
				trigger.value.contains(target)
			) {
				return;
			}
			dropdownOpen.value = false;
		};

		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	watchEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!dropdownOpen.value || keyCode !== 27) return;
			dropdownOpen.value = false;
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});
	return {
		dropdownOpen,
		trigger,
		dropdown,
		onClose,
		onOpen,
		onOpenClose,
	};
}

export default useDropdown;
