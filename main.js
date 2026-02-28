const track = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");

// Clone first and last
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Insert clones
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Update slides list after cloning
slides = document.querySelectorAll(".slide");

let index = 1;

// CHANGE HERE 👇
const slideWidth = 548;

// Start position
track.style.transform = `translateX(-${slideWidth * index}px)`;

function nextSlide() {
  if (index < slides.length - 1) {
    index++;
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
}

function prevSlide() {
  if (index > 0) {
    index--;
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
}

// magic part
track.addEventListener("transitionend", () => {
  if (slides[index] === firstClone) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  if (slides[index] === lastClone) {
    track.style.transition = "none";
    index = slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

const previousBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

previousBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);



















