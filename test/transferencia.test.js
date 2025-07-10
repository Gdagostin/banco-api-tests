import request from 'supertest'; // Importa a biblioteca supertest para fazer requisições HTTP
import { expect } from 'chai'; // Importa a biblioteca de testes e asserções
import 'dotenv/config'; // Importa as variáveis de ambiente do arquivo .env
import { obterToken } from '../helpers/autenticacao.js'; // Importa a função de autenticação, se necessário
import postTransferencias from '../fixtures/postTransferencias.json' assert { type: 'json' }; // Importa os dados de transferência do arquivo JSON

describe('Transferências', () => {
     let token // Variável para armazenar o token de autenticação

        beforeEach(async () => { // Hook(gancho): Executa antes de cada teste para garantir que o token esteja atualizado
            token = await obterToken('julio.lima', '123456') // Obtém o token de autenticação
        })
    describe('POST /transferencias', () => {

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de 10,00', async () => {

            const bodyTransferencia = {...postTransferencias}; // Usa os dados do arquivo JSON

            const resposta = await request(process.env.BASE_URL) // guardar a URL base origem .env
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
        })
    })
    
    describe('GET /transferencias/{Id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contidos no banco de dados quando o Id for válido', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/2')
                .set('Authorization', `Bearer ${token}`)
                
            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(2)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.valor).to.equal(11) // Verifica se o valor é uma string com duas casas decimais
        })
    })

    describe.only('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)
        

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(5) // Verifica se o array de transferências tem 10 elementos
        })
    })
})