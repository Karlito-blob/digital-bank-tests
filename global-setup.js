// global-setup.js
// Script execute UNE FOIS avant toute la suite de tests
// Verifie que l'environnement est pret avant de lancer les tests

const { chromium } = require('@playwright/test');
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

    // Verification que la SPA est accessible avant de lancer les tests
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        console.log('  Verification accessibilite SPA...');
        await page.goto(ENV.BASE_URL, { timeout: ENV.TIMEOUT });

        // Verifie que la page de login est bien chargee
        const loginButton = await page.getByTestId('btn-login');
        await loginButton.waitFor({ timeout: 5000 });

        console.log('  SPA accessible et page de login chargee');
        console.log('');
    } catch (error) {
        console.error('  ERREUR : La SPA nest pas accessible !');
        console.error(`  URL : ${ENV.BASE_URL}`);
        console.error(`  Detail : ${error.message}`);
        console.error('');
        throw new Error(`Global Setup echoue — SPA inaccessible : ${ENV.BASE_URL}`);
    } finally {
        await browser.close();
    }

    console.log('  Setup termine — lancement des tests...');
    console.log('');
}

module.exports = globalSetup;