#!/bin/bash

# Caminho para o diretório onde está o package.json
cd libs/middleware-utility

# Incrementa a versão patch
npm version patch

# Publica o pacote
npm publish --access public

