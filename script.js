// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== TYPING ANIMATION =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typeWriter(typingElement, text, 150);
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
            
            // Trigger counter animations
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-category, .experience-card, .timeline-item, .stat-item, .about-description');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== SKILL BAR ANIMATIONS =====
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// ===== COUNTER ANIMATIONS =====
function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    const finalNumber = parseInt(numberElement.textContent);
    let currentNumber = 0;
    const increment = finalNumber / 50;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            numberElement.textContent = finalNumber + '+';
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(currentNumber) + '+';
        }
    }, 30);
}

// ===== PARTICLE SYSTEM FOR HERO SECTION =====
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        heroSection.appendChild(canvas);
        
        const particleSystem = new ParticleSystem(canvas);
        particleSystem.animate();
    }
});

// ===== MATRIX RAIN EFFECT =====
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-bg');
    if (!matrixContainer) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.1';
    
    matrixContainer.appendChild(canvas);
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Initialize matrix rain effect
document.addEventListener('DOMContentLoaded', createMatrixRain);

// ===== FORM ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form processing (remove this in production)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Add floating label effect
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
});

// ===== CURSOR TRAIL EFFECT =====
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        for (let i = 0; i < 12; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - i * 0.08};
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push(dot);
        }
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        this.animate();
    }
    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            const nextDot = this.dots[index + 1] || this.dots[0];
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            if (nextDot) {
                x += (parseFloat(nextDot.style.left) - x) * 0.3;
                y += (parseFloat(nextDot.style.top) - y) * 0.3;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail (only on desktop)
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', () => {
        new CursorTrail();
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Existing scroll functionality here
}, 16)); // ~60fps

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for custom elements
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
});

// ===== PRELOADER =====
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 255, 0.3);
            border-top: 3px solid #00ffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;
    
    preloader.appendChild(loader);
    document.body.appendChild(preloader);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Hide preloader after a short delay
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});
