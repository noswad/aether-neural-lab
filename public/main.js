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

    // 4.5. High-Performance Parallax Transitions
    const heroContent = document.querySelector('.hero-content');
    const sphereContainer = document.querySelector('.sphere-container');
    const heroWrappers = document.querySelectorAll('.card-anim-wrapper');
    const nav = document.querySelector('nav');

    let ticking = false;

    function updateTransitions() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(scrollY / vh, 1);
        
        // 1. Hero Content (Medium Parallax)
        if (heroContent) {
            heroContent.style.opacity = 1 - progress * 2;
            heroContent.style.transform = `translate3d(0, ${progress * -80}px, 0)`; // 使用 translate3d 觸發 GPU
        }
        
        // 2. Hero Wrappers (Fast Parallax)
        heroWrappers.forEach((w, idx) => {
            const speed = idx === 0 ? -150 : -120;
            w.style.opacity = 1 - progress * 3;
            w.style.transform = `translate3d(0, ${progress * speed}px, 0)`;
        });
        
        // 3. Background Video (Slow Zoom & Fade)
        if (sphereContainer) {
            // 只調整透明度與縮放，這是效能最好的組合
            sphereContainer.style.opacity = 1 - progress * 1;
            sphereContainer.style.transform = `scale(${1 + progress * 0.05}) translate3d(0, 0, 0)`;
        }

        // 4. Nav Logic
        if (scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.backdropFilter = 'blur(15px)';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateTransitions);
            ticking = true;
        }
    }, { passive: true }); // 優化滾動監聽性能

    // 5. The Lab Section Animations & Particle System
    const labSection = document.querySelector('#lab');
    const labTitle = document.querySelector('.lab-content .section-title');
    const labDesc = document.querySelector('.lab-content .section-desc');
    const featureItems = document.querySelectorAll('.feature-item');
    const mainGlassCard = document.querySelector('.main-glass-card');
    const statNodesNum = document.getElementById('stat-nodes');
    
    // 5.1. Canvas Particle System (Brownian Motion & Proximity)
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 12;
        
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5; // Brownian slow drift
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 2;
            }
            
            update() {
                // Random drift (Brownian)
                this.vx += (Math.random() - 0.5) * 0.05;
                this.vy += (Math.random() - 0.5) * 0.05;
                
                // Speed limit
                this.vx = Math.max(Math.min(this.vx, 0.5), -0.5);
                this.vy = Math.max(Math.min(this.vy, 0.5), -0.5);
                
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 163, 0.8)';
                ctx.fill();
                // Glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(0, 255, 163, 0.5)';
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.shadowBlur = 0;
            
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                
                // Draw lines between nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 255, 163, ${0.3 * (1 - dist/120)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 5.2. Odometer & Flicker Effect
    function startOdometer() {
        if (!statNodesNum) return;
        const target = 14.2;
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out expo
            const easeProgress = 1 - Math.pow(2, -10 * progress);
            current = (target * easeProgress).toFixed(1);
            
            statNodesNum.innerHTML = `${current}K`;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Start micro-flicker after finishing
                setInterval(() => {
                    const flicker = (target + (Math.random() - 0.5) * 0.04).toFixed(2);
                    statNodesNum.innerHTML = `${flicker}K`;
                }, 150);
            }
        }
        requestAnimationFrame(update);
    }

    // 5.3. Intersection Observer for Entry Animations
    const labObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered Title & Content Entry
                anime({
                    targets: [labTitle, labDesc, '.feature-item'],
                    translateY: [30, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(150),
                    easing: 'easeOutQuart',
                    duration: 1000
                });

                // Glass Card Entry
                anime({
                    targets: mainGlassCard,
                    scale: [0.9, 1],
                    opacity: [0, 1],
                    easing: 'easeOutElastic(1, .8)',
                    duration: 1500,
                    delay: 400
                });

                startOdometer();
                labObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (labSection) labObserver.observe(labSection);

    // 5.4. Simple Parallax for Lab Section
    window.addEventListener('scroll', () => {
        if (!labSection) return;
        const rect = labSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const shift = (window.innerHeight - rect.top) * 0.05;
            if (document.querySelector('.lab-content')) {
                document.querySelector('.lab-content').style.transform = `translate3d(0, ${shift}px, 0)`;
            }
            if (document.querySelector('.lab-visual')) {
                document.querySelector('.lab-visual').style.transform = `translate3d(0, ${-shift}px, 0)`;
            }
        }
    });

    // 6. Neural Engine Section Animations
    const engineSection = document.querySelector('#engine');
    const bentoItems = document.querySelectorAll('.bento-item');
    
    const engineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered entry for bento items
                anime({
                    targets: bentoItems,
                    scale: [0.95, 1],
                    opacity: [0, 1],
                    translateY: [40, 0],
                    delay: anime.stagger(150),
                    easing: 'easeOutQuart',
                    duration: 1000
                });

                // Circular Progress Update
                const ringProgress = document.querySelector('.ring-progress');
                if (ringProgress) {
                    const circumference = 2 * Math.PI * 90;
                    const offset = circumference - (0.84 * circumference);
                    ringProgress.style.strokeDashoffset = offset;
                }

                // Staggered Latency Load
                anime({
                    targets: '.loc',
                    opacity: [0, 1],
                    translateY: [10, 0],
                    delay: anime.stagger(100, {start: 500}),
                    easing: 'easeOutQuart'
                });

                // Start live data & visuals
                initTilt();
                initWave();
                startThroughputCounter();
                startLiveMetrics();
                
                engineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (engineSection) engineObserver.observe(engineSection);

    // 6.1. Magnetic Tilt Effect
    function initTilt() {
        bentoItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // 6.2. Live Sine Wave (Throughput)
    function initWave() {
        const canvas = document.getElementById('waveCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrame;
        let offset = 0;

        function resize() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#00f2ff';
            
            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(0, 242, 255, 0.5)';

            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + 
                          Math.sin(x * 0.02 + offset) * 15 * Math.sin(offset * 0.5) +
                          Math.sin(x * 0.01 + offset * 0.3) * 5;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            
            ctx.stroke();
            offset += 0.05;
            animationFrame = requestAnimationFrame(draw);
        }
        draw();
    }

    // 6.3. Throughput Counter (0 -> 1.2B)
    function startThroughputCounter() {
        const el = document.getElementById('throughput-val');
        if (!el) return;
        let obj = { val: 0 };
        anime({
            targets: obj,
            val: 1.2,
            round: 10,
            easing: 'easeOutQuart',
            duration: 2000,
            update: () => {
                el.innerText = obj.val.toFixed(1) + 'B';
            }
        });
    }

    function startLiveMetrics() {
        // 6.4. Load Micro-fluctuation
        const loadVal = document.getElementById('load-val');
        const ringProgress = document.querySelector('.ring-progress');
        if (loadVal && ringProgress) {
            setInterval(() => {
                const base = 84;
                const flicker = (base + (Math.random() - 0.5) * 2).toFixed(0);
                loadVal.innerHTML = `${flicker}<span>%</span>`;
                
                // Micro-move progress bar
                const circumference = 2 * Math.PI * 90;
                const offset = circumference - ((flicker/100) * circumference);
                ringProgress.style.strokeDashoffset = offset;
            }, 3000);
        }

        // 6.5. Latency Micro-fluctuation (±1ms)
        const latVals = document.querySelectorAll('.lat-val');
        latVals.forEach(el => {
            const baseLat = parseInt(el.innerText);
            setInterval(() => {
                const jitter = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
                el.innerText = baseLat + jitter;
            }, 2000 + Math.random() * 2000);
        });
    }

    // 7. Case Studies Section Sticky Stacking
    const casesStackWrapper = document.querySelector('.cases-stack-wrapper');
    const stickyCards = document.querySelectorAll('.case-card-sticky');

    if (casesStackWrapper && stickyCards.length > 0) {
        // Initial setup for entrance animation
        const casesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.case-card-sticky',
                        translateY: [100, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(200),
                        easing: 'easeOutQuart',
                        duration: 1200
                    });
                    casesObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        casesObserver.observe(casesStackWrapper);

        // Scroll listener for sticky stacking effect
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const vh = window.innerHeight;
                    
                    stickyCards.forEach((card, index) => {
                        const innerCard = card.querySelector('.case-card-inner');
                        if (!innerCard) return;
                        
                        if (index < stickyCards.length - 1) {
                            const nextCard = stickyCards[index + 1];
                            const nextRect = nextCard.getBoundingClientRect();
                            const targetTop = 80 + (index + 1) * 40;
                            
                            if (nextRect.top <= vh && nextRect.top >= targetTop) {
                                const progress = 1 - (nextRect.top - targetTop) / (vh - targetTop);
                                const targetScale = 1 - (stickyCards.length - 1 - index) * 0.04;
                                const currentScale = 1 - (progress * (1 - targetScale));
                                const currentOpacity = 1 - (progress * 0.3);
                                
                                innerCard.style.transform = `scale(${currentScale}) translateY(${progress * -20}px)`;
                                innerCard.style.opacity = currentOpacity;
                                innerCard.style.filter = `blur(${progress * 2}px)`;
                            } else if (nextRect.top < targetTop) {
                                const targetScale = 1 - (stickyCards.length - 1 - index) * 0.04;
                                innerCard.style.transform = `scale(${targetScale}) translateY(-20px)`;
                                innerCard.style.opacity = 0.7;
                                innerCard.style.filter = `blur(2px)`;
                            } else {
                                innerCard.style.transform = `scale(1) translateY(0)`;
                                innerCard.style.opacity = 1;
                                innerCard.style.filter = `blur(0px)`;
                            }
                        } else {
                            // Last card: slight settle effect as it reaches its top offset
                            const rect = card.getBoundingClientRect();
                            const targetTop = 80 + index * 40;
                            if (rect.top <= targetTop + 100 && rect.top >= targetTop) {
                                const progress = 1 - (rect.top - targetTop) / 100;
                                innerCard.style.transform = `scale(1) translateY(${progress * -5}px)`;
                            }
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
});
