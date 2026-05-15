document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;

    // Prepare h1 for letter-by-letter animation
    const h1 = document.getElementById('hero-title');
    if (h1) {
        const text = h1.innerHTML;
        // Split by <br> or spaces, but keep the tags
        const words = text.split(/(\s+|<br\s*\/?>)/);
        h1.innerHTML = words.map(word => {
            if (word.match(/<br\s*\/?>/)) return word;
            if (word.match(/\s+/)) return word;
            // Wrap each word in a non-breaking span, then each letter
            const letters = word.replace(/([^>\s])(?![^<]*>)/g, "<span class='letter' style='display:inline-block; opacity:0; transform:translateY(30px)'>$&</span>");
            return `<span style="display:inline-block; white-space:nowrap;">${letters}</span>`;
        }).join('');
    }

    // 1. Entrance Animation Sequence
    const entranceAnimation = anime.timeline({
        easing: 'easeOutQuart',
        duration: 1200
    });

    entranceAnimation
    .add({
        targets: 'h1',
        opacity: [0, 1],
        duration: 100
    }, 500)
    .add({
        targets: 'h1 .letter',
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(25)
    }, 500)
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
            let rect;
            
            el.addEventListener('mouseenter', () => {
                rect = el.getBoundingClientRect();
            });

            el.addEventListener('mousemove', function(e) {
                if (!rect) rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Sheen variables
                el.style.setProperty('--x', `${(x / rect.width) * 100}%`);
                el.style.setProperty('--y', `${(y / rect.height) * 100}%`);

                // Magnetic force calculation
                const mx = x - rect.width / 2;
                const my = y - rect.height / 2;
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

    // 4. Data Counter & Global Parallax
    const statValue = document.querySelector('.stat-value');
    if (statValue) {
        const countObj = { val: 0 };
        anime({
            targets: countObj,
            val: 99.8,
            duration: 2500,
            easing: 'easeOutExpo',
            delay: 1500,
            update: function() {
                statValue.innerHTML = countObj.val.toFixed(1) + '%';
            }
        });
    }

    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            anime({
                targets: '.sphere-container',
                translateX: x * -25,
                translateY: y * -25,
                duration: 1200,
                easing: 'easeOutQuart'
            });
        });
    }

    // Mobile Menu Logic
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});
