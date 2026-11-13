
document.addEventListener("DOMContentLoaded", () => {

    const WHATSAPP_NUMBER = "5511993130498";
    const THEME_KEY = "portfolio-theme";

    const body = document.body;
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menuToggle.classList.toggle("active");

            navLinks.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

    }

    const themeToggle = document.getElementById("themeToggle");

    const moonIcon = `
        <svg viewBox="0 0 24 24"
             width="20"
             height="20"
             fill="currentColor"
             aria-hidden="true">
            <path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8
            8.6 8.6 0 1 0 20.2 15.3Z"/>
        </svg>
    `;

    const sunIcon = `
        <svg viewBox="0 0 24 24"
             width="20"
             height="20"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.42 1.42"/>
            <path d="m17.65 17.65 1.42 1.42"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m4.93 19.07 1.42-1.42"/>
            <path d="m17.65 6.35 1.42-1.42"/>
        </svg>
    `;

    function applyTheme(theme) {

        const isDark = theme === "dark";

        body.classList.toggle("dark", isDark);

        if (themeToggle) {

            themeToggle.innerHTML = isDark ? moonIcon : sunIcon;

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Ativar tema claro" : "Ativar tema escuro"
            );

            themeToggle.setAttribute(
                "title",
                isDark ? "Ativar tema claro" : "Ativar tema escuro"
            );

        }

        localStorage.setItem(THEME_KEY, theme);

    }

    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";

    applyTheme(savedTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isDark = body.classList.contains("dark");

            applyTheme(isDark ? "light" : "dark");

        });

    }

    const navbar = document.getElementById("navbar");
    const scrollProgress = document.getElementById("scrollProgress");

    function updateScroll() {

        if (navbar) {

            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );

        }

        if (scrollProgress) {

            const scrollableHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percentage = scrollableHeight > 0
                ? (window.scrollY / scrollableHeight) * 100
                : 0;

            scrollProgress.style.width = `${percentage}%`;

        }

    }

    window.addEventListener("scroll", updateScroll);

    window.addEventListener("resize", updateScroll);

    updateScroll();


    const filterButtons = document.querySelectorAll(".filter");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(card => {

                const categories = (
                    card.dataset.category || ""
                ).split(/\s+/);

                const shouldShow =
                    selectedFilter === "all" ||
                    categories.includes(selectedFilter);

                card.classList.toggle("hidden", !shouldShow);

            });

        });

    });

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    const backTop = document.getElementById("backTop");

    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    const canvas = document.getElementById("particlesCanvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        if (ctx) {

            let particles = [];

            let canvasWidth = 0;
            let canvasHeight = 0;

            const PARTICLE_COUNT =
                window.innerWidth < 600 ? 25 : 45;

            const accentColor = getComputedStyle(body)
                .getPropertyValue("--accent-light")
                .trim() || "#a855f7";

            function resizeCanvas() {

                const pixelRatio = Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

                canvasWidth = window.innerWidth;
                canvasHeight = window.innerHeight;

                canvas.width = canvasWidth * pixelRatio;
                canvas.height = canvasHeight * pixelRatio;

                canvas.style.width = `${canvasWidth}px`;
                canvas.style.height = `${canvasHeight}px`;

                ctx.setTransform(
                    pixelRatio,
                    0,
                    0,
                    pixelRatio,
                    0,
                    0
                );

            }

            function createParticles() {

                particles = [];

                for (let i = 0; i < PARTICLE_COUNT; i++) {

                    particles.push({

                        x: Math.random() * canvasWidth,
                        y: Math.random() * canvasHeight,

                        size: Math.random() * 2 + 0.5,

                        speedX: (Math.random() - 0.5) * 0.35,
                        speedY: (Math.random() - 0.5) * 0.35,

                        opacity: Math.random() * 0.4 + 0.1

                    });

                }

            }

            function animateParticles() {

                ctx.clearRect(
                    0,
                    0,
                    canvasWidth,
                    canvasHeight
                );

                particles.forEach(particle => {

                    particle.x += particle.speedX;
                    particle.y += particle.speedY;

                    if (particle.x < 0) particle.x = canvasWidth;
                    if (particle.x > canvasWidth) particle.x = 0;

                    if (particle.y < 0) particle.y = canvasHeight;
                    if (particle.y > canvasHeight) particle.y = 0;

                    ctx.beginPath();

                    ctx.arc(
                        particle.x,
                        particle.y,
                        particle.size,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle = accentColor;
                    ctx.globalAlpha = particle.opacity;

                    ctx.fill();

                });

                ctx.globalAlpha = 1;

                requestAnimationFrame(animateParticles);

            }

            resizeCanvas();
            createParticles();
            animateParticles();

            window.addEventListener("resize", () => {

                resizeCanvas();
                createParticles();

            });

        }

    }

    const systemModal = document.getElementById("systemModal");
    const systemModalTitle = document.getElementById("systemModalTitle");
    const systemModalMessage = document.getElementById("systemModalMessage");
    const systemModalClose = document.getElementById("systemModalClose");

    function openSystemModal(title, message) {

        if (!systemModal) return;

        if (systemModalTitle) {
            systemModalTitle.textContent = title;
        }

        if (systemModalMessage) {
            systemModalMessage.textContent = message;
        }

        systemModal.classList.add("active");

    }

    function closeSystemModal() {

        if (!systemModal) return;

        systemModal.classList.remove("active");

    }

    if (systemModalClose) {

        systemModalClose.addEventListener(
            "click",
            closeSystemModal
        );

    }

    if (systemModal) {

        systemModal.addEventListener("click", event => {

            if (event.target === systemModal) {
                closeSystemModal();
            }

        });

    }

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSystemModal();
        }

    });

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const sendMethodButtons = document.querySelectorAll(
            ".send-method-button"
        );

        const nameGroup = document.getElementById("nameGroup");
        const emailGroup = document.getElementById("emailGroup");
        const subjectGroup = document.getElementById("subjectGroup");

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        let currentSendMethod = "email";

        function setSendMethod(method) {

            currentSendMethod = method;

            const isEmail = method === "email";

            sendMethodButtons.forEach(button => {

                const isActive = button.dataset.method === method;

                button.classList.toggle("active", isActive);

                button.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            // Nome, e-mail e assunto são exclusivos do e-mail.
            if (nameGroup) nameGroup.hidden = !isEmail;
            if (emailGroup) emailGroup.hidden = !isEmail;
            if (subjectGroup) subjectGroup.hidden = !isEmail;

            if (nameInput) nameInput.required = isEmail;
            if (emailInput) emailInput.required = isEmail;

            if (submitButton) {

                submitButton.innerHTML = isEmail
                    ? 'ENVIAR POR E-MAIL <span>→</span>'
                    : 'ENVIAR PELO WHATSAPP <span>→</span>';

            }

        }

        sendMethodButtons.forEach(button => {

            button.addEventListener("click", () => {

                setSendMethod(button.dataset.method);

            });

        });
        setSendMethod("email");

        contactForm.addEventListener("submit", async event => {

            event.preventDefault();

            const name = nameInput?.value.trim() || "";
            const email = emailInput?.value.trim() || "";
            const subject = subjectInput?.value.trim() || "";
            const message = messageInput?.value.trim() || "";

            if (!message) {

                messageInput?.focus();

                return;

            }
            if (currentSendMethod === "whatsapp") {

                if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {

                    openSystemModal(
                        "Número inválido",
                        "Verifique o número de WhatsApp configurado no JavaScript."
                    );

                    return;

                }

                const whatsappURL =
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

                // Abre o WhatsApp com a mensagem preenchida.
                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

                return;

            }

            if (!name || !email) {

                openSystemModal(
                    "Campos obrigatórios",
                    "Preencha seu nome e e-mail para continuar."
                );

                return;

            }

            if (!emailInput.checkValidity()) {

                emailInput.reportValidity();

                return;

            }

            const originalButtonText = submitButton
                ? submitButton.innerHTML
                : "";

            try {

                if (submitButton) {

                    submitButton.disabled = true;
                    submitButton.textContent = "ENVIANDO...";

                }

                const response = await fetch("/api/contact", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        subject: subject,
                        message: message

                    })

                });

                const data = await response.json();

                if (!response.ok || !data.success) {

                    throw new Error(
                        data.error ||
                        data.message ||
                        "Não foi possível enviar sua mensagem."
                    );

                }

                contactForm.reset();

                setSendMethod("email");

                openSystemModal(
                    "Mensagem enviada!",
                    "Obrigada pelo contato! Recebi sua mensagem e em breve entrarei em contato."
                );

            } catch (error) {

                console.error(
                    "Erro ao enviar mensagem:",
                    error
                );

                openSystemModal(
                    "Ops! Algo deu errado.",
                    error.message ||
                    "Não foi possível enviar sua mensagem. Tente novamente."
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;

                }

            }

        });

    }

    console.log("ALINNE.DEV inicializado com sucesso!");

});
