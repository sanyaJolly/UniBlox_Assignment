// Centralized selectors for the Insure Onboarding Flow
export const SELECTORS = {
  // Common elements
  pageTitle: "#page-title",
  pageDescription: "#page-description",
  nextButton: "#btn-next",
  saveButton: "#btn-save",

  // Welcome screen
  welcomeTitle: "#page-title",

  // Applicant type
  tooltipTrigger: ".inline-block",
  checkboxItems: {
    item0: "#checkbox-item-0",
    item1: "#checkbox-item-1",
    item2: "#checkbox-item-2",
    item3: "#checkbox-item-3",
  },

  // Personal information
  firstName: "#first_name",
  lastName: "#last_name",
  emailInput: "#email-input",

  // Error messages
  errorMessages: {
    firstName: "#error-message-first-name",
    lastName: "#error-message-last-name",
    answer: "#error-message-answer",
    address: "#error-message-address",
    city: "#error-message-city",
    state: "#error-message-state",
    zipcode: "#error-message-zipcode",
    height: "#error-message-height",
    weight: "#error-message-weight",
    authRelease: "#error-message-auth-release",
    consentBusiness: "#error-message-consent-business",
  },

  // Employee specific
  salaryInput: "#input-number",

  // Address form
  address: {
    toggleAutocomplete: "#btn-toggle-autocomplete",
    autocomplete: "#address-input-autocomplete",
    aptUnit: "#address-input-apt-unit",
    street: "#address-input-street",
    city: "#address-input-city",
    state: "#address-input-state",
    zipcode: "#address-input-zipcode",
    authReleaseCheckbox: "#address-check-auth-release-agree",
    consentBusinessCheckbox: "#address-check-consent-business",
  },

  // Date of Birth
  dateInput: "#date-input",

  // Gender
  genderOptions: {
    option0: "#option-item-0",
    option1: "#option-item-1",
  },

  // Phone number
  phoneInput: "#input-phone",

  // Height and Weight
  heightDropdown: "#dropdown-height",
  weightInput: "#input-weight",

  // Life coverage sliders
  sliderHandle: ".rc-slider-handle",

  // Medical questions
  radioButtons: {
    yes: "#radio-yes",
    no: "#radio-no",
  },
  medicalCheckbox: {
    item0: "#checkbox-item-0",
    noneOfAbove: "#checkbox-none-of-above",
  },
  medicalInput: "#input-field",

  // Review application
  reviewTitle: "#page-title",
  questionItems: {
    title0: "#question-item-title-0",
    title1: "#question-item-title-1",
    title2: "#question-item-title-2",
    title3: "#question-item-title-3",
    answer3: "#question-item-answer-3",
  },
  showMoreButton: "#btn-show-more",
  editButtons: {
    question3: "#btn-edit-question-3",
  },
  reviewUnsignedApp: "#btn-review-unsigned-app",
};

// Common text content
export const TEXT_CONTENT = {
  welcome: "Welcome",
  getStarted: "Get Started",
  applicantType: "Applicant type",
  tooltipText: "Please choose the Employee or Spouse",
  yourName: "Your name",
  email: "Email",
  annualSalary: "Annual Salary",
  employeeName: "Employee Name",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  phoneNumber: "Phone Number",
  address: "Address",
  heightWeight: "What is your height and weight?",
  pregnant: "Are you pregnant?",
  reviewApplication: "Review Application",
  applicationSubmitted: "Your application has been submitted.",

  // Error messages
  errors: {
    pleaseFillin: "Please fill this in",
    validEmail: "Please enter a valid email",
    fullYearSalary: "Please enter full year salary",
    valueTooLow: "The value you entered is too low",
    makeSelection: "Please make a selection",
    validNumber: "Please use a valid number",
    checkBoxContinue: "Please check the box to continue",
    notUSAddress:
      "This doesn't look like a US residential address, please check and try again.",
    ageBelow1: "Your age is below 1",
  },

  // Medical conditions
  medicalConditions: {
    heartDisease: "Heart Disease or Disorder",
    detailsYesAnswers: "Details of Yes Answers",
    onset: "Onset",
    duration: "Duration",
    degreeRecovery: "Degree of recovery",
    physicianInfo: "Name/address/phone of attending physician",
  },

  // Coverage types
  coverage: {
    supplementalLife: "Select the amount of Supplemental Life coverage",
    basicLife: "Select the amount of Basic Life coverage",
  },

  // Review section
  review: {
    applicantType: "Applicant Type",
    product: "Product",
    name: "Name",
    email: "Email",
    signApplication: "Sign your application",
  },
};

