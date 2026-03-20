// fixtures/users.fixtures.js
// Données de test utilisateurs — toutes fictives (conformité RGPD)

const USERS = {
    // Utilisateur standard sans 2FA
    standard: {
        email: 'test@digitalbank.fr',
        password: 'Test1234!',
        name: 'Utilisateur Test',
        phone: '+33 6 00 00 00 00',
    },

    // Utilisateur avec 2FA activée
    twoFA: {
        email: 'marie.martin@email.com',
        password: 'SecurePass456!',
        name: 'Marie Martin',
        twoFACode: '123456',
    },

    // Identifiants invalides pour tests négatifs
    invalid: {
        email: 'inconnu@digitalbank.fr',
        password: 'MauvaisMotDePasse!',
    },

    // Email valide mais mauvais mot de passe
    wrongPassword: {
        email: 'test@digitalbank.fr',
        password: 'WrongPass999!',
    },
};

// Données des comptes utilisateur test
const ACCOUNTS = {
    // Compte courant utilisateur test (ID 4 dans la SPA)
    courant: {
        id: 4,
        type: 'Compte Courant',
        balance: '5 000,00',
    },
    // Livret A utilisateur test (ID 5 dans la SPA)
    livretA: {
        id: 5,
        type: 'Livret A',
        balance: '15 000,00',
    },
    // Total des deux comptes
    totalBalance: '20 000,00',
};

// Données de test mot de passe
const PASSWORDS = {
    // Mot de passe actuel de l'utilisateur test
    current: 'Test1234!',

    // Nouveau mot de passe valide
    valid: 'NewPass99!',

    // Cas invalides
    tooShort: 'Ab1!',
    noUppercase: 'newpass99!',
    noLowercase: 'NEWPASS99!',
    noNumber: 'NewPass!!',
    noSpecial: 'NewPass99',
};

module.exports = { USERS, ACCOUNTS, PASSWORDS };