#!/bin/bash

# Verifica se o diretório e o arquivo de saída foram fornecidos como argumentos
if [ "$#" -ne 2 ]; then
  echo "Uso: $0 <diretório> <arquivo_de_saida>"
  exit 1
fi

# Diretório inicial e arquivo de saída
diretorio_inicial=$1
arquivo_saida=$2

# Função recursiva para processar o diretório
processar_diretorio() {
  local diretorio=$1

  # Itera sobre cada item no diretório
  for item in "$diretorio"/*; do
    # Verifica se é um arquivo
    if [ -f "$item" ]; then
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
