document.addEventListener('DOMContentLoaded', () => {
    // 1. Estructura base del Modal si no existe
    if (!document.getElementById('modal-overlay')) {
        const modalHTML = `
            <div id="modal-overlay" class="modal-overlay">
                <div id="modal-window" class="modal-window">
                    <div id="modal-header" class="modal-header">
                        <span id="modal-title" class="modal-title">Caso de Estudio</span>
                        <button id="modal-close" class="modal-close">&times;</button>
                    </div>
                    <div id="modal-body" class="modal-body">
                        <!-- El contenido se inyectará aquí dinámicamente -->
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modalOverlay = document.getElementById('modal-overlay');
    const modalWindow = document.getElementById('modal-window');
    const modalHeader = document.getElementById('modal-header');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    
    // 2. Abrir Modal de Caso (Consolidado)
    const projectCards = document.querySelectorAll('.project-card.clickable-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const templateId = card.getAttribute('data-modal-target');
            const template = document.getElementById(templateId);
            
            if (template) {
                // Limpiar contenido previo
                modalBody.innerHTML = '';
                // Clonar contenido del template
                const content = template.cloneNode(true);
                content.style.display = 'block';
                modalBody.appendChild(content);
                
                // Actualizar título
                const titleText = card.querySelector('.project-card__title').innerText;
                modalTitle.innerText = titleText;
                
                // Mostrar modal
                modalOverlay.classList.add('active');
                
                // Reset posición
                modalWindow.style.top = '50%';
                modalWindow.style.left = '50%';
                modalWindow.style.transform = 'translate(-50%, -50%)';
                modalWindow.style.position = 'absolute';
            }
        });
    });

    // 3. Manejo de Videos (Delegación de eventos dentro del modal)
    modalBody.addEventListener('click', (e) => {
        const videoTrigger = e.target.closest('[data-video-id]');
        if (videoTrigger) {
            const videoId = videoTrigger.getAttribute('data-video-id');
            const isBlocked = videoTrigger.getAttribute('data-blocked') === 'true';
            const externalUrl = videoTrigger.getAttribute('data-external-url');
            
            if (isBlocked && externalUrl) {
                window.open(externalUrl, '_blank');
            } else {
                // Reproducir video in-line reemplazando el contenido del disparador o abriendo sub-modal
                // Para mantener la simplicidad y la interfaz de YouTube, inyectamos el iframe en el contenedor de la tarjeta
                const thumbContainer = videoTrigger.querySelector('.bivio-card__thumb') || videoTrigger.querySelector('.video-card__thumb') || videoTrigger;
                
                const iframeHTML = `
                    <iframe width="100%" height="100%" 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
                
                // Si es una tarjeta con thumb, reemplazamos el thumb
                if (thumbContainer !== videoTrigger) {
                    thumbContainer.innerHTML = iframeHTML;
                    thumbContainer.style.aspectRatio = '16/9';
                } else {
                    // Si es el featured video de Las Pelotas
                    videoTrigger.innerHTML = iframeHTML;
                }
            }
        }
    });

    // 4. Lógica de Cierre
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });

    // 5. Lógica Draggable (Mantenida)
    let isDragging = false;
    let offsetX, offsetY;

    modalHeader.addEventListener('mousedown', (e) => {
        if (e.target === modalClose) return;
        isDragging = true;
        
        const rect = modalWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        modalWindow.style.transition = 'none';
        modalWindow.style.transform = 'none';
        modalWindow.style.top = rect.top + 'px';
        modalWindow.style.left = rect.left + 'px';
        modalWindow.style.margin = '0';
        
        // Evitar que el iframe capture eventos
        modalBody.style.pointerEvents = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        x = Math.max(0, Math.min(x, window.innerWidth - modalWindow.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - modalWindow.offsetHeight));
        modalWindow.style.left = x + 'px';
        modalWindow.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        modalWindow.style.transition = '';
        modalBody.style.pointerEvents = 'auto';
    });
});
