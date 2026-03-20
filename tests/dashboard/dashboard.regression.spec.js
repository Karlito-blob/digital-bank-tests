// tests/dashboard/dashboard.regression.spec.js
// Campagne Régression — Dashboard
// Tags : @regression

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { USERS, ACCOUNTS } = require('../../fixtures/users.fixtures');

test.describe('Dashboard - Regression', () => {

    test.beforeEach(async ({ page }) => {
        // GIVEN — l'utilisateur est connecté sur le dashboard
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            USERS.standard.email,
            USERS.standard.password
        );
    });

    // ─────────────────────────────────────────────
    // DGB-DASH-01
    // ─────────────────────────────────────────────
    test('DGB-DASH-01 - Affichage solde - doit afficher les deux comptes', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté (beforeEach)

        // WHEN — le dashboard est affiché

        // THEN — les deux cartes de compte sont visibles
        await expect(dashboardPage.getAccountCard(ACCOUNTS.courant.id)).toBeVisible();
        await expect(dashboardPage.getAccountCard(ACCOUNTS.livretA.id)).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-DASH-01 bis
    // ─────────────────────────────────────────────
    test('DGB-DASH-01 - Solde compte courant - doit afficher le bon montant', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté (beforeEach)

        // WHEN — le dashboard est affiché

        // THEN — le solde du compte courant est correct
        await expect(
            dashboardPage.getAccountBalance(ACCOUNTS.courant.id)
        ).toContainText(ACCOUNTS.courant.balance);
    });

    // ─────────────────────────────────────────────
    // DGB-DASH-01 ter
    // ─────────────────────────────────────────────
    test('DGB-DASH-01 - Selection compte - doit mettre a jour les transactions', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté (beforeEach)

        // WHEN — il clique sur le Livret A
        await dashboardPage.selectAccount(ACCOUNTS.livretA.id);

        // THEN — la liste de transactions est visible
        await expect(dashboardPage.transactionList).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-DASH-02
    // ─────────────────────────────────────────────
    test('DGB-DASH-02 - Historique transactions - doit afficher les transactions du compte', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté (beforeEach)

        // WHEN — le dashboard est affiché avec le compte courant par defaut

        // THEN — la liste des transactions est visible et non vide
        await expect(dashboardPage.transactionList).toBeVisible();
        const transactions = page.locator('[data-testid^="transaction-"]');
        await expect(transactions.first()).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-DASH — Navigation onglets
    // ─────────────────────────────────────────────
    test('DGB-DASH - Navigation - doit acceder a tous les onglets', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté (beforeEach)

        // WHEN — il clique sur l'onglet Virements
        await dashboardPage.goToTransfer();
        // THEN — l'onglet Virements est actif
        await expect(page.getByTestId('tab-transfer')).toHaveClass(/active/);

        // WHEN — il clique sur l'onglet Factures
        await dashboardPage.goToBills();
        // THEN — l'onglet Factures est actif
        await expect(page.getByTestId('tab-bills')).toHaveClass(/active/);

        // WHEN — il clique sur l'onglet Sécurité
        await dashboardPage.goToSecurity();
        // THEN — l'onglet Sécurité est actif
        await expect(page.getByTestId('tab-security')).toHaveClass(/active/);
    });

});