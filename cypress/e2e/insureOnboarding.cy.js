import { generateRandomString } from "../support/utils";

describe("Insure Onboarding Flow", () => {
  it("should take user to welcome screen", () => {
    cy.visit("https://d28j9pfwubj8q5.cloudfront.net/5U5PU/4oKeg/welcome");
    cy.get(".text-2xl.text-center.font-medium")
      .should("be.visible")
      .and("contain.text", "Welcome");
    cy.get("#page-description").should("be.visible");
    cy.get("#btn-next").should("be.visible").and("contain.text", "Get Started");
    cy.get("#btn-next").click();
    cy.wait(10000);

    // should be able to select an applicant type as well as products accordingly
    cy.get("#page-title")
      .should("be.visible")
      .and("contain.text", "Applicant type");
    cy.get(".inline-block").trigger("mouseover");
    cy.contains("Please choose the Employee or Spouse").should("be.visible");
    cy.selectRandomApplicantType().then((applicantType) => {
      cy.wrap(applicantType).as("applicantType");
      cy.wait(5000);
      cy.selectRandomProducts(applicantType);
    });
    cy.get("#btn-next").click();

    //should be able to fill name
    cy.wait(5000);
    cy.get("#page-title").should("be.visible").and("contain.text", "Your name");
    // should check error if nothing is filled in name fields
    cy.get("#btn-next").should("be.visible").and("contain.text", "Next");
    cy.get("#btn-next").click();
    cy.get("#error-message-first-name")
      .should("be.visible")
      .and("contain.text", "Please fill this in");
    cy.get("#error-message-last-name")
      .should("be.visible")
      .and("contain.text", "Please fill this in");

    // should check error message on last name field only
    cy.get("#first_name").type(generateRandomString(4));
    cy.get("#btn-next").click();
    cy.get("#error-message-last-name")
      .should("be.visible")
      .and("contain.text", "Please fill this in");

    //should redirect to email field when full name is filled
    cy.get("#last_name").type(generateRandomString(5));
    cy.get("#btn-next").click();
    cy.wait(5000);
    cy.get("#page-title").should("be.visible").and("contain.text", "Email");

    // should throw error if email isn't filled
    cy.get("#btn-next").click();
    cy.get("#error-message-answer")
      .should("be.visible")
      .and("contain.text", "Please fill this in");

    // should throw error if wrong email is filled
    cy.get("#email-input").type("abc");
    cy.get("#error-message-answer")
      .should("be.visible")
      .and("contain.text", "Please enter a valid email");

    //should redirect to nnual salary when valid email is filled
    cy.get("#email-input").type(`${generateRandomString(3)}@gmail.com`);
    cy.get("#btn-next").click();

    cy.get("@applicantType").then((applicantType) => {
      if (applicantType === "Employee") {
        cy.get("#page-title", { timeout: 5000 })
          .should("be.visible")
          .and("contain.text", "Annual Salary");

        // error if nothing entered
        cy.get("#btn-next").click();
        cy.get("#error-message-answer")
          .should("be.visible")
          .and("contain.text", "Please fill this in");

        // try typing characters (should not get typed into the field)
        cy.get("#input-number").type("abcd");
        cy.get("#input-number").should("have.value", "");

        // enter less than 4 digits -> error
        cy.get("#input-number").type("123");
        cy.get("#btn-next").click();
        cy.get("#error-message-answer")
          .should("be.visible")
          .and("contain.text", "Please enter full year salary");

        // enter valid salary (>=4 digits)
        cy.get("#input-number").clear().type("5000");
      } else {
        cy.get("#page-title", { timeout: 5000 })
          .should("be.visible")
          .and("contain.text", "Employee name");
      }
    });

    cy.get("#btn-next").click();
  });
});
