/**
 * LYTHICS - Extreme Performance Animation Engine
 * Stack: GSAP + ScrollTrigger
 * Directivas: anti-FOUC, autoAlpha, cascada técnica.
 */

gsap.registerPlugin(ScrollTrigger);

const LythicsEngine = {
    init() {
        // Revelar el canvas de Three.js con elegancia
        gsap.to("#bg-three", { autoAlpha: 1, duration: 2, ease: "power2.inOut" });
        
        this.initHero();
        this.initScrollAnimations();
    },

    initHero() {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        
        // El Hero se revela usando autoAlpha (visibility: visible + opacity: 1)
        tl.to(".hero__image", { autoAlpha: 1, x: 0, duration: 1.5 })
          .to(".hero__title", { autoAlpha: 1, y: 0, duration: 1 }, "-=1.2")
          .to(".hero__description", { autoAlpha: 1, y: 0, duration: 1 }, "-=0.8")
          .to(".hero__social a", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8 }, "-=0.6");
    },

    initScrollAnimations() {
        // Títulos de sección: Impacto Industrial
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "expo.out"
            });
        });

        // Grid de Habilidades
        gsap.to(".skill-card", {
            scrollTrigger: {
                trigger: ".skills__grid",
                start: "top 85%"
            },
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out"
        });

        // Tarjetas de Proyectos y Experiencia (Carga progresiva)
        const cards = gsap.utils.toArray('.project-card, .experience-card');
        cards.forEach(card => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 92%"
                },
                autoAlpha: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out"
            });
        });
    }
};

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => LythicsEngine.init());
