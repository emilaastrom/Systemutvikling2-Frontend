describe('Access profile page', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="username"]').type('test');
      cy.get('input[type="password"]').type('test');
      cy.get('form').submit();
      cy.url({ timeout: 10000 }).should('include', '/dashboard');
    });
  
    it('Accesses user profile settings', () => {
      cy.contains('Konto').click();
      cy.url().should('include', '/profile');
      cy.get('#nameBox').should('be.visible');
    
      cy.get('#brukernavn').should('have.attr', 'placeholder', 'test');
      cy.get('#fornavn').should('have.attr', 'placeholder', 'test');
      cy.get('#etternavn').should('have.attr', 'placeholder', 'test');
      cy.get('#telefon').should('have.attr', 'placeholder', '123123');
    
      cy.get('#epost').should('be.disabled');
    });
  });

  describe('Profile Page Elements', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="username"]').type('test');
      cy.get('input[type="password"]').type('test');
      cy.get('form').submit();
      cy.url({ timeout: 10000 }).should('include', '/dashboard');
      cy.contains('Konto').click();
    });
  
    it('Displays the correct message when "Konto" is clicked', () => {
      cy.contains('button', 'Konto').click();
      cy.contains('Velg bankkonto for sparing').should('be.visible');
    });
  
    it('Displays the correct message when "Målhistorikk" is clicked', () => {
      cy.contains('button', 'Målhistorikk').click();
      cy.contains('Oversikt over tidligere mål').should('be.visible');
    });
  
    it('Displays the correct message when "Preferanser" is clicked', () => {
      cy.contains('button', 'Preferanser', { timeout: 10000 }).should('be.visible');
    
      cy.contains('button', 'Preferanser').click();
    
      cy.contains('Hva slags utfordringer ønsker du?', { timeout: 10000 }).should('be.visible');
    });

    describe('Difficulty Level Button Tests', () => {
      beforeEach(() => {
        cy.visit('/dashboard/profile'); 
        cy.contains('button', 'Preferanser').click();
      });
    
      it('Activates "Enkel" difficulty', () => {
        cy.contains('button', 'Enkel').click();
        cy.contains('button', 'Enkel').should('have.css', 'background-color', 'rgb(34, 197, 94)');
      });
    
      it('Activates "Medium" difficulty', () => {
        cy.contains('button', 'Medium').click();
        cy.contains('button', 'Medium').should('have.css', 'background-color', 'rgb(34, 197, 94)');
      });
    
      it('Activates "Vanskelig" difficulty', () => {
        cy.contains('button', 'Vanskelig').click();
        cy.contains('button', 'Vanskelig').should('have.css', 'background-color', 'rgb(34, 197, 94)');
      });
    });


    describe('Dark Mode Toggle Tests', () => {
      beforeEach(() => {
        cy.visit('/dashboard/profile');
        cy.contains('button', 'Preferanser').click();
        cy.get('[data-testid="darkmodetoggle"]').should('be.visible');
      });
    
      it('Verifies styles for Light Mode', () => {
        cy.contains('span', 'Lys modus').parent().find('input[type="radio"]').check();
        cy.get('#horizontal-list-radio-license').should('have.css', 'background-color', 'rgb(243, 244, 246)');
      });
    
      it('Verifies styles for Dark Mode', () => {
        cy.contains('span', 'Mørk modus').parent().find('input[type="radio"]').check();
        cy.get('#horizontal-list-radio-id').should('have.css', 'background-color', 'rgb(75, 85, 99)'); // Example for dark:bg-gray-600
      });
    
    });
    
  });
  