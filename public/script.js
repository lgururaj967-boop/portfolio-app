
// ========================================
// GURURAJU L — PORTFOLIO INTERACTIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Typing animation
    const typingText = document.getElementById("typingText");

    const roles = [
        "Full-Stack Developer",
        "Web Developer",
        "BCA Student",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent = currentRole.substring(0, characterIndex);

        let delay = deleting ? 45 : 90;

        if (!deleting && characterIndex === currentRole.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        window.setTimeout(typeRole, delay);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typeRole();
    }

    // Profile picture fallback
    const profileImage = document.getElementById("profileImage");
    const profileFallback = document.getElementById("profileFallback");

    function showProfileFallback() {
        profileImage.style.display = "none";
        profileFallback.style.display = "grid";
    }

    function showProfileImage() {
        profileImage.style.display = "block";
        profileFallback.style.display = "none";
    }

    profileImage.addEventListener("error", showProfileFallback);
    profileImage.addEventListener("load", showProfileImage);

    if (profileImage.complete) {
        if (profileImage.naturalWidth > 0) {
            showProfileImage();
        } else {
            showProfileFallback();
        }
    }

    // Scroll reveal animation
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Highlight active navigation section
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navItems.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Automatic footer year
    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

    // Contact form
    // Opens the visitor's default email application.
    // For actual server-side delivery, connect a backend or email service.
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please complete all fields.";
            return;
        }

        const recipient = "lgururaj967@gmail.com";

        const emailSubject = encodeURIComponent(
            `${subject} - Portfolio Contact`
        );

        const emailBody = encodeURIComponent(
            `Hello Gururaju,\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}\n`
        );

        formStatus.textContent =
            "Opening your email application. Send the prepared email to complete your message.";

        window.location.href =
            `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
    });

});
