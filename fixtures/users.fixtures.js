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

module.exports = { USERS };