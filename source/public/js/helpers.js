document.addEventListener("DOMContentLoaded", function () {
	const toggleFormComment = () => {
		const formComment = document.querySelector("form[id='formComments']");
		if (formComment) {
			const btnToggleComment = document.querySelector(
				"button[id='btnToggleComment']"
			);
			if (btnToggleComment) listenerClick();
			function listenerClick() {
				btnToggleComment.addEventListener("click", function (event) {
					event.preventDefault();
					formComment.classList.toggle("hiddenFormComments");
				});
			}
		}
	};
	toggleFormComment();
});
