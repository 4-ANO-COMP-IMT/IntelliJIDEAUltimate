
### Integrantes:
```
Eduardo Lucas Felippa               20.01913-0
Felipe Rodrigues Peixoto da Silva   21.00127-8
João Pedro Soares dos Santos        21.00410-2
Kaiven Yang Su                      20.02146-0
Nathan Zanoni da Hora               21.01208-3
```

# Sistema Geral de Classificação
Um sistema voltado para classificação de imagens que poderão, em seguida, ser utilizadas para alimentar o treinamento de uma inteligência artificial. Com uma implementação utilizando arquitetura de microsserviços e o RabbitMQ para mensageria, o sistema é robusto e o funcionamento de seus módulos é, em geral, independente.

Além do contêiner com o RabbitMQ, para cada microsserviço há um contêiner docker contendo a aplicação e outro com seu banco de dados postgres, sendo todos orquestrados com Kubernetes. O sistema usa "persistent volumes" para manter os dados salvos mesmo após eventuais remoções de contêineres.

A aplicação permite o cadastro e login de vários usuários e administradores. Possui uma interface (para administradores) para selecionar fotos e fazer upload, sendo os arquivos salvos no backend. Então, os vários usuários podem acessar o sistema em paralelo e realizar as classificações, que são armazenadas em um banco de dados Postgres. Por fim, uma interface de validação permite que os administradores examinem todas classificações armazenadas.

## Passo a Passo para Execução

### Clone o Repositório

Abra o terminal e execute o seguinte comando para clonar o repositório do projeto (manter o nome padrão da pasta criada pelo clone):

```bash
git clone https://github.com/4-ANO-COMP-IMT/IntelliJIDEAUltimate.git
```
### Execução do Back-end

Dentro da pasta mss, acesse cada um dos 4 serviços: AuthService, ClassificationService, ImageService e RegisterUserService:
1. Crie os arquivos .env em cada mss, copiando do .env.example
2. Colocar o Docker Desktop em execução
3. Abrir um terminal no diretorio IntelliJIDEAUltimate
4. Executar ```docker compose build``` para criar as imagens docker
5. Executar ```kubectl apply -f k8s-pv-creation.yaml```
6. Executar ```kubectl apply -f k8s.yaml```


### Execução do Front-end
1. Acessar a pasta do front-end (executar na raiz do projeto):
```bash
cd ./apps/frontend-temp
```
2. Baixar dependências:
```bash
npm i
```
3. Inicie o front-end com o comando:
```bash
npm run start
```

* Em um novo terminal (sem fechar o anterior):
1. Acessar a pasta frontend_flutter:
```bash
cd ./frontend_flutter
```

2. Baixar dependências:
```bash
flutter pub get
```

3. Executar: ```flutter run --web-port=59963 ```
    * Seguir o prompt do terminal, selecionando um browser para abrir a aplicação