import { useState, useEffect } from "react";

function useDarkMode() {
	var storageTheme = (localStorage.getItem("theme")) ? localStorage.getItem("theme") : "dark";
	
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
