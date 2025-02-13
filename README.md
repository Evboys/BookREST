# BookREST

## Description

Cette API permet de gérer des **livres** et des **utilisateurs**. Elle offre des fonctionnalités de création, lecture, mise à jour et suppression (CRUD) pour les livres, ainsi que la gestion des utilisateurs (connexion, inscription, suppression, mise à jour). L'API utilise **JWT** pour l'authentification et la gestion des rôles (administrateurs).

## Routes des livres

### **1. Récupérer la liste de tous les livres**
- **URL** : `/livres`
- **Méthode HTTP** : `GET`
- **Description** : Cette route permet de récupérer la liste de tous les livres présents dans la base de données.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "data": [
        {
          "_id": "1",
          "isbn": "978-3-16-148410-0",
          "titre": "Exemple de livre",
          "auteur": "Auteur Exemple",
          "date_de_sortie": "2023-01-01",
          "editeur": "Editeur Exemple"
        },
        ...
      ]
    }
    ```

### **2. Récupérer un livre avec l'ISBN**
- **URL** : `/livres/:isbn`
- **Méthode HTTP** : `GET`
- **Paramètre** :
  - `isbn` : L'ISBN du livre à récupérer.
- **Description** : Cette route permet de récupérer un livre spécifique en utilisant son ISBN.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "data": {
        "_id": "1",
        "isbn": "978-3-16-148410-0",
        "titre": "Exemple de livre",
        "auteur": "Auteur Exemple",
        "date_de_sortie": "2023-01-01",
        "editeur": "Editeur Exemple"
      }
    }
    ```
- **Réponse en cas d'erreur** :
  - **Code** : `404 Not Found`
  - **Corps de la réponse** :  
    ```json
    {
      "success": false,
      "message": "Livre non trouvé"
    }
    ```

### **3. Supprimer un livre avec l'ISBN**
- **URL** : `/livres/:isbn`
- **Méthode HTTP** : `DELETE`
- **Paramètre** :
  - `isbn` : L'ISBN du livre à supprimer.
- **Authentification** : Cette route nécessite un **token JWT** valide et l'utilisateur doit être **administrateur**.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Livre supprimé avec succès"
    }
    ```

### **4. Mettre à jour un livre avec l'ISBN**
- **URL** : `/livres/:isbn`
- **Méthode HTTP** : `PUT`
- **Paramètre** :
  - `isbn` : L'ISBN du livre à mettre à jour.
- **Description** : Cette route permet de mettre à jour les informations d'un livre en utilisant son ISBN.
- **Authentification** : Cette route nécessite un **token JWT** valide et l'utilisateur doit être **administrateur**.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Livre mis à jour avec succès",
      "data": {
        "isbn": "978-3-16-148410-0",
        "titre": "Nouveau titre",
        "auteur": "Nouvel auteur",
        "date_de_sortie": "2023-01-01",
        "editeur": "Nouvel éditeur"
      }
    }
    ```

### **5. Ajouter un livre**
- **URL** : `/livres`
- **Méthode HTTP** : `POST`
- **Description** : Cette route permet d'ajouter un nouveau livre à la base de données.
- **Paramètres requis** :
  - `isbn` : ISBN du livre.
  - `titre` : Titre du livre.
  - `auteur` : Auteur du livre.
  - `date_de_sortie` : Date de sortie du livre.
  - `editeur` : Éditeur du livre.
- **Authentification** : Cette route nécessite un **token JWT** valide.
- **Réponse réussie** :
  - **Code** : `201 Created`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Livre ajouté avec succès"
    }
    ```

---

## Routes des utilisateurs

### **1. Connexion utilisateur**
- **URL** : `/utilisateurs/login`
- **Méthode HTTP** : `POST`
- **Paramètres requis** :
  - `user` : Nom d'utilisateur.
  - `password` : Mot de passe.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Utilisateur connecté",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### **2. Inscription utilisateur**
- **URL** : `/utilisateurs/register`
- **Méthode HTTP** : `POST`
- **Paramètres requis** :
  - `user` : Nom d'utilisateur.
  - `password` : Mot de passe.
  - `admin` : Indique si l'utilisateur est administrateur (par défaut `false`).
- **Réponse réussie** :
  - **Code** : `201 Created`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Utilisateur créé avec succès"
    }
    ```

### **3. Supprimer un utilisateur**
- **URL** : `/utilisateurs/:username`
- **Méthode HTTP** : `DELETE`
- **Paramètre** :
  - `username` : Nom d'utilisateur à supprimer.
- **Authentification** : Cette route nécessite un **token JWT** valide et l'utilisateur doit être **administrateur**.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Utilisateur supprimé avec succès"
    }
    ```

### **4. Mettre à jour un utilisateur**
- **URL** : `/utilisateurs/:username`
- **Méthode HTTP** : `PUT`
- **Paramètre** :
  - `username` : Nom d'utilisateur à mettre à jour.
- **Authentification** : Cette route nécessite un **token JWT** valide et l'utilisateur doit être **administrateur**.
- **Réponse réussie** :
  - **Code** : `200 OK`
  - **Corps de la réponse** :  
    ```json
    {
      "success": true,
      "message": "Utilisateur mis à jour avec succès"
    }
    ```

---

## Authentification et autorisation

L'API utilise **JWT (JSON Web Token)** pour gérer les utilisateurs authentifiés et les rôles (administrateurs). Pour accéder aux routes nécessitant une authentification, vous devez envoyer un **token JWT valide** dans l'en-tête `Authorization` de votre requête, sous la forme :

Les utilisateurs doivent être **administrateurs** pour accéder à certaines routes (comme la suppression et la mise à jour des livres ou des utilisateurs).

---

## Conclusion

Cette API vous permet de gérer facilement les livres et les utilisateurs avec un système de sécurité basé sur JWT et des rôles administratifs. Pour toute question ou problème, n'hésitez pas à consulter les logs du serveur ou à contacter l'équipe de développement.


