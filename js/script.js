import { Dom } from "./modules/displayDom.js";
import { FilterByTags } from "./modules/filterTags.js";
import { goToMain } from "./modules/scrollButton.js";
import { fetchPhotographers } from "./modules/fetchPhotographers.js";

// Fetch data and add photographers to homepages  + Filter by tags

(async () => {
	const data = await fetchPhotographers();
	const photographers = data.photographers;

	photographers.forEach((photographer) => {
		Dom.displayPhotographerHomepage(photographer);
	});

	FilterByTags.getTags();
})();

// scrollButton
goToMain();
