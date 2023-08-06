const header = document.getElementById("header");
if (header) {
	document.addEventListener("scroll", () => {
		header.classList.toggle("bg-black", window.scrollY > 0);
	});
}
