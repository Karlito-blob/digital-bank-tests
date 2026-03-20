// tests/transfer/transfer.e2e.spec.js
// Parcours E2E — Virements
// Tags : @e2e

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { TransferPage } = require('../../pages/TransferPage');
const { USERS, ACCOUNTS } = require('../../fixtures/users.fixtures');
const { TRANSFER } = require('../../fixtures/transfer.fixtures');
const { checkAccessibility } = require('../../helpers/axe.helper');

test.describe('Virements - E2E', { tag: '@e2e' }, () => {

    // ─────────────────────────────────────────────
    // P-E2E-02 — Virement interne complet
    // ─────────────────────────────────────────────
    test('P-E2E-02 - Virement interne complet - soldes mis a jour', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const transferPage = new TransferPage(page);

        // GIVEN — l'utilisateur est connecté
        await loginPage.goto();
        await loginPage.login(USERS.standard.email, USERS.standard.password);
        await expect(dashboardPage.headerUserName).toBeVisible();

        // WHEN — il note le solde initial du compte courant
        const balanceBeforeText = await dashboardPage
            .getAccountBalance(ACCOUNTS.courant.id)
            .textContent();

        // WHEN — il va sur l'onglet virements
        await dashboardPage.goToTransfer();

        // WCAG — vérifie l'accessibilité de la page virements
        await checkAccessibility(page, 'Page virements');

        // WHEN — il effectue un virement interne
        await transferPage.doInternalTransfer(
            TRANSFER.internal.amount,
            TRANSFER.internal.description
        );

        // THEN — un message de succès est affiché
        await expect(transferPage.successMessage).toBeVisible();
        await expect(transferPage.successMessage).toContainText('Virement effectué avec succès');

        // WHEN — il retourne sur le dashboard
        await dashboardPage.tabDashboard.click();

        // THEN — le solde du compte courant est débité
        const balanceAfterText = await dashboardPage
            .getAccountBalance(ACCOUNTS.courant.id)
            .textContent();

        // Les soldes doivent être différents après le virement
        expect(balanceBeforeText).not.toEqual(balanceAfterText);
    });

});