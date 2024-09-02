# Biblioteca de Middleware de Autenticação

Esta biblioteca oferece middlewares para autenticação e autorização em aplicações Node.js usando Express, facilitando a implementação de controles de acesso baseados em tokens.

## Funcionalidades

- **authMiddleware**: Middleware de autenticação que valida a presença, validade e expiração do token de sessão.
- **adminMiddleware**: Middleware de autorização que verifica se o usuário autenticado possui permissões administrativas.

## Pré-requisitos

- **Node.js**
- **npm** (Node Package Manager)
- Bibliotecas:
    - `express`
    - `@intelij-ultimate/session-utility`
    - `@intelij-ultimate/user-utility`
- link para os módulos:
    - [session-utility](https://www.npmjs.com/package/@intelij-ultimate/session-utility)
    - [user-utility](https://www.npmjs.com/package/@intelij-ultimate/user-utility)
