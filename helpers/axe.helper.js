// helpers/axe.helper.js
// Helper axe-core — Vérifications WCAG 2.1 AA automatisées

const { AxeBuilder } = require('@axe-core/playwright');

/**
 * Vérifie l'accessibilité WCAG 2.1 AA d'une page
 * @param {import('@playwright/test').Page} page
 * @param {string} pageName - Nom de la page pour le rapport
 */
async function checkAccessibility(page, pageName) {
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

    if (results.violations.length > 0) {
        console.log(`[WCAG] ${pageName} — ${results.violations.length} violation(s) detectee(s) :`);
        results.violations.forEach(v => {
            console.log(`  - ${v.id} (${v.impact}) : ${v.description}`);
        });
    }

    return results;
}

module.exports = { checkAccessibility };