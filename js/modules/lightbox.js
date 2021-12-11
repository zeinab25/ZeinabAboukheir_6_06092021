import { Dom } from "./displayDom.js";

class Lightbox {
	constructor(media) {
		this.media = media;
		this.open();
		this.close();
		this.navigation();
		this.closeEvent();
		this.keyboardEvent();
	}
	static index = "";

	open() {
		const lightboxBground = document.querySelector("#lightboxBground");
		const main = document.querySelector("main");
		const mediaDom = document.querySelectorAll("#containerMedia a");
		mediaDom.forEach((elt) => {
			elt.addEventListener("click", () => {
				const mediaElt = elt.querySelector("img, video");
				const MediaSrc = mediaElt.getAttribute("src"); // get  the selected media source
				this.index = this.media.findIndex(
					(obj) => obj.image == MediaSrc || obj.video == MediaSrc
				); //  use the findIndex method to find the index of the selected media in the photographer's media table
				main.style.position = "fixed";
				this.displayMedia(); // add the selected media in the lightbox thanks to the find index
				lightboxBground.style.display = "flex"; // the ligtbox is visible at the click of the media
				const ariaHidden = document.querySelectorAll("header, section");
				ariaHidden.forEach((elt) => {
					elt.setAttribute("aria-hidden", "true"); // the screen reader has no access anymore to the elements in the background
				});
				const tabHidden = document.querySelectorAll(
					"header a,  section a, section button, select"
				);
				tabHidden.forEach((elt) => {
					elt.setAttribute("tabindex", "-1"); //tabulation is not available anymore for buttons and background link
				});
			});
		});
	}

	displayMedia() {
		// add the selected media in the lightbox thanks to the find index
		const mediaLightbox = document.querySelector("#mediaLightbox");
		mediaLightbox.innerHTML = "";
		const title = document.createElement("h2");
		title.append(this.media[this.index].title);
		mediaLightbox.append(Dom.displayImageOrVideo(this.media[this.index]), title);
		const video = document.querySelector("#mediaLightbox video");
		if (video) video.controls = true;
	}

	navigation() {
		const nextLightbox = document.querySelector("#next");
		const previousLightbox = document.querySelector("#previous");

		nextLightbox.addEventListener("click", () => {
			this.next();
		});
		previousLightbox.addEventListener("click", () => {
			this.previous();
		});
	}

	next() {
		if (this.index < this.media.length - 1) {
			// the last index is omits because the button is not active anymore
			this.index++;
			this.displayMedia();
		}
	}

	previous() {
		if (this.index > 0) {
			//the first index is omits, the button is not active anymore
			this.index--;
			this.displayMedia();
		}
	}

	close() {
		const main = document.querySelector("main");
		const lightboxBground = document.querySelector("#lightboxBground");
		lightboxBground.style.display = "none"; // la ligtbox is not visible anymore
		main.style.position = "relative";

		// the screen reader again accesses the element of the photographer page when closing the lightbox
		const ariaHidden = document.querySelectorAll("header, section");
		ariaHidden.forEach((elt) => {
			elt.removeAttribute("aria-hidden");
		});

		// the tab is again available for the buttons and links of the photographer page
		const tabHidden = document.querySelectorAll("header a,  section a, section button, select");
		tabHidden.forEach((elt) => {
			elt.removeAttribute("tabindex");
		});
	}

	closeEvent() {
		const closeElt = document.querySelector(".close");
		closeElt.addEventListener("click", () => {
			this.close();
		});
	}

	keyboardEvent() {
		const lightboxContent = document.querySelector("#lightboxContent");
		lightboxContent.addEventListener("keydown", (e) => {
			if (e.code == "ArrowRight") {
				this.next(); // navigation right
			} else if (e.code == "ArrowLeft") {
				this.previous(); // navigation left
			} else if (e.code == "Escape") {
				this.close(); //close
			}
		});
	}
}

export { Lightbox };
