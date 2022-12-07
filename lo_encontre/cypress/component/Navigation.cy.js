import * as React from 'react';

it('visits the app', () => {
  cy.visit('http://localhost:3000/home')

  cy.location().should((loc) => {
    expect(loc.host).to.eq('localhost:3000')
    expect(loc.hostname).to.eq('localhost')
    expect(loc.href).to.eq(
      'http://localhost:3000/home'
    )
    expect(loc.origin).to.eq('http://localhost:3000')
    expect(loc.port).to.eq('3000')
    expect(loc.protocol).to.eq('http:')
  })
});