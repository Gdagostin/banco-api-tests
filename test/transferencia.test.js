import request from 'supertest'; // Importa a biblioteca supertest para fazer requisições HTTP
import { expect } from 'chai'; // Importa a biblioteca de testes e asserções
import 'dotenv/config'; // Importa as variáveis de ambiente do arquivo .env
import { obterToken } from '../helpers/autenticacao.js'; // Importa a função de autenticação, se necessário
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: 'json' }; // Importa os dados de transferência do arquivo JSON

describe.only('Transferências', () => {
    describe('POST /transferencias', () => {

        let token // Variável para armazenar o token de autenticação

        beforeEach(async () => { // Hook(gancho): Executa antes de cada teste para garantir que o token esteja atualizado
            token = await obterToken('julio.lima', '123456') // Obtém o token de autenticação
        })
        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de 10,00', async () => {

            const bodyTransferencia = {...postTransferencias}; // Usa os dados do arquivo JSON

            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`) // Adiciona o token no header Authorization
                .send(bodyTransferencia)

            expect(resposta.status).to.equal(201);
            console.log(resposta.body);
        })
        it('Deve retornar sucesso com 422 quando o valor da transferência for abaixo de 10,00', async () => {

            const bodyTransferencia = {...postTransferencias}
            bodyTransferencia.valor = 9; // Modifica o valor para abaixo de 10,00

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`) // Adiciona o token no header Authorization
                .send(bodyTransferencia)

            expect(resposta.status).to.equal(422);

            //     .get('/users')
            //     .set('Accept', 'application/json')
            // expect(response.headers["Content-Type"]).toMatch(/json/);
            // expect(response.status).toEqual(200);
            // expect(response.body.email).toEqual('foo@bar.com');
        })
    })
})