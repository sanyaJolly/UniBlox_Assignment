import { SELECTORS, TEXT_CONTENT } from '../selectors';
import { TIMING } from '../constants';

export class WelcomePage {
  visit(url) {
    cy.visit(url);
  }

  verifyWelcomeElements() {
    cy.get(SELECTORS.welcomeTitle)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.welcome);

    cy.get(SELECTORS.pageDescription).should('be.visible');

    cy.get(SELECTORS.nextButton)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.getStarted);
  }

  clickGetStarted() {
    cy.get(SELECTORS.nextButton).click();
    cy.wait(TIMING.extended);
  }
}