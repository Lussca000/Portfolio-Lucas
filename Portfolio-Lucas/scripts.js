document.addEventListener("DOMContentLoaded", () => {

  // ================= NAV =================
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      mainNav.classList.toggle("open");

      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
    });

    document.querySelectorAll("#navMenu a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ================= NAV ACTIVE =================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = "";

          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.style.color = "var(--accent)";
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((section) => observer.observe(section));

  // ================= SCROLL REVEAL =================
  const revealElements = document.querySelectorAll(
    ".project-card, .info-card, .timeline-item"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revealObserver.observe(el);
  });

});
// ================= FORM =================
function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");
  const btn = form.querySelector(".submit-btn");

  const nome = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const assunto = form.querySelectorAll('input[type="text"]')[1].value;
  const mensagem = form.querySelector("textarea").value;

  const body = encodeURIComponent(
    `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=lucassdev.react@gmail.com&su=${encodeURIComponent(
    assunto
  )}&body=${body}`;

  window.location.href = gmailUrl;

  btn.textContent = "✓ Mensagem enviada!";
  btn.style.background = "#00ffe0";

  setTimeout(() => {
    btn.textContent = "Enviar Mensagem →";
    btn.style.background = "";
    form.reset();
  }, 3000);
}