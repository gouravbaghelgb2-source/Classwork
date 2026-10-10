
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const contactForm = document.getElementById("contactForm");

openBtn.addEventListener("click", function () {
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    overlay.classList.remove("active");
});

// Close when clicking outside the popup
overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
        overlay.classList.remove("active");
    }
});

// Close using the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        overlay.classList.remove("active");
    }
});

// Handle form submission
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you! Your message has been submitted.");
    contactForm.reset();
    overlay.classList.remove("active");
});