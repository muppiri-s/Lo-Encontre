context("Website Test" , () => {
    
    const host = 'http://3.21.166.219:3000/home'
    const port = '3000'

    let componentStrings = {}

   
    before(() => {
        // visit URL
        cy.visitUrl(host, port)
        // load fixtures
        cy.fixture('componentStrings.json').then(response => componentStrings = response)

    })
})