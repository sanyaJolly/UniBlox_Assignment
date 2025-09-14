describe("Insure Onboarding Flow", () => {
  it("should take user to welcome screen", () => {
    cy.visit("https://d28j9pfwubj8q5.cloudfront.net/5U5PU/4oKeg/welcome");
    cy.get(".text-2xl.text-center.font-medium")
      .should("be.visible")
      .and("contain.text", "Welcome");
    cy.get("#page-description").should("be.visible");
    cy.get("#btn-next").should("be.visible").and("contain.text", "Get Started");
    cy.get("#btn-next").click();
    cy.wait(7000);

    // should be able to select an applicant type
    cy.get("#page-title")
      .should("be.visible")
      .and("contain.text", "Applicant type");
    cy.get(".inline-block").trigger("mouseover");
    cy.contains("Please choose the Employee or Spouse").should("be.visible");
    cy.selectRandomApplicantType();

    // should be able to select various products
    cy.wait(7000);
    cy.get("#page-title")
      .should("be.visible")
      .and("contain.text", "Select product(s)");
    cy.selectRandomProducts();
    cy.get("#btn-next").should("be.visible").and("contain.text", "Next");
    cy.get("#btn-next").click();

    //should be able to fill name
    cy.wait(7000);
    cy.get("#page-title").should("be.visible").and("contain.text", "Your name");
    const name = cy.generateRandomString(5);
    cy.get("#first_name").type(name);
    cy.get("#last_name").type(name);
  });
});
