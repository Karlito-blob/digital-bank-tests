// fixtures/transfer.fixtures.js
// Données de test virements — toutes fictives (conformité RGPD)

const TRANSFER = {
    // Virement interne valide
    internal: {
        amount: '100',
        description: 'Virement test interne',
    },

    // Montant supérieur au solde
    insufficientFunds: {
        amount: '999999',
        description: 'Test solde insuffisant',
    },

    // Bénéficiaire existant (ID 3 dans la SPA)
    beneficiary: {
        id: 3,
        name: 'Marc Bernard',
        iban: 'FR76 7777 8888 9999 0000 1111 222',
    },

    // Nouveau bénéficiaire à ajouter
    newBeneficiary: {
        name: 'Jean Testeur',
        iban: 'FR76 1234 5678 9012 3456 7890 123',
    },

    // IBAN invalide pour test négatif
    invalidIban: {
        name: 'Test Invalide',
        iban: '12345INVALIDE',
    },
};

module.exports = { TRANSFER };