# -----------
# AUTH
# -----------

# POST /api/auth/register.php

    Créer un compte utilisateur.

    Token nécessaire : non
    Rôle admin : non

    Champs à fournir
    {
        "username": "mathieu",
        "email": "mathieu@mail.fr",
        "password": "Password@123",
        "firstName": "Mathieu",
        "lastName": "Quittard",
        "gender": "male",
        "avatar": "https://..."
    }

    Contraintes
        username    obligatoire, unique
        email       obligatoire, unique
        password    obligatoire
        firstName   obligatoire
        lastName    obligatoire
        gender      optionnel
        avatar      optionnel


# POST /api/auth/login.php
    Connecter un utilisateur.

    Token nécessaire : non
    Rôle admin : non

    Champs à fournir
    {
        "username": "mathieu",
        "password": "Password@123"
    }


# -----------
# CONTACT
# -----------

# POST /api/contact/store.php

    # Enregistrer une demande de contact.

    Token nécessaire : non obligatoire
    Rôle admin : non

    Si un token est envoyé, le message est lié à l’utilisateur connecté.

    Champs à fournir
    {
        "name": "Mathieu",
        "email": "mathieu@mail.fr",
        "subject": "Demande de contact",
        "message": "Bonjour..."
    }

    Contraintes
        name    obligatoire
        email   obligatoire
        subject obligatoire
        message obligatoire

# GET /api/contact/index.php

    Récupérer toutes les demandes de contact.

    Token nécessaire : oui
    Rôle admin : oui


# -----------
# USER
# -----------

# GET /api/users/index.php

    Récupérer la liste des utilisateurs.

    Token nécessaire : oui
    Rôle admin : oui

# POST /api/profile/update.php

    Modifier le profil de l’utilisateur connecté, sans modifier son mot de passe.

    Token nécessaire : oui
    Rôle admin : non

    Champs à fournir
    {
        "username": "mathieu",
        "email": "mathieu@mail.fr",
        "firstName": "Mathieu",
        "lastName": "Quittard",
        "gender": "male",
        "avatar": "https://api.dicebear.com/9.x/adventurer/svg?seed=mathieu"
    }
    Contraintes
        username    obligatoire, unique sauf pour l’utilisateur connecté
        email       obligatoire, unique sauf pour l’utilisateur connecté
        firstName   obligatoire
        lastName    obligatoire
        gender      optionnel
        avatar      optionnel, doit être une URL valide si fourni
        image       est synchronisé avec avatar

# POST /api/profile/change-password.php

    Modifier le mot de passe de l’utilisateur connecté.

    Token nécessaire : oui
    Rôle admin : non

    Champs à fournir
    {
        "currentPassword": "AncienPassword@123",
        "newPassword": "NouveauPassword@123",
        "confirmPassword": "NouveauPassword@123"
    }
    Contraintes
        currentPassword                 obligatoire
        newPassword                     obligatoire
        confirmPassword                 obligatoire
        currentPassword                 doit correspondre au mot de passe actuel
        newPassword et confirmPassword  doivent être identiques
        newPassword                     doit contenir au moins 8 caractères
        newPassword                     doit contenir 1 minuscule
        newPassword                     doit contenir 1 majuscule
        newPassword                     doit contenir 1 chiffre
        newPassword                     doit contenir 1 caractère spécial

# POST /api/users/change-password.php

    Modifier le mot de passe d’un utilisateur depuis l’administration.

    Token nécessaire : oui
    Rôle admin : oui

    Champs à fournir
    {
        "user_id": 4,
        "newPassword": "NouveauPassword@123",
        "confirmPassword": "NouveauPassword@123"
    }
    Contraintes
        user_id                         obligatoire
        l’utilisateur doit exister
        newPassword                     obligatoire
        confirmPassword                 obligatoire
        newPassword et confirmPassword  doivent être identiques
        newPassword                     doit contenir au moins 8 caractères
        newPassword                     doit contenir 1 minuscule
        newPassword                     doit contenir 1 majuscule
        newPassword                     doit contenir 1 chiffre
        newPassword                     doit contenir 1 caractère spécial
        seul un admin peut faire cette action


# -----------
# DESTINATIONS
# -----------

