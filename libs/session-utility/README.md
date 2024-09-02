# Session Utility

**Session Utility** é uma biblioteca projetada para gerenciar sessões de usuários em uma aplicação Node.js, integrando RabbitMQ para eventos de login e logout, e PostgreSQL para armazenar e consultar dados de sessão.

## Funcionalidades

- **Gerenciamento de Sessões**: Criação, validação e exclusão de sessões no banco de dados PostgreSQL.
- **Publicadores e Consumidores**: Uso de RabbitMQ para publicar eventos de login/logout e consumir esses eventos para atualizar o banco de dados.
- **Consultas de Sessão**: Consultas pré-definidas para interagir com os dados de sessão.

## Pré-requisitos

- **Node.js**
- **npm** (Node Package Manager)
- **PostgreSQL**
- **RabbitMQ**
- Bibliotecas:
    - `amqplib`
    - `pg`
    - `uuid`
    - `@intelij-ultimate/postgres-utility`
    - `@intelij-ultimate/rabbitmq-utility`
- link para os módulos:
    - [postgres-utility](https://www.npmjs.com/package/@intelij-ultimate/postgres-utility)
    - [rabbitmq-utility](https://www.npmjs.com/package/@intelij-ultimate/rabbitmq-utility)

