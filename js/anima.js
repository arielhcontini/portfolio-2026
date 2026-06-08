/**
 * LYTHICS - Extreme Performance Animation Engine
 * Stack: GSAP + ScrollTrigger
 * Directivas: anti-FOUC, autoAlpha, cascada técnica, integrated 3D Hero.
 */

gsap.registerPlugin(ScrollTrigger);

const LythicsEngine = {
    init() {
        // 1. Carga Prioritaria (Hero)
        this.initHero();
        
        // Revelar el canvas de Three.js
        gsap.to("#bg-three", { autoAlpha: 1, duration: 2, ease: "power2.inOut" });
        
        // 2. Carga Diferida (Fuera del hilo principal inicial)
        // Esto libera a la CPU para que pinte el sitio antes de calcular todos los scroll triggers
        requestAnimationFrame(() => {
            setTimeout(() => {
                this.initScrollAnimations();
                this.initThreeScrollEffect();
            }, 150); // Pequeño delay para asegurar que el LCP ya se midió
        });
    },

    initHero() {
        // Set inicial inmediato para evitar saltos si el CSS no cargó a tiempo
        gsap.set(".hero__image, .hero__title, .hero__description, .hero__social a", {
            y: 30, // Pequeño offset para animar
            autoAlpha: 0
        });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        
        // El Hero se revela usando autoAlpha (visibility: visible + opacity: 1)
        tl.to(".hero__image", { autoAlpha: 1, y: 0, duration: 1.5 })
          .to(".hero__title", { autoAlpha: 1, y: 0, duration: 1 }, "-=1.2")
          .to(".hero__description", { autoAlpha: 1, y: 0, duration: 1 }, "-=0.8")
          .to(".hero__social a", { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8 }, "-=0.6");
    },

    initThreeScrollEffect() {
        // Efecto Scrub para el monolito 3D integrado
        // OPTIMIZADO: Se eliminó el "filter: blur()" ya que es devastador para el rendimiento de CPU/GPU
        gsap.to("#bg-three", {
            scrollTrigger: {
                trigger: "#inicio",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            opacity: 0,
            scale: 0.8, // Menos agresivo para evitar recalculos pesados
            y: -50
        });
    },

    initScrollAnimations() {
        // Títulos de sección: Impacto Industrial
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.set(title, { y: 20, autoAlpha: 0 }); // Estado inicial
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
        gsap.set(".skill-card", { y: 20, autoAlpha: 0 }); // Estado inicial
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
            gsap.set(card, { y: 20, autoAlpha: 0 }); // Estado inicial
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
