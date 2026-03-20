// global-setup.js
// Script execute UNE FOIS avant toute la suite de tests
// Verifie que l'environnement est pret avant de lancer les tests

const { ENV } = require('./helpers/env.helper');

async function globalSetup() {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║   Digital Bank Tests — Global Setup    ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`  Environnement : ${ENV.ENV_NAME}`);
    console.log(`  URL cible     : ${ENV.BASE_URL}`);
    console.log(`  Headless      : ${ENV.HEADLESS}`);
    console.log(`  Timeout       : ${ENV.TIMEOUT}ms`);
    console.log(`  Retries       : ${ENV.RETRIES}`);
    console.log('');

    // Verification que la SPA est accessible via HTTP
    console.log('  Verification accessibilite SPA...');

    try {
        const response = await fetch(ENV.BASE_URL, {
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} — ${response.statusText}`);
        }

        console.log(`  SPA accessible — HTTP ${response.status}`);
        console.log('');
    } catch (error) {
        console.error('  ERREUR : La SPA nest pas accessible !');
        console.error(`  URL    : ${ENV.BASE_URL}`);
        console.error(`  Detail : ${error.message}`);
        console.error('');
        throw new Error(`Global Setup echoue — SPA inaccessible : ${ENV.BASE_URL}`);
    }

    console.log('  Setup termine — lancement des tests...');
    console.log('');
}

module.exports = globalSetup;