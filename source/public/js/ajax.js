document.addEventListener("DOMContentLoaded", function () {
	const saveLike = () => {
		const btnLike = document.querySelector("button[id='btnLike']");
		if (btnLike) listenerClick();
		function listenerClick() {
			btnLike.addEventListener("click", function (event) {
				event.preventDefault();
				const imageId = btnLike.getAttribute("data-id");
				fetch(`/images/${imageId}/likes`, {
					headers: {
						"Content-type": "application/json",
					},
					method: "POST",
				})
					.then((response) => response.json())
					.then((response) => {
						const likeCount = document.querySelector(".likes-count");
						likeCount.innerText = `${response.likes} Likes`;
					});
			});
		}
	};
	const deleteImage = () => {
		const btnDelete = document.querySelector("button[id='btnDelete']");
		if (btnDelete) listenerClick();
		function listenerClick() {
			btnDelete.addEventListener("click", function (event) {
				event.preventDefault();
				if (confirm("Are you sure you want delete this image?")) {
					const imageId = btnDelete.getAttribute("data-id");
					fetch(`/images/${imageId}`, {
						method: "DELETE",
					})
						.then((response) => response.json())
						.then((response) => {
							if (response.deleted) {
								window.location.replace("/images");
							}
						});
				}
			});
		}
	};

	deleteImage();
	saveLike();
});
