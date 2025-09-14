import { SELECTORS, TEXT_CONTENT } from '../selectors';
import { TIMING } from '../constants';
import { NavigationHelpers, DataHelpers } from '../helpers';
import { generateRandomString } from '../utils';

export class ReviewPage {
  verifyReviewPage() {
    cy.wait(TIMING.extended);
    NavigationHelpers.verifyPageTitle(TEXT_CONTENT.reviewApplication);
  }

  verifyReviewItems() {
    cy.get(SELECTORS.questionItems.title0)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.review.applicantType);

    cy.get(SELECTORS.questionItems.title1)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.review.product);

    cy.get(SELECTORS.questionItems.title2)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.review.name);

    cy.get(SELECTORS.showMoreButton).click();

    cy.get(SELECTORS.questionItems.title3)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.review.email);
  }

  testEditFunctionality() {
    cy.get(SELECTORS.editButtons.question3).click();
    cy.wait(TIMING.long);

    const editEmail = DataHelpers.generateEmail(generateRandomString(3));
    cy.get(SELECTORS.emailInput).clear().type(editEmail);
    cy.get(SELECTORS.saveButton).click();

    cy.wait(TIMING.long);
    cy.get(SELECTORS.showMoreButton).click();
    cy.get(SELECTORS.questionItems.answer3).contains(editEmail);
  }

  completeSignature() {
    cy.get(SELECTORS.reviewUnsignedApp).scrollIntoView();

    cy.get(SELECTORS.firstName).type(generateRandomString(4));
    cy.get(SELECTORS.lastName).type(generateRandomString(4));
    cy.contains(TEXT_CONTENT.review.signApplication).click();
  }

  verifySubmission() {
    cy.wait(TIMING.extended);
    NavigationHelpers.verifyPageTitle(TEXT_CONTENT.applicationSubmitted);
  }
}