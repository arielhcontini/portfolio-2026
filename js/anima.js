const LythicsEngine = {
    init() {
        this.initHero();
        this.revealCanvas();
        requestAnimationFrame(() => this.initScrollAnimations());
    },

    initHero() {
        const heroItems = document.querySelectorAll('.hero__image, .hero__title, .hero__description, .hero__social a');
        heroItems.forEach((item, index) => {
            item.style.visibility = 'visible';
            item.animate([
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { duration: index === 0 ? 1500 : 900, delay: index * 120, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
        });
    },

    revealCanvas() {
        const canvas = document.querySelector('#bg-three');
        if (canvas) {
            canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 2000, fill: 'forwards', easing: 'ease-in-out' });
        }
    },

    initScrollAnimations() {
        const animatedItems = document.querySelectorAll('.section-title, .skill-card, .project-card, .experience-card');
        if (!('IntersectionObserver' in window)) {
            animatedItems.forEach(item => { item.style.visibility = 'visible'; item.style.opacity = '1'; });
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.style.visibility = 'visible';
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(20px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.1 });

        animatedItems.forEach(item => observer.observe(item));
    }
};

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => LythicsEngine.init());
