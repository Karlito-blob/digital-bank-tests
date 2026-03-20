// tests/bills/bills.e2e.spec.js
// Parcours E2E — Factures
// Tags : @e2e

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { BillsPage } = require('../../pages/BillsPage');
const { USERS } = require('../../fixtures/users.fixtures');
const { BILLS } = require('../../fixtures/bills.fixtures');
const { checkAccessibility } = require('../../helpers/axe.helper');

test.describe('Factures - E2E', { tag: '@e2e' }, () => {

    // ─────────────────────────────────────────────
    // P-E2E-03 — Paiement de facture complet
    // ─────────────────────────────────────────────
    test('P-E2E-03 - Paiement facture complet - statut mis a jour', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const billsPage = new BillsPage(page);

        // GIVEN — l'utilisateur est connecté
        await loginPage.goto();
        await loginPage.login(USERS.standard.email, USERS.standard.password);
        await expect(dashboardPage.headerUserName).toBeVisible();

        // WHEN — il va sur l'onglet factures
        await dashboardPage.goToBills();

        // WCAG — vérifie l'accessibilité de la page factures
        await checkAccessibility(page, 'Page factures');

        // THEN — les factures en attente sont visibles
        await expect(billsPage.pendingBills).toBeVisible();
        await expect(billsPage.getBill(BILLS.edf.id)).toBeVisible();

        // WHEN — il paie la facture EDF
        await billsPage.payBill(BILLS.edf.id);

        // THEN — un message de succès est affiché
        await expect(billsPage.successMessage).toBeVisible();
        await expect(billsPage.successMessage).toContainText(BILLS.edf.provider);

        // THEN — la facture payée apparaît dans la liste des factures payées
        await expect(billsPage.getPaidBill(BILLS.edf.id)).toBeVisible();
    });

});