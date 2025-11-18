# 🚀 appmelhorado

Aplicação cliente para provador virtual inteligente.

## 📁 Localização

```
E:\projetos\appmelhorado\
```

## 🚀 Como Usar

### Desenvolvimento Local

```bash
cd E:\projetos\appmelhorado
npm install
npm run dev
```

O app estará disponível em: `http://localhost:3000`

### Deploy para Produção

```bash
cd E:\projetos\appmelhorado
vercel --prod
```

## 🔗 Integração

Este app se comunica com o paineladm (em `E:\projetos\paineladm\`) via:
- API `/api/simulator/data` (no paineladm)
- URLs configuradas em `src/lib/client-app.ts` (no paineladm)

## 📝 Modo Simulador

Para usar no simulador do paineladm:

```
http://localhost:3000/[lojistaId]?simulator=1&backend=http://localhost:3000
```

## ⚙️ Configuração

O app funciona de duas formas:

1. **Com Firebase configurado:** Busca dados diretamente do Firestore
2. **Sem Firebase ou com erro de permissão:** Usa automaticamente o backend do paineladm via API

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

**Nota:** Se o Firebase não estiver configurado, o app funciona automaticamente usando o backend do paineladm.


