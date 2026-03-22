// tests/demo/demo.fail.spec.js
// Demonstration — Test en echec volontaire pour jury
// Illustre le comportement du pipeline CI/CD en cas de regression
// Tags : @regression

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { USERS, ACCOUNTS } = require('../../fixtures/users.fixtures');

test.describe('Demo Pipeline - Echec volontaire', { tag: '@regression' }, () => {

    // ─────────────────────────────────────────────
    // DEMO-01 — Regression introduite volontairement
    // Simule une regression sur le solde du compte
    // apres une modification du code applicatif
    // ─────────────────────────────────────────────
    test('DEMO-01 - Regression solde - simulation regression introduite', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté
        await loginPage.goto();
        await loginPage.login(USERS.standard.email, USERS.standard.password);

        // WHEN — il consulte son solde
        await expect(dashboardPage.headerUserName).toBeVisible();

        // THEN — le solde attendu est incorrect volontairement
        // Simule une regression ou le solde affiche un mauvais montant
        // Solde reel : 5 000,00 — Solde attendu incorrect : 99 999,00
        await expect(
            dashboardPage.getAccountBalance(ACCOUNTS.courant.id)
        ).toContainText('99 999,00');
    });

});