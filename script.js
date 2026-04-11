document.addEventListener('DOMContentLoaded', function() {

    // ===== NAV LINKS =====
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                window.scrollTo({ top: targetSection.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // ===== NAVBAR SCROLL =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== ACTIVE NAV ON SCROLL =====
    const sections = document.querySelectorAll('.section, .hero');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });

    // ===== TYPEWRITER =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const spanEl = heroTitle.querySelector('.highlight');
        const spanHTML = spanEl ? spanEl.outerHTML : '';
        const prefix = heroTitle.childNodes[0] ? heroTitle.childNodes[0].textContent : '';
        heroTitle.innerHTML = '';
        let index = 0;
        function typeWriter() {
            if (index < prefix.length) {
                heroTitle.innerHTML = prefix.substring(0, index + 1);
                index++;
                setTimeout(typeWriter, 80);
            } else {
                heroTitle.innerHTML = prefix + spanHTML;
            }
        }
        typeWriter();
    }

    // ===== SCROLL TOP BUTTON =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        width: 50px; height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white; border: none; border-radius: 50%;
        font-size: 1.5rem; cursor: pointer;
        opacity: 0; visibility: hidden;
        transition: all 0.3s ease; z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(scrollTopBtn);
    window.addEventListener('scroll', function() {
        const show = window.scrollY > 300;
        scrollTopBtn.style.opacity = show ? '1' : '0';
        scrollTopBtn.style.visibility = show ? 'visible' : 'hidden';
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    scrollTopBtn.addEventListener('mouseenter', function() { this.style.transform = 'scale(1.1)'; });
    scrollTopBtn.addEventListener('mouseleave', function() { this.style.transform = 'scale(1)'; });

    // ===== HERO PARALLAX =====
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // ===== REVEAL ANIMATIONS =====
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

    // ===== GALLERY FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Make all gallery items visible immediately
    galleryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    item.style.display = '';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== GALLERY LIGHTBOX =====
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
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLightbox(); });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== ACTIVITIES FILTER =====
    const actFilterBtns = document.querySelectorAll('.act-filter-btn');
    const termGroups = document.querySelectorAll('.term-group');

    actFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            actFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const term = this.getAttribute('data-term');
            termGroups.forEach(group => {
                if (term === 'all') {
                    group.style.display = '';
                } else {
                    group.style.display = group.id === 'term-' + term ? '' : 'none';
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
    slideshowLightbox.addEventListener('click', (e) => { if (e.target === slideshowLightbox) closeSlideshow(); });

    // ===== ACTIVITY CARDS =====
    const activityCards = document.querySelectorAll('.activity-card');

    // Make all activity cards visible immediately
    activityCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });

    activityCards.forEach(card => {
        card.addEventListener('click', function() {
            const wrap = this.querySelector('.activity-img-wrap');
            const img = this.querySelector('img');
            const isMissing = wrap && wrap.classList.contains('img-missing');

            if (this.classList.contains('slideshow-card') && !isMissing) {
                const base = this.getAttribute('data-slideshow');
                const count = parseInt(this.getAttribute('data-count'));
                const ext = this.getAttribute('data-ext') || 'jpg';
                const images = [];
                for (let i = 1; i <= count; i++) images.push('images/' + base + '-' + i + '.' + ext);
                openSlideshow(images);
                return;
            }

            if (img && !isMissing) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { closeLightbox(); closeSlideshow(); }
        if (slideshowLightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') { currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length; updateSlide(); }
            if (e.key === 'ArrowRight') { currentSlide = (currentSlide + 1) % currentImages.length; updateSlide(); }
        }
    });

});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}