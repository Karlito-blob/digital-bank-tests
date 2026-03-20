// tests/auth/auth.smoke.spec.js
// Campagne Smoke — Authentification
// Tags : @smoke

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { USERS } = require('../../fixtures/users.fixtures');

test.describe('Authentification - Smoke', () => {

    test.beforeEach(async ({ page }) => {
        // GIVEN — l'utilisateur est sur la page de login
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-01
    // ─────────────────────────────────────────────
    test('DGB-AUTH-01 - Login valide - doit afficher le dashboard', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il saisit des identifiants valides et clique sur Connexion
        await loginPage.login(
            USERS.standard.email,
            USERS.standard.password
        );

        // THEN — le dashboard est affiché avec son nom et ses comptes
        await expect(dashboardPage.headerUserName).toBeVisible();
        await expect(dashboardPage.headerUserName).toContainText(USERS.standard.name);
        await expect(dashboardPage.balanceCards).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-02
    // ─────────────────────────────────────────────
    test('DGB-AUTH-02 - Login invalide - doit afficher un message erreur', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il saisit des identifiants invalides et clique sur Connexion
        await loginPage.login(
            USERS.invalid.email,
            USERS.invalid.password
        );

        // THEN — un message d'erreur est affiché et on reste sur la page de login
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Email ou mot de passe incorrect');
        await expect(loginPage.loginButton).toBeVisible();
    });

});