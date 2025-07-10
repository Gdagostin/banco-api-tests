# 🏦 Banco API Tests

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![ES Modules](https://img.shields.io/badge/ES%20Modules-Yes-brightgreen.svg)](https://nodejs.org/api/esm.html)
[![Test Framework](https://img.shields.io/badge/Test%20Framework-Mocha-red.svg)](https://mochajs.org/)
[![Assertion Library](https://img.shields.io/badge/Assertion%20Library-Chai-orange.svg)](https://chaijs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 📋 Descrição

Este projeto contém testes automatizados para uma API bancária, desenvolvido com as melhores práticas de teste de API. Os testes cobrem funcionalidades essenciais como autenticação, transferências e consultas de dados.

## 🚀 Funcionalidades Testadas

### 🔐 Autenticação (Login)
- ✅ Login com credenciais válidas
- ✅ Validação de token JWT
- ✅ Retorno de status 200 com token válido

### 💸 Transferências
- ✅ Transferência com valor acima do limite mínimo (≥ R$ 10,00)
- ✅ Validação de erro para valores abaixo do limite
- ✅ Consulta de transferência por ID
- ✅ Listagem paginada de transferências

## 🛠️ Tecnologias Utilizadas

- **Node.js** (18+) - Runtime JavaScript
- **ES Modules** - Padrão moderno de importação
- **Mocha** - Framework de testes
- **Chai** - Biblioteca de asserções
- **SuperTest** - Testes de API HTTP
- **Mochawesome** - Gerador de relatórios HTML
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Estrutura do Projeto

```
banco-api-tests/
├── 📁 fixtures/               # Dados de teste (JSON)
│   ├── postLogin.json         # Dados para login
│   └── postTransferencias.json # Dados para transferências
├── 📁 helpers/                # Funções auxiliares
│   └── autenticacao.js        # Utilitários de autenticação
├── 📁 test/                   # Arquivos de teste
│   ├── login.test.js          # Testes de login
│   └── transferencia.test.js  # Testes de transferências
├── 📁 mochawesome-report/     # Relatórios de teste (HTML)
├── .env                       # Variáveis de ambiente
├── .gitignore                 # Arquivos ignorados pelo Git
├── package.json               # Configurações do projeto
└── README.md                  # Este arquivo
```

## ⚙️ Pré-requisitos

- **Node.js** versão 18 ou superior
- **npm** ou **yarn**
- API bancária executando localmente

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/Gdagostin/banco-api-tests.git
cd banco-api-tests
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
BASE_URL=http://localhost:3000
```

## 🚀 Como Executar

### Executar todos os testes:
```bash
npm test
```

### Executar testes específicos:
```bash
# Apenas testes de login
npx mocha test/login.test.js

# Apenas testes de transferências
npx mocha test/transferencia.test.js
```

### Executar com relatório detalhado:
```bash
npm test
# O relatório HTML será gerado em: mochawesome-report/mochawesome.html
```

## 📊 Relatórios

Os testes geram relatórios HTML detalhados usando o **Mochawesome**:

- **Localização:** `mochawesome-report/mochawesome.html`
- **Inclui:** Estatísticas, tempo de execução, logs e capturas de tela
- **Formato:** HTML responsivo e interativo

## 🔍 Exemplos de Teste

### Teste de Login
```javascript
it('deve retornar 200 com token em string quando usar credenciais válidas', async () => {
    const resposta = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)
    
    expect(resposta.status).to.equal(200);
    expect(resposta.body.token).to.be.a('string');
});
```

### Teste de Transferência
```javascript
it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de 10,00', async () => {
    const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyTransferencia)
    
    expect(resposta.status).to.equal(201);
});
```

## 📋 Cenários de Teste

### 🔐 Login
| Cenário | Entrada | Saída Esperada |
|---------|---------|----------------|
| Credenciais válidas | `username: julio.lima, senha: 123456` | Status 200 + Token JWT |

### 💸 Transferências
| Cenário | Valor | Saída Esperada |
|---------|--------|----------------|
| Transferência válida | R$ 11,00 | Status 201 |
| Valor abaixo do limite | R$ 9,00 | Status 422 |
| Consulta por ID | ID: 2 | Status 200 + Dados |
| Listagem paginada | limit=10 | Status 200 + 10 itens |

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Convenções de Código

- **ES Modules**: Use `import/export` ao invés de `require/module.exports`
- **Async/Await**: Prefira async/await ao invés de Promises
- **Descritivo**: Nomes de testes descritivos e em português
- **Organização**: Agrupe testes relacionados usando `describe()`

## 🐛 Problemas Conhecidos

- ⚠️ **Aviso experimental**: Import de JSON pode gerar warning no Node.js (não afeta funcionamento)
- 🔄 **Dependência da API**: Testes dependem da API estar executando localmente

## 📈 Roadmap

- [ ] Testes de validação de dados
- [ ] Testes de performance
- [ ] Integração com CI/CD
- [ ] Testes de carga
- [ ] Documentação de API com Swagger

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**Seu Nome**
- GitHub: [@Gdagostin](https://github.com/Gdagostin)
- Email: gustavodagostin752@hotmail.com

---

⭐ **Se este projeto foi útil, deixe uma estrela!**
