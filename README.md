# NdewePain

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

ndewe-pain/
├── src/
│   ├── app/
│   │   ├── components/       # Composants Angular (UI)
│   │   ├── services/         # Services pour API / logique métier
│   │   ├── models/           # Interfaces et classes TypeScript
│   │   ├── guards/           # Gestion des droits d'accès (rôles)
│   │   ├── pages/            # Pages principales (Dashboard, Catalogue...)
│   │   └── app.module.ts
│   ├── assets/               # Images, promotions, icônes
│   ├── environments/         # Configuration dev/prod
│   └── index.html
├── angular.json
├── package.json
└── README.md

2️⃣ Modules / Pages à créer
Pour tous les utilisateurs

Accueil / Catalogue : liste produits, catégories, filtres, promotions.

Promotions & Packs : affichage dynamique avec dates de validité.

Chat support : chat en temps réel, éventuellement IA (optionnel).

Client

Profil client : historique des commandes, factures PDF.

Panier et paiement : choix livraison / paiement en ligne.

Suivi commande : statut en temps réel avec notifications.

Employé

Gestion commandes : mise à jour statut (préparation, livraison, livrée).

Suivi livraisons : visualisation et notifications.

Assistance client via chat.

Administrateur / Gérant

Gestion utilisateurs : création, modification, suppression (Admin + Employé).

Gestion produits et stocks : CRUD complet, prix, description, photos, allergènes.

Gestion promotions et packs : création, validité, application automatique.

Statistiques : ventes, commandes, produits populaires.

3️⃣ Services clés Angular

AuthService : connexion, logout, vérification rôle.

ProductService : récupération, création, mise à jour des produits.

OrderService : passage de commande, suivi, mises à jour.

PromotionService : création et gestion des promotions.

ChatService : communication en temps réel pour support client.

InvoiceService : génération et téléchargement PDF des factures.

4️⃣ Sécurité et rôles

Angular Route Guards : AuthGuard, RoleGuard pour protéger les routes selon les rôles.

JWT (JSON Web Token) pour authentification côté frontend et backend.

Validation côté frontend et backend pour toutes les entrées utilisateur.

5️⃣ Conseils pour le développement

Commence par la base : Authentification + Catalogue produits.

Ensuite les commandes : panier, paiement, suivi.

Puis promotions et packs : application automatique des réductions.

Chat support : peut être intégré en dernier, éventuellement avec WebSocket.

Facturation : génération PDF côté backend (ex. library pdfmake pour Angular).

6️⃣ Livraison / Livrables

Code versionné sur GitHub.

Démonstration vidéo ou live.

Documentation claire : README + guide de déploiement.

Tests unitaires pour les fonctions critiques
