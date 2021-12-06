import { Dom } from "./displayDom.js";

class Lightbox {
	constructor(media) {
		this.media = media;
		this.open();
		this.close();
		this.navigation();
		this.keyboardEvent();
	}
	static index = "";

	open() {
		const lightboxBground = document.querySelector("#lightboxBground");
		const mediaDom = document.querySelectorAll("#containerMedia img,#containerMedia video");
		mediaDom.forEach((elt) => {
			elt.addEventListener("click", () => {
				const srcMedia = elt.getAttribute("src");
				this.index = this.media.findIndex(
					(obj) => obj.image == srcMedia || obj.video == srcMedia
				);
				this.displayMedia();
				lightboxBground.style.display = "flex";
			});
		});
	}

	displayMedia() {
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
			//prend pas en compte le dernier index , le bouton nest n'est plus actif
			this.index++;
			this.displayMedia();
		}
	}

	previous() {
		if (this.index > 0) {
			//prend pas en compte le premier index , car le bouton ne doit plus actif
			this.index--;
			this.displayMedia();
		}
	}

	close() {
		const close = document.querySelector(".close");
		const lightboxBground = document.querySelector("#lightboxBground");
		close.addEventListener("click", () => {
			lightboxBground.style.display = "none";
		});
	}

	keyboardEvent() {
		const lightboxBground = document.querySelector("#lightboxBground");
		document.addEventListener("keydown", (e) => {
			if (e.code == "ArrowRight") {
				this.next(); // navigation right
			} else if (e.code == "ArrowLeft") {
				this.previous(); // navigation left
			} else if (e.code == "Escape") {
				lightboxBground.style.display = "none"; //close
			}
			// e.preventDefault();
		});
	}
}

export { Lightbox };
