// Initialize AOS with custom settings
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS once with combined settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.2, 1, 0.3, 1)',
        once: true,
        offset: 100,
        delay: 100,
        disable: 'mobile',
        mirror: false
    });

    // Unified mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenuBtn) {
        const toggleMenu = (show) => {
            mobileMenuBtn.setAttribute('aria-expanded', show);
            navLinks.classList.toggle('active', show);
            menuIcon.classList.toggle('fa-bars', !show);
            menuIcon.classList.toggle('fa-times', show);
        };

        // Handle menu button click
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isExpanded);
        });

        // Handle keyboard navigation
        mobileMenuBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
                toggleMenu(!isExpanded);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // Unified scroll handling
    const header = document.querySelector('header');
    let lastScroll = 0;
    let scrollTimeout;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for styling
        header.classList.toggle('scrolled', currentScroll > 50);

        // Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    };

    // Throttle scroll event
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 50);
        }
    });

    // Unified smooth scrolling
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
                if (mobileMenuBtn) {
                    toggleMenu(false);
                }
            }
        });
    });

    // Initialize Calendly integration
    const initCalendlyButtons = () => {
        const applyButtons = document.querySelectorAll('.cta-button, .pricing-button');
        applyButtons.forEach(button => {
            if (button.getAttribute('href') === '#contact') {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (window.innerWidth >= 768) {
                        // Show loading state
                        button.classList.add('loading');
                        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                        
                        Calendly.initPopupWidget({
                            url: 'https://calendly.com/mhsutton07/45min',
                            onClose: () => {
                                // Remove loading state
                                button.classList.remove('loading');
                                button.textContent = button.getAttribute('data-original-text') || 'Book Your Strategy Call';
                            }
                        });
                    } else {
                        const contactSection = document.querySelector('#contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                });
            }
        });
    };

    // Initialize Calendly
    initCalendlyButtons();

    // Add keyboard navigation support
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
});

// Initialize cookie consent with improved accessibility
window.cookieconsent.initialise({
    palette: {
        popup: {
            background: "var(--secondary-bg)",
            text: "var(--text-primary)"
        },
        button: {
            background: "var(--accent-green)",
            text: "var(--primary-bg)"
        }
    },
    theme: "classic",
    position: "bottom-right",
    content: {
        message: "We use cookies to enhance your experience and analyze our website traffic.",
        dismiss: "Accept",
        link: "Learn more",
        href: "/privacy-policy.html"
    },
    elements: {
        messagelink: '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role="button" tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="_blank">{{link}}</a></span>',
        dismiss: '<a aria-label="dismiss cookie message" role="button" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>'
    }
}); 