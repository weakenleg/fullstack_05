describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()

      const username = 'john_doe'
      const password = '654123'

      cy.get('#username').type('john_doe')
      cy.get('#password').type('654123')
      cy.contains('Bloglist')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()

      const username = 'john_doe'
      const password = '654123'

      cy.get('#username').type('john_doe')
      cy.get('#password').type('4564')
      cy.contains('Bloglist')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      // Log in user here
      cy.contains('Login').click()

      const username = 'john_doe'
      const password = '654123'

      cy.get('#username').type('john_doe')
      cy.get('#password').type('654123')
      cy.contains('Bloglist')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      const title = 'Test Blog'
      const author = 'John Doe'
      const url = 'https://example.com'

      // Click on the "New Blog" button to open the create blog form
      cy.contains('Create New Blog').click()

      // Fill in the blog details in the form
      cy.get('input[name="title"]').type(title)
      cy.get('input[name="author"]').type(author)
      cy.get('input[name="url"]').type(url)

      // Submit the form to create the blog
      cy.get('#Create').click()

      // Verify that the new blog is added to the list
      cy.contains(title)
      cy.contains(author)
    })
    it('A blog can be created and liked', function() {
      cy.contains('View').click()

      // Click on the "Like" button and verify the number of likes increases
      cy.contains('Like').click()
      cy.contains('Likes: 2')

      // Click on the "Like" button again and verify the number of likes further increases
      cy.contains('Like').click()
      cy.contains('Likes: 3')
    })
    it('A blog can be created and deleted by the user who created it', function() {
      cy.contains('View').click({ force: true })

      // Verify that the delete button is visible and clickable
      cy.contains('Delete').should('be.visible').click()

      // Verify that the blog is no longer in the list
      cy.contains('john_456').should('not.exist')
    })
    describe('first one has most likes', function () {

        
      it('and the first blog has maximum likes', function () {
        cy.contains('View').click()
        cy.contains('2')
        
      })
    })
  })
})


