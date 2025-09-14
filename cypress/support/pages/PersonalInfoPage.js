import { SELECTORS, TEXT_CONTENT } from '../selectors';
import { TIMING, TEST_DATA } from '../constants';
import { FormHelpers, NavigationHelpers, DataHelpers } from '../helpers';
import { generateRandomString } from '../utils';

export class PersonalInfoPage {
  // Name section
  verifyNamePage() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.yourName, TIMING.medium);
  }

  testNameValidations() {
    FormHelpers.validateRequiredField(
      SELECTORS.firstName,
      SELECTORS.errorMessages.firstName
    );

    FormHelpers.validateRequiredField(
      SELECTORS.lastName,
      SELECTORS.errorMessages.lastName
    );

    cy.get(SELECTORS.firstName).type(generateRandomString(4));
    FormHelpers.validateRequiredField(
      SELECTORS.lastName,
      SELECTORS.errorMessages.lastName
    );

    cy.get(SELECTORS.lastName).type(generateRandomString(5));
    NavigationHelpers.navigateToNextStep();
  }

  // Email section
  verifyEmailPage() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.email, TIMING.medium);
  }

  testEmailValidations() {
    FormHelpers.validateRequiredField(
      SELECTORS.emailInput,
      SELECTORS.errorMessages.answer
    );

    FormHelpers.validateEmailFormat(
      SELECTORS.emailInput,
      SELECTORS.errorMessages.answer
    );

    const email = DataHelpers.generateEmail(generateRandomString(3));
    cy.get(SELECTORS.emailInput).clear().type(email);
    NavigationHelpers.navigateToNextStep();
  }

  // Salary section (Employee specific)
  verifySalaryPage() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.annualSalary, TIMING.long);
  }

  testSalaryValidations() {
    FormHelpers.validateRequiredField(
      SELECTORS.salaryInput,
      SELECTORS.errorMessages.answer
    );

    FormHelpers.validateNumericInput(SELECTORS.salaryInput, 'abcd');

    cy.get(SELECTORS.salaryInput).type('123');
    NavigationHelpers.navigateToNextStep(0);
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.fullYearSalary
    );

    cy.get(SELECTORS.salaryInput).clear().type('5000');
    NavigationHelpers.navigateToNextStep();
  }

  // Employee name section (Spouse specific)
  verifyEmployeeNamePage() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.employeeName, TIMING.long);
  }

  fillEmployeeName() {
    cy.get(SELECTORS.firstName).type(generateRandomString(4));
    cy.get(SELECTORS.lastName).type(generateRandomString(5));
    NavigationHelpers.navigateToNextStep();
  }

  // Date of Birth section
  verifyDOBPage() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.dateOfBirth, TIMING.medium * 2);
  }

  testDOBValidations() {
    NavigationHelpers.navigateToNextStep(0);

    // Month > 12 → auto to 12
    cy.get(SELECTORS.dateInput).clear().type('15');
    cy.get(SELECTORS.dateInput).should('have.value', '12');

    // Day > 31 → auto to 31
    cy.get(SELECTORS.dateInput).clear().type('11-45');
    cy.get(SELECTORS.dateInput).should('have.value', '11 - 31');

    // Wrong Format
    cy.get(SELECTORS.dateInput).clear().type('12-31-2222{enter}');
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.ageBelow1
    );

    // Valid DOB
    cy.get(SELECTORS.dateInput).clear().type(TEST_DATA.sampleData.dateOfBirth + '{enter}');
  }

  // Gender section
  verifyGenderPage() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.gender, TIMING.long);
  }

  selectGender() {
    cy.get(SELECTORS.genderOptions.option1).click();
  }

  // Phone number section
  verifyPhonePage() {
    NavigationHelpers.verifyPageTitle(TEXT_CONTENT.phoneNumber);
  }

  testPhoneValidations() {
    FormHelpers.validateRequiredField(
      SELECTORS.phoneInput,
      SELECTORS.errorMessages.answer
    );

    FormHelpers.validatePhoneFormat(
      SELECTORS.phoneInput,
      SELECTORS.errorMessages.answer,
      'asdfg'
    );

    cy.get(SELECTORS.phoneInput).clear().type(TEST_DATA.sampleData.phone);
    NavigationHelpers.navigateToNextStep();
  }
}