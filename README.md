# Blug

Blug est une application web dynamique permettant aux utilisateurs de créer et de partager des contenus sur une plateforme de blog. Ce projet est divisé en deux parties principales : le backend (Back) et le frontend (Front).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js
- Un éditeur de code ou IDE de votre choix (par exemple Visual Studio Code)

## Installation

Suivez ces étapes pour mettre en place le projet sur votre machine locale pour le développement et les tests.

### Étape 1 : Téléchargement

1. Téléchargez le fichier ZIP du projet "Blug".
2. Décompressez le fichier ZIP dans le dossier de votre choix.

### Étape 2 : Configuration de l'Environnement de Développement

1. Ouvrez le dossier décompressé dans votre IDE.
2. Ouvrez un terminal et naviguez vers le dossier "front" :

    ```bash
    cd front
    ```

3. Exécutez `npm install` pour installer les dépendances du frontend :

    ```bash
    npm install
    ```

4. Répétez l'opération pour le dossier "back" :

    ```bash
    cd back
    npm install
    ```

### Étape 3 : Configuration des Variables d'Environnement

1. Créez un fichier `.env` à la racine du dossier "back" et ajoutez les clés suivantes :

    ```makefile
    GOOGLE_CLIENT_ID=VotreGoogleClientId
    GOOGLE_SECRET=VotreGoogleSecret
    GITHUB_CLIENT_ID=VotreGitHubClientId
    GITHUB_SECRET=VotreGitHubSecret
    ```

   Vous pouvez obtenir ces clés en vous rendant sur :

   - [Google Cloud Console](https://console.cloud.google.com/)
   - [GitHub Developer Settings](https://github.com/settings/developers)

### Étape 4 : Lancement de l'Application

Pour démarrer le serveur backend depuis le dossier back, utilisez :

```bash
node server.js
```
ou
```bash
npm start
```

Pour démarrer le front depuis le dossier front, executez

```bash
npm run start
```

### Contributeur
 - Enzo Herichard
 - Lilian Vasconcelos
