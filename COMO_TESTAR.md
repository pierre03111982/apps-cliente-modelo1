# 🧪 Como Testar o Modelo 1

## 🚀 Iniciar o Servidor

O servidor já está rodando em background. Se precisar iniciar manualmente:

```bash
cd E:\projetos\apps-cliente\modelo-1
npm run dev
```

O app estará disponível em: **http://localhost:3004**

---

## 📱 URLs para Testar

### 1. Tela de Login
```
http://localhost:3004/{lojistaId}/login
```

**Exemplo:**
```
http://localhost:3004/lojista-demo/login
```

### 2. Tela de Seleção de Produtos
```
http://localhost:3004/{lojistaId}/experimentar
```

**Exemplo:**
```
http://localhost:3004/lojista-demo/experimentar
```

### 3. Tela de Resultado
```
http://localhost:3004/{lojistaId}/resultado
```

**Nota:** Esta tela só aparece após gerar looks na Tela 2.

---

## ✅ Checklist de Testes

### Tela 1: Login
- [ ] Imagem de fundo aparece (closet-background.png)
- [ ] Desfoque suave aplicado (~10%)
- [ ] Card com moldura visível
- [ ] Texto "EXPERIMENTE AI" em branco, negrito e com sombra
- [ ] Texto "Desbloqueie Seu Estilo Perfeito" menor e branco
- [ ] Botões "Entrar" e "Cadastrar conta" funcionam
- [ ] Campos de formulário funcionam
- [ ] Login/Cadastro funcionam corretamente
- [ ] Redirecionamento após login funciona

### Tela 2: Seleção de Produtos
- [ ] Imagem de fundo aparece
- [ ] Upload de foto funciona
- [ ] Preview da foto aparece após upload
- [ ] Botão para remover foto funciona
- [ ] Abas de categoria funcionam
- [ ] Produtos aparecem no grid
- [ ] Seleção de produtos funciona (marcação visual)
- [ ] Aviso quando tenta selecionar mais de um da mesma categoria
- [ ] Botão "VISUALIZAR" aparece quando há foto e produtos
- [ ] Botão "Favoritos" funciona
- [ ] Geração de looks funciona
- [ ] Redirecionamento para Tela 3 após gerar

### Tela 3: Resultado
- [ ] Imagem gerada aparece centralizada
- [ ] Botões Like/Dislike aparecem antes da votação
- [ ] Votação funciona (like/dislike)
- [ ] Botões de ação aparecem após votação:
  - [ ] Compartilhar
  - [ ] Comprar agora
  - [ ] Adicionar no carrinho
- [ ] Detalhes do produto aparecem
- [ ] Botões de navegação aparecem após votação:
  - [ ] Gerar novo look
  - [ ] Favoritos
  - [ ] Voltar para início
- [ ] Modal de favoritos funciona
- [ ] Compartilhamento funciona

---

## 🔧 Variáveis de Ambiente Necessárias

Certifique-se de ter configurado no `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
# ou a URL do paineladm em produção
```

---

## 🐛 Problemas Comuns

### Imagem de fundo não aparece
- Verifique se `closet-background.png` está em `public/images/`
- Verifique o console do navegador para erros 404

### Erro ao gerar looks
- Verifique se o backend está rodando
- Verifique as variáveis de ambiente
- Verifique o console do navegador para erros

### Redirecionamento não funciona
- Verifique se está logado (localStorage)
- Verifique o console para erros de navegação

---

## 📝 Notas

- O app usa `localStorage` para manter a sessão do cliente
- O app usa `sessionStorage` para passar dados entre telas
- Todas as imagens são otimizadas para mobile
- O design é responsivo e funciona em diferentes tamanhos de tela

---

**Boa sorte com os testes! 🎉**

