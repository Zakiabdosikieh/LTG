// Script de synchronisation complète entre l'admin et le site principal
// Ce script permet à l'admin de contrôler TOUT le site de A à Z

class LTGSiteManager {
    constructor() {
        this.siteData = this.loadData();
        this.syncInterval = null;
        this.init();
    }

    // Charger les données depuis localStorage
    loadData() {
        const data = localStorage.getItem('ltg_site_data');
        return data ? JSON.parse(data) : this.getDefaultData();
    }

    // Données par défaut
    getDefaultData() {
        return {
            general: {
                name: 'Lycée Technique de Gabode',
                slogan: "L'excellence technique au cœur de Djibouti",
                description: "Depuis plus de 35 ans, le Lycée Technique de Gabode incarne l'excellence de la formation professionnelle à Djibouti.",
                keywords: "lycée technique, gabode, djibouti, formation professionnelle, MENFOP"
            },
            articles: [],
            formations: [],
            actualites: [],
            campus: {
                photos: ['images.jpg', '483100095_1243973941063772_6016869182157493551_n.jpg', '487824205_1257495029711663_5267834142294165807_n.jpg'],
                description: 'Découvrez notre campus moderne situé à Gabode...'
            },
            contact: {
                email: 'ltg@menfop.dj',
                phone: '+253 21 34 13 26',
                address: 'Gabode, 3467 Djibouti',
                director: 'Mme Fathia Mahamoud Aden, Proviseure',
                social: {
                    facebook: '',
                    twitter: '',
                    linkedin: ''
                }
            },
            stats: {
                students: '1500+',
                success: '95%',
                formations: '5',
                years: '35+'
            },
            appearance: {
                primaryColor: '#dc2626',
                secondaryColor: '#000000',
                titleFont: 'Playfair Display',
                siteStyle: 'magazine',
                logo: 'download.jpg'
            },
            seo: {
                title: 'Lycée Technique de Gabode - Formation d\'Excellence à Djibouti',
                description: 'Le Lycée Technique de Gabode offre une formation professionnelle d\'excellence...',
                canonical: 'https://ltg-djibouti.dj',
                googleAnalytics: ''
            }
        };
    }

    // Initialiser le gestionnaire
    init() {
        this.setupAutoSync();
        this.setupSyncListener();
        this.applyDataToSite();
        console.log('🚀 LTG Site Manager initialisé');
    }

    // Configurer la synchronisation automatique
    setupAutoSync() {
        // Vérifier les mises à jour toutes les 2 secondes
        this.syncInterval = setInterval(() => {
            this.checkForUpdates();
        }, 2000);
    }

