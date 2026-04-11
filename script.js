document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('.section, .hero');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
    
    setTimeout(() => {
        const skillsSection = document.querySelector('.all-about');
        if (skillsSection && isInViewport(skillsSection)) {
            animateSkills();
            skillsAnimated = true;
        }
    }, 500);
    
    const skillsSection = document.querySelector('.all-about');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkills();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    const revealElements = document.querySelectorAll('.info-card, .hobby-card, .goal-item, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Extract the plain text before "Kim!" and keep the span intact
        // We type out "Hello, I'm " then append the already-rendered span
        const spanEl = heroTitle.querySelector('.highlight');
        const spanHTML = spanEl ? spanEl.outerHTML : '';
        const fullText = heroTitle.textContent; // plain text version
        const prefix = heroTitle.childNodes[0] ? heroTitle.childNodes[0].textContent : '';

        heroTitle.innerHTML = '';
        let index = 0;

        function typeWriter() {
            if (index < prefix.length) {
                heroTitle.innerHTML = prefix.substring(0, index + 1);
                index++;
                setTimeout(typeWriter, 80);
            } else {
                // Prefix done — append the highlighted span all at once
                heroTitle.innerHTML = prefix + spanHTML;
            }
        }

        typeWriter();
    }

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    const hero = document.querySelector('.hero');
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    


    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(start);
            }
        }, 16);
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    item.style.display = '';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Gallery scroll reveal
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, i * 80);
            }
        });
    }, { threshold: 0.1 });

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.96)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s ease';
    galleryObserver.observe(item);
});

    // ===== ACTIVITIES FILTER =====
    const actFilterBtns = document.querySelectorAll('.act-filter-btn');
    const termGroups = document.querySelectorAll('.term-group');

    actFilterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            actFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const term = this.getAttribute('data-term');

            termGroups.forEach(group => {
                if (term === 'all') {
                    group.classList.remove('hidden');
                } else {
                    const match = group.id === 'term-' + term;
                    group.classList.toggle('hidden', !match);
                }
            });
        });
    });

    // ===== SLIDESHOW LIGHTBOX =====
    const slideshowLightbox = document.getElementById('slideshow-lightbox');
    const slideshowImg = document.getElementById('slideshow-img');
    const slideCounter = document.getElementById('slide-counter');
    const slidePrev = document.getElementById('slide-prev');
    const slideNext = document.getElementById('slide-next');

    let currentSlide = 0;
    let currentImages = [];

    function openSlideshow(images) {
        currentImages = images;
        currentSlide = 0;
        updateSlide();
        slideshowLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateSlide() {
        slideshowImg.src = currentImages[currentSlide];
        slideCounter.textContent = (currentSlide + 1) + ' / ' + currentImages.length;
    }

    function closeSlideshow() {
        slideshowLightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    slidePrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length;
        updateSlide();
    });

    slideNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % currentImages.length;
        updateSlide();
    });

    document.getElementById('slideshow-close').addEventListener('click', closeSlideshow);
    slideshowLightbox.addEventListener('click', (e) => {
        if (e.target === slideshowLightbox) closeSlideshow();
    });
    document.addEventListener('keydown', (e) => {
        if (!slideshowLightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') { currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length; updateSlide(); }
        if (e.key === 'ArrowRight') { currentSlide = (currentSlide + 1) % currentImages.length; updateSlide(); }
        if (e.key === 'Escape') closeSlideshow();
    });

    // ===== ACTIVITY CARD LIGHTBOX =====
    const activityCards = document.querySelectorAll('.activity-card');

    activityCards.forEach(card => {
        card.addEventListener('click', function () {
            const wrap = this.querySelector('.activity-img-wrap');
            const img = this.querySelector('img');
            const isMissing = wrap && wrap.classList.contains('img-missing');

            // Slideshow card
            if (this.classList.contains('slideshow-card') && !isMissing) {
                const base = this.getAttribute('data-slideshow');
                const count = parseInt(this.getAttribute('data-count'));
                const ext = this.getAttribute('data-ext') || 'jpg';
                const images = [];
                for (let i = 1; i <= count; i++) {
                    images.push('images/' + base + '-' + i + '.' + ext);
                }
                openSlideshow(images);
                return;
            }

            // Regular single-image card
            if (img && !isMissing) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ===== ACTIVITY CARDS SCROLL REVEAL =====
    const actObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, i * 50);
            }
        });
    }, { threshold: 0.05 });

    activityCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.96)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease';
        actObserver.observe(card);
    });

console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #64748b;');
    


    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });


    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted! (This is a demo)');
        });
    });

});


function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}