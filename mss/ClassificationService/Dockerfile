
# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o contêiner
COPY . .

RUN npx npm-check-updates -u
RUN npm i

RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "start"]

# Expor a porta da aplicação
EXPOSE 3002
