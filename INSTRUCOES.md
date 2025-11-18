# 📱 Modelo 1 - Instruções de Uso

## 🚀 Como Rodar Localmente

1. **Instalar dependências:**
   ```bash
   cd E:\projetos\apps-cliente\modelo-1
   npm install
   ```

2. **Rodar em desenvolvimento (porta 3004):**
   ```bash
   npm run dev
   # ou
   npm run dev:3004
   ```

3. **Acessar:**
   - Login: `http://localhost:3004/{lojistaId}/login`
   - Experimentar: `http://localhost:3004/{lojistaId}/experimentar`
   - Resultado: `http://localhost:3004/{lojistaId}/resultado`

## ✅ O que já está implementado

### Tela 1: Login ✅
- Design premium com fundo desfocado de closet
- Formulário de login e cadastro
- Integração com API de autenticação
- Redirecionamento automático se já estiver logado
- Fontes elegantes (Playfair Display + Inter)

### Estrutura Base ✅
- Porta 3004 configurada
- Rotas organizadas
- Integração com backend (paineladm)

## ⏳ Próximos Passos

### Tela 2: Build Your Look (em desenvolvimento)
- Upload de foto com preview
- Seleção de produtos por categoria
- Botão FAB "VISUALIZE"
- Botão de favoritos

### Tela 3: Resultado (em desenvolvimento)
- Header com navegação
- Imagem gerada
- Painel inferior com detalhes do produto
- Botões de ação (Favoritos, Remixar, Voltar)

## 📝 Notas

- O app redireciona automaticamente para `/login` se não estiver logado
- Após login, redireciona para `/experimentar`
- Mantém funcionalidades do `appmelhorado` (favoritos, compartilhamento, etc.)

