// Initialize AOS with custom settings
AOS.init({
    duration: 800,
    easing: 'cubic-bezier(0.2, 1, 0.3, 1)',
    once: true,
    offset: 100,
    delay: 100
});

// Add scroll-based animation triggers
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for section titles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });
});

// Initialize AOS (Animate On Scroll)
window.addEventListener('load', function() {
    // Initialize AOS with a slight delay to ensure proper loading
    setTimeout(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }, 100);

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add counter animation to stats
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                animateValue(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    // Add subtle interaction sounds
    const interactionSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDAwMDAwODg4ODg4ODg4ODg4ODg4ODg4OD///////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAYAAAAAAAAAAbC+xtirAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAJCAGJGUEQABBGkGJ3t/99yBBiD/v+b//6v///+bZvz7V+z+f7P+f8O5/f8O5+XyT5/L5fL5fL5f8AAAABJLf/7P///+z/n///Z/z7n/Pvz7//8u5/L5fL5fL5f8AAAAAAAAAAAABJLf/7P///+z/n///Z/z7n/Pvz7//8u5/L5fL5fL5f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxBYJqAGFGUEQAAAAABJLf/7P///+z/n///Z/z7n/Pvz7//8u5/L5fL5fL5f8AAAAAAAAAAAABJLf/7P///+z/n///Z/z7n/Pvz7//8u5/L5fL5fL5f8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    interactionSound.volume = 0.2;  // Set volume to 20%

    // Add sound to interactive elements
    document.querySelectorAll('.cta-button, .pricing-button, .submit-button, .feature-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            interactionSound.currentTime = 0;
            interactionSound.play().catch(e => console.log('Sound play prevented'));
        });
    });
});

// Counter animation function
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start) + (obj.textContent.includes('+') ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Form Validation and Enhancement
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Add form validation feedback
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            const formGroup = input.closest('.form-group');
            if (!formGroup.querySelector('.error-message')) {
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = input.validationMessage;
                formGroup.appendChild(error);
            }
        });

        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            const error = formGroup.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        });
    });

    // Add loading state to submit button
    contactForm.addEventListener('submit', (e) => {
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support for feature and benefit cards
const cards = document.querySelectorAll('.feature-card, .benefit-item, .pricing-card');
cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const link = card.querySelector('a');
            if (link) {
                link.click();
            }
        }
    });
}); 