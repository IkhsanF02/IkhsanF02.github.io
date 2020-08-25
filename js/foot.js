document.addEventListener("DOMContentLoaded", () => {
	
	// foot-bar event listener
	const footElement = document.querySelectorAll(".hover-style");
	footElement.forEach(element => {
		element.addEventListener("click", (event) => {
			M.toast({
				html: "Page unavailable!",
				outDuration: 1000,
				displayLength: 4000
			});
		});
	});

});
