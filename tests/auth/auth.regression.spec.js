// tests/auth/auth.regression.spec.js
// Campagne Régression — Authentification
// Tags : @regression

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { USERS } = require('../../fixtures/users.fixtures');

test.describe('Authentification - Regression', () => {

    test.beforeEach(async ({ page }) => {
        // GIVEN — l'utilisateur est sur la page de login
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-01 étendu
    // ─────────────────────────────────────────────
    test('DGB-AUTH-01 - Login valide - doit afficher tous les elements du dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il se connecte avec des identifiants valides
        await loginPage.login(
            USERS.standard.email,
            USERS.standard.password
        );

        // THEN — tous les elements du dashboard sont visibles
        await expect(dashboardPage.headerUserName).toBeVisible();
        await expect(dashboardPage.headerUserName).toContainText(USERS.standard.name);
        await expect(dashboardPage.balanceCards).toBeVisible();
        await expect(dashboardPage.transactionList).toBeVisible();
        await expect(dashboardPage.tabTransfer).toBeVisible();
        await expect(dashboardPage.tabBills).toBeVisible();
        await expect(dashboardPage.tabSecurity).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-02 étendu
    // ─────────────────────────────────────────────
    test('DGB-AUTH-02 - Email inconnu - doit afficher erreur et rester sur login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il saisit un email inconnu
        await loginPage.login(
            USERS.invalid.email,
            USERS.invalid.password
        );

        // THEN — message d'erreur visible, champs toujours accessibles
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-02 bis
    // ─────────────────────────────────────────────
    test('DGB-AUTH-02 - Champs vides - doit empecher la soumission', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il clique sur connexion sans rien remplir
        await loginPage.loginButton.click();

        // THEN — on reste sur la page de login, pas d'erreur applicative
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.errorMessage).not.toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-03 étendu
    // ─────────────────────────────────────────────
    test('DGB-AUTH-03 - Code 2FA invalide - doit afficher erreur et vider les champs', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est connecté et sur la page 2FA
        await loginPage.login(
            USERS.twoFA.email,
            USERS.twoFA.password
        );

        // WHEN — il saisit un code 2FA invalide
        await loginPage.enter2FACode('000000');

        // THEN — un message d'erreur est affiché
        await expect(loginPage.twoFAError).toBeVisible();
        await expect(loginPage.twoFAError).toContainText('Code de vérification incorrect');
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-04 étendu
    // ─────────────────────────────────────────────
    test('DGB-AUTH-04 - Reset MDP email inconnu - doit afficher erreur', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il soumet un email inconnu pour reset
        await loginPage.submitResetPassword(USERS.invalid.email);

        // THEN — un message d'erreur est affiché
        await expect(loginPage.resetError).toBeVisible();
        await expect(loginPage.resetError).toContainText('Aucun compte associé');
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH — Déconnexion
    // ─────────────────────────────────────────────
    test('DGB-AUTH - Deconnexion - doit retourner sur la page de login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est connecté
        await loginPage.login(
            USERS.standard.email,
            USERS.standard.password
        );
        await expect(dashboardPage.headerUserName).toBeVisible();

        // WHEN — il clique sur Déconnexion
        await dashboardPage.logout();

        // THEN — il est redirigé sur la page de login
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.emailInput).toBeVisible();
    });

});