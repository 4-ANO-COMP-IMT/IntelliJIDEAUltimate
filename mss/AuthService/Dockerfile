
# Usar a imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o contêiner
COPY . .

# Instalar dependências do Node.js
RUN npm install 
#--only=production
RUN npm run build

# Comando para iniciar a aplicação
CMD ["npm", "start"]

# Expor a porta da aplicação
EXPOSE 3000
