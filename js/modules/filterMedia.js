import { Dom } from "./displayDom.js";
import { Likes } from "./counterLikes.js";
import { Lightbox } from "./lightbox.js";

class FilterMedia {
	constructor(photographerMedia, filter, containerMedia) {
		this.photographerMedia = photographerMedia;
		this.filter = filter;
		this.containerMedia = containerMedia;

		switch (this.filter) {
			case "popularity":
				return this.filterByPopularity();
				break;
			case "date":
				return this.filterByDate();
				break;
			case "title":
				return this.filterByTitle();
				break;
			default:
				return;
		}
	}

	// media sorted by popularity
	filterByPopularity() {
		this.photographerMedia.sort((a, b) => a.likes - b.likes);
		Dom.displayMedia(this.photographerMedia, this.containerMedia);
		Likes.counterlikes();
		new Lightbox(this.photographerMedia);
	}
	// media sorted by title
	filterByTitle() {
		this.photographerMedia.sort(function (a, b) {
			return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
		});
		Dom.displayMedia(this.photographerMedia, this.containerMedia);
		Likes.counterlikes();
		Likes.updateLikes();
		new Lightbox(this.photographerMedia);
	}

	// media sorted  by date
	filterByDate() {
		this.photographerMedia.sort((a, b) => {
			return Date.parse(a.date) - Date.parse(b.date);
		});
		Dom.displayMedia(this.photographerMedia, this.containerMedia);
		Likes.counterlikes();
		Likes.updateLikes();
		new Lightbox(this.photographerMedia);
	}
}

// filter media by selected categorie
class FilterCurrentMedia {
	static byCategories(photographerMedia, containerMedia) {
		const dropDown = document.querySelector("select");
		dropDown.addEventListener("change", (e) => {
			const filter = e.target.value;
			if (filter == "popularity")
				new FilterMedia(photographerMedia, "popularity", containerMedia);
			if (filter == "title") new FilterMedia(photographerMedia, "title", containerMedia);
			if (filter == "date") new FilterMedia(photographerMedia, "date", containerMedia);
		});
	}
}

export { FilterCurrentMedia, FilterMedia };
