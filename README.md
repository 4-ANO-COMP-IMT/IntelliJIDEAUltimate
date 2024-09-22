
### Integrantes:

- **Eduardo Lucas Felippa               20.01913-0
- **Felipe Rodrigues Peixoto da Silva   21.00127-8
- **João Pedro Soares dos Santos        21.00410-2
- **Kaiven Yang Su                      20.02146-0
- **Nathan Zanoni da Hora               21.01208-3


# Sistema Geral de Classificação
Um sistema voltado para classificação de imagens que poderão, em seguida, ser utilizadas para alimentar o treinamento de uma inteligência artificial. Com uma implementação utilizando arquitetura de microsserviços e o RabbitMQ para mensageria, o sistema é robusto e o funcionamento de seus módulos é, em geral, independente. A aplicação permite o cadastro e login de vários usuários e administradores. Vários usuários podem acessar o sistema em paralelo e realizar classificações

## Passo a Passo para Execução

### Clone o Repositório

Abra o terminal e execute o seguinte comando para clonar o repositório do projeto:

```bash
git clone <link do repo>
```
### Execução do Back-end
* Criar os arquivos .env em cada mss, copiando do .env.example

Acesse a pasta do back-end:
```bash
cd ./mss
```
Dentro dessa pasta, acesse cada um dos serviços individualmente:

AuthService: 
```bash
cd ./AuthService
```
ClassificationService: 
```bash
cd ./ClassificationService
```
ImageService
```bash
cd ./ImageService
```
RegisterUserService: 
```bash
cd ./RegisterUserService
```
inicie-os com o comando:
```bash
npm i
```

### 4. Execução do Front-end
Acesse a pasta do front-end:
```bash
cd ./apps/frontend-temp
```
Inicie o front-end com o comando:
```bash
npm run start
```

