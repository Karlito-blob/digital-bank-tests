// tests/auth/auth.e2e.spec.js
// Parcours E2E — Authentification
// Tags : @e2e

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { USERS } = require('../../fixtures/users.fixtures');
const { checkAccessibility } = require('../../helpers/axe.helper');

test.describe('Authentification - E2E', { tag: '@e2e' }, () => {

    // ─────────────────────────────────────────────
    // P-E2E-01 — Connexion et consultation
    // ─────────────────────────────────────────────
    test('P-E2E-01 - Connexion et consultation - parcours complet', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur arrive sur la page de login
        await loginPage.goto();

        // WCAG — vérifie l'accessibilité de la page de login
        await checkAccessibility(page, 'Page de login');

        // WHEN — il se connecte avec des identifiants valides
        await loginPage.login(USERS.standard.email, USERS.standard.password);

        // THEN — le dashboard est affiché
        await expect(dashboardPage.headerUserName).toBeVisible();
        await expect(dashboardPage.headerUserName).toContainText(USERS.standard.name);

        // WCAG — vérifie l'accessibilité du dashboard
        await checkAccessibility(page, 'Dashboard');

        // WHEN — il consulte ses comptes
        await expect(dashboardPage.balanceCards).toBeVisible();
        await expect(dashboardPage.transactionList).toBeVisible();

        // WHEN — il se déconnecte
        await dashboardPage.logout();

        // THEN — il est redirigé sur la page de login
        await expect(loginPage.loginButton).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // P-E2E-05 — Parcours 2FA complet
    // ─────────────────────────────────────────────
    test('P-E2E-05 - Parcours 2FA complet - connexion avec code valide', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur arrive sur la page de login
        await loginPage.goto();

        // WHEN — il saisit les identifiants du compte 2FA
        await loginPage.login(USERS.twoFA.email, USERS.twoFA.password);

        // WHEN — il saisit le code 2FA valide
        await loginPage.enter2FACode(USERS.twoFA.twoFACode);

        // THEN — le dashboard est affiché avec son nom
        await expect(dashboardPage.headerUserName).toBeVisible();
        await expect(dashboardPage.headerUserName).toContainText(USERS.twoFA.name);

        // WCAG — vérifie l'accessibilité du dashboard post-2FA
        await checkAccessibility(page, 'Dashboard post-2FA');
    });

});