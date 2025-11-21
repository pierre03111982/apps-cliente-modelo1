# 🚀 Como Fazer Deploy Agora - Solução Rápida

## 🎯 Você está vendo: "Nenhum repositório Git encontrado"

Isso significa que o código ainda não está no GitHub. Vamos resolver isso!

## ✅ SOLUÇÃO RÁPIDA (Escolha uma opção)

### **OPÇÃO A: Usar URL do Repositório (Se já tem no GitHub)**

Se você já tem o código em um repositório GitHub:

1. **No Vercel**, no campo que diz **"Insira o URL de um repositório Git"**
2. **Cole a URL do seu repositório**, por exemplo:
   ```
   https://github.com/pierre03111982/nome-do-repositorio.git
   ```
3. Clique em **"Continuar"**

---

### **OPÇÃO B: Criar Repositório e Fazer Push (Recomendado)**

Se você ainda **NÃO** tem o código no GitHub:

#### **PASSO 1: Criar Repositório no GitHub**

1. Acesse: https://github.com/new
2. **Nome do repositório**: `modelo-1` ou `apps-cliente-modelo1`
3. **Visibilidade**: Escolha Public ou Private
4. **NÃO marque** "Add a README file"
5. Clique em **"Create repository"**

#### **PASSO 2: Copiar Comandos do GitHub**

Após criar, o GitHub vai mostrar comandos. Use estes:

```bash
# 1. Abra o PowerShell ou Terminal
# 2. Navegue até o diretório do modelo-1
cd E:\projetos\apps-cliente\modelo-1

# 3. Inicializar Git (se ainda não tiver)
git init

# 4. Adicionar todos os arquivos
git add .

# 5. Fazer commit
git commit -m "Initial commit - Modelo 1"

# 6. Adicionar remote (SUBSTITUA pela URL do seu repositório)
git remote add origin https://github.com/pierre03111982/NOME_DO_REPOSITORIO.git

# 7. Renomear branch para main
git branch -M main

# 8. Fazer push
git push -u origin main
```

**⚠️ IMPORTANTE**: Substitua `NOME_DO_REPOSITORIO` pelo nome que você criou no GitHub!

#### **PASSO 3: Voltar ao Vercel**

1. **Atualize a página** do Vercel (pressione F5)
2. O repositório deve aparecer na lista
3. **Clique no repositório** para importar
4. **Configure o Root Directory**: `apps-cliente/modelo-1`
5. Clique em **"Deploy"**

---

### **OPÇÃO C: Deploy Direto via CLI (Mais Rápido)**

Se você quer fazer deploy sem criar repositório Git:

```bash
# 1. Abra o PowerShell
# 2. Instale o Vercel CLI (se não tiver)
npm i -g vercel

# 3. Navegue até o diretório
cd E:\projetos\apps-cliente\modelo-1

# 4. Faça login no Vercel
vercel login

# 5. Faça o deploy
vercel

# Quando perguntar:
# - "Set up and deploy?": Y
# - "Which scope?": Escolha sua conta
# - "Link to existing project?": N
# - "What's your project's name?": modelo-1
# - "In which directory is your code located?": ./
# - "Want to override the settings?": Y
# - "What's your Build Command?": npm run build
# - "What's your Output Directory?": .next
# - "Want to override the settings?": Y
# - "What's your Root Directory?": apps-cliente/modelo-1
#   ⚠️ IMPORTANTE: Digite exatamente: apps-cliente/modelo-1

# 6. Para produção
vercel --prod
```

---

## 🎯 Qual Opção Escolher?

- **Opção A**: Se você já tem o código no GitHub ✅
- **Opção B**: Se você quer usar Git e ter controle de versão ✅ (Recomendado)
- **Opção C**: Se você quer fazer deploy rápido sem Git ⚡

## 📝 Depois do Deploy

Após fazer o deploy (qualquer opção), você precisa:

1. **Adicionar variáveis de ambiente** no Vercel:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br
   NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br
   NEXT_PUBLIC_MODELO1_URL=https://sua-url-do-vercel.vercel.app
   ```

2. **Fazer redeploy** para aplicar as variáveis

3. **Configurar no paineladm** (adicionar NEXT_PUBLIC_MODELO1_URL)

## ❓ Precisa de Ajuda?

Me diga qual opção você quer usar e eu te ajudo passo a passo!

