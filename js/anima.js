// Registramos el plugin para que GSAP sepa que debe escuchar el scroll
gsap.registerPlugin(ScrollTrigger);

// 1. ANIMACIÓN DEL HERO (Aparece ni bien carga la página)
// Usamos un Timeline para orquestar la entrada en cascada
const tlHero = gsap.timeline();

tlHero.from(".hero__image", {
    duration: 1.2, 
    opacity: 0, 
    x: -30, // Viene ligeramente desde la izquierda
    ease: "power3.out"
})
.from(".hero__title", {
    duration: 1, 
    opacity: 0, 
    y: 30, // Sube 30 píxeles
    ease: "power3.out"
}, "-=0.8") // El "-=0.8" hace que arranque antes de que termine la imagen
.from(".hero__description", {
    duration: 1, 
    opacity: 0, 
    y: 20, 
    ease: "power3.out"
}, "-=0.6")
.from(".hero__social a", {
    duration: 0.8, 
    opacity: 0, 
    y: 15, 
    stagger: 0.15, // Hace que los iconos aparezcan uno por uno (efecto metralleta)
    ease: "power2.out"
}, "-=0.5");

// 2. ANIMACIÓN DE TÍTULOS DE SECCIÓN (Scroll)
// Hacemos que cada "H2" aparezca con autoridad cuando entran en pantalla
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%", // Dispara cuando el elemento toca el 85% inferior de la pantalla
            toggleActions: "play none none none" // Solo se reproduce una vez
        },
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power3.out"
    });
});

// 3. SECCIÓN HABILIDADES (La Grilla)
gsap.from(".skill-card", {
    scrollTrigger: {
        trigger: ".skills__grid",
        start: "top 80%"
    },
    duration: 0.8,
    y: 40,
    opacity: 0,
    stagger: 0.1, // Carga las tarjetas una tras otra de forma fluida
    ease: "power3.out"
});

// 4. EXPERIENCIA Y PROYECTOS (Bloques Pesados)
// Aplicamos la misma regla a ambas tarjetas. Son bloques de información, 
// emergen desde abajo como placas de metal asentándose.
const tarjetasExp = gsap.utils.toArray('.experience-card, .project-card');
tarjetasExp.forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%"
        },
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });
});

// 5. SECCIÓN VISIÓN (Aparición asimétrica)
// Imagen viene sutilmente y texto sube
const tlVision = gsap.timeline({
    scrollTrigger: {
        trigger: ".about__container",
        start: "top 75%"
    }
});
tlVision.from(".about__image-wrapper", {
    duration: 1.2,
    opacity: 0,
    scale: 0.95, // Efecto muy sutil de escala
    ease: "power2.out"
})
.from(".about__text p", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2, // Párrafo a párrafo
    ease: "power3.out"
}, "-=0.8");