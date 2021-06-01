import { useState, useEffect } from "react";

function useDarkMode() {
	var storageTheme;
	if (localStorage.getItem("theme")) {
		storageTheme = localStorage.getItem("theme");
	}
	const [theme, setTheme] = useState(storageTheme);
	const colorTheme = theme === "light" ? "dark" : "light";
	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		localStorage.setItem("theme", theme);
		root.classList.add(theme);
	}, [theme, colorTheme]);
	return [colorTheme, setTheme];
}

export default useDarkMode;
