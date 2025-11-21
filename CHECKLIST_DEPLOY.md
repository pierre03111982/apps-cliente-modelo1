# ✅ Checklist de Deploy - Modelo 1

## 📋 Verificações Pré-Deploy

### ✅ 1. Código Verificado
- [x] Sem erros de lint (`npm run lint`)
- [x] Sem erros de TypeScript
- [x] Todas as rotas de API implementadas
- [x] Imports corretos
- [x] Configuração do Next.js correta

### ✅ 2. Rotas de API Verificadas
- [x] `/api/lojista/perfil` - Busca dados da loja
- [x] `/api/lojista/products` - Busca produtos
- [x] `/api/upload-photo` - Upload de foto
- [x] `/api/generate-looks` - Geração de looks
- [x] `/api/cliente/login` - Login do cliente
- [x] `/api/cliente/register` - Registro do cliente
- [x] `/api/cliente/favoritos` - Favoritos
- [x] `/api/cliente/share` - Compartilhamento
- [x] `/api/actions` - Ações do cliente
- [x] `/api/cliente/find` - Buscar cliente

### ✅ 3. Variáveis de Ambiente Necessárias

#### 🔴 OBRIGATÓRIAS (para produção):
```env
# URL do Backend (Painel Adm)
NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br
# OU
NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br

# URL do Modelo 1 (para o paineladm saber qual link mostrar)
NEXT_PUBLIC_MODELO1_URL=https://seu-dominio-modelo1.vercel.app
```

#### 🟡 OPCIONAIS (Firebase - usado como fallback):
```env
# Se quiser usar Firebase diretamente (opcional, já que usa backend)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### ✅ 4. Configurações do Next.js
- [x] `next.config.mjs` configurado com `remotePatterns` para imagens
- [x] Domínios permitidos:
  - `images.unsplash.com`
  - `placehold.co`
  - `storage.googleapis.com`
  - `firebasestorage.googleapis.com`

### ✅ 5. Estrutura de Arquivos
- [x] Todas as páginas criadas:
  - `/[lojistaId]/login` ✅
  - `/[lojistaId]/experimentar` ✅
  - `/[lojistaId]/resultado` ✅
- [x] Todas as rotas de API criadas ✅
- [x] Componentes necessários ✅
- [x] Imagem de fundo em `public/images/closet-background.png` ✅

## 🚀 Passos para Deploy no Vercel

### 1. Preparação
```bash
# No diretório do modelo-1
cd apps-cliente/modelo-1
npm install
npm run build  # Testar build localmente
```

### 2. Criar Projeto no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Conecte o repositório Git
4. Configure o projeto:
   - **Root Directory**: `apps-cliente/modelo-1`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (padrão)

### 3. Configurar Variáveis de Ambiente
No Vercel → Settings → Environment Variables, adicione:

#### Production:
```
NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_MODELO1_URL=https://seu-projeto-modelo1.vercel.app
```

#### Preview (opcional, mesma URL):
```
NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br
NEXT_PUBLIC_MODELO1_URL=https://seu-projeto-modelo1.vercel.app
```

### 4. Deploy
1. Clique em "Deploy"
2. Aguarde o build completar
3. Verifique os logs para erros

### 5. Configurar no Painel Adm
Após o deploy, atualize o paineladm:

1. Acesse o paineladm → Configurações
2. Selecione "Modelo 1" como modelo do app cliente
3. No Vercel do paineladm, adicione:
   ```
   NEXT_PUBLIC_MODELO1_URL=https://seu-projeto-modelo1.vercel.app
   ```

## 🔍 Verificações Pós-Deploy

### Testes Funcionais:
- [ ] Acessar `https://seu-projeto-modelo1.vercel.app/{lojistaId}/login`
- [ ] Testar login de cliente
- [ ] Testar registro de cliente
- [ ] Testar upload de foto
- [ ] Testar seleção de produtos
- [ ] Testar geração de look
- [ ] Testar votação (like/dislike)
- [ ] Testar botões após votação
- [ ] Testar "Remixar esse Look"
- [ ] Testar favoritos
- [ ] Testar compartilhamento
- [ ] Testar botões de redes sociais

### Testes de Integração:
- [ ] Verificar se dados da loja carregam corretamente
- [ ] Verificar se produtos carregam corretamente
- [ ] Verificar se upload de foto funciona
- [ ] Verificar se geração de looks funciona
- [ ] Verificar se favoritos salvam corretamente
- [ ] Verificar se compartilhamento funciona

## 🐛 Troubleshooting

### Erro: "Cannot find module"
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` novamente

### Erro: "Environment variable not found"
- Verifique se todas as variáveis estão configuradas no Vercel
- Certifique-se de que as variáveis começam com `NEXT_PUBLIC_` para serem expostas ao cliente

### Erro: "Failed to fetch"
- Verifique se `NEXT_PUBLIC_BACKEND_URL` está correto
- Verifique se o paineladm está acessível
- Verifique logs do Vercel para mais detalhes

### Erro: "CORS"
- As rotas de API do modelo-1 fazem proxy para o backend
- Verifique se o backend está configurado para aceitar requisições do modelo-1

### Imagens não carregam
- Verifique se os domínios estão em `next.config.mjs` → `remotePatterns`
- Verifique se a imagem de fundo está em `public/images/closet-background.png`

## 📝 Notas Importantes

1. **Porta Local**: O modelo-1 roda na porta `3004` localmente
2. **Fallback**: Se Firebase não estiver configurado, o app usa o backend via API proxy
3. **Session Storage**: Dados temporários (foto, produtos, looks) são salvos no `sessionStorage`
4. **Local Storage**: Dados do cliente (login) são salvos no `localStorage`

## ✅ Status Final

- [x] Código verificado
- [x] Rotas de API verificadas
- [x] Variáveis de ambiente documentadas
- [x] Checklist de deploy criado
- [ ] Deploy realizado
- [ ] Testes pós-deploy realizados

---

**Última atualização**: $(date)

