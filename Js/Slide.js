let slideIndex = 1;
let slideInterval = setInterval(showNextSlide, 3000); // Change slide every 3 seconds

function plusSlides(n) {
  clearInterval(slideInterval); // Clear the interval to stop auto slide when manually changed
  showSlides(slideIndex += n);
  slideInterval = setInterval(showNextSlide, 3000); // Restart the auto slide after manual change
}

function currentSlide(n) {
  clearInterval(slideInterval); // Clear the interval when clicking on a dot
  showSlides(slideIndex = n);
  slideInterval = setInterval(showNextSlide, 3000); // Restart the auto slide after manual change
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Automatically move to the next slide
function showNextSlide() {
  plusSlides(1);
}
