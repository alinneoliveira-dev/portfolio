const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

/* fecha o menu quando clicar em algum link */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

/* tema escuro/claro */

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.remove("dark");
} else {
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );
});

/* barra de progresso */

const progress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    progress.style.width = `${percentage}%`;
});

/* navbar scroll */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navbar.style.background = "rgba(11, 9, 18, .92)";
    } else {
        navbar.style.background = "rgba(11, 9, 18, .72)";
    }
});

/* filtro dos projetos */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selected = filter.dataset.filter;

        projects.forEach(project => {
            const categories = project.dataset.category;

            if (
                selected === "all" ||
                categories.includes(selected)
            ) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }
        });
    });
});

/* scroll */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

/* btn voltar ao topo*/

const backTop = document.getElementById("backTop");

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* forms */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent(
        `Contato pelo portfólio - ${name}`
    );

    const body = encodeURIComponent(
        `Nome: ${name}\n\nEmail: ${email}\n\nMensagem:\n${message}`
    );

    window.location.href =
        `mailto:seuemail@email.com?subject=${subject}&body=${body}`;
});

/* particulas */

const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* cria partículas */

function createParticles() {
    particles = [];

    const amount =
        window.innerWidth < 600
            ? 25
            : 55;

    for (let i = 0; i < amount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8 + .5,
            speed: Math.random() * .25 + .05,
            opacity: Math.random() * .6 + .2
        });
    }
}

createParticles();

/* anima partículas */

function animateParticles() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {
        particle.y -= particle.speed;

        if (particle.y < 0) {
            particle.y = canvas.height;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(168, 85, 247, ${particle.opacity})`;

        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

const heroTitle = document.querySelector(".hero-title");

setInterval(() => {
    heroTitle.style.transform = "translateX(1px)";

    setTimeout(() => {
        heroTitle.style.transform = "translateX(0)";
    }, 80);
}, 7000);