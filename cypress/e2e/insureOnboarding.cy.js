import { generateRandomString } from "../support/utils";

describe("Insure Onboarding Flow", () => {
  it("should take user through onboarding flow", () => {
    cy.visit("https://d28j9pfwubj8q5.cloudfront.net/5U5PU/4oKeg/welcome");

    // Welcome screen
    cy.get(".text-2xl.text-center.font-medium")
      .should("be.visible")
      .and("contain.text", "Welcome");
    cy.get("#page-description").should("be.visible");
    cy.get("#btn-next").should("be.visible").and("contain.text", "Get Started");
    cy.get("#btn-next").click();
    cy.wait(6000);

    // Applicant type
    cy.get("#page-title")
      .should("be.visible")
      .and("contain.text", "Applicant type");
    cy.get(".inline-block").trigger("mouseover");
    cy.contains("Please choose the Employee or Spouse").should("be.visible");

    cy.selectRandomOption().then((applicantType) => {
      cy.wrap(applicantType).as("applicantType");

      cy.wait(2000);
      cy.selectRandomProducts(applicantType).then((products) => {
        cy.wrap(products).as("selectedProducts");
      });
    });

    cy.get("#btn-next").click();

    // Name
    cy.wait(3000);
    cy.get("#page-title").should("be.visible").and("contain.text", "Your name");
    cy.get("#btn-next").click();
    cy.get("#error-message-first-name")
      .should("be.visible")
      .and("contain.text", "Please fill this in");
    cy.get("#error-message-last-name")
      .should("be.visible")
      .and("contain.text", "Please fill this in");

    cy.get("#first_name").type(generateRandomString(4));
    cy.get("#btn-next").click();
    cy.get("#error-message-last-name")
      .should("be.visible")
      .and("contain.text", "Please fill this in");

    cy.get("#last_name").type(generateRandomString(5));
    cy.get("#btn-next").click();

    // Email
    cy.wait(3000);
    cy.get("#page-title").should("be.visible").and("contain.text", "Email");
    cy.get("#btn-next").click();
    cy.get("#error-message-answer")
      .should("be.visible")
      .and("contain.text", "Please fill this in");

    cy.get("#email-input").type("abc");
    cy.get("#error-message-answer")
      .should("be.visible")
      .and("contain.text", "Please enter a valid email");
    cy.get("#email-input")
      .clear()
      .type(`${generateRandomString(3)}@gmail.com`);
    cy.get("#btn-next").click();

    // Diverging flow
    cy.get("@applicantType").then((applicantType) => {
      if (applicantType === "Employee") {
        cy.get("#page-title").should("contain.text", "Annual Salary");

        // Salary validations
        cy.get("#btn-next").click();
        cy.get("#error-message-answer")
          .should("be.visible")
          .and("contain.text", "Please fill this in");

        cy.get("#input-number").type("abcd");
        cy.get("#input-number").should("have.value", "");

        cy.get("#input-number").type("123");
        cy.get("#btn-next").click();
        cy.get("#error-message-answer").should(
          "contain.text",
          "Please enter full year salary"
        );

        cy.get("#input-number").clear().type("5000");
        cy.get("#btn-next").click();

        // Next depends on products
        cy.get("@selectedProducts").then((products) => {
          const has0 = products.includes("#checkbox-item-0");
          const has1 = products.includes("#checkbox-item-1");
          const has2 = products.includes("#checkbox-item-2");
          const has3 = products.includes("#checkbox-item-3");

          if ((has0 && has1) || (has0 && has2)) {
            cy.wait(5000);
            cy.get("#page-title").should(
              "contain.text",
              "Select the amount of Supplemental Life coverage"
            );
          } else if ((has0 && has3) || (has1 && has3) || (has2 && has3)) {
            cy.wait(5000);
            cy.get("#page-title").should(
              "contain.text",
              "Select the amount of Basic Life coverage"
            );
          } else if (has1 && has1) {
            cy.wait(5000);
            // special case - directly DOB
            cy.get("#page-title").should("contain.text", "Date of Birth");
          }
        });
      } else {
        // Spouse flow
        cy.wait(5000);
        cy.get("#page-title").should("contain.text", "Employee Name");
        cy.get("#first_name").type(generateRandomString(4));
        cy.get("#last_name").type(generateRandomString(5));
        cy.get("#btn-next").click();

        cy.get("@selectedProducts").then((products) => {
          if (products.includes("#checkbox-item-0")) {
            cy.wait(5000);
            cy.get("#page-title").should(
              "contain.text",
              "Select the amount of Supplemental Life coverage"
            );
          } else if (products.includes("#checkbox-item-1")) {
            cy.wait(5000);
            cy.get("#page-title").should(
              "contain.text",
              "Select the amount of Basic Life coverage"
            );
          }
        });
      }
    });

    // DOB screen validations (comes after the above flows)
    cy.wait(6000);
    cy.get("#btn-next").click();

    // Month > 12 → auto to 12
    cy.get("#date-input").clear().type("15");
    cy.get("#date-input").should("have.value", "12");

    // Day > 31 → auto to 31
    cy.get("#date-input").clear().type("11-45");
    cy.get("#date-input").should("have.value", "11 - 31");

    // Wrong Format
    cy.get("#date-input").clear().type("12-31-2222{enter}");
    cy.get("#error-message-answer")
      .should("be.visible")
      .and("contain.text", "Your age is below 1");

    // Valid DOB
    cy.get("#date-input").clear().type("08-15-1990{enter}");

    // Gender
    cy.wait(5000);
    cy.get("#page-title").should("contain.text", "Gender");
    cy.selectRandomOption();
  });
});
