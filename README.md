
### Integrantes:
```
Eduardo Lucas Felippa               20.01913-0
Felipe Rodrigues Peixoto da Silva   21.00127-8
João Pedro Soares dos Santos        21.00410-2
Kaiven Yang Su                      20.02146-0
Nathan Zanoni da Hora               21.01208-3
```

# Sistema Geral de Classificação
Um sistema voltado para classificação de imagens que poderão, em seguida, ser utilizadas para alimentar o treinamento de uma inteligência artificial. Com uma implementação utilizando arquitetura de microsserviços e o RabbitMQ para mensageria, o sistema é robusto e o funcionamento de seus módulos é, em geral, independente. A aplicação permite o cadastro e login de vários usuários e administradores. Possui uma interface (para administradores) para selecionar fotos e fazer upload, sendo os arquivos salvos no backend. Então, os vários usuários podem acessar o sistema em paralelo e realizar as classificações, que são armazenadas em um banco de dados Postgres. Por fim, uma interface de validação permite que os administradores examinem todas classificações armazenadas.

## Passo a Passo para Execução

### Clone o Repositório

Abra o terminal e execute o seguinte comando para clonar o repositório do projeto:

```bash
git clone https://github.com/4-ANO-COMP-IMT/IntelliJIDEAUltimate.git
```
### Execução do Back-end
Crie os arquivos .env em cada mss, copiando do .env.example

Acesse a pasta do back-end (após entrar na pasta clonada do projeto):
```bash
cd ./mss
```
Dentro dessa pasta, acesse cada um dos 4 serviços: AuthService, ClassificationService, ImageService e RegisterUserService e execute o seguinte comando, em cada um, para baixar as dependências:
```bash
npm i
```

Certifique-se de que o Docker Engine esteja em execução.
Para iniciar todos microsserviços, execute na raiz do diretório do projeto:
```bash
docker-compose -f .\docker-compose.yaml up --build
```

### 4. Execução do Front-end
Acesse a pasta do front-end (executar na raiz do projeto):
```bash
cd ./apps/frontend-temp
```
Para baixar as dependências, use o comando:
```bash
npm i
```
Inicie o front-end com o comando:
```bash
npm run start
```
Em um navegador, abra o url da aplicação:
[http://localhost:3010/](http://localhost:3010/)