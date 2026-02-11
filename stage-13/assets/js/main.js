// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!hamburger.contains(target) && !navMenu.contains(target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (!href) return;
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Form validation helper
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
}

// Contact form handler (client-side demo only)
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm(this)) {
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    }
  });
}

console.log("MyApp initialized successfully");

