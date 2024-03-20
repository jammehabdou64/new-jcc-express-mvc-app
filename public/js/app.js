let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");
const maxSlides = slides.length;

function showSlide(index) {
  if (index >= 0 && index < maxSlides) {
    slides[currentSlide].classList.remove("active");
    slides[index].classList.add("active");
    currentSlide = index;
  }
}

setInterval(() => {
  showSlide((currentSlide + 1) % maxSlides);
}, 3000);

// Form submission handling
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log(formDataObject); // Send form data to server or perform other actions
});
