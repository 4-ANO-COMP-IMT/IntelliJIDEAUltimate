#!/bin/bash

# Caminho para o diretório onde está o package.json
cd libs/user-utility

# Incrementa a versão minor
npm version minor

# Publica o pacote
npm publish --access public
