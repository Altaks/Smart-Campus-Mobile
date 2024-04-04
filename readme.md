# SAE 4.1 - Développement d'une application mobile

### Récupération de la stack

Pour lancer la stack, vous aurez besoin de :

- Git
- Docker engine
- Docker compose
- Avoir les ports 5173 (Serveur web), 8000 (API)
- Un compte ayant accès au repository

Une fois que vous vous êtes assurés d'avoir ce qu'il faut, vous pouvez lancer la commande suivante dans un répertoire :

```bash
git clone https://forge.iut-larochelle.fr/2023-2024-but-info2-a-sae34/but-info2-a-sae-4-docker-stack.git
```

Pour pouvoir modifier/ajouter/supprimer des fichiers du dossier `sae4app` et `sae4api` une fois la stack lancée, vous devez configurer la stack : vous pouvez changer de compte en indiquant votre compte utilisateur Linux dans le fichier `.env` :

> Ce changement n'est nécessaire que sur Linux !

```env
# Uniquement sous linux
# Décommenter ces valeurs

USER_NAME=<username>
USER_ID=<userid>
GROUP_NAME=<groupname>
GROUP_ID=<groupid>
```

Exemple avec un compte `altaks` et le groupe par défaut :

```env
# Uniquement sous linux
# Décommenter ces valeurs

USER_NAME=altaks
USER_ID=1000
GROUP_NAME=altaks
GROUP_ID=1000
```

### Lancement de la stack

Une fois le repository cloné et configuré, vous pouvez lancer la stack en utilisant la commande suivante :

```bash
docker compose up --build
```

> Si vous souhaitez lancer la stack sans vous bloquer votre terminal, vous pouvez lancer la commande suivante :
> ```bash
> docker compose up --build -d
> ```
> Vous aurez alors la stack lancée en arrière-plan (le terminal est détaché)

### Lancer un bash interactif avec un conteneur

Afin de vous rendre dans un conteneur et effectuer des changements, vous pouvez utiliser la commande suivante dans le même dossier que la stack :

```bash
docker compose exec <sae4app/sae4api/database> bash
```

Exemple, pour accéder au conteneur où se situe ReactJS + Vite, on utilise :

```bash
docker compose exec sae4app bash
```

### Réinstallation des packages Symfony (dans le conteneur `sae4api`)

Lorsque vous utilisez la stack pour la première fois dans un répertoire, si vous ne disposez pas du dossier `sae4api/vendor`, vous pouvez faire télécharger son contenu à la stack avec la commande suivante :

```shell
cd /app/sae4api && composer install
```

### Réinstallation des modules NodeJS (dans le conteneur `sae4api`)

Lorsque vous utilisez la stack pour la première fois dans un répertoire, si vous ne disposez pas du dossier `sae4app/node_modules`, vous pouvez faire télécharger son contenu à la stack avec la commande suivante :

```shell
cd /app/sae4app && npm install
```

### Règles de collaboration

Pour collaborer sur le projet, vous devez développer en répondant à une User Story ou une tâche.

Vous devrez créer une branche en suivant la syntaxe suivante :

```
develop-US.<numero-US>-<DescriptionUS>
```

ou dans le cas d'une tâche : 

```
develop-<DescriptionTache>
```

---

Exemple pour l'US 4.1 :

```
dev-US4.1-Choisir-une-salle-et-consulter-les-informations-de-celle-ci
```

---

Pour ce qui est des **commits**, vous devrez suivre la syntaxe "commit lint" qui est disponible ici : https://github.com/conventional-changelog/commitlint

### Une fois vos changements prêts

Vous pouvez émettre une merge request avec un reviewer parmis Adrien, Arnaud, Luc ou Kevin et vos changements seront revus