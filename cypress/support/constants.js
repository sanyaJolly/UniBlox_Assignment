// Timing constants to replace hardcoded waits
export const TIMING = {
  short: 2000,
  medium: 3000,
  long: 5000,
  veryLong: 7000,
  extended: 10000,
  max: 15000,
};

// Test data constants
export const TEST_DATA = {
  url: 'https://d28j9pfwubj8q5.cloudfront.net/5U5PU/4oKeg/welcome',

  // Sample data for form fields
  sampleData: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@gmail.com',
    phone: '(919) 711-2345',
    salary: '5000',
    weight: '20',
    height: `5'2"`,
    dateOfBirth: '08-15-1990',
  },

  // Address data
  validAddress: {
    street: 'J-130',
    city: 'huntsville',
    state: 'Alabama',
    zipcode: '35613',
    aptUnit: '12',
  },

  invalidAddress: {
    location: 'New Delhi',
  },

  // Medical responses
  medicalResponses: {
    details: 'NA',
    onset: 'NA',
    duration: '13',
    recovery: '14',
    physician: 'Sanya',
  },

  // Validation limits
  validation: {
    minWeight: 1,
    maxMonth: 12,
    maxDay: 31,
  },

  // Email domains for random generation
  emailDomains: ['@gmail.com', '@yahoo.com', '@outlook.com'],
};

// Product checkbox mapping
export const PRODUCT_CHECKBOXES = {
  supplementalLife: '#checkbox-item-0',
  basicLife: '#checkbox-item-1',
  item2: '#checkbox-item-2',
  item3: '#checkbox-item-3',
};

// Applicant types
export const APPLICANT_TYPES = {
  employee: 'Employee',
  spouse: 'Spouse',
};

// Mouse simulation coordinates for sliders
export const SLIDER_COORDS = {
  dragPosition: { clientX: 1000 },
};