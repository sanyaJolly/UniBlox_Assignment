import { SELECTORS, TEXT_CONTENT } from '../selectors';
import { TIMING, TEST_DATA } from '../constants';
import { FormHelpers, NavigationHelpers, MedicalHelpers, SliderHelpers } from '../helpers';

export class MedicalQuestionsPage {
  // Height and Weight section
  verifyHeightWeightPage() {
    NavigationHelpers.verifyPageTitle(TEXT_CONTENT.heightWeight);
  }

  testHeightWeightValidations() {
    NavigationHelpers.navigateToNextStep(0);

    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.height,
      TEXT_CONTENT.errors.makeSelection
    );

    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.weight,
      TEXT_CONTENT.errors.pleaseFillin
    );

    cy.get(SELECTORS.heightDropdown).click();
    cy.contains(TEST_DATA.sampleData.height).click();

    cy.get(SELECTORS.weightInput).type('1');
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.weight,
      TEXT_CONTENT.errors.valueTooLow
    );

    cy.get(SELECTORS.weightInput).clear().type(TEST_DATA.sampleData.weight);
    NavigationHelpers.navigateToNextStep();
  }

  // Pregnancy question
  verifyPregnancyQuestion() {
    cy.wait(TIMING.max);
    cy.contains(TEXT_CONTENT.pregnant);
  }

  testPregnancyValidation() {
    NavigationHelpers.navigateToNextStep(0);
    FormHelpers.checkErrorMessage(
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.makeSelection
    );
    cy.contains('No').click();
  }

  // Medical conditions section
  verifyMedicalConditionsPage() {
    cy.wait(TIMING.veryLong);
    NavigationHelpers.verifyPageDescription(
      'In the past ten years, or as indicated below, have you been treated for, or been diagnosed with by a member of the medical profession as having any of the following conditions?'
    );
  }

  testMedicalConditionsValidation() {
    FormHelpers.validateRequiredField(
      SELECTORS.medicalCheckbox.item0,
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.makeSelection
    );

    MedicalHelpers.selectCheckboxOption(SELECTORS.medicalCheckbox.item0);
    NavigationHelpers.navigateToNextStep();
  }

  // Disease detail flow
  completeHeartDiseaseDetails() {
    NavigationHelpers.waitForPageLoad(TEXT_CONTENT.medicalConditions.heartDisease, TIMING.long);
    NavigationHelpers.verifyPageDescription(TEXT_CONTENT.medicalConditions.detailsYesAnswers);
    MedicalHelpers.completeMedicalDetail(TEST_DATA.medicalResponses.details);

    NavigationHelpers.verifyPageDescription(TEXT_CONTENT.medicalConditions.onset);
    MedicalHelpers.completeMedicalDetail(TEST_DATA.medicalResponses.onset);

    NavigationHelpers.verifyPageDescription(TEXT_CONTENT.medicalConditions.duration);
    MedicalHelpers.completeMedicalDetail(TEST_DATA.medicalResponses.duration);

    NavigationHelpers.verifyPageDescription(TEXT_CONTENT.medicalConditions.degreeRecovery);
    MedicalHelpers.completeMedicalDetail(TEST_DATA.medicalResponses.recovery);

    NavigationHelpers.verifyPageDescription(TEXT_CONTENT.medicalConditions.physicianInfo);
    MedicalHelpers.completeMedicalDetail(TEST_DATA.medicalResponses.physician);
  }

  // Additional medical questions
  completeAdditionalMedicalQuestions() {
    cy.wait(TIMING.veryLong);
    NavigationHelpers.verifyPageDescription(
      'In the past ten years, or as indicated below, have you been treated for, or been diagnosed with by a member of the medical profession as having any of the following conditions?'
    );

    FormHelpers.validateRequiredField(
      SELECTORS.medicalCheckbox.noneOfAbove,
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.makeSelection
    );

    MedicalHelpers.selectCheckboxOption(SELECTORS.medicalCheckbox.noneOfAbove);
    NavigationHelpers.navigateToNextStep();
  }

  // Healthcare provider consultation question
  completeHealthcareConsultation() {
    cy.wait(TIMING.veryLong);
    NavigationHelpers.verifyPageDescription(
      'Have you consulted, been advised or been examined by any healthcare provider for any other medical reason within the last ten years, or as previously indicated?'
    );

    FormHelpers.validateRequiredField(
      SELECTORS.radioButtons.no,
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.makeSelection
    );

    MedicalHelpers.selectRadioOption(SELECTORS.radioButtons.no);
  }

  // Medication question
  completeMedicationQuestion() {
    cy.wait(TIMING.veryLong);
    NavigationHelpers.verifyPageDescription('Do you currently take any medications?');

    FormHelpers.validateRequiredField(
      SELECTORS.radioButtons.no,
      SELECTORS.errorMessages.answer,
      TEXT_CONTENT.errors.makeSelection
    );

    MedicalHelpers.selectRadioOption(SELECTORS.radioButtons.no);
  }

  // Slider interaction for coverage selection
  handleCoverageSlider() {
    SliderHelpers.dragSlider();
  }
}