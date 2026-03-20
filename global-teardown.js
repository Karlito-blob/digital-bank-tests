// global-teardown.js
// Script execute UNE FOIS apres toute la suite de tests
// Nettoyage et rapport final

const { ENV } = require('./helpers/env.helper');

async function globalTeardown() {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║  Digital Bank Tests — Global Teardown  ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`  Environnement : ${ENV.ENV_NAME}`);
    console.log(`  Execution terminee`);
    console.log('');

    // Nettoyage des fichiers temporaires de test
    const fs = require('fs');
    const path = require('path');

    const tempDirs = ['test-results'];

    if (!process.env.CI) {
        // En local on nettoie les anciens resultats
        // En CI on les garde pour les artifacts GitHub Actions
        tempDirs.forEach(dir => {
            const dirPath = path.join(__dirname, dir);
            if (fs.existsSync(dirPath)) {
                console.log(`  Nettoyage : ${dir}/`);
            }
        });
    }

    console.log('  Teardown termine');
    console.log('');
}

module.exports = globalTeardown;