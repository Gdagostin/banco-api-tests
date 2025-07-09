import request from 'supertest';
import { expect } from 'chai';
import 'dotenv/config';
import postLogin from '../fixtures/postLogin.json' assert { type: 'json' };  // Importa os dados de login do arquivo JSON

describe('Login', () => {
    describe('POST /login', () => {
        it('deve retornar 200 com token em string quando usar credenciais válidas', async () => {

            const bodyLogin = {...postLogin }; // Usa os dados do arquivo JSON

            const resposta = await request(process.env.BASE_URL) // guardar a URL base origem .env
                .post('/login') // especificar o endpoint
                .set('Content-Type', 'application/json') // definir o tipo de conteúdo
                // enviar as credenciais de login
                .send(bodyLogin)

            expect(resposta.status).to.equal(200);  // verificar se o status é 200
            expect(resposta.body.token).to.be.a('string'); // verificar se o token é uma string
        })
    })
})