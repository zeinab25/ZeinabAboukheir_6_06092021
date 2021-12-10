// displays the DOM elements of the home page and  photographer page
class Dom {
	static displayPhotographerHomepage(photographer) {
		const descriptionPhotographer = `
			<a href="photographer.html?id=${photographer.id}" aria-label="${photographer.name}"> 
				<img  src="${photographer.portrait}" alt="">
				<h2>${photographer.name}</h2>
			</a>
			<p class="localisation">${photographer.city}, ${photographer.country}</p>
			<p class="tagline">${photographer.tagline}</p>
			<p class="price">${photographer.price}€/jour</p>
			<ul >${photographer.tags
				.map(
					(tag) => `<li data-tags= ${tag} >
			   <span class="screenReader">tag</span>
			   <a href="#">#${tag}</a></li>`
				)
				.join(" ")}</ul>
			`;

		const article = document.createElement("article");
		article.innerHTML = descriptionPhotographer;

		document.getElementById("photographers").append(article);
	}

	static displayPhotographerProfile(photographer) {
		const descriptionPhotographer = `
	<div>
		<div>
			<h1>${photographer.name}</h2>
				<p class="localisation">${photographer.city}, ${photographer.country}</p>
				<p class="tagline">${photographer.tagline}</p>
				<ul>${photographer.tags
					.map(
						(tag) => `<li data-tags=${tag}>
						<span class="screenReader">tag</span>
						<a href="index.html">#${tag}</a>
					</li>`
					)
					.join(" ")}</ul>
		</div>
		<button title="Contact me" id="contact" >Contactez-moi</button>
	</div>
	<img src="${photographer.portrait}" alt="${photographer.alt}"></img>
	`;

		document
			.getElementById("photographer")
			.insertAdjacentHTML("beforeend", descriptionPhotographer);
	}

	static displayMedia(media, containerMedia) {
		const mediaSection = document.querySelector("#media");
		containerMedia.innerHTML = "";
		media.forEach((obj) => {
			const mediaArticle = document.createElement("article");
			mediaArticle.setAttribute("aria-label", "media");

			mediaArticle.innerHTML = `<div id= "mediaCaption"><h2>${obj.title}</h2> <div><p>${obj.price} €</p><div class="likes" aria-label="likes"><span >${obj.likes}</span> <button><i class="far fa-heart heart"></i></button></div></div></div>`;
			const linkMedia = document.createElement("a");
			linkMedia.setAttribute("aria-label", "open image closeup view");
			linkMedia.setAttribute("href", "#lightboxContent");
			mediaArticle.insertAdjacentElement("afterbegin", linkMedia);
			linkMedia.appendChild(this.displayImageOrVideo(obj));
			containerMedia.appendChild(mediaArticle);
			mediaSection.appendChild(containerMedia);
		});
	}

	static displayImageOrVideo(media) {
		if (media.video) {
			const video = document.createElement("video");
			video.setAttribute("aria-label", media.alt);
			video.setAttribute("src", media.video);
			video.innerHTML = `Sorry, your browser doesn't support embedded videos.`;
			return video;
		} else {
			const image = document.createElement("img");
			image.setAttribute("alt", media.alt);
			image.setAttribute("src", media.image);
			return image;
		}
	}

	// displays the total number of likes at the bottom of the page
	static displayLikes(photographer, totalLikes) {
		const mediaSection = document.querySelector("#media");
		const counterLikes = document.createElement("div");
		counterLikes.setAttribute("id", "counterLikes");

		counterLikes.innerHTML = `<span>${totalLikes} <i class="fas fa-heart"></i></span><p>${photographer.price}€/jour</p>`;

		mediaSection.appendChild(counterLikes);
	}

	static updateDisplayLikes(totalLikes) {
		const spanLikes = document.querySelector("#counterLikes span");
		spanLikes.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
	}

	static form(photographer) {
		const h1 = document.querySelector("#formBground h1");
		h1.innerHTML = `Contactez-moi ${photographer.name}`;
	}
}

export { Dom };
