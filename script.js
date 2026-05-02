// Nibi's Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initCursor();
    initScrollReveal();
    initSmoothScroll();
});

// Create dynamic starfield
function initStars() {
    const starField = document.getElementById('star-field');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 5;
        const delay = Math.random() * 5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;

        starField.appendChild(star);
    }
}

// Custom UFO Cursor logic
function initCursor() {
    const cursor = document.getElementById('ufo-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor movement (lerp)
    function animate() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.background = 'var(--accent-purple)';
            cursor.style.boxShadow = '0 0 20px var(--accent-purple), 0 0 40px var(--accent-purple)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--accent-cyan)';
            cursor.style.boxShadow = '0 0 15px var(--accent-cyan), 0 0 30px var(--accent-cyan)';
        });
    });
}

// Reveal elements on scroll
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.glass-card, .section-title, .hero-content, .hero-image-container');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Smooth scrolling for navigation
function initSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form submission effect
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'TRANSMITTING...';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            btn.textContent = 'SIGNAL RECEIVED';
            btn.style.background = '#00ff00';
            btn.style.boxShadow = '0 0 20px #00ff00';
            form.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.style.pointerEvents = 'all';
            }, 3000);
        }, 2000);
    });
}
