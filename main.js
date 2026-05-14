document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;

    // 1. Entrance Animation Sequence
    const entranceAnimation = anime.timeline({
        easing: 'easeOutQuart',
        duration: 1200
    });

    entranceAnimation
    .add({
        targets: 'h1',
        translateY: [isMobile ? 30 : 50, 0],
        opacity: [0, 1],
        delay: 500
    })
    .add({
        targets: '.hero-subtext',
        translateY: [20, 0],
        opacity: [0, 1],
        offset: '-=1000'
    })
    .add({
        targets: '.btn-cta',
        scale: [0.9, 1],
        opacity: [0, 1],
        offset: '-=800'
    })
    .add({
        targets: '.sphere-container',
        scale: [1.2, 1],
        opacity: [0, 1],
        duration: 3000,
        offset: '-=2500'
    })
    .add({
        targets: '.floating-card',
        translateY: [40, 0],
        scale: [0.95, 1],
        opacity: [0, 1],
        delay: anime.stagger(200),
        offset: '-=1800'
    });

    // 2. Refined Magnetic & Interaction (Disabled for Touch/Mobile)
    if (!isMobile && !('ontouchstart' in window)) {
        const interactiveElements = document.querySelectorAll('.btn, .floating-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mousemove', function(e) {
                const pos = el.getBoundingClientRect();
                const x = e.clientX - pos.left;
                const y = e.clientY - pos.top;
                
                // Sheen variables
                el.style.setProperty('--x', `${(x / pos.width) * 100}%`);
                el.style.setProperty('--y', `${(y / pos.height) * 100}%`);

                // Magnetic force calculation
                const mx = x - pos.width / 2;
                const my = y - pos.height / 2;
                const strength = el.classList.contains('btn') ? 0.2 : 0.35;

                anime({
                    targets: el,
                    translateX: mx * strength,
                    translateY: my * strength,
                    rotateX: -my * (strength * 0.05),
                    rotateY: mx * (strength * 0.05),
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            });

            el.addEventListener('mouseleave', function() {
                anime({
                    targets: el,
                    translateX: 0,
                    translateY: 0,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 1200,
                    easing: 'easeOutElastic(1, .5)'
                });
            });
        });
    }

    // 3. Ambient Drift (Always active, but adjusted for context)
    // Targeting wrappers to avoid conflict with magnetic transforms
    anime({
        targets: '.wrapper-left',
        translateY: isMobile ? [0, 10] : [-20, 20],
        translateX: isMobile ? 0 : [-10, 10],
        duration: 8000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    anime({
        targets: '.wrapper-right',
        translateY: isMobile ? [0, -10] : [20, -20],
        translateX: isMobile ? 0 : [10, -10],
        duration: 9500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
        delay: 500
    });
});
