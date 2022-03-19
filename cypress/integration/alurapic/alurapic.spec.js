describe('Login e registro de usuarios alura pic', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com');
    })

    it('verifica mensagens validacao', () => {
        cy.register();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');

    })

    it('verifica mensagens de email invalido', () => {
        cy.register();
        cy.get('input[formcontrolname="email"]').type('teste1')
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');


    })

    it('verifica mensagens de senha com menos de 8 caracteres', () => {
        cy.register();
        cy.get('input[formcontrolname="password"]').type('123')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');


    })

    it('verifica mensagens para utilizar letras minusculas no username', () => {
        cy.register();
        cy.get('input[formcontrolname="userName"]').type('TESTE')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');


    })

    it('verifica mensagens de quantidade de letras para full name', () => {
        cy.register();
        cy.get('input[formcontrolname="fullName"]').type('1')
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');


    })

    it('fazer login de usuario valido', () => {
        cy.login('flavio', '123');
        cy.contains('a', '(Logout)').should('be.visible');

    })

    it('fazer login de usuario invalido', () => {
        cy.login('jonas', '1234');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })

    })


    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {

        it.only(`registra novo usuario ${usuario.userName} `, () => {
            cy.register();
            cy.get('input[formcontrolname="email"]').type(usuario.email);
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuario.userName);
            cy.get('input[formcontrolname="password"]').type(usuario.password);
            cy.contains('button', 'Register').click();
        })
    });
    



})