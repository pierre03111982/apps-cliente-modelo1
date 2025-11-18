# 🚀 Como Rodar o App do Cliente Localmente

## 📋 Pré-requisitos

1. Node.js instalado
2. Paineladm rodando na porta 3000

## 🔧 Configuração

### 1. Instalar dependências (se ainda não instalou)

```bash
cd appmelhorado
npm install
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env.local` na raiz do projeto `appmelhorado`:

```bash
# Windows PowerShell
Copy-Item .env.local.example .env.local

# Linux/Mac
cp .env.local.example .env.local
```

Edite o `.env.local` e configure:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_PAINELADM_URL=http://localhost:3000
```

### 3. Rodar na porta 3002

#### Opção 1: Usando script npm (Recomendado)

```bash
npm run dev:3002
```

#### Opção 2: Usando variável de ambiente (Windows PowerShell)

```powershell
$env:PORT = 3002
npm run dev
```

#### Opção 3: Usando variável de ambiente (Linux/Mac)

```bash
PORT=3002 npm run dev
```

#### Opção 4: Usando variável de ambiente (Windows CMD)

```cmd
set PORT=3002
npm run dev
```

## 🌐 Acessar o App

Após iniciar, o app estará disponível em:

```
http://localhost:3002
```

Para acessar uma loja específica:

```
http://localhost:3002/{lojistaId}
```

Exemplo:
```
http://localhost:3002/hOQL4BaVY92787EjKVMt
```

## ✅ Verificar se está funcionando

1. Abra o navegador em `http://localhost:3002`
2. Você deve ver a tela de login do cliente
3. No console do terminal, deve aparecer:
   ```
   ▲ Next.js 14.2.6
   - Local:        http://localhost:3002
   ```

## 🐛 Problemas Comuns

### Porta 3002 já está em uso

**Solução:** Use outra porta ou encerre o processo que está usando a porta 3002

```bash
# Windows - Verificar o que está usando a porta
netstat -ano | findstr :3002

# Linux/Mac - Verificar o que está usando a porta
lsof -i :3002
```

### Erro de conexão com backend

**Solução:** Verifique se o paineladm está rodando na porta 3000

```bash
# Verificar se está rodando
curl http://localhost:3000/api/health
# ou acesse no navegador: http://localhost:3000
```

### Variáveis de ambiente não funcionam

**Solução:** 
1. Certifique-se de que o arquivo `.env.local` existe na raiz do projeto
2. Reinicie o servidor após criar/modificar `.env.local`
3. Verifique se não há espaços extras nas variáveis

## 📝 Scripts Disponíveis

- `npm run dev` - Roda na porta padrão (3000)
- `npm run dev:3002` - Roda na porta 3002
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run start:3002` - Inicia servidor de produção na porta 3002

## 🔄 Fluxo Completo de Teste Local

1. **Terminal 1 - Paineladm:**
   ```bash
   cd paineladm
   $env:PORT = 3000; npm run dev
   ```

2. **Terminal 2 - Appmelhorado:**
   ```bash
   cd appmelhorado
   npm run dev:3002
   ```

3. **Acessar no navegador:**
   ```
   http://localhost:3002/{lojistaId}
   ```

4. **Testar:**
   - Preencher nome e WhatsApp
   - Digitar código "4567"
   - Validar acesso
   - Verificar se funciona

## 📌 Notas

- A porta 3002 é a padrão para o app do cliente
- O paineladm deve estar na porta 3000
- As variáveis de ambiente são carregadas automaticamente do `.env.local`
- Não commite o arquivo `.env.local` (já deve estar no `.gitignore`)

