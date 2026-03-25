document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger immediately for elements already in view

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Make hero card interactive to mouse movement
    const card = document.querySelector('.profile-image-container');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual && card) {
        heroVisual.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroVisual.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });

        heroVisual.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `perspective(1000px) rotateY(-10deg) rotateX(5deg)`;
        });
    }

    // Generic 3D Tilt Effect
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            el.style.transform = `perspective(1000px) scale3d(1.02, 1.02, 1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)`;
            el.style.transition = 'transform 0.5s ease';
        });
        
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'none';
        });
    });

    // Education Timeline Expand Logic
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const btn = item.querySelector('.expand-btn');
        const content = item.querySelector('.timeline-content');
        
        if(content) {
            content.addEventListener('click', (e) => {
                // Ignore clicks if they're directly on a link or button, except our expand button
                if(e.target.tagName.toLowerCase() === 'a' || (e.target.tagName.toLowerCase() === 'button' && e.target !== btn)) return;
                
                item.classList.toggle('expanded');
                if(btn) {
                    btn.setAttribute('aria-expanded', item.classList.contains('expanded'));
                }
            });
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('cvModal');
    const viewCvBtns = document.querySelectorAll('.view-cv-btn');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && viewCvBtns.length > 0 && closeBtn) {
        viewCvBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    // Certificate Modal Logic
    const certModal = document.getElementById('certModal');
    const openCertBtns = document.querySelectorAll('.open-cert-btn');
    const closeCertBtn = document.querySelector('.close-cert-modal');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalFrame = document.getElementById('certModalFrame');
    const certImageContainer = document.getElementById('certImageContainer');

    if (certModal && openCertBtns.length > 0) {
        openCertBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const title = btn.getAttribute('data-cert-title');
                const src = btn.getAttribute('data-cert-src');
                
                if (title && certModalTitle) certModalTitle.textContent = title;
                
                if (src && src.trim() !== '') {
                    if (certModalFrame) {
                        certModalFrame.src = src;
                        certModalFrame.style.display = 'block';
                    }
                    if (certImageContainer) certImageContainer.style.display = 'none';
                } else {
                    if (certModalFrame) certModalFrame.src = '';
                    if (certModalFrame) certModalFrame.style.display = 'none';
                    if (certImageContainer) certImageContainer.style.display = 'block';
                }
                
                certModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeCertBtn) {
            closeCertBtn.addEventListener('click', () => {
                certModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Tab Switching Logic
function switchTab(event, tabId) {
    const container = event.currentTarget.closest('.about-details-card');
    if (!container) return;
    
    container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    container.querySelector('#tab-' + tabId).classList.add('active');
}
