// pages/TransferPage.js
// Page Object — Page des virements DigitalBank

class TransferPage {
    constructor(page) {
        this.page = page;

        // Boutons type de virement
        this.btnInternalTransfer = page.getByTestId('btn-transfer-internal');
        this.btnExternalTransfer = page.getByTestId('btn-transfer-external');

        // Formulaire
        this.selectFromAccount = page.getByTestId('select-from-account');
        this.selectToAccount = page.getByTestId('select-to-account');
        this.inputAmount = page.getByTestId('input-amount');
        this.inputDescription = page.getByTestId('input-description');
        this.btnSubmit = page.getByTestId('btn-submit-transfer');

        // Messages
        this.errorMessage = page.getByTestId('transfer-error');
        this.successMessage = page.getByTestId('transfer-success');

        // Bénéficiaires
        this.beneficiaryList = page.getByTestId('beneficiary-list');
        this.btnAddBeneficiary = page.getByTestId('btn-add-beneficiary');

        // Modal ajout bénéficiaire
        this.modalAddBeneficiary = page.getByTestId('modal-add-beneficiary');
        this.inputBeneficiaryName = page.getByTestId('input-beneficiary-name');
        this.inputBeneficiaryIban = page.getByTestId('input-beneficiary-iban');
        this.btnSaveBeneficiary = page.getByTestId('btn-save-beneficiary');
        this.btnCancelBeneficiary = page.getByTestId('btn-cancel-beneficiary');
    }

    // Sélectionne un bénéficiaire par son ID
    getBeneficiary(beneficiaryId) {
        return this.page.getByTestId(`beneficiary-${beneficiaryId}`);
    }

    // Virement interne
    async doInternalTransfer(amount, description = '') {
        await this.btnInternalTransfer.click();
        // Sélectionne le deuxième compte comme destinataire
        await this.selectToAccount.selectOption({ index: 1 });
        await this.inputAmount.fill(amount);
        if (description) await this.inputDescription.fill(description);
        await this.btnSubmit.click();
    }

    // Virement externe vers bénéficiaire existant
    async doExternalTransfer(beneficiaryId, amount, description = '') {
        await this.btnExternalTransfer.click();
        await this.getBeneficiary(beneficiaryId).click();
        await this.inputAmount.fill(amount);
        if (description) await this.inputDescription.fill(description);
        await this.btnSubmit.click();
    }

    // Ajout d'un nouveau bénéficiaire
    async addBeneficiary(name, iban) {
        await this.btnAddBeneficiary.click();
        await this.inputBeneficiaryName.fill(name);
        await this.inputBeneficiaryIban.fill(iban);
        await this.btnSaveBeneficiary.click();
    }
}

module.exports = { TransferPage };