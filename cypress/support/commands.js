import { SELECTORS } from './selectors';
import { APPLICANT_TYPES, PRODUCT_CHECKBOXES, TEST_DATA } from './constants';
import { generateRandomString } from './utils';

// Custom Cypress command to select a random applicant type (Employee or Spouse)
Cypress.Commands.add("selectRandomOption", () => {
  const options = ["#option-item-0", "#option-item-1"];
  const randomIndex = Math.floor(Math.random() * options.length);
  const selected = randomIndex === 0 ? APPLICANT_TYPES.employee : APPLICANT_TYPES.spouse;

  cy.get(options[randomIndex]).click();
  return cy.wrap(selected);
});

// Custom Cypress command to select random products (checkboxes) ensuring they are not the same
Cypress.Commands.add("selectRandomProducts", (applicantType) => {
  const employeeProducts = [
    SELECTORS.checkboxItems.item0,
    SELECTORS.checkboxItems.item1,
    SELECTORS.checkboxItems.item2,
    SELECTORS.checkboxItems.item3,
  ];
  const spouseProducts = [SELECTORS.checkboxItems.item0, SELECTORS.checkboxItems.item1];

  const products = applicantType === APPLICANT_TYPES.employee ? employeeProducts : spouseProducts;

  if (products.length <= 2) {
    const idx = Math.floor(Math.random() * products.length);
    cy.get(products[idx]).click();
    return cy.wrap([products[idx]]);
  } else {
    let first = Math.floor(Math.random() * products.length);
    let second = Math.floor(Math.random() * products.length);
    while (second === first) {
      second = Math.floor(Math.random() * products.length);
    }
    cy.get(products[first]).click();
    cy.get(products[second]).click();
    return cy.wrap([products[first], products[second]]);
  }
});

// Custom command to fill personal information
Cypress.Commands.add("fillPersonalInfo", (data) => {
  const personalData = { ...TEST_DATA.sampleData, ...data };
  cy.get(SELECTORS.firstName).type(personalData.firstName);
  cy.get(SELECTORS.lastName).type(personalData.lastName);
});

// Custom command to complete address form
Cypress.Commands.add("completeAddressForm", (addressData, useManualEntry = false) => {
  if (useManualEntry) {
    cy.get(SELECTORS.address.toggleAutocomplete).click();
    cy.get(SELECTORS.address.street).type(addressData.street);
    cy.get(SELECTORS.address.city).type(addressData.city);
    cy.get(SELECTORS.address.state).click();
    cy.contains(addressData.state).click();
    cy.get(SELECTORS.address.zipcode).type(addressData.zipcode);
  } else {
    cy.get(SELECTORS.address.autocomplete).type(addressData.location);
    if (addressData.aptUnit) {
      cy.get(SELECTORS.address.aptUnit).type(addressData.aptUnit);
    }
  }

  cy.get(SELECTORS.address.authReleaseCheckbox).click();
  cy.get(SELECTORS.address.consentBusinessCheckbox).click();
});

// Custom command to handle medical questions workflow
Cypress.Commands.add("handleMedicalQuestions", (responses) => {
  const medicalData = { ...TEST_DATA.medicalResponses, ...responses };

  Object.values(medicalData).forEach((response) => {
    cy.get(SELECTORS.medicalInput).type(response);
    cy.get(SELECTORS.nextButton).click();
    cy.wait(2000);
  });
});
