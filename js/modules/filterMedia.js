import { Dom } from "./displayDom.js";
import { Likes } from "./counterLikes.js";
import { Lightbox } from "./lightbox.js";

class FilterMedia {
	constructor(photographerMedia, containerMedia) {
		this.photographerMedia = photographerMedia;
		this.containerMedia = containerMedia;
	}

	sortMedia(key) {
		this.photographerMedia.sort((a, b) => {
			let x;
			let y;

			switch (key) {
				case "likes":
					x = b.likes;
					y = a.likes;
					break;
				case "date":
					x = b.date;
					y = a.date;
					break;
				case "title":
					x = a.title;
					y = b.title;
					break;
				default:
					return;
			}

			return x > y ? 1 : x < y ? -1 : 0;
		});

		Dom.displayMedia(this.photographerMedia, this.containerMedia);
		Likes.updateLikes();
		new Lightbox(this.photographerMedia);
	}

	// media sorted by popularity
	sortByPopularity() {
		this.sortMedia("likes");
	}

	sortByDate() {
		this.sortMedia("date");
	}

	sortByTitle() {
		this.sortMedia("title");
	}
}

// filter media by selected categorie
class FilterCurrentMedia {
	static byCategories(photographerMedia, containerMedia) {
		const dropDown = document.querySelector("select");
		dropDown.addEventListener("change", (e) => {
			const filter = e.target.value;
			if (filter == "popularity")
				new FilterMedia(photographerMedia, containerMedia).sortByPopularity();
			if (filter == "title") new FilterMedia(photographerMedia, containerMedia).sortByTitle();
			if (filter == "date") new FilterMedia(photographerMedia, containerMedia).sortByDate();
		});
	}
}

export { FilterCurrentMedia, FilterMedia };
