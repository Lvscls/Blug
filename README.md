Téléchargez le fichier ZIP du projet "Blug".
Décompressez le fichier ZIP dans le dossier de votre choix.
Étape 2 : Configuration de l'Environnement de Développement
Ouvrez le dossier décompressé dans votre IDE.

Ouvrez un terminal et naviguez vers le dossier "front" :

bash
Copy code
cd front
Exécutez npm install pour installer les dépendances du frontend :

bash
Copy code
npm install
Répétez l'opération pour le dossier "back" :

bash
Copy code
cd back
npm install
Étape 3 : Configuration des Variables d'Environnement
Créez un fichier .env à la racine du dossier "back" et ajoutez les clés suivantes :

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
node server.js ou npm start
dans le dossier "back".

Pour démarrer l'application frontend, exécutez :

bash
Copy code
npm run start
dans le dossier "front".

Votre application devrait maintenant être accessible localement.

Contributeurs
Enzo Herichard
Lilian Vasconcelos