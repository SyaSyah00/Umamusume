document.addEventListener('DOMContentLoaded', function() {
    observeElements();

    setupSmoothScroll();

    setupNavbarScroll();
});

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('scroll-animate');
        observer.observe(card);
    });

    document.querySelectorAll('.contact-card').forEach(card => {
        card.classList.add('scroll-animate');
        observer.observe(card);
    });

    document.querySelectorAll('.ranking-card').forEach(card => {
        card.classList.add('scroll-animate');
        observer.observe(card);
    });

    document.querySelectorAll('.about-section img, .about-section h3, .about-section p, .about-features').forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });

    document.querySelectorAll('.download-katalog').forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });
}



function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const scrollPosition = window.pageYOffset;  

    if (heroSection) {
        const parallaxElements = heroSection.querySelectorAll('[class*="--parallax"]');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--neon-blue)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(0, 212, 255, 0.1)';
        });
    });

    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--neon-blue)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(0, 212, 255, 0.1)';
        });
    });
});

// ==================== Active Navigation Link ====================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`a[href="#${section.getAttribute('id')}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ==================== Count Up Animation ====================
function countUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// ==================== Mobile Menu ====================
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
});

// ==================== Smooth Scroll Behavior ====================
window.addEventListener('load', function() {
    // Add initial animations to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const fadeInUpElements = heroContent.querySelectorAll('.fade-in-up > *');
        fadeInUpElements.forEach((element, index) => {
            element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
        });
    }
});

// ==================== Form Validation (Optional) ====================
function validateForm(formData) {
    if (!formData.name || formData.name.trim() === '') {
        console.error('Nama harus diisi');
        return false;
    }
    if (!formData.email || !isValidEmail(formData.email)) {
        console.error('Email tidak valid');
        return false;
    }
    if (!formData.message || formData.message.trim() === '') {
        console.error('Pesan harus diisi');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});

// ==================== Performance Optimization ====================
// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Images are already loaded, but this structure is ready for lazy loading
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
    }
});

// ==================== Accessibility Improvements ====================
// Add focus styles for keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==================== Dynamic Content Loading ====================
function loadMoreProducts() {
    // Placeholder for loading more products
    console.log('Loading more products...');
    showToastNotification();
}

// ==================== Social Media Links ====================
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add your social media links here
            const title = this.querySelector('i').className;
            console.log(`Mengarahkan ke ${title}...`);
        });
    });
});

// ==================== Contact Links ====================
document.addEventListener('DOMContentLoaded', function() {
    // Make contact info clickable
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const text = this.textContent;
            if (text.includes('Alamat')) {
                // Open maps
                window.open('https://maps.google.com/?q=Jakarta', '_blank');
            } else if (text.includes('Telepon')) {
                // Copy phone to clipboard
                copyToClipboard('+62 21 1234 5678');
            } else if (text.includes('Email')) {
                // Open email
                window.location.href = 'mailto:info@syasyah.com';
            }
        });
    });
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToastNotification();
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==================== Console Welcome Message ====================
console.log('%c🎮 Selamat datang di SyaSyah! 🎮', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cPremium Computer Accessories', 'color: #a78bfa; font-size: 12px;');
console.log('%cDesigned with ❤️ for Gaming & Professional Use', 'color: #00d4ff; font-size: 11px;');

                         // href function

document.querySelectorAll(".build-link").forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('href');
        window.location.href = targetPage;
    });
});
