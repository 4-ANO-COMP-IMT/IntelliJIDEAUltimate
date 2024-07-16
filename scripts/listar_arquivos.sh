#!/bin/bash

# Verifica se o diretório e o arquivo de saída foram fornecidos como argumentos
if [ "$#" -ne 2 ]; then
  echo "Uso: $0 <diretório> <arquivo_de_saida>"
  exit 1
fi

# Diretório inicial e arquivo de saída
diretorio_inicial=$1
arquivo_saida=$2

# Extensões de imagem a serem ignoradas
extensoes_imagem=("jpg" "jpeg" "png" "gif" "bmp" "tiff" "webp")

# Função para verificar se um arquivo é uma imagem
is_imagem() {
  local arquivo=$1
  local extensao="${arquivo##*.}"
  for img_ext in "${extensoes_imagem[@]}"; do
    if [ "$extensao" = "$img_ext" ]; then
      return 0
    fi
  done
  return 1
}

# Função recursiva para processar o diretório
processar_diretorio() {
  local diretorio=$1

  # Itera sobre cada item no diretório
  for item in "$diretorio"/*; do
    # Ignora o diretório node_modules
    if [ -d "$item" ] && [ "$(basename "$item")" = "node_modules" ]; then
      continue
    fi

    # Ignora o arquivo package-lock.json
    if [ -f "$item" ] && [ "$(basename "$item")" = "package-lock.json" ]; then
      continue
    fi

    # Verifica se é um arquivo
    if [ -f "$item" ]; then
      # Verifica se o arquivo é uma imagem e ignora se for
      if is_imagem "$item"; then
        continue
      fi
      # Imprime o caminho relativo do arquivo e seu conteúdo no arquivo de saída
      caminho_relativo=$(realpath --relative-to="$diretorio_inicial" "$item")
      echo "Arquivo: $caminho_relativo" >> "$arquivo_saida"
      cat "$item" >> "$arquivo_saida"
      echo -e "\n" >> "$arquivo_saida"
    elif [ -d "$item" ]; then
      # Se for um diretório, chama a função recursivamente
      processar_diretorio "$item"
    fi
  done
}

# Inicializa o arquivo de saída
echo "Conteúdo dos arquivos em '$diretorio_inicial':" > "$arquivo_saida"
echo "===========================================" >> "$arquivo_saida"

# Chama a função recursiva começando pelo diretório inicial
processar_diretorio "$diretorio_inicial"

echo "Processamento concluído. Resultado salvo em '$arquivo_saida'."
