// pages/DashboardPage.js
// Page Object — Dashboard DigitalBank

class DashboardPage {
    constructor(page) {
        this.page = page;

        // Header
        this.headerUserName = page.getByTestId('header-user-name');
        this.logoutButton = page.getByTestId('btn-logout');

        // Navigation
        this.tabDashboard = page.getByTestId('tab-dashboard');
        this.tabTransfer = page.getByTestId('tab-transfer');
        this.tabBills = page.getByTestId('tab-bills');
        this.tabSecurity = page.getByTestId('tab-security');

        // Comptes
        this.balanceCards = page.getByTestId('balance-cards');

        // Transactions
        this.transactionList = page.getByTestId('transaction-list');
    }

    // Récupère la carte d'un compte par son ID
    getAccountCard(accountId) {
        return this.page.getByTestId(`account-card-${accountId}`);
    }

    // Récupère le solde d'un compte par son ID
    getAccountBalance(accountId) {
        return this.page.getByTestId(`balance-${accountId}`);
    }

    // Récupère une transaction par son ID
    getTransaction(transactionId) {
        return this.page.getByTestId(`transaction-${transactionId}`);
    }

    // Navigation vers un onglet
    async goToTransfer() {
        await this.tabTransfer.click();
    }

    async goToBills() {
        await this.tabBills.click();
    }

    async goToSecurity() {
        await this.tabSecurity.click();
    }

    // Déconnexion
    async logout() {
        await this.logoutButton.click();
    }

    // Sélectionne un compte
    async selectAccount(accountId) {
        await this.getAccountCard(accountId).click();
    }
}

module.exports = { DashboardPage };