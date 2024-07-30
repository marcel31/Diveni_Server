describe('Login to get auth token', () => {
    it('should login and get auth token', () => {
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
        })
    })
})