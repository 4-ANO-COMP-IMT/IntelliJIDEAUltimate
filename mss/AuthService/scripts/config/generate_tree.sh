#!/bin/bash

# Verifica se o diretório foi passado como argumento
if [ -z "$1" ]; then
  echo "Uso: $0 <diretório>"
  exit 1
fi

# Define o diretório de início e o arquivo de saída
dir="$1"
output_file="tree_with_content.txt"

# Limpa o arquivo de saída
> "$output_file"

# Função recursiva para processar diretórios
process_directory() {
  local current_dir="$1"
  local indent="$2"
  local last="$3"
  
  # Lista todos os arquivos e subdiretórios no diretório atual
  local entries=("$current_dir"/*)
  local total_entries=${#entries[@]}
  local count=0

  for entry in "${entries[@]}"; do
    count=$((count + 1))
    
    # Verifica se o item é o último da lista para ajustar o símbolo da árvore
    if [ "$count" -eq "$total_entries" ]; then
      local symbol="└──"
      local new_indent="$indent    "
    else
      local symbol="├──"
      local new_indent="$indent│   "
    fi
    
    # Verifica se é um diretório
    if [ -d "$entry" ]; then
      echo "${indent}${symbol} $(basename "$entry")/" >> "$output_file"
      process_directory "$entry" "$new_indent" 0
    # Verifica se é um arquivo
    elif [ -f "$entry" ]; then
      echo "${indent}${symbol} $(basename "$entry")" >> "$output_file"
      echo "${new_indent}------------------------------------" >> "$output_file"
      cat "$entry" >> "$output_file"
      echo -e "\n" >> "$output_file"
    fi
  done
}

# Inicia o processamento do diretório inicial
process_directory "$dir" "" 1

echo "Arquivo $output_file criado com sucesso!"
