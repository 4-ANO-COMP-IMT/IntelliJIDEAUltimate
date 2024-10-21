#!/bin/bash

# Caminho para o diretório onde está o package.json
cd libs/middleware-utility

# Incrementa a versão major
npm version major

# Publica o pacote
npm publish --access public
