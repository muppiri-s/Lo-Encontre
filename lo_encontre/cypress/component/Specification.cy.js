import * as React from 'react';
import  Home from '../../src/components/home'; 

it('Check if the spp displays the correct text', () => {
    cy.mount(<Home />);
    cy.contains(/Search for discounted items/i).should('be.visible');
});
