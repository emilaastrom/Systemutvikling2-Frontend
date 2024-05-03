describe('Access profile page', () => {
    // Before each test, ensure the user is logged in and starts at the dashboard
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
    
      // Check placeholders instead of values if the fields are not pre-populated
      cy.get('#brukernavn').should('have.attr', 'placeholder', 'test');
      cy.get('#fornavn').should('have.attr', 'placeholder', 'test');
      cy.get('#etternavn').should('have.attr', 'placeholder', 'test');
      cy.get('#epost').should('have.attr', 'placeholder', 'dageyiw150@agafx.com');
      cy.get('#telefon').should('have.attr', 'placeholder', '123123');
    
      // Ensure the email field is disabled
      cy.get('#epost').should('be.disabled');
    });
  });

  describe('Profile Page Elements', () => {
    // Before each test, ensure the user is logged in and starts at the dashboard
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="username"]').type('test');
      cy.get('input[type="password"]').type('test');
      cy.get('form').submit();
      cy.url({ timeout: 10000 }).should('include', '/dashboard');
      cy.contains('Konto').click();
    });
  
    it('Displays the correct message when "Konto" is clicked', () => {
      // Click the "Konto" button
      cy.contains('button', 'Konto').click();
      // Verify that the correct text appears on the screen
      cy.contains('Velg bankkonto for sparing').should('be.visible');
    });
  
    it('Displays the correct message when "Målhistorikk" is clicked', () => {
      // Click the "Målhistorikk" button
      cy.contains('button', 'Målhistorikk').click();
      // Verify that the correct text appears on the screen
      cy.contains('Oversikt over tidligere mål').should('be.visible');
    });
  
    it('Displays the correct message when "Preferanser" is clicked', () => {
      // Wait for the button to be visible or for a specific API call to complete if dynamic
      cy.contains('button', 'Preferanser', { timeout: 10000 }).should('be.visible');
    
      // Once confirmed visible, then proceed to click
      cy.contains('button', 'Preferanser').click();
    
      // Verify that the correct text appears on the screen
      cy.contains('Hva slags utfordringer ønsker du?', { timeout: 10000 }).should('be.visible');
    });

    describe('Difficulty Level Button Tests', () => {
      beforeEach(() => {
        // Assuming you start from a specific page that includes these buttons
        cy.visit('/dashboard/profile'); // Replace with the actual URL where the buttons are located
        // Click on "Preferanser" to set up the test environment, if necessary
        cy.contains('button', 'Preferanser').click();
      });
    
      it('Activates "Enkel" difficulty', () => {
        // Click the "Enkel" button
        cy.contains('button', 'Enkel').click();
        // Check if the button becomes a different color to indicate active state
        cy.contains('button', 'Enkel').should('have.css', 'background-color', 'rgb(34, 197, 94)');
      });
    
      it('Activates "Medium" difficulty', () => {
        // Click the "Medium" button
        cy.contains('button', 'Medium').click();
        // Verify that "Medium" remains active or has some active state indication
        cy.contains('button', 'Medium').should('have.css', 'background-color', 'rgb(34, 197, 94)');
      });
    
      it('Activates "Vanskelig" difficulty', () => {
        // Click the "Vanskelig" button
        cy.contains('button', 'Vanskelig').click();
        // Verify a change that indicates "Vanskelig" is now active
        cy.contains('button', 'Vanskelig').should('have.css', 'background-color', 'rgb(34, 197, 94)');
      });
    });


    describe('Dark Mode Toggle Tests', () => {
      beforeEach(() => {
        // Assuming you start from a specific page that includes these buttons
        cy.visit('/dashboard/profile'); // Replace with the actual URL where the buttons are located
        // Click on "Preferanser" to set up the test environment, if necessary
        cy.contains('button', 'Preferanser').click();
        cy.get('[data-testid="darkmodetoggle"]').should('be.visible');
      });
    
      it('Verifies styles for Light Mode', () => {
        // Select the Light Mode option
        cy.contains('span', 'Lys modus').parent().find('input[type="radio"]').check();
        // Check the specific CSS properties that should be visible in Light Mode
        cy.get('#horizontal-list-radio-license').should('have.css', 'background-color', 'rgb(243, 244, 246)'); // Example for bg-gray-100
      });
    
      it('Verifies styles for Dark Mode', () => {
        // Select the Dark Mode option
        cy.contains('span', 'Mørk modus').parent().find('input[type="radio"]').check();
        // Check the specific CSS properties that should be visible in Dark Mode
        cy.get('#horizontal-list-radio-id').should('have.css', 'background-color', 'rgb(75, 85, 99)'); // Example for dark:bg-gray-600
      });
    
    });
    
  });
  