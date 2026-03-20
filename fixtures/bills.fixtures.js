// fixtures/bills.fixtures.js
// Données de test factures — toutes fictives (conformité RGPD)

const BILLS = {
    // Facture EDF (ID 1 dans la SPA)
    edf: {
        id: 1,
        provider: 'EDF',
        reference: 'EDF-2025-001234',
        amount: '156.78',
    },

    // Facture Orange (ID 2 dans la SPA)
    orange: {
        id: 2,
        provider: 'Orange',
        reference: 'ORG-2025-567890',
        amount: '49.99',
    },

    // Facture Assurance Auto (ID 3 dans la SPA)
    assurance: {
        id: 3,
        provider: 'Assurance Auto',
        reference: 'AXA-2025-112233',
        amount: '89.00',
    },
};

module.exports = { BILLS };