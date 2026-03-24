# Lycées Techniques de Djibouti - Site Web

Un site web moderne et professionnel pour présenter les lycées techniques de Djibouti, leurs programmes et actualités.

## 🚀 Fonctionnalités

- **Design Responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Navigation Intuitive** : Menu simple avec navigation fluide
- **Animations Modernes** : Effets de scroll et transitions fluides
- **Sections Complètes** :
  - Accueil avec présentation
  - Statistiques clés
  - Liste des lycées techniques
  - Programmes de formation
  - Actualités et événements
  - Formulaire de contact

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **TailwindCSS** : Design moderne et responsive
- **JavaScript Vanilla** : Interactions et animations
- **CSS3** : Animations et transitions personnalisées

## 📁 Structure du Projet

```
lycees-djibouti/
├── index.html          # Page principale
├── styles.css          # Styles personnalisés
├── script.js           # Interactions JavaScript
└── README.md          # Documentation
```

## 🎨 Design et Personnalisation

### Palette de Couleurs
- **Bleu principal** : #1E3A8A (bleu marine)
- **Bleu secondaire** : #3B82F6 (bleu clair)
- **Gris** : nuances pour le fond et le texte
- **Couleurs accent** : vert, violet, orange pour les sections

### Typographie
- Police système pour la compatibilité
- Hiérarchie claire des titres et textes

### Icônes
- SVG intégrés pour la performance
- Icônes thématiques pour chaque section

## 🔧 Personnalisation

### Modifier les couleurs
Dans `styles.css`, modifiez les variables de couleur :
```css
:root {
    --primary-color: #1E3A8A;
    --secondary-color: #3B82F6;
    /* ... */
}
```

### Ajouter un lycée
Dans `index.html`, dupliquez une carte lycée dans la section appropriée :
```html
<div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
    <!-- Contenu du lycée -->
</div>
```

### Modifier les statistiques
Dans la section des statistiques, ajustez les nombres et descriptions selon vos besoins.

## 📱 Responsive Design

Le site est optimisé pour :
- **Mobile** (< 768px) : Menu hamburger, layout vertical
- **Tablette** (768px - 1024px) : Grid adaptative
- **Desktop** (> 1024px) : Layout complet avec toutes les fonctionnalités

## 🚀 Déploiement

### Déploiement simple
1. Uploadez les fichiers sur votre serveur
2. Le site est immédiatement accessible

### Déploiement avancé
Pour un déploiement avec GitHub Pages, Netlify ou autre plateforme statique :

```bash
# Clonez le repository
git clone [repository-url]

# Déployez avec votre plateforme préférée
```

## 📈 Améliorations Possibles

- [ ] Système de gestion de contenu (CMS)
- [ ] Base de données pour les actualités
- [ ] Authentification pour l'administration
- [ ] Multilingue (français/arabe/anglais)
- [ ] Galerie de photos
- [ ] Système de réservation pour les visites
- [ ] Integration avec les réseaux sociaux

## 🤝 Contribuer

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commitez vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus d'informations.

## 📞 Contact

Pour toute question ou suggestion :
- Email : info@lycees-techniques.dj
- Téléphone : +253 21 45 67 89
- Adresse : Boulevard de la République, Djibouti

---

**Développé avec ❤️ pour l'éducation technique à Djibouti**
