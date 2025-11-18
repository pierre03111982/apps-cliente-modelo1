# 🎯 Guia Simples - O Que Fazer Agora (Para Iniciantes)

## 📍 Onde Você Está Agora

Você tem **2 telas abertas**:
1. **GitHub** - Onde você criou o "armazém" do código
2. **Vercel** - Onde você vai "publicar" o aplicativo na internet

## 🎯 O Que Você Precisa Fazer (Passo a Passo)

### **PASSO 1: Enviar o Código para o GitHub** 📤

O código está no seu computador, mas precisa ir para o GitHub primeiro.

#### **1.1. Abra o PowerShell** (Terminal do Windows)
- Pressione `Windows + X`
- Clique em "Windows PowerShell" ou "Terminal"

#### **1.2. Digite estes comandos um por um** (copie e cole cada um):

```powershell
cd E:\projetos\apps-cliente\modelo-1
```

(Pressione Enter depois de cada comando)

```powershell
git init
```

```powershell
git add .
```

```powershell
git commit -m "primeiro commit"
```

```powershell
git branch -M main
```

```powershell
git remote add origin https://github.com/pierre03111982/apps-cliente-modelo1.git
```

```powershell
git push -u origin main
```

**⚠️ IMPORTANTE**: 
- Se pedir usuário e senha, use seu usuário do GitHub
- Se pedir token, você precisa criar um no GitHub (me avise se precisar de ajuda)

#### **1.3. Verifique se funcionou**
- Volte na tela do GitHub
- Atualize a página (F5)
- Você deve ver os arquivos do projeto aparecerem

---

### **PASSO 2: Publicar no Vercel** 🚀

Agora que o código está no GitHub, vamos publicar no Vercel.

#### **2.1. Volte para a tela do Vercel**

#### **2.2. Clique no botão "Adicionar..."** (no canto superior direito)
- Ou clique em "Add New Project"

#### **2.3. Escolha o repositório**
- Você deve ver `apps-cliente-modelo1` na lista
- **Clique nele**

#### **2.4. Configure o projeto** ⚠️ **MUITO IMPORTANTE**

Na tela que aparece, você verá várias opções:

**a) Nome do Projeto:**
- Pode deixar como está: `apps-cliente-modelo1`

**b) Diretório Raiz (Root Directory)** ⚠️ **MUDE ISSO!**
- Você verá um campo com `./`
- **Clique no botão "Editar"** ao lado
- **Apague o `./`**
- **Digite**: `apps-cliente/modelo-1`
- **Confirme**

**c) Framework:**
- Deve aparecer "Next.js" automaticamente
- Se não aparecer, selecione "Next.js"

#### **2.5. Clique em "Implantar"** (botão cinza no final)

#### **2.6. Aguarde** ⏱️
- Vai levar alguns minutos (2-5 minutos normalmente)
- Você verá uma barra de progresso
- **NÃO feche a página!**

#### **2.7. Quando terminar**
- Você verá uma mensagem de sucesso
- Você receberá uma URL como: `https://apps-cliente-modelo1.vercel.app`
- **ANOTE ESSA URL!** Você vai precisar dela depois

---

### **PASSO 3: Configurar Variáveis (Depois do Deploy)** ⚙️

Depois que o deploy funcionar:

#### **3.1. No Vercel, vá em "Configurações"** (Settings)
- No menu lateral esquerdo

#### **3.2. Clique em "Variáveis de ambiente"** (Environment Variables)

#### **3.3. Adicione estas 3 variáveis** (uma por vez):

**Variável 1:**
- **Nome**: `NEXT_PUBLIC_BACKEND_URL`
- **Valor**: `https://www.experimenteai.com.br`
- **Ambiente**: Marque "Production"
- Clique em "Salvar"

**Variável 2:**
- **Nome**: `NEXT_PUBLIC_PAINELADM_URL`
- **Valor**: `https://www.experimenteai.com.br`
- **Ambiente**: Marque "Production"
- Clique em "Salvar"

**Variável 3:**
- **Nome**: `NEXT_PUBLIC_MODELO1_URL`
- **Valor**: `https://apps-cliente-modelo1.vercel.app` (ou a URL que você recebeu)
- **Ambiente**: Marque "Production"
- Clique em "Salvar"

#### **3.4. Fazer Deploy Novamente**
- Vá em "Implantações" (Deployments)
- Clique nos 3 pontinhos ao lado do último deploy
- Clique em "Redeploy"
- Aguarde terminar

---

## ✅ Resumo Super Simples

1. **Enviar código para GitHub** (usar comandos no PowerShell)
2. **Criar projeto no Vercel** (clicar em "Adicionar" e escolher o repositório)
3. **Mudar "Diretório Raiz"** para `apps-cliente/modelo-1` ⚠️
4. **Clicar em "Implantar"**
5. **Aguardar terminar**
6. **Adicionar variáveis de ambiente**
7. **Fazer deploy novamente**

## 🆘 Se Algo Der Errado

### Erro no PowerShell:
- **"git não é reconhecido"**: Precisa instalar Git primeiro
- **"usuário/senha"**: Precisa criar um token no GitHub
- **"repositório não encontrado"**: Verifique se o nome está correto

### Erro no Vercel:
- **"Build failed"**: Verifique se mudou o Diretório Raiz
- **"Root Directory not found"**: Verifique se digitou `apps-cliente/modelo-1` corretamente

## 💡 Dica Final

**Não tenha pressa!** Cada passo leva alguns minutos. Se algo não funcionar, me avise qual erro apareceu e eu te ajudo!

---

**Boa sorte! 🍀**

