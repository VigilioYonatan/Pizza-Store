import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
export type ThemeMode = "light" | "dark" | "default";

function getThemeLocalStorage() {
	let themeMode: ThemeMode = "default";
	if (localStorage.getItem("theme")) {
		themeMode = localStorage.getItem("theme") as ThemeMode;
	}
	return themeMode;
}

const useThemeStore = defineStore("theme", () => {
	const state = ref(getThemeLocalStorage());

	function changeTheme(theme: ThemeMode) {
		state.value = theme;
	}
	function changeThemeMode(theme: ThemeMode) {
		if (theme === state.value) return;
		if (theme === "default") {
			localStorage.removeItem("theme");
			changeTheme(theme);
			return;
		}
		localStorage.setItem("theme", theme);
		changeTheme(theme);
	}
	function lightModeElement() {
		document.documentElement.classList.remove("dark");
		document.documentElement.classList.add("light");
	}
	function darkModeElement() {
		document.documentElement.classList.remove("light");
		document.documentElement.classList.add("dark");
	}

	const themesMode: ThemeMode[] = ["dark", "light", "default"];

	watchEffect(() => {
		if (state.value === "light") {
			lightModeElement();
			return;
		}
		if (state.value === "default") {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				darkModeElement();
				return;
			}
			lightModeElement();
			return;
		}
		darkModeElement();
	});
	return { state, themesMode, changeThemeMode };
});
export default useThemeStore;
