// tests/transfer/transfer.regression.spec.js
// Campagne Régression — Virements
// Tags : @regression

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { TransferPage } = require('../../pages/TransferPage');
const { USERS, ACCOUNTS } = require('../../fixtures/users.fixtures');
const { TRANSFER } = require('../../fixtures/transfer.fixtures');

test.describe('Virements - Regression', { tag: '@regression' }, () => {

    test.beforeEach(async ({ page }) => {
        // GIVEN — l'utilisateur est connecté et sur l'onglet Virements
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.standard.email, USERS.standard.password);
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goToTransfer();
    });

    // ─────────────────────────────────────────────
    // DGB-TRF-01
    // ─────────────────────────────────────────────
    test('DGB-TRF-01 - Virement interne valide - doit afficher message succes', async ({ page }) => {
        const transferPage = new TransferPage(page);

        // GIVEN — l'utilisateur est sur la page virements (beforeEach)

        // WHEN — il effectue un virement interne valide
        await transferPage.doInternalTransfer(
            TRANSFER.internal.amount,
            TRANSFER.internal.description
        );

        // THEN — un message de succès est affiché
        await expect(transferPage.successMessage).toBeVisible();
        await expect(transferPage.successMessage).toContainText('Virement effectué avec succès');
    });

    // ─────────────────────────────────────────────
    // DGB-TRF-01 bis
    // ─────────────────────────────────────────────
    test('DGB-TRF-01 - Solde insuffisant - doit afficher message erreur', async ({ page }) => {
        const transferPage = new TransferPage(page);

        // GIVEN — l'utilisateur est sur la page virements (beforeEach)

        // WHEN — il saisit un montant supérieur au solde
        await transferPage.doInternalTransfer(
            TRANSFER.insufficientFunds.amount,
            TRANSFER.insufficientFunds.description
        );

        // THEN — un message d'erreur solde insuffisant est affiché
        await expect(transferPage.errorMessage).toBeVisible();
        await expect(transferPage.errorMessage).toContainText('Solde insuffisant');
    });

    // ─────────────────────────────────────────────
    // DGB-TRF-02
    // ─────────────────────────────────────────────
    test('DGB-TRF-02 - Virement externe valide - doit afficher message succes', async ({ page }) => {
        const transferPage = new TransferPage(page);

        // GIVEN — l'utilisateur est sur la page virements (beforeEach)

        // WHEN — il effectue un virement vers un bénéficiaire existant
        await transferPage.doExternalTransfer(
            TRANSFER.beneficiary.id,
            TRANSFER.internal.amount,
            TRANSFER.internal.description
        );

        // THEN — un message de succès est affiché
        await expect(transferPage.successMessage).toBeVisible();
        await expect(transferPage.successMessage).toContainText('Virement effectué avec succès');
    });

    // ─────────────────────────────────────────────
    // DGB-TRF-04 @known-bug
    // ─────────────────────────────────────────────
    test('DGB-TRF-04 - Virement sans confirmation - @known-bug absence de modale', async ({ page }) => {
        const transferPage = new TransferPage(page);

        // GIVEN — l'utilisateur est sur la page virements (beforeEach)

        // WHEN — il effectue un virement interne
        await transferPage.doInternalTransfer(TRANSFER.internal.amount);

        // THEN — @known-bug : aucune modale de confirmation contrairement aux factures
        // Anomalie DGB-TRF-04 : virement immédiat sans étape de confirmation
        // Comportement incohérent vs paiement de factures qui ont une modale
        await expect(transferPage.successMessage).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-TRF-05
    // ─────────────────────────────────────────────
    test('DGB-TRF-05 - Ajout beneficiaire valide - doit apparaitre dans la liste', async ({ page }) => {
        const transferPage = new TransferPage(page);

        // GIVEN — l'utilisateur est sur l'onglet virement externe
        await transferPage.btnExternalTransfer.click();

        // WHEN — il ajoute un nouveau bénéficiaire
        await transferPage.addBeneficiary(
            TRANSFER.newBeneficiary.name,
            TRANSFER.newBeneficiary.iban
        );

        // THEN — le nouveau bénéficiaire apparaît dans la liste
        await expect(transferPage.beneficiaryList).toContainText(TRANSFER.newBeneficiary.name);
    });

});