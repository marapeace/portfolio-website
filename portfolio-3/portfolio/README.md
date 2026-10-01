# Amarachi Ayogu | Personal Portfolio

A responsive personal portfolio for job applications and recruiters, built with plain HTML, CSS, and JavaScript. No frameworks and no build step.

**Live site:** https://marapeace.github.io/YOUR_PORTFOLIO_REPO/

## About

I'm a Medical Radiography student with a strong interest in technology, frontend development, and IT support. This site presents who I am, the skills I'm building, and the projects I've created while learning.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Introduction, key focus areas, and links to projects and contact |
| `about.html` | Background, approach to learning, and skills |
| `projects.html` | Filterable gallery of my projects with live demos |
| `contact.html` | Contact form and direct contact links |

## Projects featured

- [Browser Extensions Manager](https://marapeace.github.io/browser-extensions-manager/)
- [BagVerse](https://marapeace.github.io/bagverse/index.html)
- [Image Gallery](https://marapeace.github.io/CodeAlpha_image-gallery/)
- [Music Player](https://marapeace.github.io/CodeAlpha_Music-player/)
- [Calculator](https://marapeace.github.io/CodeAlpha_calculator/)

## Features

- Mobile-first responsive layout (phones, tablets, laptops, desktops)
- Accessible hamburger menu with keyboard support and active-page indicator
- Project filtering by category (JavaScript-powered)
- Contact form with client-side validation, ready for Formspree
- Light scroll-reveal animation that respects `prefers-reduced-motion`
- Back-to-top button and an automatic footer year
- Semantic HTML, descriptive alt text, and unique titles and meta descriptions per page

## Tech stack

HTML5, CSS3, vanilla JavaScript, Google Fonts (Sora and Inter), Font Awesome icons.

## Project structure

```
portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
        ├── favicon.svg
        ├── profile.jpg
        └── projects/
```

## Run locally

Open `index.html` in a browser, or serve the folder with any static server (for example, the VS Code Live Server extension).

## Deploy on GitHub Pages

1. Push this folder's contents to a GitHub repository.
2. Open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://marapeace.github.io/<repository-name>/`.

## Contact form

The form submits to [Formspree](https://formspree.io) using `fetch`, so visitors stay on the page and see a confirmation message. The first submission may require confirming your email address in Formspree.

## Contact

- Email: amarachiayogu250@gmail.com
- LinkedIn: https://www.linkedin.com/in/amarachi-peace-ayogu-6a6934332
- GitHub: https://github.com/marapeace
