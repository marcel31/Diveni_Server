describe('CrudSearches', () => {
    //before each test, we need to login and get the auth token
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            body: {
                email: 'b@b.com',
                password: '123456',
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('accessToken')
            Cypress.env('token', response.body.accessToken)
        })
    })

    it('should create a search', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/searches',
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
            body: {
                searches: 1234,
                term: 'test search',
            },
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('searches')
            expect(response.body).to.have.property('term')
            expect(response.body).to.have.property('id')
            expect(response.body.id).to.be.a('number')
            expect(response.body.searches).to.eq(1234)
            expect(response.body.term).to.eq('test search')
            Cypress.env('searchId', response.body.id)
        })
    })

    it('should get the created search', () => {
        cy.request({
            method: 'GET',
            url: `http://localhost:3000/api/v1/searches/${Cypress.env('searchId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('searches')
            expect(response.body).to.have.property('term')
            expect(response.body).to.have.property('id')
            expect(response.body.id).to.be.a('number')
            expect(response.body.searches).to.eq(1234)
            expect(response.body.term).to.eq('test search')
        })
    })

    it('should update the created search', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:3000/api/v1/searches/${Cypress.env('searchId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
            body: {
                searches: 5678,
                term: 'updated search',
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('searches')
            expect(response.body).to.have.property('term')
            expect(response.body).to.have.property('id')
            expect(response.body.id).to.be.a('number')
            expect(response.body.searches).to.eq(5678)
            expect(response.body.term).to.eq('updated search')
        })
    })

    it('should delete the created search', () => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:3000/api/v1/searches/${Cypress.env('searchId')}`,
            headers: {
                Authorization: `Bearer ${Cypress.env('token')}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(204)
        })
    })

    it('should return the page 1 with a limit of 10 searches', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/searches?page=1&limit=10',
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body).to.have.lengthOf(10)

        })
    })
})
