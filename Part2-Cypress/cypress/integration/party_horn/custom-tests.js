describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Lab8/Part2-Cypress/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(($el) => {
      expect($el).to.have.value(75);
    });
  });

  it('vol input changes slider', () => {
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#volume-number').then(($el) => {
      expect($el).to.have.value(33);
    });
  });

  it('audio test', () => {
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop('volume',0.33);
    });
  });

  it('party horn radio', () => {
    cy.get('#radio-party-horn').check();
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.attr('src','./assets/media/audio/party-horn.mp3');
    });
    cy.get('#sound-image').then(($el) => {
      expect($el).to.have.attr('src','./assets/media/images/party-horn.svg');
    });
  });

  it('audio image test', () => {
    cy.get('#volume-slider').invoke('val',0).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src',"./assets/media/icons/volume-level-0.svg");
    });
    cy.get('#volume-slider').invoke('val',33).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src',"./assets/media/icons/volume-level-1.svg");
    });
    cy.get('#volume-slider').invoke('val',66).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src',"./assets/media/icons/volume-level-2.svg");
    });
    cy.get('#volume-slider').invoke('val',100).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.attr('src',"./assets/media/icons/volume-level-3.svg");
    });
  });  

  it('honk btn', () => {
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').should('be.disabled');
    cy.get('#volume-number').clear().type('a');
    cy.get('#honk-btn').should('be.disabled');
    cy.get('#volume-number').clear().type('A');
    cy.get('#honk-btn').should('be.disabled');
    cy.get('#volume-number').clear().type('+');
    cy.get('#honk-btn').should('be.disabled');
  });

  it('invalid vols give error', () => {
    cy.get('input:invalid').should('have.length', 0);
    cy.get('#volume-number').clear().type('-1');
    cy.get('#honk-btn').click();
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#volume-number').then(($input) => {
      expect($input[0].validationMessage).to.eq('Value must be greater than or equal to 0.')
    });

    cy.get('#volume-number').clear().type('1000');
    cy.get('#honk-btn').click();
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#volume-number').then(($input) => {
      expect($input[0].validationMessage).to.eq('Value must be less than or equal to 100.')
    });
    
  });  
});
