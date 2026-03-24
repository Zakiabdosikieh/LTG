// Script de synchronisation des données admin vers le site principal
// Ce script lit les données du localStorage et les injecte dans le site

function syncDataFromAdmin() {
    // Récupérer les données depuis localStorage
    const articles = JSON.parse(localStorage.getItem('ltg_articles') || '[]');
    const formations = JSON.parse(localStorage.getItem('ltg_formations') || '[]');
    const actualites = JSON.parse(localStorage.getItem('ltg_actualites') || '[]');
    const settings = JSON.parse(localStorage.getItem('ltg_settings') || '{}');
    
    // Mettre à jour les articles dans le site principal
    if (articles.length > 0) {
        window.articlesData = articles;
        console.log('Articles synchronisés:', articles.length);
    }
    
    // Mettre à jour les formations
    if (formations.length > 0) {
        window.formationsData = formations;
        console.log('Formations synchronisées:', formations.length);
    }
    
    // Mettre à jour les actualités
    if (actualites.length > 0) {
        window.actualitesData = actualites;
        console.log('Actualités synchronisées:', actualites.length);
    }
    
    // Mettre à jour les paramètres
    if (Object.keys(settings).length > 0) {
        window.siteSettings = settings;
        console.log('Paramètres synchronisés:', settings);
    }
    
    return {
        articles,
        formations,
        actualites,
        settings
    };
}

// Fonction pour exporter les données
function exportData() {
    const data = {
        articles: JSON.parse(localStorage.getItem('ltg_articles') || '[]'),
        formations: JSON.parse(localStorage.getItem('ltg_formations') || '[]'),
        actualites: JSON.parse(localStorage.getItem('ltg_actualites') || '[]'),
        settings: JSON.parse(localStorage.getItem('ltg_settings') || '{}'),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `ltg-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Fonction pour importer des données
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.articles) {
                localStorage.setItem('ltg_articles', JSON.stringify(data.articles));
            }
            if (data.formations) {
                localStorage.setItem('ltg_formations', JSON.stringify(data.formations));
            }
            if (data.actualites) {
                localStorage.setItem('ltg_actualites', JSON.stringify(data.actualites));
            }
            if (data.settings) {
                localStorage.setItem('ltg_settings', JSON.stringify(data.settings));
            }
            
            alert('Données importées avec succès !');
            location.reload();
        } catch (error) {
            alert('Erreur lors de l\'importation des données : ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Initialisation
if (typeof window !== 'undefined') {
    window.syncDataFromAdmin = syncDataFromAdmin;
    window.exportData = exportData;
    window.importData = importData;
}
