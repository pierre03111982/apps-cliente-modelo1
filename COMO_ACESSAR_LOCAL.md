# 🚀 COMO ACESSAR O APP DO CLIENTE LOCALMENTE

## ⚠️ PROBLEMA
Você está acessando pela URL externa: `https://app.experimenteai.com.br/...`
Isso faz o app usar as configurações de produção!

## ✅ SOLUÇÃO - Passo a Passo

### 1️⃣ Iniciar o App Localmente

Abra um terminal PowerShell e execute:

```powershell
cd E:\projetos\appmelhorado
npm run dev:3002
```

Você deve ver:
```
▲ Next.js 14.2.6
- Local:        http://localhost:3002
```

### 2️⃣ Acessar no Navegador

**IMPORTANTE:** NÃO use a URL externa!

❌ **ERRADO:**
```
https://app.experimenteai.com.br/hOQL4BaVY92787EjKVMt
```

✅ **CORRETO:**
```
http://localhost:3002/hOQL4BaVY92787EjKVMt
```

### 3️⃣ Se o Painel Adm também precisa rodar localmente

Abra OUTRO terminal PowerShell:

```powershell
cd E:\projetos\paineladm
$env:PORT = 3000
npm run dev
```

## 🔧 Dicas Importantes

### Limpar Cache do Navegador
Se ainda estiver abrindo a URL externa:

1. Feche TODAS as abas com `app.experimenteai.com.br`
2. Limpe o cache: `Ctrl + Shift + Delete`
3. Abra uma NOVA aba
4. Digite manualmente: `http://localhost:3002/hOQL4BaVY92787EjKVMt`

### Verificar se está usando localhost
No console do navegador (F12), você deve ver:
```
[ClienteAppPage] Usando API do paineladm: http://localhost:3000
```

Se aparecer `https://www.experimenteai.com.br`, você ainda está usando a URL externa!

## 📋 Resumo dos Comandos

```powershell
# Terminal 1 - App do Cliente
cd E:\projetos\appmelhorado
npm run dev:3002

# Terminal 2 - Painel Adm (se necessário)
cd E:\projetos\paineladm
$env:PORT = 3000
npm run dev

# No navegador (digite manualmente):
http://localhost:3002/hOQL4BaVY92787EjKVMt
```

## 🎯 Diferença entre Local e Produção

| Local | Produção |
|-------|----------|
| `http://localhost:3002` | `https://app.experimenteai.com.br` |
| Usa `.env.local` | Usa variáveis do Vercel |
| Backend: `localhost:3000` | Backend: `www.experimenteai.com.br` |
| Para desenvolvimento | Para clientes reais |

## ✅ Checklist

- [ ] App rodando em `localhost:3002`
- [ ] Painel adm rodando em `localhost:3000` (se necessário)
- [ ] Acessando `http://localhost:3002/...` no navegador
- [ ] NÃO está usando `app.experimenteai.com.br`
- [ ] Console mostra `localhost:3000` como backend

