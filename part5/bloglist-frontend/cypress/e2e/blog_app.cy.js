describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown',  function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()

      cy.contains('blogs')
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('b4dp4ssw0rd')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain','Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.contains('Title').find('input').type('This Is A Fake Blog!')
      cy.contains('Author').find('input').type('Blogger Fake')
      cy.contains('Url').find('input').type('https://www.this-is-not-a-url.not')

      cy.get('#create').click()

      cy.get('#detailsButton')
        .parent()
        .should('contain', 'This Is A Fake Blog')

      cy.get('.success')
        .should('contain','New blog "This Is A Fake Blog!" by Blogger Fake added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('User can like a blog', function() {
      cy.contains('new blog').click()

      cy.contains('Title').find('input').type('This Is A Fake Blog!')
      cy.contains('Author').find('input').type('Blogger Fake')
      cy.contains('Url').find('input').type('https://www.this-is-not-a-url.not')

      cy.get('#create').click()
      cy.get('#detailsButton').click()
      cy.contains( 'likes 0')
      cy.contains('like').click()
      cy.contains( 'likes 1')
    })
  })

})