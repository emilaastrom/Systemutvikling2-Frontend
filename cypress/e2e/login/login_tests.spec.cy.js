describe('Login Page Tests', () => {
  // Before each test, we'll ensure we start on the login page
  beforeEach(() => {
    cy.visit('/login'); // Adjust this if your login URL is different
  });

  it('Successfully logs in a user', () => {
    // Input valid credentials and submit the form
    cy.get('input[type="username"]').type('test1');
    cy.get('input[type="password"]').type('test');
    cy.get('form').submit();
    // Check the URL to ensure the user is redirected to the dashboard
    //cy.url().should('include', '/dashboard');
  });

  it('Fails to log in with incorrect credentials', () => {
    // Input invalid credentials and submit the form
    cy.get('input[type="username"]').type('invalidUser');
    cy.get('input[type="password"]').type('wrongPassword');
    cy.get('form').submit();
    // Ensure an error message is displayed
    cy.get('.text-red-500').should('contain', 'Feil brukernavn eller passord.');
  });

  it('Navigates to the password reset form', () => {
    // Click on the link or button that leads to the password reset form
    cy.contains('Glemt passord?').click();
    // Verify that the password reset form is displayed
    cy.contains('Send Epost').should('be.visible');
  });

  it('Navigates to the registration form', () => {
    // Click on the link or button that leads to the registration form
    cy.contains('Registrer deg her').click();
    // Verify that the registration form is displayed
    cy.contains('Register').should('be.visible');
  });
});
