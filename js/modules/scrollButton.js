// Button go to main of the home page  appears when scrolling from the top (add the class ".active"), and when click on it disappears (remove the class ".active") and redirects to content
const scrollButton = document.querySelector("#scrollButton");

let goToMain = () => {
	var CurrentScroll = 0;
	window.addEventListener("scroll", function () {
		var NextScroll = this.scrollY;
		if (NextScroll > CurrentScroll) {
			if (window.scrollY < 30) {
				scrollButton.classList.add("active");
			}
			CurrentScroll = NextScroll; //Updates current scroll position
		} else {
			CurrentScroll = NextScroll;
		}

		scrollButton.addEventListener("click", () => {
			scrollButton.classList.remove("active");
		});
	});
};

export { goToMain };
