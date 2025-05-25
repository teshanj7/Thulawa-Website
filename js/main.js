// Global JavaScript functionality

// Mobile Navigation Toggle
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional - disabled by default)
        // Uncomment the lines below if you want the header to hide on scroll
        /*
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
    });
}

// Intersection Observer for Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.feature-card, .use-case, .framework-card, .finding-card, .objective-box, .document-card').forEach(el => {
        observer.observe(el);
    });
}

// Loading Animation
function initializeLoading() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) {
            setTimeout(() => heroTitle.style.opacity = '1', 200);
        }
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.style.opacity = '1', 400);
        }
        if (heroButtons) {
            setTimeout(() => heroButtons.style.opacity = '1', 600);
        }
    });
}

// Form Enhancement (for contact page)
function initializeFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    });
}

// EmailJS Contact Form Handler
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return; // Exit if not on contact page
    
    // Load environment variables
    const emailjsConfig = {
        publicKey: window.ENV?.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
        serviceId: window.ENV?.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        templateId: window.ENV?.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
    };
    
    // Check if environment variables are loaded
    if (!window.ENV && (emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY' || 
                       emailjsConfig.serviceId === 'YOUR_SERVICE_ID' || 
                       emailjsConfig.templateId === 'YOUR_TEMPLATE_ID')) {
        console.warn('Environment variables not loaded. Please check your .env configuration.');
    }
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(emailjsConfig.publicKey);
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS is not loaded');
            showMessage('error', '❌ Email service is not available. Please try again later.');
            return;
        }
        
        // Check if configuration is valid
        if (emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY' || 
            emailjsConfig.serviceId === 'YOUR_SERVICE_ID' || 
            emailjsConfig.templateId === 'YOUR_TEMPLATE_ID') {
            console.error('EmailJS configuration is not properly set');
            showMessage('error', '❌ Email service is not configured. Please contact the administrator.');
            return;
        }
        
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');
        const messageStatus = document.getElementById('message-status');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        messageStatus.style.display = 'none';
        
        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Not specified',
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_name: 'Thulawa Team'
        };
        
        // Send email using EmailJS
        emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                showMessage('success', '✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                showMessage('error', '❌ Sorry, there was an error sending your message. Please try again or contact us directly via email.');
            })
            .finally(function() {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            });
    });
    
    // Helper function to show messages
    function showMessage(type, text) {
        const messageStatus = document.getElementById('message-status');
        messageStatus.className = type === 'success' ? 'success-message' : 'error-message';
        messageStatus.innerHTML = text;
        messageStatus.style.display = 'block';
        
        // Scroll to message
        messageStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Utility Functions
function debounce(func, wait) {
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

// Performance optimized scroll handler
const handleScroll = debounce(function() {
    // Any additional scroll-based functionality can go here
}, 16); // ~60fps

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNav();
    initializeSmoothScrolling();
    initializeHeaderScroll();
    initializeScrollAnimations();
    initializeLoading();
    initializeFormEnhancements();
    initializeContactForm();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Add loading class to body
    document.body.classList.add('js-enabled');
});

// Handle resize events
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu && window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
}, 250));

// Add CSS classes for animations and mobile navigation
const style = document.createElement('style');
style.textContent = `
    /* Scroll Animations */
    .feature-card,
    .use-case,
    .framework-card,
    .finding-card,
    .objective-box,
    .document-card {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .js-enabled .feature-card,
    .js-enabled .use-case,
    .js-enabled .framework-card,
    .js-enabled .finding-card,
    .js-enabled .objective-box,
    .js-enabled .document-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .feature-card.animate-in,
    .use-case.animate-in,
    .framework-card.animate-in,
    .finding-card.animate-in,
    .objective-box.animate-in,
    .document-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-buttons {
        opacity: 1;
        transition: opacity 0.6s ease;
    }
    
    .js-enabled .hero-title,
    .js-enabled .hero-subtitle,
    .js-enabled .hero-buttons {
        opacity: 0;
    }
    
    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
            height: calc(100vh - 70px);
            overflow-y: auto;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 15px 0;
        }
        
        .nav-link {
            font-size: 1.1rem;
            padding: 10px 20px;
            display: block;
            border-radius: 8px;
            margin: 0 20px;
            transition: all 0.3s ease;
        }
        
        .nav-link:hover {
            background: rgba(17, 153, 142, 0.1);
        }
        
        .demo-link {
            margin: 20px !important;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%) !important;
            color: white !important;
            padding: 15px 25px !important;
            border-radius: 25px !important;
        }
        
        .hamburger {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            padding: 5px;
            z-index: 1001;
        }
        
        .hamburger span {
            width: 25px;
            height: 3px;
            background: #333;
            margin: 3px 0;
            transition: 0.3s;
            border-radius: 3px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        body.nav-open {
            overflow: hidden;
        }
    }
    
    /* Form Enhancement Styles */
    .form-group {
        position: relative;
    }
    
    .form-group.focused label {
        transform: translateY(-25px) scale(0.9);
        color: #11998e;
    }
    
    /* Loading States */
    .hero-title,
    .hero-subtitle,
    .hero-buttons {
        opacity: 1;
        transition: opacity 0.6s ease;
    }
    
    .js-enabled .hero-title,
    .js-enabled .hero-subtitle,
    .js-enabled .hero-buttons {
        opacity: 0;
    }
    
    /* Smooth transitions for all interactive elements */
    .btn, .nav-link, .document-card, .feature-card {
        transition: all 0.3s ease;
    }
    
    /* Focus styles for accessibility */
    .nav-link:focus,
    .btn:focus,
    input:focus,
    textarea:focus,
    select:focus {
        outline: 2px solid #11998e;
        outline-offset: 2px;
    }
`;

document.head.appendChild(style);

// Export functions for use in other scripts if needed
window.StreamFlowJS = {
    initializeMobileNav,
    initializeSmoothScrolling,
    initializeHeaderScroll,
    initializeScrollAnimations,
    initializeLoading,
    initializeFormEnhancements,
    initializeContactForm,
    debounce
};