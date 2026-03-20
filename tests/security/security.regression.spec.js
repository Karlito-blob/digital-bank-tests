// tests/security/security.regression.spec.js
// Campagne Régression — Sécurité
// Tags : @regression

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { DashboardPage } = require('../../pages/DashboardPage');
const { SecurityPage } = require('../../pages/SecurityPage');
const { USERS, PASSWORDS } = require('../../fixtures/users.fixtures');

test.describe('Securite - Regression', { tag: '@regression' }, () => {

    test.beforeEach(async ({ page }) => {
        // GIVEN — l'utilisateur est connecté et sur l'onglet Sécurité
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.standard.email, USERS.standard.password);
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.goToSecurity();
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-01
    // ─────────────────────────────────────────────
    test('DGB-SEC-01 - Modification MDP valide - doit afficher message succes', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur est sur la page sécurité (beforeEach)

        // WHEN — il change son mot de passe avec des valeurs valides
        await securityPage.changePassword(
            PASSWORDS.current,
            PASSWORDS.valid,
            PASSWORDS.valid
        );

        // THEN — un message de succès est affiché
        await expect(securityPage.successMessage).toBeVisible();
        await expect(securityPage.successMessage).toContainText('Mot de passe modifié avec succès');
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-01 — Ancien MDP incorrect
    // ─────────────────────────────────────────────
    test('DGB-SEC-01 - Ancien MDP incorrect - doit afficher erreur', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur est sur la page sécurité (beforeEach)

        // WHEN — il saisit un mauvais mot de passe actuel
        await securityPage.changePassword(
            'MauvaisMotDePasse!',
            PASSWORDS.valid,
            PASSWORDS.valid
        );

        // THEN — un message d'erreur est affiché
        await expect(securityPage.passwordError).toBeVisible();
        await expect(securityPage.passwordError).toContainText('Mot de passe actuel incorrect');
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-01 — Critères de sécurité
    // ─────────────────────────────────────────────
    test('DGB-SEC-01 - MDP trop court - doit afficher criteres non respectes', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur est sur la page sécurité (beforeEach)

        // WHEN — il ouvre la modale et saisit un mot de passe trop court
        await securityPage.openChangePassword();
        await securityPage.inputNewPassword.fill(PASSWORDS.tooShort);

        // THEN — les critères de sécurité sont affichés
        await expect(securityPage.passwordRequirements).toBeVisible();
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-01 — Confirmation différente
    // ─────────────────────────────────────────────
    test('DGB-SEC-01 - Confirmation MDP differente - doit afficher erreur', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur est sur la page sécurité (beforeEach)

        // WHEN — il saisit deux mots de passe différents
        await securityPage.changePassword(
            PASSWORDS.current,
            PASSWORDS.valid,
            'AutrePass99!'
        );

        // THEN — un message d'erreur est affiché
        await expect(securityPage.passwordError).toBeVisible();
        await expect(securityPage.passwordError).toContainText('Les mots de passe ne correspondent pas');
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-02
    // ─────────────────────────────────────────────
    test('DGB-SEC-02 - Activation 2FA - doit afficher message succes', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur est sur la page sécurité (beforeEach)
        // Le 2FA est désactivé par défaut pour l'utilisateur test

        // WHEN — il active le toggle 2FA
        await securityPage.toggle2FASwitch();

        // THEN — un message de succès est affiché
        await expect(securityPage.successMessage).toBeVisible();
        await expect(securityPage.successMessage).toContainText('Double authentification activée');
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-02 — Désactivation
    // ─────────────────────────────────────────────
    test('DGB-SEC-02 - Desactivation 2FA - doit afficher message succes', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur active d'abord le 2FA
        await securityPage.toggle2FASwitch();
        await expect(securityPage.successMessage).toBeVisible();

        // WHEN — il désactive le toggle 2FA
        await securityPage.toggle2FASwitch();

        // THEN — un message de désactivation est affiché
        await expect(securityPage.successMessage).toBeVisible();
        await expect(securityPage.successMessage).toContainText('Double authentification désactivée');
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-01 — Informations utilisateur
    // ─────────────────────────────────────────────
    test('DGB-SEC - Informations utilisateur - doit afficher les bonnes donnees', async ({ page }) => {
        const securityPage = new SecurityPage(page);

        // GIVEN — l'utilisateur est sur la page sécurité (beforeEach)

        // WHEN — la page est affichée

        // THEN — les informations utilisateur sont correctes
        await expect(securityPage.userName).toContainText(USERS.standard.name);
        await expect(securityPage.userEmail).toContainText(USERS.standard.email);
        await expect(securityPage.userPhone).toContainText(USERS.standard.phone);
    });

    // ─────────────────────────────────────────────
    // DGB-SEC-03 @known-bug
    // ─────────────────────────────────────────────
    test('DGB-SEC-03 - MDP non persiste apres reload - @known-bug', async ({ page }) => {
        const securityPage = new SecurityPage(page);
        const loginPage = new LoginPage(page);

        // Ce test est marqué comme échec attendu jusqu'à correction de DGB-SEC-03
        test.fail();

        // GIVEN — l'utilisateur change son mot de passe
        await securityPage.changePassword(
            PASSWORDS.current,
            PASSWORDS.valid,
            PASSWORDS.valid
        );
        await expect(securityPage.successMessage).toBeVisible();

        // WHEN — il se déconnecte et tente de se reconnecter avec le nouveau MDP
        await page.goto('/');
        await loginPage.login(USERS.standard.email, PASSWORDS.valid);

        // THEN — @known-bug : la connexion échoue car le MDP n'est pas persisté
        // La SPA stocke les données en mémoire JS — reset au rechargement
        await expect(loginPage.errorMessage).not.toBeVisible();
    });

});