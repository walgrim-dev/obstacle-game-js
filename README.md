# Jeu d'obstacles en JavaScript

## Comment lancer le jeu

#### Commandes d'installation :
* `git clone https://github.com/walgrim-dev/obstacle-game-js.git`
* `npm install` - Installation des dépendances
* `npm run build` - Construction de l'application
* `npm run preview` - Lancement en localhost

### Jouer en ligne
Le jeu est hébergé sur [GitHub Pages](https://walgrim-dev.github.io/obstacle-game-js/)

## Architecture du projet

### Structure générale
Le projet suit une architecture modulaire avec séparation claire des responsabilités :
- **client** : Contient le frontend du jeu
    - **singleplayer** : Mode de jeu solo
    - **multiplayer** : Mode de jeu multijoueur (socket.io)

### Classes principales

#### GameEngine
- **Responsabilité** : Cœur du jeu, gère la boucle de jeu et coordonne tous les composants
- **Pattern** : Singleton (accessible via `GameEngine.getInstance()`)
- **Fonctionnalités** : Gestion de la caméra, animation, redimensionnement du canvas

#### LevelDesign
- **Responsabilité** : Gestion des niveaux et des obstacles
- **Fonctionnalités** :
    - Parse une matrice pour créer des obstacles
    - Gère la position de départ du joueur
    - Chaque niveau implémente `nextLevel()` pour la progression

#### Player
- **Responsabilité** : Gestion du personnage jouable
- **Fonctionnalités** :
    - Contrôles (clavier)
    - Détection des collisions
    - Interaction avec les obstacles spéciaux

#### Animate
- **Responsabilité** : Système d'animation
- **Classes dérivées** : PlayerAnimate, ShellAnimate, WallAnimate, ExitAnimate
- **Fonctionnalités** : Animation des sprites basée sur des séquences

#### Obstacles
Plusieurs types d'obstacles avec différents comportements :
- **WallObstacle** : Murs statiques
- **ShellObstacle** : Obstacles mobiles qui tuent le joueur
- **ExitObstacle** : Passages vers le niveau suivant

## Conception technique

### Système de rendu
- Utilisation de Canvas pour le rendu 2D
- Système de caméra orthogonale qui suit le joueur

### Système de niveaux
- Niveaux définis par des matrices où chaque nombre représente un type d'élément
- Progression séquentielle des niveaux (FirstLevel → SecondLevel → ...)
- Le numéro du niveau est affiché à l'écran

### Détection de collisions
- Utilisation d'algorithmes de collision entre rectangles
- Gestion des collisions pour les mouvements et les interactions spéciales

### Facteurs d'échelle
- Gestion de la taille des éléments via `ScaleFactor`
- Adaptation aux différentes tailles d'écran

## Build et déploiement
- Utilisation de Vite pour le bundling
- Configuration pour GitHub Pages
- Support de plusieurs points d'entrée (singleplayer et multiplayer)

## Crédits
Développé par Mannocci Mickaël - L3 MIAGE