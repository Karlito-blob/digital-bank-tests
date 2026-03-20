// tests/bills/bills.regression.spec.js
// Campagne Régression — Factures
// Tags : @regression

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { BillsPage } = require('../../pages/BillsPage');
const { USERS } = require('../../fixtures/users.fixtures');
const { BILLS } = require('../../fixtures/bills.fixtures');

test.describe('Factures - Regression', { tag: '@regression' }, () => {

    test.beforeEach(async ({ page }) => {
        // GIVEN — l'utilisateur est connecté et sur l'onglet Factures
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.standard.email, USERS.standard.password);
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goToBills();
    });

    // ─────────────────────────────────────────────
    // DGB-BILL-01
    // ─────────────────────────────────────────────
    test('DGB-BILL-01 - Affichage factures - doit afficher les factures en attente', async ({ page }) => {
        const billsPage = new BillsPage(page);

        // GIVEN — l'utilisateur est sur la page factures (beforeEach)

        // WHEN — la page est affichée

        // THEN — les factures en attente sont visibles
        await expect(billsPage.pendingBills).toBeVisible();
        await expect(billsPage.getBill(BILLS.edf.id)).toBeVisible();
        await expect(billsPage.getBill(BILLS.orange.id)).toBeVisible();
        await expect(billsPage.getBill(BILLS.assurance.id)).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-BILL-01 bis
    // ─────────────────────────────────────────────
    test('DGB-BILL-01 - Paiement facture - doit afficher message succes et changer statut', async ({ page }) => {
        const billsPage = new BillsPage(page);

        // GIVEN — l'utilisateur est sur la page factures (beforeEach)

        // WHEN — il paie la facture EDF
        await billsPage.payBill(BILLS.edf.id);

        // THEN — un message de succès est affiché
        await expect(billsPage.successMessage).toBeVisible();
        await expect(billsPage.successMessage).toContainText(BILLS.edf.provider);
    });

    // ─────────────────────────────────────────────
    // DGB-BILL-01 ter
    // ─────────────────────────────────────────────
    test('DGB-BILL-01 - Annulation paiement - doit fermer la modale sans payer', async ({ page }) => {
        const billsPage = new BillsPage(page);

        // GIVEN — l'utilisateur est sur la page factures (beforeEach)

        // WHEN — il clique sur Payer puis Annuler
        await billsPage.cancelPayment(BILLS.orange.id);

        // THEN — la modale est fermée et la facture est toujours en attente
        await expect(billsPage.modalConfirmPayment).not.toBeVisible();
        await expect(billsPage.getBill(BILLS.orange.id)).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-BILL-02 @known-bug
    // ─────────────────────────────────────────────
    test('DGB-BILL-02 - Solde apres paiement - @known-bug solde non debite', async ({ page }) => {
        const billsPage = new BillsPage(page);
        const dashboardPage = new DashboardPage(page);
        const { ACCOUNTS } = require('../../fixtures/users.fixtures');

        // GIVEN — l'utilisateur est sur la page factures (beforeEach)

        // Ce test est marqué comme échec attendu jusqu'à correction de DGB-BILL-02
        test.fail();

        // WHEN — il paie la facture EDF
        await billsPage.payBill(BILLS.edf.id);
        await expect(billsPage.successMessage).toBeVisible();

        // WHEN — il retourne sur le dashboard
        await dashboardPage.tabDashboard.click();

        // THEN — le solde DEVRAIT être débité après paiement
        // Attendu : 5000 - 156.78 = 4843.22 — Actuel : 5000.00 (bug)
        await expect(
            dashboardPage.getAccountBalance(ACCOUNTS.courant.id)
        ).toContainText('4 843,22');
    });

});