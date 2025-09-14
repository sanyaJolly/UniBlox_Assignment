import { SELECTORS, TEXT_CONTENT } from '../selectors';
import { TIMING, TEST_DATA } from '../constants';
import { FormHelpers, NavigationHelpers, AddressHelpers } from '../helpers';

export class AddressPage {
  verifyAddressPage() {
    NavigationHelpers.verifyPageTitle(TEXT_CONTENT.address);
  }

  testAddressToggle() {
    cy.get(SELECTORS.address.toggleAutocomplete)
      .should('have.text', "I can't find my address")
      .click();

    cy.get(SELECTORS.address.aptUnit).should('be.visible');
    AddressHelpers.verifyAddressFields();

    cy.get(SELECTORS.address.toggleAutocomplete)
      .should('have.text', 'Try to find my address')
      .click();

    cy.get(SELECTORS.address.aptUnit).should('be.visible');
    cy.get(SELECTORS.address.autocomplete).should('be.visible');
  }

  testAddressValidations() {
    NavigationHelpers.navigateToNextStep(0);

    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.address,
      TEXT_CONTENT.errors.pleaseFillin
    );

    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.authRelease,
      TEXT_CONTENT.errors.checkBoxContinue
    );

    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.consentBusiness,
      TEXT_CONTENT.errors.checkBoxContinue
    );
  }

  testInvalidAddress() {
    AddressHelpers.fillAutocompleteAddress(
      TEST_DATA.invalidAddress.location,
      TEST_DATA.validAddress.aptUnit
    );
    AddressHelpers.checkRequiredBoxes();

    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.address,
      TEXT_CONTENT.errors.notUSAddress
    );
  }

  testManualAddressFlow() {
    AddressHelpers.toggleAddressMode();

    cy.get(SELECTORS.address.street).type(TEST_DATA.validAddress.street);
    NavigationHelpers.navigateToNextStep(0);
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.city,
      TEXT_CONTENT.errors.pleaseFillin
    );

    cy.get(SELECTORS.address.city).type(TEST_DATA.validAddress.city);
    NavigationHelpers.navigateToNextStep(0);
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.state,
      TEXT_CONTENT.errors.pleaseFillin
    );

    cy.get(SELECTORS.address.state).click();
    cy.contains(TEST_DATA.validAddress.state).click();
    NavigationHelpers.navigateToNextStep(0);
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.zipcode,
      TEXT_CONTENT.errors.pleaseFillin
    );

    cy.get(SELECTORS.address.zipcode).type(TEST_DATA.validAddress.zipcode);
    NavigationHelpers.navigateToNextStep();
  }
}