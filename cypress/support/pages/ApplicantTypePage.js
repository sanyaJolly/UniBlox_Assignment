import { SELECTORS, TEXT_CONTENT } from '../selectors';
import { TIMING, APPLICANT_TYPES } from '../constants';

export class ApplicantTypePage {
  verifyPageElements() {
    cy.get(SELECTORS.pageTitle)
      .should('be.visible')
      .and('contain.text', TEXT_CONTENT.applicantType);

    cy.get(SELECTORS.tooltipTrigger).trigger('mouseover');
    cy.contains(TEXT_CONTENT.tooltipText).should('be.visible');
  }

  selectApplicantTypeAndProducts() {
    cy.selectRandomOption().then((applicantType) => {
      cy.wrap(applicantType).as('applicantType');

      cy.wait(TIMING.short);
      cy.selectRandomProducts(applicantType).then((products) => {
        cy.wrap(products).as('selectedProducts');
      });
    });
  }

  clickNext() {
    cy.get(SELECTORS.nextButton).click();
  }

  handleProductSelection(applicantType, products) {
    const has0 = products.includes(SELECTORS.checkboxItems.item0);
    const has1 = products.includes(SELECTORS.checkboxItems.item1);
    const has2 = products.includes(SELECTORS.checkboxItems.item2);
    const has3 = products.includes(SELECTORS.checkboxItems.item3);

    if (applicantType === APPLICANT_TYPES.employee) {
      this.handleEmployeeProducts(has0, has1, has2, has3);
    } else {
      this.handleSpouseProducts(has0, has1);
    }
  }

  handleEmployeeProducts(has0, has1, has2, has3) {
    if ((has0 && has1) || (has0 && has2)) {
      cy.wait(TIMING.veryLong);
      cy.get(SELECTORS.pageTitle).should(
        'contain.text',
        TEXT_CONTENT.coverage.supplementalLife
      );
      cy.get(SELECTORS.sliderHandle)
        .first()
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 1000 })
        .trigger('mouseup');
    } else if ((has0 && has3) || (has1 && has3) || (has2 && has3)) {
      cy.wait(TIMING.long);
      cy.get(SELECTORS.pageTitle).should(
        'contain.text',
        TEXT_CONTENT.coverage.basicLife
      );
      cy.get(SELECTORS.sliderHandle)
        .first()
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: 1000 })
        .trigger('mouseup');
    } else if (has1 && has1) {
      cy.wait(TIMING.long);
      cy.get(SELECTORS.pageTitle).should('contain.text', TEXT_CONTENT.dateOfBirth);
    }
  }

  handleSpouseProducts(has0, has1) {
    if (has0) {
      cy.wait(TIMING.long);
      cy.get(SELECTORS.pageTitle).should(
        'contain.text',
        TEXT_CONTENT.coverage.supplementalLife
      );
    } else if (has1) {
      cy.wait(TIMING.long);
      cy.get(SELECTORS.pageTitle).should(
        'contain.text',
        TEXT_CONTENT.coverage.basicLife
      );
    }
  }
}