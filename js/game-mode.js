document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'game-mode-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle Game Mode');
    toggleBtn.innerHTML = '<span style="font-size: 32px; line-height: 1;">🎮</span>';

    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('game-mode-active');
        
        if (document.body.classList.contains('game-mode-active')) {
            console.log('Game Mode Activated: UI Hidden, Background Interactive');
        } else {
            console.log('Game Mode Deactivated: UI Restored');
        }
    });
});
