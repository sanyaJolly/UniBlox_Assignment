# Insure Onboarding Flow - Cypress Tests

This repository contains Cypress end-to-end tests for the Insure Onboarding Flow application, refactored using DRY principles and best practices.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Cypress (if not already installed):

   ```bash
   npm run cypress:install
   ```

3. Open Cypress:
   ```bash
   npm run cypress:open
   ```

## Test Structure

The test suite has been refactored to follow good programming principles:

- **Page Object Model**: Organized into separate page classes for better maintainability
- **Centralized Selectors**: All element selectors stored in `cypress/support/selectors.js`
- **Constants & Configuration**: Test data and timing in `cypress/support/constants.js`
- **Helper Functions**: Reusable validation and navigation helpers
- **Custom Commands**: Enhanced Cypress commands for common operations

## Files Overview

```
cypress/
├── e2e/
│   └── insureOnboarding.cy.js          # Main test file (refactored)
├── support/
│   ├── pages/                          # Page Object Model classes
│   ├── selectors.js                    # Centralized selectors
│   ├── constants.js                    # Test data and timing
│   ├── helpers.js                      # Reusable helper functions
│   └── commands.js                     # Custom Cypress commands
```

## Known Issues

During testing, a couple of bugs were identified in the application:

1. **Address Field Validation**: Even when entering a valid US address, the system sometimes displays "Please enter a valid USA location" error.

2. **Slider Functionality**: On the Basic Life Coverage screen, the slider visual doesn't move smoothly, but the underlying value does change. This behavior is flaky and inconsistent.

## Running Tests

Run the tests using Cypress Test Runner:

```bash
npm run cypress:open
```

Select the `insureOnboarding.cy.js` test to execute the full onboarding flow with comprehensive validations.
