// Smooth scroll & mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scroll for anchor links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.add('hidden');
    }
  });
});

// Highlight active link on scroll
const sections = document.querySelectorAll("section");
const options = { threshold: 0.6 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      if (link) link.classList.add("active");
    }
  });
}, options);

sections.forEach(section => observer.observe(section));

window.VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 'darkorange',
  backgroundColor: 0x0
});


// Contact form with EmailJS
emailjs.init("408-DwNjwTlfHSaKN"); // Your public key

const contactForm = document.getElementById("contactForm");
const statusEl = document.getElementById("contactStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.textContent = "Sending...";

    emailjs.sendForm("service_bmz4l6h", "template_bam7fd9", this)
      .then(() => {
        statusEl.textContent = "✅ Message sent successfully!";
        contactForm.reset();
      }, (error) => {
        statusEl.textContent = "❌ Failed to send message: " + error.text;
      });
  });

  // Real-time email validation
  const emailInput = document.querySelector("[name='email']");
  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
    if (!emailInput.validity.valid) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    }
  });
}
