// helpers/env.helper.js
// Chargement des variables d'environnement selon le contexte d'execution
// Local : .env.local — CI/CD : variables GitHub Actions

const ENV = {
    // URL de base de la SPA
    // En local : servie par npx serve
    // En CI : servie par le webServer de playwright.config.js
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',

    // Mode headless
    // En local : true mais rajouter --headed pour debug
    // En CI : true obligatoire
    HEADLESS: true,

    // Timeout global
    // En CI on augmente pour compenser la latence des runners
    TIMEOUT: process.env.CI ? 30000 : 10000,

    // Retry
    // En local : 0 retry pour debugger facilement
    // En CI : 1 retry pour absorber les flakiness réseau
    RETRIES: process.env.CI ? 1 : 0,

    // Environnement actif
    ENV_NAME: process.env.CI ? 'CI/CD GitHub Actions' : 'Local',
};

module.exports = { ENV };