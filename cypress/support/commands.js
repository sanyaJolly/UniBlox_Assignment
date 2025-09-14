// Custom Cypress command to select a random applicant type (Employee or Spouse)
Cypress.Commands.add("selectRandomApplicantType", () => {
  const options = ["#option-item-0", "#option-item-1"];
  const randomIndex = Math.floor(Math.random() * options.length);

  cy.get(options[randomIndex]).click();
});

// Custom Cypress command to select two random products (checkboxes) ensuring they are not the same
Cypress.Commands.add("selectRandomProducts", () => {
  const products = [
    "#checkbox-item-0",
    "#checkbox-item-1",
    "#checkbox-item-2",
    "#checkbox-item-3",
  ];

  let first = Math.floor(Math.random() * products.length);
  let second = Math.floor(Math.random() * products.length);

  while (second === first) {
    second = Math.floor(Math.random() * products.length);
  }

  cy.get(products[first]).click();
  cy.get(products[second]).click();
});

// Custom Cypress command to generate a random alphanumeric string of a given length
// Optionally, extra characters can be provided to include in the character set
Cypress.Commands.add('generateRandomString', (length, extra = '') => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + extra
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return cy.wrap(result)
})
