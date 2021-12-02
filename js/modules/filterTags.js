class FilterByTags {
	static filterIsActive = false;

	static getTags() {
		const tagsElts = document.querySelectorAll("li");
		tagsElts.forEach((tagElt) => {
			tagElt.addEventListener("click", () => {
				const tagClick = tagElt.getAttribute("data-tags");
				this.highlightTag(tagClick);
				this.removePhotographer(tagClick);
			});
		});
		// if the localstorage has a stored value, activate the home page filter with that value. This storage is done when clicking on a tag on a photographer's profile page to filter the photogrpahes on the home page
		if (localStorage.getItem("tag")) {
			const tagClick = localStorage.getItem("tag");
			this.highlightTag(tagClick);
			this.removePhotographer();
			localStorage.clear();
		}
	}

	static highlightTag(tag) {
		// selection of all tags
		const tagsElts = document.querySelectorAll("li");
		tagsElts.forEach((tagElt) => {
			// get the value of each tag
			const tagName = tagElt.dataset.tags;
			//if the tag has the same value as the clicked tag then adding the class highlight on the tag (allows to highlight the tag)  if on click it is not already selected otherwise if it's selected remove the class highligh
			if (tagName == tag) {
				if (tagElt.classList.contains("highlight")) {
					tagElt.classList.remove("highlight");
					this.filterIsActive = false; // if remove the class highlight from the tag, the filter is not active (no tag is selected)
				} else {
					tagElt.classList.add("highlight");
					this.filterIsActive = true; // the tag is highlighted then the filter is active
				}
			}
			// deselect all tags that don't have the same value as the clicked tag
			else {
				tagElt.classList.remove("highlight");
			}
		});
	}

	static removePhotographer() {
		// selection of all the photographers on the page
		const articlePhotographer = document.querySelectorAll("article");
		articlePhotographer.forEach((article) => {
			//on each photographer, get the highlighted tags
			const highlightTag = article.querySelector(" li.highlight");
			// if exists on the home page body a tag with the class highlight then the photographers are filtered
			if (this.filterIsActive) {
				// if the photographer has a tag highlighted, display it otherwise  deleted it
				highlightTag ? (article.style.display = "block") : (article.style.display = "none");
			}
			//if no tags have the class highlight, display all the photographers
			else {
				article.style.display = "block";
			}
		});
	}
}

export { FilterByTags };
