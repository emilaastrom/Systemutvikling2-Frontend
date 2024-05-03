describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Successfully inputs user details and submits form', () => {
    cy.get('input[type="username"]').type('test1');
    cy.get('input[type="password"]').type('test');
    cy.get('form').submit();
  });

  it('Fails to log in with incorrect credentials', () => {
    cy.get('input[type="username"]').type('invalidUser');
    cy.get('input[type="password"]').type('wrongPassword');
    cy.get('form').submit();
    cy.get('.text-red-500').should('contain', 'Feil brukernavn eller passord.');
  });

  it('Navigates to the password reset form', () => {
    cy.contains('Glemt passord?').click();
    cy.contains('Send Epost').should('be.visible');
  });

  it('Navigates to the registration form', () => {
    cy.contains('Registrer deg her').click();
    cy.contains('Register').should('be.visible');
  });
});
