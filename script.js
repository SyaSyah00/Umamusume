document.addEventListener('DOMContentLoaded', async function() {
    await loadPartials();
    setupSharedNavigationLinks();

    observeElements();

    setupSmoothScroll();

    setupNavbarScroll();

    document.dispatchEvent(new Event('partialsLoaded'));
});

async function loadPartials() {
    const includeElements = document.querySelectorAll('[data-include]');

    await Promise.all(Array.from(includeElements).map(async element => {
        const file = element.getAttribute('data-include');
        const html = await fetchPartial(file);

        if (!html) {
            console.error(`Gagal memuat ${file}`);
            return;
        }

        element.outerHTML = html;
    }));
}

async function fetchPartial(file) {
    const normalizedFile = file.replace('../', '');
    const candidates = [
        file,
        `/${normalizedFile}`,
        `./${normalizedFile}`
    ];

    for (const candidate of candidates) {
        try {
            const response = await fetch(candidate);

            if (response.ok) {
                return await response.text();
            }
        } catch (error) {
            console.warn(`Tidak bisa memuat partial dari ${candidate}`, error);
        }
    }

    return getPartialFallback(file);
}

function getPartialFallback(file) {
    if (file.includes('header.html')) {
        return `
<nav class="navbar navbar-expand-lg fixed-top navbar-custom">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#home">
            <i class="fas fa-horse-head"></i> SyaSyah
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="#home"><i class="fas fa-house"></i> Home</a></li>
                <li class="nav-item"><a class="nav-link" href="#about"><i class="fas fa-flag-checkered"></i> About</a></li>
                <li class="nav-item"><a class="nav-link" href="#products"><i class="fas fa-star"></i> Builds <span class="nav-new">NEW</span></a></li>
            </ul>
        </div>
    </div>
</nav>`;
    }

    if (file.includes('footer.html')) {
        return `
<footer class="footer-section">
    <div class="container">
        <div class="row mb-4">
            <div class="col-md-3">
                <h5 class="fw-bold mb-3"><i class="fas fa-horse"></i> Umamusume</h5>
                <p class="small text-muted">Join the Umamusume Pretty Derby fan community and enjoy the amazing racing adventures with your favorite characters.</p>
            </div>
            <div class="col-md-3">
                <h5 class="fw-bold mb-3">Navigation</h5>
                <ul class="list-unstyled footer-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Game</a></li>
                    <li><a href="#products">Characters</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h5 class="fw-bold mb-3">Follow Us</h5>
                <div class="social-links">
                    <a href="#" class="social-link" title="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-link" title="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="#" class="social-link" title="Discord"><i class="fab fa-discord"></i></a>
                </div>
            </div>
            <div class="col-md-3">
                <h5 class="fw-bold mb-3">Game Information</h5>
                <ul class="list-unstyled footer-links">
                    <li><a href="https://store.steampowered.com/app/3224770/Umamusume_Pretty_Derby/">Download Game</a></li>
                    <li><a href="#">Player Guide</a></li>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Technical Support</a></li>
                </ul>
            </div>
        </div>
        <hr class="border-secondary">
        <div class="row">
            <div class="col-12 text-center">
                <div class="credit-section mb-3">
                    <h6 class="fw-bold text-white mb-2">
                        <i class="fas fa-crown text-warning me-2"></i>
                        Umamusume Pretty Derby
                    </h6>
                    <p class="small text-light mb-1"><strong>Developer:</strong> Cygames, Co., Ltd.</p>
                    <p class="small text-light mb-1"><strong>Publisher:</strong> Cygames</p>
                    <p class="small text-light mb-1"><strong>Platform:</strong> iOS, Android, PC</p>
                    <p class="small text-light mb-2"><strong>Genre:</strong> Simulation, Racing, RPG</p>
                </div>
                <div class="disclaimer-section">
                    <div class="fw-bold text-white mb-2">
                        <div class="credit-section mb-3">
                            <p class="small text-light mb-1">&copy; 2024 Cygames, Co., Ltd. All Rights Reserved.</p>
                            <p class="small text-light mb-1">Umamusume Pretty Derby is a trademark of Cygames, Co., Ltd.</p>
                            <p class="small text-light mb-1">This fan website is not affiliated with or endorsed by Cygames.</p>
                            <p class="small text-light mb-1">Made with <i class="fas fa-heart text-danger"></i> for the Indonesian Umamusume community</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>`;
    }

    return '';
}

function setupSharedNavigationLinks() {
    const isNestedPage = window.location.pathname.includes('/HTML%20uma/') || window.location.pathname.includes('/HTML uma/');

    if (!isNestedPage) return;

    const pagePrefix = '../index.html';
    const sectionLinks = {
        '#home': `${pagePrefix}#home`,
        '#about': `${pagePrefix}#about`,
        '#products': `${pagePrefix}#products`
    };

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');

        if (sectionLinks[href]) {
            link.setAttribute('href', sectionLinks[href]);
        }
    });
}

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
    if (!navbar) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.boxShadow = 'rgba(0, 0, 0, 0.04) 0 2px 6px 0, rgba(0, 0, 0, 0.08) 0 4px 12px 0';
        } else {
            navbar.style.boxShadow = 'none';
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

document.addEventListener('partialsLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'transparent';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
        });
    });

    // Contact card hover effects
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--ink)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--hairline)';
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
document.addEventListener('partialsLoaded', function() {
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
document.addEventListener('partialsLoaded', function() {
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
document.addEventListener('partialsLoaded', function() {
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
document.addEventListener('partialsLoaded', function() {
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
console.log('%cSelamat datang di SyaSyah!', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
console.log('%cUmamusume build recommendations', 'color: #f8fafc; font-size: 12px;');
console.log('%cDesigned for the Indonesian Umamusume community', 'color: #6a6a6a; font-size: 11px;');

                         // href function

document.querySelectorAll(".build-link").forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('href');
        window.location.href = targetPage;
    });
});
