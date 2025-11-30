/* =========================================
   ARUN LABANA - PORTFOLIO SCRIPTS
   Animations & Interactions
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== Scroll Progress Bar ==========
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // ========== Intersection Observer for Scroll Animations ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a stat
                if (entry.target.classList.contains('stat-counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-rotate, .animate-flip, .animate-blur, .animate-zoom-bounce, .stagger-children, .section-title, .stat-counter').forEach(el => {
        animateOnScroll.observe(el);
    });

    // ========== Counter Animation ==========
    function animateCounter(element) {
        const target = element.getAttribute('data-target');
        const suffix = element.getAttribute('data-suffix') || '';
        const prefix = element.getAttribute('data-prefix') || '';
        const duration = 2000;
        const startTime = performance.now();
        
        // Handle different number formats
        let endValue = parseFloat(target);
        let isDecimal = target.includes('.');
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            let currentValue = easeOut * endValue;
            
            if (isDecimal) {
                element.textContent = prefix + currentValue.toFixed(2) + suffix;
            } else {
                element.textContent = prefix + Math.floor(currentValue) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // ========== Typing Effect ==========
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        const speed = parseInt(element.getAttribute('data-speed')) || 100;
        let index = 0;
        
        element.textContent = '';
        element.classList.add('typing-text');
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    element.classList.remove('typing-text');
                }, 1000);
            }
        }
        
        // Start typing when element is visible
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(type, 500);
                    typingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        typingObserver.observe(element);
    });

    // ========== Custom Cursor ==========
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .card-hover, .skill-badge');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // ========== Magnetic Button Effect ==========
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Navbar Background on Scroll ==========
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.7)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // ========== Parallax Effect on Mouse Move ==========
    const parallaxElements = document.querySelectorAll('.parallax');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 20;
            const x = mouseX * speed;
            const y = mouseY * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ========== Skill Badge Tilt Effect ==========
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ========== Text Reveal Animation ==========
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    revealTexts.forEach(text => {
        const words = text.textContent.split(' ');
        text.innerHTML = words.map(word => 
            `<span class="word-wrap"><span class="word">${word}</span></span>`
        ).join(' ');
    });

    // ========== Active Navigation Link Highlight ==========
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('text-emerald-400');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('text-emerald-400');
                    }
                });
            }
        });
    });

    // ========== Mobile Menu Toggle ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // ========== Particle Background (Optional) ==========
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 6px and 14px
        const size = 6 + Math.random() * 8;
        // Random opacity between 0.3 and 0.6
        const opacity = 0.3 + Math.random() * 0.3;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: rgba(52, 211, 153, ${opacity});
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            box-shadow: 0 0 ${size * 2}px rgba(52, 211, 153, ${opacity * 0.5});
            animation: particleRise ${6 + Math.random() * 8}s linear infinite;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 15000);
    }

    // Create particles more frequently
    setInterval(createParticle, 800);

    // Add particle animation to stylesheet
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleRise {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(particleStyle);

    // ========== Console Easter Egg ==========
    console.log('%c👋 Hey there, curious developer!', 'font-size: 24px; font-weight: bold; color: #34d399;');
    console.log('%cI see you\'re checking out the console. Nice!', 'font-size: 14px; color: #94a3b8;');
    console.log('%c📧 Feel free to reach out: labanaarun0@gmail.com', 'font-size: 12px; color: #64748b;');
});

