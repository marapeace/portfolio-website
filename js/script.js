/* ==========================================================
   Portfolio scripts (vanilla JavaScript)
   Each feature is wrapped in a small function so it is easy
   to read and to remove if you don't need it.
   ========================================================== */

// Tell CSS that JavaScript is running (reveal animations only apply then)
document.documentElement.classList.add("js");

/* ---------- 1. Mobile navigation ---------- */
function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  const icon = toggle.querySelector("i");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (icon) {
      icon.classList.toggle("fa-bars", !open);
      icon.classList.toggle("fa-xmark", open);
    }
  }

  toggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  // Close the menu after a link is clicked
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Close with the Escape key and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Reset when the screen grows to desktop size
  window.matchMedia("(min-width: 1000px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });
}

/* ---------- 2. Footer year ---------- */
function initYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------- 3. Image fallbacks ----------
   If an image file has not been added yet, show the labelled
   placeholder instead of a broken image icon. */
function initImageFallbacks() {
  document.querySelectorAll(".image-slot img").forEach((img) => {
    const slot = img.closest(".image-slot");
    const markMissing = () => slot.classList.add("is-missing");

    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });
}

/* ---------- 4. Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- 5. Project filtering ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const status = document.querySelector("#filter-status");
  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });

    if (status) {
      status.textContent =
        "Showing " + visibleCount + (visibleCount === 1 ? " project" : " projects");
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });
}

/* ---------- 6. Contact form validation ---------- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const fields = form.querySelectorAll("input, textarea");

  function getMessage(field) {
    const label = field.labels[0].textContent.trim();
    if (field.validity.valueMissing) return "Please enter your " + label.toLowerCase() + ".";
    if (field.validity.typeMismatch) return "Please enter a valid email address, like name@example.com.";
    if (field.validity.tooShort) return "Please write at least " + field.minLength + " characters.";
    return "Please check this field.";
  }

  function validateField(field) {
    const wrapper = field.closest(".form-field");
    const error = wrapper.querySelector(".field-error");
    const valid = field.checkValidity();

    wrapper.classList.toggle("has-error", !valid);
    field.setAttribute("aria-invalid", String(!valid));
    error.textContent = valid ? "" : getMessage(field);
    return valid;
  }

  // Re-check a field as soon as the person edits it after an error
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-field").classList.contains("has-error")) validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    let firstInvalid = null;

    fields.forEach((field) => {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
      return;
    }

    // Send with fetch so the visitor stays on the page
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    status.textContent = "Sending your message...";
    status.classList.add("is-visible");

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        status.textContent = "Thank you! Your message has been sent. I'll reply as soon as I can.";
      })
      .catch(() => {
        status.textContent =
          "Sorry, your message couldn't be sent. Please email me directly at the address beside the form.";
      })
      .finally(() => {
        button.disabled = false;
      });
  });
}

/* ---------- 7. Back-to-top button ---------- */
function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  window.addEventListener(
    "scroll",
    () => button.classList.toggle("is-visible", window.scrollY > 500),
    { passive: true }
  );

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- Start everything ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initYear();
  initImageFallbacks();
  initReveal();
  initProjectFilter();
  initContactForm();
  initBackToTop();
});
