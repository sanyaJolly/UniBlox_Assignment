import { SELECTORS, TEXT_CONTENT } from './selectors';
import { TIMING } from './constants';

// Form validation helpers
export const FormHelpers = {
  validateRequiredField(selector, errorSelector, errorMessage = TEXT_CONTENT.errors.pleaseFillin) {
    cy.get(SELECTORS.nextButton).click();
    cy.get(errorSelector)
      .should('be.visible')
      .and('contain.text', errorMessage);
  },

  validateEmailFormat(inputSelector, errorSelector) {
    cy.get(inputSelector).type('abc');
    cy.get(errorSelector)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.errors.validEmail);
  },

  validatePhoneFormat(inputSelector, errorSelector, invalidPhone = 'asdfg') {
    cy.get(inputSelector).type(invalidPhone);
    cy.get(SELECTORS.nextButton).click();
    cy.get(errorSelector)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.errors.validNumber);
  },

  validateNumericInput(inputSelector, invalidValue = 'abcd') {
    cy.get(inputSelector).type(invalidValue);
    cy.get(inputSelector).should('have.value', '');
  },

  checkErrorMessage(errorSelector, expectedMessage) {
    cy.get(errorSelector)
      .should('be.visible')
      .and('contain.text', expectedMessage);
  },
};

// Navigation helpers
export const NavigationHelpers = {
  navigateToNextStep(waitTime = TIMING.short) {
    cy.get(SELECTORS.nextButton).click();
    if (waitTime > 0) {
      cy.wait(waitTime);
    }
  },

  waitForPageLoad(title, waitTime = TIMING.medium) {
    cy.wait(waitTime);
    cy.get(SELECTORS.pageTitle)
      .should('be.visible')
      .and('contain.text', title);
  },

  verifyPageTitle(expectedTitle) {
    cy.get(SELECTORS.pageTitle)
      .should('be.visible')
      .and('contain.text', expectedTitle);
  },

  verifyPageDescription(expectedText) {
    cy.get(SELECTORS.pageDescription)
      .should('be.visible')
      .and('contain.text', expectedText);
  },
};

// Data generation helpers
export const DataHelpers = {
  generateEmail(prefix = null, domain = '@gmail.com') {
    const randomString = prefix || cy.generateRandomString(3);
    return `${randomString}${domain}`;
  },

  generatePhoneNumber() {
    return '(919) 711-2345'; // Using consistent test phone number
  },

  fillPersonalInfo(firstName, lastName) {
    cy.get(SELECTORS.firstName).type(firstName);
    cy.get(SELECTORS.lastName).type(lastName);
  },
};

// Slider interaction helpers
export const SliderHelpers = {
  dragSlider(position = { clientX: 1000 }) {
    cy.get(SELECTORS.sliderHandle)
      .first()
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', position)
      .trigger('mouseup');
  },
};

// Address form helpers
export const AddressHelpers = {
  toggleAddressMode() {
    cy.get(SELECTORS.address.toggleAutocomplete).click();
  },

  fillManualAddress(addressData) {
    cy.get(SELECTORS.address.street).type(addressData.street);
    cy.get(SELECTORS.address.city).type(addressData.city);
    cy.get(SELECTORS.address.state).click();
    cy.contains(addressData.state).click();
    cy.get(SELECTORS.address.zipcode).type(addressData.zipcode);
  },

  fillAutocompleteAddress(location, aptUnit = '') {
    cy.get(SELECTORS.address.autocomplete).type(location);
    if (aptUnit) {
      cy.get(SELECTORS.address.aptUnit).type(aptUnit);
    }
  },

  checkRequiredBoxes() {
    cy.get(SELECTORS.address.authReleaseCheckbox).click();
    cy.get(SELECTORS.address.consentBusinessCheckbox).click();
  },

  verifyAddressFields() {
    cy.get(SELECTORS.address.street).should('be.visible');
    cy.get(SELECTORS.address.city).should('be.visible');
    cy.get(SELECTORS.address.state).should('be.visible');
    cy.get(SELECTORS.address.zipcode).should('be.visible');
  },
};

// Medical questions helpers
export const MedicalHelpers = {
  selectRadioOption(option) {
    cy.get(option).click();
  },

  selectCheckboxOption(option) {
    cy.get(option).click();
  },

  fillMedicalInput(text) {
    cy.get(SELECTORS.medicalInput).type(text);
  },

  completeMedicalDetail(input) {
    FormHelpers.validateRequiredField(
      SELECTORS.medicalInput,
      SELECTORS.errorMessages.answer
    );
    this.fillMedicalInput(input);
    NavigationHelpers.navigateToNextStep(TIMING.long);
  },
};