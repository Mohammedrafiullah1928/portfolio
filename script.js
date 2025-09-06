// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initParticles();
    initScrollEffects();
    initFormValidation();
    init3DEffects();
    initSkillsAnimation(); // New function for skills animation
});

// Initialize navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .cert-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Floating animation for shapes
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        // Randomize animation duration and delay for more natural effect
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        shape.style.animationDuration = `${duration}s`;
        shape.style.animationDelay = `${delay}s`;
    });
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Initialize particle effects
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        
        // Randomly choose neon color
        const colors = ['#00f3ff', '#d100ff', '#ff00c8'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${color}`;
        
        container.appendChild(particle);
    }
}

// Initialize scroll effects
function initScrollEffects() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        // Hide/show navbar on scroll
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
        
        // Parallax effect for background elements
        const scrollY = window.scrollY;
        const floatingShapes = document.querySelectorAll('.floating-shape');
        
        floatingShapes.forEach(shape => {
            const speed = 0.1 + Math.random() * 0.2;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        // Animate profile image border on scroll
        const imageBorder = document.querySelector('.image-border');
        if (imageBorder) {
            imageBorder.style.transform = `rotate(${scrollY * 0.1}deg)`;
        }
    });
}

// Initialize form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Initialize 3D effects
function init3DEffects() {
    // Make project cards tilt on mouse move
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Tilt effect for hero buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            this.style.transform = `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        });
    });
}

// Initialize skills section animations
function initSkillsAnimation() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            const dots = this.querySelectorAll('.dot');
            
            // Animate dots with a wave effect
            dots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        });
        
        tag.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            // You could add a modal or tooltip showing more info about the skill
            console.log(`Clicked on skill: ${skill}`);
        });
    });
}

// Add CSS for particles and animations via JavaScript
function injectAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Particle styles */
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: float-particle 15s infinite ease-in-out;
        }
        
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(calc(-10px - var(--random-offset, 0px)), calc(-15px - var(--random-offset, 0px)));
            }
            50% {
                transform: translate(calc(15px + var(--random-offset, 0px)), calc(-5px - var(--random-offset, 0px)));
            }
            75% {
                transform: translate(calc(5px + var(--random-offset, 0px)), calc(15px + var(--random-offset, 0px)));
            }
        }
        
        /* Animation for elements coming into view */
        .project-card, .timeline-item, .cert-item {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .project-card.animate-in, 
        .timeline-item.animate-in, 
        .cert-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Form error state */
        .contact-form input.error,
        .contact-form textarea.error {
            border-color: #ff00c8;
            box-shadow: 0 0 10px rgba(255, 0, 200, 0.3);
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                left: 0;
                width: 100%;
                background: rgba(5, 5, 16, 0.95);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                border-top: 1px solid rgba(0, 243, 255, 0.3);
            }
            
            .nav-links.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .menu-toggle {
                display: flex;
            }
            
            .menu-toggle.active .hamburger:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .menu-toggle.active .hamburger:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active .hamburger:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Inject additional styles
injectAdditionalStyles();