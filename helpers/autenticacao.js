import request from 'supertest';
import 'dotenv/config';
import postLogin from '../fixtures/postLogin.json' assert { type: 'json' };  // Importa os dados de login do arquivo JSON

export const obterToken = async (usuario, senha) => { 
    const bodyLogin = {...postLogin }; // Usa os dados do arquivo JSON
    // Função para obter o token de autenticação
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

    return respostaLogin.body.token; // Retorna o token obtido

}