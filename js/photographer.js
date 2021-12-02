import { Dom } from "./modules/displayDom.js";
import { fetchPhotographers } from "./modules/fetchPhotographers.js";
import { FilterCurrentMedia, FilterMedia } from "./modules/filterMedia.js";
import { Likes } from "./modules/counterLikes.js";

// function MediaPage
(async () => {
	const data = await fetchPhotographers();

	// get photographer id with url
	const url = window.location.href;
	const paramsUrl = new URL(url);
	const photographerId = paramsUrl.searchParams.get("id");

	// get photographer in data with find method which use photographer id
	const photographers = data.photographers;
	const photographer = photographers.find((photographer) => photographer.id == photographerId);

	// display photographer selected
	Dom.displayPhotographerProfile(photographer);

	// get the selected tag in phtotographer page at the storage to filter photographers on the home page
	const tagsElts = document.querySelectorAll("li");
	tagsElts.forEach((tagElt) => {
		tagElt.addEventListener("click", () => {
			const tagClick = tagElt.getAttribute("data-tags");

			localStorage.setItem("tag", tagClick);
		});
	});

	// get only photographer media with method filter
	const Allmedia = data.media;
	const photographerMedia = Allmedia.filter((media) => media.photographerId == photographerId);
	// console.log(photographerMedia);

	// create the media container
	let containerMedia = document.createElement("div");
	containerMedia.setAttribute("id", "containerMedia");

	// lightbox initialisation (display dom static)
	Dom.litghbox();

	//  display media by popularity by default when the page loads
	new FilterMedia(photographerMedia, "popularity", containerMedia);

	// filter by categories
	FilterCurrentMedia.byCategories(photographerMedia, containerMedia);

	// display total likes when the page loads
	Dom.displayLikes(photographer, Likes.counterlikes());

	Likes.updateLikes();
})();

// dropDown style : delete the duplicate of the selected value with its stroke
const dropDown = document.querySelector("select");
function dropDownHidden() {
	const dropDown = document.querySelector("select");
	const optionsFilter = document.querySelectorAll("option");
	const filter = dropDown.value;
	optionsFilter.forEach((option) => {
		if (option.value == filter) {
			option.style.display = "none";
			option.setAttribute("aria-hidden", "true");
		} else {
			option.style.display = "block";
			option.removeAttribute("aria-hidden");
		}
	});
}

dropDownHidden();
dropDown.addEventListener("change", () => {
	dropDownHidden();
});
