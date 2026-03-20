// pages/SecurityPage.js
// Page Object — Page des paramètres de sécurité DigitalBank

class SecurityPage {
    constructor(page) {
        this.page = page;

        // Toggles
        this.toggle2FA = page.getByTestId('toggle-2fa');
        this.toggleEmailNotif = page.getByTestId('toggle-email-notifications');
        this.toggleSmsNotif = page.getByTestId('toggle-sms-notifications');

        // Bouton modifier mot de passe
        this.btnChangePassword = page.getByTestId('btn-change-password');

        // Modal changement mot de passe
        this.modalChangePassword = page.getByTestId('modal-change-password');
        this.inputCurrentPassword = page.getByTestId('input-current-password');
        this.inputNewPassword = page.getByTestId('input-new-password');
        this.inputConfirmPassword = page.getByTestId('input-confirm-password');
        this.btnSavePassword = page.getByTestId('btn-save-password');
        this.btnCancelPassword = page.getByTestId('btn-cancel-password');
        this.passwordError = page.getByTestId('password-error');
        this.passwordRequirements = page.getByTestId('password-requirements');

        // Informations utilisateur
        this.userName = page.getByTestId('user-name');
        this.userEmail = page.getByTestId('user-email');
        this.userPhone = page.getByTestId('user-phone');

        // Message succès global
        this.successMessage = page.getByTestId('security-success');
    }

    // Ouvre la modale de changement de mot de passe
    async openChangePassword() {
        await this.btnChangePassword.click();
        await this.modalChangePassword.waitFor({ state: 'visible' });
    }

    // Remplit et soumet le formulaire de changement de mot de passe
    async changePassword(currentPassword, newPassword, confirmPassword) {
        await this.openChangePassword();
        await this.inputCurrentPassword.fill(currentPassword);
        await this.inputNewPassword.fill(newPassword);
        await this.inputConfirmPassword.fill(confirmPassword || newPassword);
        await this.btnSavePassword.click();
    }

    // Active ou désactive le 2FA
    async toggle2FASwitch() {
        // Le checkbox est caché par CSS — on force le check via JS
        await this.toggle2FA.dispatchEvent('click');
    }
}

module.exports = { SecurityPage };