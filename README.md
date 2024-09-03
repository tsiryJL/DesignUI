# DesignUI

function animated_bloc(el, reveal_pos = 95){
	for (var i = 0; i < el.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = el[i].getBoundingClientRect().top;
		var elementVisible = reveal_pos;

		if (elementTop < windowHeight - elementVisible) {
			el[i].classList.add("animated");
		}
	}
}

function reveal() {
	var reveals = document.querySelectorAll(".reveal");
	var swipe_reveals = document.querySelectorAll(".swipe-reveal");
	var list_reveals = document.querySelectorAll(".itemCareer");

	if(reveals){
		animated_bloc(reveals)
	}
	if(swipe_reveals){
		animated_bloc(swipe_reveals)
	}
	if(list_reveals){
		animated_bloc(list_reveals, 200)
	}
}

window.addEventListener("scroll", reveal);
