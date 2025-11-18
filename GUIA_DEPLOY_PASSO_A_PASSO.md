# 🚀 Guia Passo a Passo - Deploy do Modelo 1 no Vercel

## 📍 Você está aqui: Configurações do Git no projeto "paineladm"

Para criar o projeto do **Modelo 1**, você precisa criar um **NOVO PROJETO**.

## 🎯 Passo a Passo Completo

### **PASSO 1: Criar Novo Projeto**

1. **No topo da página do Vercel**, você verá um dropdown com o nome do projeto atual ("paineladm")
2. **Clique no dropdown do projeto** (ao lado de "paineladm")
3. **Clique em "Criar projeto"** (Create project)

### **PASSO 2: Conectar Repositório Git**

1. Você verá uma tela para conectar um repositório
2. **Escolha seu provedor Git**:
   - **GitHub** (recomendado)
   - **GitLab**
   - **Bitbucket**
3. **Selecione o repositório** que contém o código do modelo-1
4. **Clique em "Import"** ou "Importar"

### **PASSO 3: Configurar o Projeto** ⚠️ **MUITO IMPORTANTE**

Na tela de configuração do projeto, você verá várias opções:

#### **3.1. Root Directory** (CRÍTICO!)
- **Clique em "Edit"** ao lado de "Root Directory"
- **Digite ou selecione**: `apps-cliente/modelo-1`
- ⚠️ **NÃO deixe vazio!** Deve ser exatamente: `apps-cliente/modelo-1`

#### **3.2. Framework Preset**
- Deve detectar automaticamente: **Next.js**
- Se não detectar, selecione manualmente: **Next.js**

#### **3.3. Build Command**
- Deixe o padrão: `npm run build`
- Ou confirme que está: `npm run build`

#### **3.4. Output Directory**
- Deixe o padrão: `.next`
- Ou confirme que está: `.next`

#### **3.5. Install Command**
- Deixe o padrão: `npm install`
- Ou confirme que está: `npm install`

### **PASSO 4: Nome do Projeto**

- **Project Name**: Escolha um nome, por exemplo:
  - `modelo-1`
  - `app-modelo-1`
  - `experimenteai-modelo1`

### **PASSO 5: Deploy Inicial**

1. **Clique em "Deploy"**
2. Aguarde o build completar (pode levar alguns minutos)
3. ⚠️ **NÃO configure variáveis de ambiente ainda!** Primeiro vamos ver se o build funciona

### **PASSO 6: Verificar Build**

1. Após o deploy, você verá uma URL como:
   ```
   https://modelo-1-xxxxx.vercel.app
   ```
2. **Verifique os logs do build**:
   - Se der erro, veja qual foi o problema
   - Se funcionar, continue para o próximo passo

### **PASSO 7: Configurar Variáveis de Ambiente** 🔴 **OBRIGATÓRIO**

1. **Vá em Settings** (no menu lateral esquerdo)
2. **Clique em "Environment Variables"** (Variáveis de ambiente)
3. **Adicione as seguintes variáveis**:

#### Para Production:
```
Nome: NEXT_PUBLIC_BACKEND_URL
Valor: https://www.experimenteai.com.br
Ambiente: Production

Nome: NEXT_PUBLIC_PAINELADM_URL
Valor: https://www.experimenteai.com.br
Ambiente: Production

Nome: NEXT_PUBLIC_MODELO1_URL
Valor: https://seu-projeto-modelo1.vercel.app
(Substitua pela URL real que você recebeu no passo 6)
Ambiente: Production
```

#### Para Preview (opcional):
```
Nome: NEXT_PUBLIC_BACKEND_URL
Valor: https://www.experimenteai.com.br
Ambiente: Preview

Nome: NEXT_PUBLIC_PAINELADM_URL
Valor: https://www.experimenteai.com.br
Ambiente: Preview

Nome: NEXT_PUBLIC_MODELO1_URL
Valor: https://seu-projeto-modelo1-preview.vercel.app
Ambiente: Preview
```

4. **Clique em "Save"** para cada variável

### **PASSO 8: Redeploy**

1. Após adicionar as variáveis de ambiente
2. **Vá em "Deployments"** (Implantações)
3. **Clique nos 3 pontinhos** ao lado do último deploy
4. **Clique em "Redeploy"**
5. Aguarde o novo build com as variáveis configuradas

### **PASSO 9: Testar a Aplicação**

1. Acesse a URL de produção:
   ```
   https://seu-projeto-modelo1.vercel.app/{lojistaId}/login
   ```
   
   Exemplo:
   ```
   https://modelo-1-xxxxx.vercel.app/hOQL4BaVY92787EjKVMt/login
   ```

2. **Teste as funcionalidades**:
   - [ ] Login funciona?
   - [ ] Registro funciona?
   - [ ] Upload de foto funciona?
   - [ ] Produtos carregam?
   - [ ] Geração de look funciona?

### **PASSO 10: Configurar no Painel Adm**

1. **No projeto "paineladm" no Vercel**:
   - Vá em Settings → Environment Variables
   - Adicione:
     ```
     Nome: NEXT_PUBLIC_MODELO1_URL
     Valor: https://seu-projeto-modelo1.vercel.app
     Ambiente: Production
     ```

2. **No paineladm → Configurações**:
   - Selecione "Modelo 1" como modelo do app cliente
   - Salve as configurações

3. **Na página "Aplicativo Cliente"**:
   - O link do Modelo 1 aparecerá automaticamente
   - O QR Code será gerado com o link correto

## 🎯 Resumo Visual

```
1. Vercel Dashboard
   └─> Dropdown "paineladm"
       └─> "Criar projeto"
           └─> Conectar Git
               └─> Configurar:
                   ├─> Root Directory: apps-cliente/modelo-1 ⚠️
                   ├─> Framework: Next.js
                   └─> Deploy
                       └─> Settings → Environment Variables
                           └─> Adicionar 3 variáveis
                               └─> Redeploy
```

## ⚠️ Problemas Comuns

### ❌ Erro: "Root Directory not found"
**Solução**: Certifique-se de que digitou exatamente: `apps-cliente/modelo-1`

### ❌ Erro: "Build failed"
**Solução**: 
1. Verifique os logs do build
2. Certifique-se de que o repositório tem a estrutura correta
3. Verifique se o `package.json` está no diretório correto

### ❌ Erro: "Module not found"
**Solução**: 
1. Verifique se todas as dependências estão no `package.json`
2. O Vercel deve instalar automaticamente, mas verifique os logs

### ❌ Aplicação não carrega dados
**Solução**: 
1. Verifique se as variáveis de ambiente estão configuradas
2. Verifique se fez o redeploy após adicionar as variáveis
3. Verifique se a URL do backend está correta

## ✅ Checklist Final

- [ ] Novo projeto criado no Vercel
- [ ] Root Directory configurado: `apps-cliente/modelo-1`
- [ ] Build inicial bem-sucedido
- [ ] Variáveis de ambiente adicionadas
- [ ] Redeploy realizado
- [ ] Aplicação testada na URL de produção
- [ ] Variável `NEXT_PUBLIC_MODELO1_URL` adicionada no paineladm
- [ ] Modelo 1 selecionado nas configurações do paineladm
- [ ] Link do Modelo 1 aparece na página "Aplicativo Cliente"

## 📞 Precisa de Ajuda?

Se encontrar algum problema durante o deploy:
1. Verifique os logs do build no Vercel
2. Verifique se todas as variáveis de ambiente estão corretas
3. Verifique se o Root Directory está correto

---

**Boa sorte com o deploy! 🚀**