# GET /api/regions/index.php

    Récupérer toutes les régions.

    Token nécessaire : non
    Rôle admin : non

# GET /api/destinations/index.php

    Récupérer toutes les destinations avec leur région.

    Token nécessaire : non
    Rôle admin : non

# GET /api/destinations/show.php?slug=france
    
    Récupérer une destination par son slug.

    Token nécessaire : non
    Rôle admin : non

    Paramètre URL
    slug    obligatoire

# GET /api/destinations/by-region.php?region=asie
    
    Récupérer les destinations d’une région.

    Token nécessaire : non
    Rôle admin : non

    Paramètre URL
    region  obligatoire

# POST /api/destinations/store.php

    Créer une nouvelle destination.

    Token nécessaire : oui
    Rôle admin : oui

    Champs à fournir
    {
        "slug": "france",
        "name": "France",
        "region_id": 6,
        "capital": "Paris",
        "description": "Description de la destination",
        "image": "https://example.com/france.jpg",
        "lat": "46.2276",
        "long": "2.2137"
    }

    Contraintes
        slug        obligatoire, unique
        name        obligatoire
        region_id   obligatoire, doit correspondre à une région existante
        capital     obligatoire
        description obligatoire
        image       obligatoire, doit être une URL valide
        lat         obligatoire
        long        obligatoire

# POST /api/destinations/delete.php

    Créer une nouvelle destination.

    Token nécessaire : oui
    Rôle admin : oui   

    La destination ne peut être supprimées que par l'admin l'ayant créée 

    JSON attendu
    {
        "id": 3
    }
    Contraintes
        id  obligatoire
        la destination doit exister


# -----------
# FAVORIS
# -----------

# GET /api/favorites/index.php

    Récupérer les favoris de l’utilisateur connecté.

    Token nécessaire : oui
    Rôle admin : non

# POST /api/favorites/store.php

    Ajouter une destination aux favoris.

    Token nécessaire : oui
    Rôle admin : non

    Champs à fournir

    Version actuelle :

    {
        "destinationId": 1,
        "title": "France",
        "image": "https://example.com/france.jpg"
    }

    Contraintes
        destinationId   obligatoire
        un même utilisateur ne peut pas ajouter deux fois la même destination

# POST /api/favorites/delete.php

    Supprimer une destination des favoris.

    Token nécessaire : oui
    Rôle admin : non

    Champs à fournir
    {
        "destinationId": 1
    }

    Contraintes
        destinationId   obligatoire
        suppression uniquement dans les favoris de l’utilisateur connecté


# -----------
# COMMENTS
# -----------

# POST /api/comments/store.php

    Créer un commentaire.

    Token nécessaire : oui
    Rôle admin : non

    Champs à fournir
    {
        "destination_id": 1,
        "content": "Super destination, je recommande !",
        "rating": 5
    }
    Contraintes
        destination_id  obligatoire, doit exister
        content         obligatoire
        rating          optionnel
        rating          doit être entre 1 et 5
        user_id         récupéré automatiquement depuis le JWT

# GET /api/comments/by-destination.php?destination_id=1

    Récupérer les commentaires d’une destination.

    Token nécessaire : non
    Rôle admin : non

# GET /api/comments/by-user.php

    Récupérer les commentaires de l’utilisateur connecté.

    Token nécessaire : oui
    Rôle admin : non

# POST /api/comments/delete.php

    Supprimer un commentaire.

    Token nécessaire : oui
    Rôle admin : oui

    Champs à fournir
    {
        "id": 12
    }
    Contraintes
        id  obligatoire
        le commentaire doit exister
        seul un admin peut supprimer


# -----------
# SEARCH
# -----------

# GET /api/destinations/search.php?keyword=japon

    Recherche dans :
        destination.name
        destination.capital
        region.name
        region.slug

# GET /api/destinations/search.php?region=asie

    Recherche dans :
        region.slug

# GET /api/destinations/search.php?keyword=tokyo&region=asie

    Recherche le mot-clé :
        tokyo
    uniquement dans la région :
        asie

    keyword recherche dans name, capital, region name, region slug
    region correspond au slug de la région
    si aucun paramètre n’est fourni, l’API retourne une erreur 400
    
