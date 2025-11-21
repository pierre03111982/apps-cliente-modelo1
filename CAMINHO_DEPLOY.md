# 🚀 Caminho para Deploy - Modelo 1

## 📍 Caminho do Projeto

### Caminho Absoluto:
```
E:\projetos\apps-cliente\modelo-1
```

### Caminho Relativo (do workspace):
```
apps-cliente/modelo-1
```

## 🔧 Configuração no Vercel

### 1. Root Directory
Quando criar o projeto no Vercel, configure:

**Root Directory**: `apps-cliente/modelo-1`

### 2. Configurações do Projeto

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `.next` (padrão)
- **Install Command**: `npm install` (padrão)

### 3. Variáveis de Ambiente

No Vercel → Settings → Environment Variables, adicione:

#### Production:
```env
NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_MODELO1_URL=https://seu-projeto-modelo1.vercel.app
```

#### Preview (opcional):
```env
NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_MODELO1_URL=https://seu-projeto-modelo1-preview.vercel.app
```

## 📝 Passo a Passo no Vercel

### Opção 1: Deploy via Git (Recomendado)

1. **Conectar Repositório**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Conecte seu repositório Git (GitHub/GitLab/Bitbucket)

2. **Configurar Projeto**
   - **Root Directory**: Clique em "Edit" e selecione `apps-cliente/modelo-1`
   - **Framework Preset**: Next.js (deve detectar automaticamente)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)

3. **Adicionar Variáveis de Ambiente**
   - Vá em Settings → Environment Variables
   - Adicione as 3 variáveis listadas acima

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build completar

### Opção 2: Deploy via CLI

```bash
# 1. Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# 2. Navegar para o diretório do projeto
cd E:\projetos\apps-cliente\modelo-1

# 3. Fazer login no Vercel
vercel login

# 4. Deploy
vercel

# 5. Para produção
vercel --prod
```

## ✅ Verificação Pós-Deploy

Após o deploy, você receberá uma URL como:
```
https://modelo-1-xxxxx.vercel.app
```

### Teste a URL:
```
https://seu-projeto-modelo1.vercel.app/{lojistaId}/login
```

Exemplo:
```
https://modelo-1-xxxxx.vercel.app/hOQL4BaVY92787EjKVMt/login
```

## 🔗 Configurar no Painel Adm

Após o deploy bem-sucedido:

1. **No Vercel do paineladm**, adicione a variável:
   ```
   NEXT_PUBLIC_MODELO1_URL=https://seu-projeto-modelo1.vercel.app
   ```

2. **No paineladm → Configurações**:
   - Selecione "Modelo 1" como modelo do app cliente
   - Salve as configurações

3. **Na página "Aplicativo Cliente"**:
   - O link do Modelo 1 aparecerá automaticamente
   - O QR Code será gerado com o link correto

## 📋 Checklist Rápido

- [ ] Repositório Git conectado ao Vercel
- [ ] Root Directory configurado: `apps-cliente/modelo-1`
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] URL de produção obtida
- [ ] Variável `NEXT_PUBLIC_MODELO1_URL` adicionada no paineladm
- [ ] Modelo 1 selecionado nas configurações do paineladm
- [ ] Teste realizado na URL de produção

## 🐛 Troubleshooting

### Erro: "Root Directory not found"
- Certifique-se de que o caminho está correto: `apps-cliente/modelo-1`
- Verifique se o repositório tem a estrutura correta

### Erro: "Build failed"
- Verifique os logs do build no Vercel
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se as variáveis de ambiente estão configuradas

### Erro: "Module not found"
- Execute `npm install` localmente para verificar dependências
- Verifique se o `package.json` está completo

---

**Caminho do Projeto**: `apps-cliente/modelo-1`

**Última atualização**: $(date)

