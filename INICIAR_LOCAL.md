# 🚀 Como Iniciar o App do Cliente Localmente

## ⚡ Forma Mais Rápida

### Windows PowerShell:
```powershell
cd appmelhorado
npm run dev:3002
```

### Linux/Mac:
```bash
cd appmelhorado
npm run dev:3002
```

## 📝 Passo a Passo Completo

### 1. Navegar para a pasta
```bash
cd appmelhorado
```

### 2. Instalar dependências (se necessário)
```bash
npm install
```

### 3. Criar arquivo .env.local
Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_PAINELADM_URL=http://localhost:3000
```

### 4. Iniciar o servidor
```bash
npm run dev:3002
```

### 5. Acessar no navegador
```
http://localhost:3002/{lojistaId}
```

Exemplo:
```
http://localhost:3002/hOQL4BaVY92787EjKVMt
```

## 🔄 Alternativas

### Usando variável de ambiente (Windows PowerShell)
```powershell
$env:PORT = 3002
npm run dev
```

### Usando variável de ambiente (Linux/Mac)
```bash
PORT=3002 npm run dev
```

### Usando flag diretamente
```bash
npx next dev -p 3002
```

## ✅ Verificar se está funcionando

Você deve ver no terminal:
```
▲ Next.js 14.2.6
- Local:        http://localhost:3002
```

E no navegador, a tela de login do cliente deve aparecer.

## 🐛 Problemas?

### Porta 3002 já em uso
Use outra porta:
```bash
npx next dev -p 3003
```

### Erro de conexão
Verifique se o paineladm está rodando na porta 3000:
```bash
# Em outro terminal
cd paineladm
$env:PORT = 3000; npm run dev
```

