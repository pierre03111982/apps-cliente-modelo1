# 🚀 RODAR APP DO CLIENTE LOCALMENTE - GUIA RÁPIDO

## ⚡ Passo a Passo Rápido

### 1. Abrir Terminal na pasta do projeto
```powershell
cd E:\projetos\appmelhorado
```

### 2. Criar/Verificar arquivo `.env.local`
Crie um arquivo `.env.local` na pasta `appmelhorado` com:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_PAINELADM_URL=http://localhost:3000
```

### 3. Iniciar o app na porta 3002
```powershell
npm run dev:3002
```

### 4. Acessar no navegador
Abra o navegador e acesse:
```
http://localhost:3002/hOQL4BaVY92787EjKVMt
```

**IMPORTANTE:** Use `localhost:3002` e NÃO a URL externa `app.experimenteai.com.br`

## 🔧 Se o Painel Adm também precisa rodar localmente

### Em outro terminal:
```powershell
cd E:\projetos\paineladm
$env:PORT = 3000
npm run dev
```

## ✅ Verificar se está funcionando

No terminal você deve ver:
```
▲ Next.js 14.2.6
- Local:        http://localhost:3002
```

No navegador, acesse:
- ✅ `http://localhost:3002/hOQL4BaVY92787EjKVMt` (CORRETO)
- ❌ `https://app.experimenteai.com.br/hOQL4BaVY92787EjKVMt` (URL EXTERNA - NÃO USE)

## 🐛 Problemas Comuns

### Porta 3002 já está em uso
```powershell
# Use outra porta, por exemplo 3003
npx next dev -p 3003
# Depois acesse: http://localhost:3003/hOQL4BaVY92787EjKVMt
```

### Ainda está abrindo URL externa
1. Feche todas as abas do navegador com `app.experimenteai.com.br`
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Abra uma nova aba e digite manualmente: `http://localhost:3002/hOQL4BaVY92787EjKVMt`

### Erro de conexão com backend
Verifique se o paineladm está rodando na porta 3000:
```powershell
# Em outro terminal
cd E:\projetos\paineladm
$env:PORT = 3000
npm run dev
```

## 📝 Resumo dos Comandos

```powershell
# Terminal 1 - App do Cliente
cd E:\projetos\appmelhorado
npm run dev:3002

# Terminal 2 - Painel Adm (se necessário)
cd E:\projetos\paineladm
$env:PORT = 3000
npm run dev

# No navegador
http://localhost:3002/hOQL4BaVY92787EjKVMt
```

