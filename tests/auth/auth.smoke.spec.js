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

    // ─────────────────────────────────────────────
    // DGB-AUTH-03
    // ─────────────────────────────────────────────
    test('DGB-AUTH-03 - Login 2FA - doit acceder au dashboard apres code valide', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il saisit les identifiants du compte 2FA
        await loginPage.login(
            USERS.twoFA.email,
            USERS.twoFA.password
        );

        // WHEN — il saisit le code 2FA valide
        await loginPage.enter2FACode(USERS.twoFA.twoFACode);

        // THEN — le dashboard est affiché avec son nom
        await expect(dashboardPage.headerUserName).toBeVisible();
        await expect(dashboardPage.headerUserName).toContainText(USERS.twoFA.name);
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-04
    // ─────────────────────────────────────────────
    test('DGB-AUTH-04 - Reset MDP - doit afficher confirmation envoi email', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il clique sur mot de passe oublié et soumet un email connu
        await loginPage.submitResetPassword(USERS.standard.email);

        // THEN — un message de succès est affiché
        await expect(loginPage.resetSuccess).toBeVisible();
        await expect(loginPage.resetSuccess).toContainText(USERS.standard.email);
    });

    // ─────────────────────────────────────────────
    // DGB-AUTH-05 @known-bug
    // ─────────────────────────────────────────────
    test('DGB-AUTH-05 - Mauvais MDP - doit afficher erreur sans verrouillage @known-bug', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // GIVEN — l'utilisateur est sur la page de login (beforeEach)

        // WHEN — il saisit un email valide avec un mauvais mot de passe
        await loginPage.login(
            USERS.wrongPassword.email,
            USERS.wrongPassword.password
        );

        // THEN — un message d'erreur est affiché
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Email ou mot de passe incorrect');

        // THEN — @known-bug : aucun verrouillage apres tentatives multiples
        // Anomalie DGB-AUTH-05 : le mecanisme de verrouillage est absent
        // A corriger par l'equipe dev — test mis a jour apres fix
    });

});