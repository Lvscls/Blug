
Voici un exemple de fichier README.md bien structuré pour votre projet "Blug". Ce fichier fournit des instructions claires sur la façon de télécharger, configurer et lancer votre application.

Blug
Blug est une application web dynamique permettant aux utilisateurs de créer et de partager des contenus sur une plateforme de blog. Ce projet est divisé en deux parties principales : le backend (Back) et le frontend (Front).

Prérequis
Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

Node.js
Un éditeur de code ou IDE de votre choix (par exemple Visual Studio Code)
Installation
Suivez ces étapes pour mettre en place le projet sur votre machine locale pour le développement et les tests.

Étape 1 : Téléchargement
Téléchargez le fichier ZIP du projet "Blug".
Décompressez le fichier ZIP dans le dossier de votre choix.
Étape 2 : Configuration de l'Environnement de Développement
Ouvrez le dossier décompressé dans votre IDE.

Ouvrez un terminal et naviguez vers le dossier front :

bash
Copy code
cd front
Exécutez npm install pour installer les dépendances du frontend :

bash
Copy code
npm install
Répétez l'opération pour le dossier back :

bash
Copy code
cd back
npm install
Étape 3 : Configuration des Variables d'Environnement
Créez un fichier .env à la racine des dossiers front et back et ajoutez les clés suivantes :

makefile
Copy code
GOOGLE_CLIENT_ID=VotreGoogleClientId
GOOGLE_SECRET=VotreGoogleSecret
GITHUB_CLIENT_ID=VotreGitHubClientId
GITHUB_SECRET=VotreGitHubSecret
Vous pouvez obtenir ces clés en vous rendant sur :

Google Cloud Console
GitHub Developer Settings
Étape 4 : Lancement de l'Application
Pour démarrer le serveur backend, utilisez :

bash
Copy code
node index.js
dans le dossier back.

Pour démarrer l'application frontend, exécutez :

bash
Copy code
npm run start
dans le dossier front.

Votre application devrait maintenant être accessible localement.

Contributeurs

Enzo Herichard et Lilian Vasconcelos