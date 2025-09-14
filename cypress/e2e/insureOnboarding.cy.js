import { generateRandomString } from "../support/utils";
import { WelcomePage } from "../support/pages/WelcomePage";
import { ApplicantTypePage } from "../support/pages/ApplicantTypePage";
import { PersonalInfoPage } from "../support/pages/PersonalInfoPage";
import { AddressPage } from "../support/pages/AddressPage";
import { MedicalQuestionsPage } from "../support/pages/MedicalQuestionsPage";
import { ReviewPage } from "../support/pages/ReviewPage";
import { TEST_DATA, APPLICANT_TYPES } from "../support/constants";
import { SliderHelpers } from "../support/helpers";

describe("Insure Onboarding Flow", () => {
  let welcomePage,
    applicantTypePage,
    personalInfoPage,
    addressPage,
    medicalPage,
    reviewPage;

  beforeEach(() => {
    welcomePage = new WelcomePage();
    applicantTypePage = new ApplicantTypePage();
    personalInfoPage = new PersonalInfoPage();
    addressPage = new AddressPage();
    medicalPage = new MedicalQuestionsPage();
    reviewPage = new ReviewPage();
  });

  it("should take user through onboarding flow", () => {
    welcomePage.visit(TEST_DATA.url);
    welcomePage.verifyWelcomeElements();
    welcomePage.clickGetStarted();

    applicantTypePage.verifyPageElements();
    applicantTypePage.selectApplicantTypeAndProducts();
    applicantTypePage.clickNext();

    personalInfoPage.verifyNamePage();
    personalInfoPage.testNameValidations();

    personalInfoPage.verifyEmailPage();
    personalInfoPage.testEmailValidations();

    // Diverging flow
    cy.get("@applicantType").then((applicantType) => {
      if (applicantType === APPLICANT_TYPES.employee) {
        personalInfoPage.verifySalaryPage();
        personalInfoPage.testSalaryValidations();

        // Next depends on products
        cy.get("@selectedProducts").then((products) => {
          applicantTypePage.handleProductSelection(applicantType, products);
        });
      } else {
        // Spouse flow
        personalInfoPage.verifyEmployeeNamePage();
        personalInfoPage.fillEmployeeName();

        cy.get("@selectedProducts").then((products) => {
          applicantTypePage.handleProductSelection(applicantType, products);
        });
      }
    });

    applicantTypePage.clickNext();

    // DOB screen validations (comes after the above flows)
    personalInfoPage.verifyDOBPage();
    personalInfoPage.testDOBValidations();

    // Gender
    personalInfoPage.verifyGenderPage();
    personalInfoPage.selectGender();

    // Phone Number
    personalInfoPage.verifyPhonePage();
    personalInfoPage.testPhoneValidations();

    // Address
    addressPage.verifyAddressPage();
    addressPage.testAddressToggle();
    addressPage.testAddressValidations();
    addressPage.testInvalidAddress();
    addressPage.testManualAddressFlow();

    // Height and Weight
    medicalPage.verifyHeightWeightPage();
    medicalPage.testHeightWeightValidations();

    medicalPage.verifyPregnancyQuestion();
    medicalPage.testPregnancyValidation();

    // Type of Disease
    medicalPage.verifyMedicalConditionsPage();
    medicalPage.testMedicalConditionsValidation();

    // Disease Detail
    medicalPage.completeHeartDiseaseDetails();
    medicalPage.completeAdditionalMedicalQuestions();

    medicalPage.completeHealthcareConsultation();

    medicalPage.completeMedicationQuestion();

    reviewPage.verifyReviewPage();
    reviewPage.verifyReviewItems();
    reviewPage.testEditFunctionality();
    reviewPage.completeSignature();
    reviewPage.verifySubmission();
  });
});
