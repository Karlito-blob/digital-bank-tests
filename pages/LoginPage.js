// pages/LoginPage.js
// Page Object — Page de connexion DigitalBank

class LoginPage {
    constructor(page) {
        this.page = page;

        // Sélecteurs — basés exclusivement sur data-testid
        this.emailInput = page.getByTestId('input-email');
        this.passwordInput = page.getByTestId('input-password');
        this.loginButton = page.getByTestId('btn-login');
        this.errorMessage = page.getByTestId('login-error');
        this.rememberCheckbox = page.getByTestId('checkbox-remember');
        this.forgotPasswordLink = page.getByTestId('link-forgot-password');

        // Page reset password
        this.resetEmailInput = page.getByTestId('input-reset-email');
        this.resetButton = page.getByTestId('btn-reset-password');
        this.resetError = page.getByTestId('reset-error');
        this.resetSuccess = page.getByTestId('reset-success');
        this.backToLoginLink = page.getByTestId('link-back-to-login');

        // Page 2FA
        this.twoFAInputs = [
            page.getByTestId('2fa-code-0'),
            page.getByTestId('2fa-code-1'),
            page.getByTestId('2fa-code-2'),
            page.getByTestId('2fa-code-3'),
            page.getByTestId('2fa-code-4'),
            page.getByTestId('2fa-code-5'),
        ];
        this.verify2FAButton = page.getByTestId('btn-verify-2fa');
        this.twoFAError = page.getByTestId('2fa-error');
    }

    // Navigation vers la page de login
    async goto() {
        await this.page.goto('/');
    }

    // Connexion complète
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Saisie du code 2FA chiffre par chiffre
    async enter2FACode(code) {
        const digits = code.toString().split('');
        for (let i = 0; i < digits.length; i++) {
            await this.twoFAInputs[i].fill(digits[i]);
        }
        await this.verify2FAButton.click();
    }

    // Formulaire reset password
    async submitResetPassword(email) {
        await this.forgotPasswordLink.click();
        await this.resetEmailInput.fill(email);
        await this.resetButton.click();
    }
}

module.exports = { LoginPage };