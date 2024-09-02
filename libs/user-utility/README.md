# User Utility

**User Utility** é uma biblioteca para o gerenciamento de usuários em uma aplicação Node.js. A biblioteca utiliza RabbitMQ para publicar e consumir eventos de registro de usuários, e PostgreSQL para armazenar, consultar e manipular dados de usuários.

## Funcionalidades

- **Gerenciamento de Usuários**: Criação, atualização, exclusão e consulta de usuários no banco de dados PostgreSQL.
- **Publicação de Eventos de Registro**: Publica eventos quando novos usuários são registrados.
- **Consumo de Eventos**: Consome eventos para inserir usuários no banco de dados a partir de mensagens.

## Pré-requisitos

- **Node.js**
- **npm** (Node Package Manager)
- **PostgreSQL**
- **RabbitMQ**
- Bibliotecas:
    - `amqplib`
    - `pg`
    - `@intelij-ultimate/postgres-utility`
    - `@intelij-ultimate/rabbitmq-utility`
- link para os módulos:
    - [postgres-utility](https://www.npmjs.com/package/@intelij-ultimate/postgres-utility)
    - [rabbitmq-utility](https://www.npmjs.com/package/@intelij-ultimate/rabbitmq-utility)

