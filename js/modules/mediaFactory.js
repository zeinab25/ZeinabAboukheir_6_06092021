class ImageOrVideo {
	constructor(media) {
		this.media = media;
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
}

export { ImageOrVideo };
