describe('The Login Page', () => {
    beforeEach(() => {
  
      cy.request('POST', '/login/user', { username: 'jack' })
        .its('body')
        .as('currentUser')
    })
  
    it('sets auth cookie when logging in via form submission', function () {
      const { username, password } = this.currentUser
  
      cy.visit('/login')
  
      cy.get('input[name=username]').type(username)
      cy.get('input[name=password]').type(`${password}{enter}`)
  
      cy.url().should('include', '/post_a_deal')
    
      cy.get('nav').should('contain', 'jack')
    })
  })