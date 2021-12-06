import { Dom } from "./displayDom.js";

class Likes {
	//display total likes
	static counterlikes() {
		// count total likes to display it on the counter
		const likes = document.querySelectorAll(".likes");
		let likesArray = [];
		for (let i = 0; i < likes.length; i++) {
			likesArray.push(likes[i].textContent);
		}
		let totalLikes = likesArray.reduce(
			(previous, current) => Number(previous) + Number(current)
		);
		return totalLikes;
	}

	// update counter likes at the heart's click
	static updateLikes() {
		// this.counterlikes();
		let totalLikes = this.counterlikes();
		const likes = document.querySelectorAll(".likes");
		likes.forEach((like) => {
			const heart = like.querySelector(".heart");
			let likeCurrent = like.querySelector("span");
			let likeNumber = parseInt(likeCurrent.textContent);
			heart.addEventListener("click", () => {
				if (heart.classList.contains("active")) {
					heart.classList.remove("active");
					likeNumber--;
					totalLikes--;
				} else {
					heart.classList.add("active");
					likeNumber++;
					totalLikes++;
				}
				likeCurrent.textContent = likeNumber;
				// update total likes
				Dom.updateDisplayLikes(totalLikes);
			});
		});
	}
}

export { Likes };
