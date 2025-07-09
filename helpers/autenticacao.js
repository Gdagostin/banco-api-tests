export const obterToken = async (usuario, senha) => { 
    // Função para obter o token de autenticação
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario, 
            'senha': senha
        });

    return respostaLogin.body.token; // Retorna o token obtido

};
// import request from 'supertest';
// import 'dotenv/config';

// const autenticar = async (req, res, next) => {
//     // Middleware para autenticação
//     const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do header Authorization

//     if (!token) {
//         return res.status(401).json({ error: 'Token não fornecido' });
//     }

//     try {
//         // Aqui você pode validar o token, por exemplo, usando uma biblioteca JWT
//         // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // req.user = decoded; // Armazena as informações do usuário no request

//         next(); // Chama o próximo middleware ou rota
//     } catch (error) {
//         return res.status(401).json({ error: 'Token inválido' });
//     }
// };