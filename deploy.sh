#!/bin/bash

# Script de Deploy para GitHub Pages - ArrumaAí
# Uso: ./deploy.sh <nome-do-repositorio>

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se o nome do repositório foi fornecido
if [ $# -eq 0 ]; then
    print_error "Uso: $0 <nome-do-repositorio>"
    print_error "Exemplo: $0 arrumaai"
    exit 1
fi

REPO_NAME=$1
GITHUB_USER=$(git config user.name 2>/dev/null || echo "seu-usuario")

print_status "Iniciando deploy do ArrumaAí para GitHub Pages..."

# Verificar se o Git está instalado
if ! command -v git &> /dev/null; then
    print_error "Git não está instalado. Por favor, instale o Git primeiro."
    exit 1
fi

# Verificar se estamos em um repositório Git
if [ ! -d ".git" ]; then
    print_status "Inicializando repositório Git..."
    git init
    git add .
    git commit -m "Initial commit - ArrumaAí Prototype"
fi

# Verificar se o repositório remoto existe
if ! git remote get-url origin &> /dev/null; then
    print_status "Configurando repositório remoto..."
    git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
fi

# Verificar se há mudanças para commitar
if [ -n "$(git status --porcelain)" ]; then
    print_status "Commitando mudanças..."
    git add .
    git commit -m "Update ArrumaAí prototype - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Fazer push para o GitHub
print_status "Enviando para o GitHub..."
if git push -u origin main 2>/dev/null || git push -u origin master 2>/dev/null; then
    print_success "Código enviado com sucesso!"
else
    print_error "Erro ao enviar para o GitHub. Verifique suas credenciais."
    print_warning "Você pode precisar configurar um token de acesso pessoal."
    exit 1
fi

# Instruções para ativar GitHub Pages
print_success "Deploy concluído!"
echo ""
print_status "Próximos passos para ativar o GitHub Pages:"
echo ""
echo "1. Acesse: https://github.com/$GITHUB_USER/$REPO_NAME"
echo "2. Vá em Settings → Pages"
echo "3. Em 'Source', selecione 'Deploy from a branch'"
echo "4. Em 'Branch', selecione 'main' (ou 'master')"
echo "5. Clique em 'Save'"
echo ""
echo "Seu site estará disponível em:"
echo "https://$GITHUB_USER.github.io/$REPO_NAME"
echo ""

# Verificar se o site está funcionando (após alguns segundos)
print_status "Aguardando ativação do GitHub Pages..."
sleep 10

# Tentar verificar se o site está online
if command -v curl &> /dev/null; then
    SITE_URL="https://$GITHUB_USER.github.io/$REPO_NAME"
    if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" | grep -q "200"; then
        print_success "Site está online! 🎉"
        echo "URL: $SITE_URL"
    else
        print_warning "Site ainda não está disponível. Pode levar alguns minutos."
        echo "URL esperada: $SITE_URL"
    fi
fi

echo ""
print_status "Arquivos do projeto:"
ls -la *.html *.css *.js *.png *.md 2>/dev/null || print_warning "Alguns arquivos podem não estar presentes"

echo ""
print_success "Deploy do ArrumaAí concluído com sucesso!"
print_status "Lembre-se de configurar o GitHub Pages nas configurações do repositório."
