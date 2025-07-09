import request from 'supertest';
import { expect } from 'chai';
import 'dotenv/config';
describe('Transferências', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de 10,00', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = respostaLogin.body.token // Captura o token retornado no login

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`) // Adiciona o token no header Authorization
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 11,
                    'token': ''
                })
            expect(resposta.status).to.equal(201);
            console.log(resposta.body);
        })
        it('Deve retornar sucesso com 422 quando o valor da transferência for abaixo de 10,00', async () => {
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`) // Adiciona o token no header Authorization
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 9,
                    'token': ''
                })
            expect(resposta.status).to.equal(422);

            //     .get('/users')
            //     .set('Accept', 'application/json')
            // expect(response.headers["Content-Type"]).toMatch(/json/);
            // expect(response.status).toEqual(200);
            // expect(response.body.email).toEqual('foo@bar.com');
        })
    })
})