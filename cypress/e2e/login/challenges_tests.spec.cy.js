describe('Access profile page', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="username"]').type('test');
      cy.get('input[type="password"]').type('test');
      cy.get('form').submit();
      cy.url({ timeout: 10000 }).should('include', '/dashboard');
    });
  
    it('Opens up suggestions for new challenges', () => {

      cy.get('#add-challenge-button').click();

      cy.get('div.bg-fuchsia-200').within(() => {
        cy.contains('div', 'Ny utfordring?').should('be.visible');
      });
      cy.contains('button', 'Legg til utfordring')
      .should('be.visible')
      
    });
    
  });
  