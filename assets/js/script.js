// JavaScript pour les interactions du site

document.addEventListener('DOMContentLoaded', function() {
    // Optimisation du chargement des images
    const images = document.querySelectorAll('img');
    
    // Appliquer un effet de chargement aux images
    images.forEach(img => {
        // Ajouter un conteneur pour l'effet de loading
        const wrapper = document.createElement('div');
        wrapper.className = 'image-container';
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        
        // Cloner l'image et remplacer
        const newImg = img.cloneNode(true);
        wrapper.appendChild(newImg);
        
        // Ajouter overlay pour meilleur contraste
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        wrapper.appendChild(overlay);
        
        // Remplacer l'image originale
        img.parentNode.replaceChild(wrapper, img);
        
        // Gérer le chargement
        newImg.addEventListener('load', function() {
            wrapper.style.opacity = '1';
            wrapper.style.transition = 'opacity 0.3s ease';
        });
        
        newImg.addEventListener('error', function() {
            wrapper.style.background = '#f3f4f6';
            wrapper.innerHTML = '<div class="flex items-center justify-center h-full text-gray-500"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
        });
    });
    
    // Lazy loading pour les images (Intersection Observer)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('image-loading');
                }
                observer.unobserve(img);
            }
        });
    });
    
    // Observer les images avec data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.classList.add('image-loading');
        imageObserver.observe(img);
    });
    
    // Menu mobile toggle
    const menuButton = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            // Créer le menu mobile s'il n'existe pas
            let mobileMenu = document.querySelector('.mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu bg-white border-b border-gray-200 md:hidden absolute top-full left-0 right-0 shadow-lg';
                mobileMenu.innerHTML = `
                    <div class="px-4 py-2 space-y-2">
                        <a href="#presentation" class="block py-2 text-gray-700 hover:text-black transition">Présentation</a>
                        <a href="#filières" class="block py-2 text-gray-700 hover:text-black transition">Filières</a>
                        <a href="#campus" class="block py-2 text-gray-700 hover:text-black transition">Campus</a>
                        <a href="#actualites" class="block py-2 text-gray-700 hover:text-black transition">Actualités</a>
                        <a href="#contact" class="block py-2 text-gray-700 hover:text-black transition">Contact</a>
                        <a href="admin-complete.html" class="block py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition text-center">
                            Administration
                        </a>
                    </div>
                `;
                nav.appendChild(mobileMenu);
            }
            
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Fermer le menu mobile si ouvert
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Animation des statistiques au scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les sections de statistiques
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    // Animation des nombres
    function animateNumbers(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Animation des cartes au survol
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulation d'envoi
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.innerHTML = '<span class="loading"></span> Envoi en cours...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Message envoyé !';
                submitButton.classList.add('bg-green-600');
                
                // Réinitialiser le formulaire
                this.reset();
                
                // Restaurer le bouton après 3 secondes
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.classList.remove('bg-green-600');
                    submitButton.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // Animation d'apparition des sections au scroll
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observer les sections principales
    document.querySelectorAll('section').forEach(section => {
        fadeObserver.observe(section);
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('shadow-lg');
        } else {
            header.classList.add('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });

    // Animation pour les boutons "En savoir plus"
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('En savoir plus')) {
            button.addEventListener('click', function() {
                // Animation de ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        }
    });

    // Gestion du thème (clair/sombre) - optionnel
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'fixed bottom-4 right-4 w-12 h-12 bg-blue-900 text-white rounded-full shadow-lg hover:bg-blue-800 transition z-50';
    themeToggle.setAttribute('aria-label', 'Basculer le thème');
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        this.innerHTML = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });

    // Validation des formulaires
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('border-red-500');
                isValid = false;
            } else {
                input.classList.remove('border-red-500');
            }
        });
        
        return isValid;
    }

    // Ajouter des tooltips pour plus d'informations
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg z-50';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.top = '-30px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.absolute');
            if (tooltip) tooltip.remove();
        });
    });
    
    // Effet de parallaxe pour l'image hero
    const heroImage = document.querySelector('#accueil img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
});

// Fonction pour charger dynamiquement le contenu
function loadContent(section, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector(section).innerHTML = html;
        })
        .catch(error => console.error('Erreur:', error));
}

// Fonction pour gérer les animations de chargement
function showLoading(element) {
    element.innerHTML = '<div class="text-center py-8"><div class="loading mx-auto"></div></div>';
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
