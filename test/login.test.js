import request from 'supertest';
import { expect } from 'chai';
describe('Login', () => {
    describe('POST /login', () => {
        it('deve retornar 200 com token em string quando usar credenciais válidas', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');

            //     .get('/users')
            //     .set('Accept', 'application/json')
            // expect(response.headers["Content-Type"]).toMatch(/json/);
            // expect(response.status).toEqual(200);
            // expect(response.body.email).toEqual('foo@bar.com');
        })
    })
})