    // Écouteur de synchronisation
    setupSyncListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'ltg_admin_sync' || e.key === 'ltg_site_data') {
                this.siteData = this.loadData();
                this.applyDataToSite();
                console.log('🔄 Synchronisation détectée et appliquée');
            }
        });
    }

    // Vérifier les mises à jour
    checkForUpdates() {
        const currentData = this.loadData();
        const lastSync = localStorage.getItem('ltg_sync_timestamp');
        
        if (lastSync && lastSync > this.lastUpdateTime) {
            this.siteData = currentData;
            this.applyDataToSite();
            this.lastUpdateTime = lastSync;
            console.log('⚡ Mise à jour appliquée');
        }
    }

    // Appliquer les données au site
    applyDataToSite() {
        this.updateGeneralInfo();
        this.updateArticles();
        this.updateFormations();
        this.updateActualites();
        this.updateCampus();
        this.updateContact();
        this.updateStats();
        this.updateAppearance();
        this.updateSEO();
        this.updateNavigation();
    }

    // Mettre à jour les informations générales
    updateGeneralInfo() {
        // Titre du site
        const titleElements = document.querySelectorAll('h1, .site-title');
        titleElements.forEach(el => {
            if (el.textContent.includes('Lycée Technique')) {
                el.textContent = this.siteData.general.name;
            }
        });

        // Slogan
        const sloganElements = document.querySelectorAll('.slogan, .tagline');
        sloganElements.forEach(el => {
            el.textContent = this.siteData.general.slogan;
        });

        // Meta tags
        this.updateMetaTag('description', this.siteData.general.description);
        this.updateMetaTag('keywords', this.siteData.general.keywords);
    }

    // Mettre à jour les articles
    updateArticles() {
        // Chercher les conteneurs d'articles dans le site avec plusieurs sélecteurs possibles
        const articlesContainers = [
            document.querySelector('#actualites .grid.grid-cols-1.md\\:grid-cols-3.gap-8'), // Grid dans actualités
            document.querySelector('section[id="actualites"] .grid'), // Toute grid dans section actualités
            document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3.gap-8'), // Grid générique
            document.querySelector('[class*="actualites"] .grid'), // Grid avec actualites dans la classe
            document.querySelector('section:has(h2:contains("Actualités")) .grid'), // Section avec titre Actualités
            document.querySelector('main .grid') // Grid dans main
        ].find(el => el !== null);

        if (!articlesContainers) {
            console.log('⚠️ Conteneur d\'articles non trouvé, mise à jour des données JavaScript uniquement');
            this.updateArticlesData();
            return;
        }

        const publishedArticles = this.siteData.articles.filter(a => a.status === 'published');
        
        // Si on a des articles de l'admin, les afficher
        if (publishedArticles.length > 0) {
            console.log(`📝 Mise à jour de ${publishedArticles.length} articles`);
            // Garder seulement les 3 premiers articles pour la grille
            const articlesToShow = publishedArticles.slice(0, 3);
            articlesContainers.innerHTML = articlesToShow.map(article => this.createArticleCard(article)).join('');
        } else {
            console.log('📝 Aucun article publié trouvé');
        }
        
        // Mettre à jour les données JavaScript pour les modals
        this.updateArticlesData();
    }

    // Mettre à jour les données JavaScript pour les modals
    updateArticlesData() {
        const publishedArticles = this.siteData.articles.filter(a => a.status === 'published');
        
        if (typeof window !== 'undefined') {
            window.siteArticles = {};
            publishedArticles.forEach(article => {
                window.siteArticles[article.title] = {
                    images: article.images || [],
                    date: this.formatDate(article.date),
                    auteur: article.author,
                    contenu: article.content
                };
            });
            
            // Mettre à jour aussi la variable articles si elle existe
            if (typeof window.articles !== 'undefined') {
                window.articles = window.siteArticles;
            }
        }
    }

    // Créer une carte d'article
    createArticleCard(article) {
        const images = article.images || [];
        const mainImage = images[0] || 'https://images.unsplash.com/photo-1589997675112-3f223704736c?w=600';
        
        return `
            <article class="card-hover bg-white rounded-lg overflow-hidden">
                <div class="relative h-48 overflow-hidden">
                    <img src="${mainImage}" alt="${article.title}" class="w-full h-full object-cover">
                    <div class="absolute top-4 left-4">
                        <span class="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase">
                            Article
                        </span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="text-sm text-red-600 font-bold mb-2">${this.formatDate(article.date)}</div>
                    <h3 class="serif-title text-xl font-black mb-3">${article.title}</h3>
                    <p class="text-gray-600 mb-4 text-sm">
                        ${this.extractExcerpt(article.content, 100)}...
                    </p>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">${article.author}</span>
                        <button class="text-black font-bold hover:text-red-600 transition" onclick="showArticleModal('${article.title}')">
                            Lire →
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    // Extraire un extrait du contenu HTML
    extractExcerpt(htmlContent, maxLength) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        return textContent.length > maxLength ? textContent.substring(0, maxLength) : textContent;
    }

    // Formater une date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }

    // Supprimer les balises HTML
    stripHtml(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    // Mettre à jour les formations
    updateFormations() {
        const formationsContainer = document.querySelector('#filières-grid, .formations-grid');
        if (!formationsContainer) return;

        formationsContainer.innerHTML = this.siteData.formations.map(formation => this.createFormationCard(formation)).join('');
    }

    // Créer une carte de formation
    createFormationCard(formation) {
        return `
            <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onclick="showFiliereModal('${formation.name}')">
                <div class="relative overflow-hidden h-48">
                    <img src="${formation.image}" alt="${formation.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 right-4">
                        <span class="bg-${this.getCategoryColor(formation.category)}-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full">
                            ${formation.category}
                        </span>
                        <h3 class="serif-title text-xl font-black text-white mt-2">${formation.name}</h3>
                    </div>
                </div>
                <div class="p-6">
                    <p class="text-gray-700 mb-4">${formation.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            ${formation.duration}
                        </span>
                        <button class="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition">
                            Découvrir →
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Mettre à jour les actualités
    updateActualites() {
        const actualitesContainer = document.querySelector('.actualités-list');
        if (!actualitesContainer) return;

        actualitesContainer.innerHTML = this.siteData.actualites.map(actualite => this.createActualiteCard(actualite)).join('');
    }

    // Créer une carte d'actualité
    createActualiteCard(actualite) {
        return `
            <article class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div class="relative overflow-hidden h-48">
                    <img src="${actualite.image}" alt="${actualite.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 right-4">
                        <span class="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-full">Actualité</span>
                        <h3 class="serif-title text-xl font-black text-white mt-2">${actualite.title}</h3>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-sm text-gray-600">
                            <span>${this.formatDate(actualite.date)}</span>
                        </div>
                    </div>
                    <p class="text-gray-700 mb-4 line-clamp-3">${actualite.description}</p>
                    <button class="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition">
                        Lire →
                    </button>
                </div>
            </article>
        `;
    }

    // Mettre à jour le campus
    updateCampus() {
        const campusPhotos = document.querySelector('.campus-photos-grid');
        const campusDescription = document.querySelector('.campus-description');
        
        if (campusPhotos) {
            campusPhotos.innerHTML = this.siteData.campus.photos.map(photo => `
                <div class="relative overflow-hidden rounded-lg group">
                    <img src="${photo}" alt="Campus LTG" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <button class="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-all duration-300">
                            Voir +
                        </button>
                    </div>
                </div>
            `).join('');
        }

        if (campusDescription) {
            campusDescription.textContent = this.siteData.campus.description;
        }
    }

    // Mettre à jour les informations de contact
    updateContact() {
        // Email
        const emailElements = document.querySelectorAll('.contact-email, [href*="mailto:"]');
        emailElements.forEach(el => {
            if (el.tagName === 'A') {
                el.href = `mailto:${this.siteData.contact.email}`;
            } else {
                el.textContent = this.siteData.contact.email;
            }
        });

        // Téléphone
        const phoneElements = document.querySelectorAll('.contact-phone, [href*="tel:"]');
        phoneElements.forEach(el => {
            if (el.tagName === 'A') {
                el.href = `tel:${this.siteData.contact.phone}`;
            } else {
                el.textContent = this.siteData.contact.phone;
            }
        });

        // Adresse
        const addressElements = document.querySelectorAll('.contact-address');
        addressElements.forEach(el => {
            el.textContent = this.siteData.contact.address;
        });

        // Directeur
        const directorElements = document.querySelectorAll('.contact-director');
        directorElements.forEach(el => {
            el.textContent = this.siteData.contact.director;
        });

        // Réseaux sociaux
        this.updateSocialLinks();
    }

    // Mettre à jour les liens sociaux
    updateSocialLinks() {
        const socialLinks = {
            facebook: document.querySelector('a[href*="facebook"]'),
            twitter: document.querySelector('a[href*="twitter"]'),
            linkedin: document.querySelector('a[href*="linkedin"]')
        };

        Object.entries(socialLinks).forEach(([platform, element]) => {
            if (element && this.siteData.contact.social[platform]) {
                element.href = this.siteData.contact.social[platform];
            }
        });
    }

    // Mettre à jour les statistiques
    updateStats() {
        const statsElements = {
            students: document.querySelectorAll('.stat-students, [data-stat="students"]'),
            success: document.querySelectorAll('.stat-success, [data-stat="success"]'),
            formations: document.querySelectorAll('.stat-formations, [data-stat="formations"]'),
            years: document.querySelectorAll('.stat-years, [data-stat="years"]')
        };

        Object.entries(statsElements).forEach(([key, elements]) => {
            elements.forEach(el => {
                el.textContent = this.siteData.stats[key];
            });
        });
    }

    // Mettre à jour l'apparence
    updateAppearance() {
        // Appliquer les couleurs personnalisées
        const root = document.documentElement;
        root.style.setProperty('--primary-color', this.siteData.appearance.primaryColor);
        root.style.setProperty('--secondary-color', this.siteData.appearance.secondaryColor);

        // Mettre à jour le logo
        const logoElements = document.querySelectorAll('.site-logo, .logo img');
        logoElements.forEach(el => {
            el.src = this.siteData.appearance.logo;
        });

        // Appliquer le style du site
        document.body.className = document.body.className.replace(/style-\w+/g, '') + ` style-${this.siteData.appearance.siteStyle}`;
    }

    // Mettre à jour le SEO
    updateSEO() {
        this.updateMetaTag('title', this.siteData.seo.title);
        this.updateMetaTag('description', this.siteData.seo.description);
        
        // URL canonique
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = this.siteData.seo.canonical;

        // Google Analytics
        if (this.siteData.seo.googleAnalytics) {
            this.addGoogleAnalytics(this.siteData.seo.googleAnalytics);
        }
    }

    // Mettre à jour la navigation
    updateNavigation() {
        // Ajouter le lien vers l'admin
        const nav = document.querySelector('nav, .navigation');
        if (nav && !nav.querySelector('.admin-link')) {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin-complete.html';
            adminLink.className = 'admin-link bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition';
            adminLink.textContent = '🎛️ Admin';
            nav.appendChild(adminLink);
        }
    }

    // Utilitaires
    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    addGoogleAnalytics(id) {
        if (document.querySelector('#google-analytics')) return;
        
        const script = document.createElement('script');
        script.id = 'google-analytics';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        document.head.appendChild(script);

        const config = document.createElement('script');
        config.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
        `;
        document.head.appendChild(config);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    getCategoryColor(category) {
        const colors = {
            industriel: 'blue',
            tertiaire: 'green',
            court: 'purple'
        };
        return colors[category] || 'gray';
    }

    // Exporter les données
    exportData() {
        const dataStr = JSON.stringify(this.siteData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `ltg-site-complete-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    // Importer des données
    importData(jsonData) {
        try {
            this.siteData = { ...this.siteData, ...jsonData };
            localStorage.setItem('ltg_site_data', JSON.stringify(this.siteData));
            this.applyDataToSite();
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'importation:', error);
            return false;
        }
    }

    // Détruire le gestionnaire
    destroy() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
    }
}

// Initialiser le gestionnaire
let ltgManager;

// Fonction globale pour la synchronisation manuelle
window.syncLTGData = function() {
    if (ltgManager) {
        ltgManager.siteData = ltgManager.loadData();
        ltgManager.applyDataToSite();
        console.log('🔄 Synchronisation manuelle effectuée');
    }
};

// Fonction globale pour exporter les données
window.exportLTGData = function() {
    if (ltgManager) {
        ltgManager.exportData();
    }
};

// Initialiser au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    ltgManager = new LTGSiteManager();
    
    // Ajouter un bouton de synchronisation manuelle pour le debug
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const syncBtn = document.createElement('button');
        syncBtn.innerHTML = '🔄 Sync';
        syncBtn.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50';
        syncBtn.onclick = syncLTGData;
        document.body.appendChild(syncBtn);
    }
});

// Nettoyer lors du déchargement
window.addEventListener('beforeunload', () => {
    if (ltgManager) {
        ltgManager.destroy();
    }
});
