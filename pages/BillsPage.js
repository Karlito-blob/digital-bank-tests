// pages/BillsPage.js
// Page Object — Page des factures DigitalBank

const { expect } = require('@playwright/test');

class BillsPage {
    constructor(page) {
        this.page = page;

        // Listes
        this.pendingBills = page.getByTestId('pending-bills');

        // Messages
        this.successMessage = page.getByTestId('bill-success');

        // Modal confirmation paiement
        this.modalConfirmPayment = page.getByTestId('modal-confirm-payment');
        this.btnConfirmPayment = page.getByTestId('btn-confirm-payment');
        this.btnCancelPayment = page.getByTestId('btn-cancel-payment');
    }

    // Récupère une facture par son ID
    getBill(billId) {
        return this.page.getByTestId(`bill-${billId}`);
    }

    // Récupère le bouton payer d'une facture
    getPayButton(billId) {
        return this.page.getByTestId(`btn-pay-bill-${billId}`);
    }

    // Récupère une facture payée
    getPaidBill(billId) {
        return this.page.getByTestId(`bill-paid-${billId}`);
    }

    // Paye une facture complète avec confirmation
    async payBill(billId) {
        await this.getPayButton(billId).click();
        await expect(this.modalConfirmPayment).toBeVisible();
        await this.btnConfirmPayment.click();
    }

    // Annule un paiement depuis la modale
    async cancelPayment(billId) {
        await this.getPayButton(billId).click();
        await this.btnCancelPayment.click();
    }
}

module.exports = { BillsPage };