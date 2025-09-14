// Custom Cypress command to select a random applicant type (Employee or Spouse)
Cypress.Commands.add("selectRandomOption", () => {
  const options = ["#option-item-0", "#option-item-1"];
  const randomIndex = Math.floor(Math.random() * options.length);
  const selected = randomIndex === 0 ? "Employee" : "Spouse";

  cy.get(options[randomIndex]).click();
  return cy.wrap(selected);
});

// Custom Cypress command to select random products (checkboxes) ensuring they are not the same
Cypress.Commands.add("selectRandomProducts", (applicantType) => {
  const employeeProducts = [
    "#checkbox-item-0",
    "#checkbox-item-1",
    "#checkbox-item-2",
    "#checkbox-item-3",
  ];
  const spouseProducts = ["#checkbox-item-0", "#checkbox-item-1"];

  const products =
    applicantType === "Employee" ? employeeProducts : spouseProducts;

  if (products.length <= 2) {
    // Spouse: pick one randomly
    const idx = Math.floor(Math.random() * products.length);
    cy.get(products[idx]).click();
    return cy.wrap([products[idx]]);
  } else {
    // Employee: pick two unique random ones
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
