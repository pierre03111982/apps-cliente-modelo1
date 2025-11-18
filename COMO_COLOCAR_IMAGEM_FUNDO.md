# 📸 Como Colocar a Imagem de Fundo do Closet

## ✅ Passo 1: Pasta Criada
A pasta já foi criada em:
```
E:\projetos\apps-cliente\modelo-1\public\images\
```

## 📋 Passo 2: Colocar a Imagem
1. **Copie sua imagem** do closet de luxo
2. **Cole na pasta:** `E:\projetos\apps-cliente\modelo-1\public\images\`
3. **Renomeie para:** `closet-background.jpg` (ou `.png` se for PNG)

### Formatos aceitos:
- ✅ `.jpg` ou `.jpeg`
- ✅ `.png`
- ✅ `.webp`

### Recomendações:
- **Resolução:** 1920x1080 ou maior
- **Tamanho:** até 5MB (para carregamento rápido)

## ⚙️ Passo 3: Verificar Configuração
O arquivo `src/lib/constants.ts` já está configurado para usar a imagem local:

```typescript
export const CLOSET_BACKGROUND_IMAGE = "/images/closet-background.jpg"
```

**Se sua imagem tiver outro nome**, edite essa linha no arquivo `src/lib/constants.ts`.

## 🚀 Passo 4: Testar
1. Inicie o servidor: `npm run dev`
2. Acesse: `http://localhost:3004/{lojistaId}/login`
3. Verifique se a imagem aparece corretamente

## 🔄 Se a Imagem Não Aparecer
1. Verifique se o arquivo está em: `public/images/closet-background.jpg`
2. Verifique o nome do arquivo (deve ser exatamente `closet-background.jpg`)
3. Reinicie o servidor Next.js (`Ctrl+C` e depois `npm run dev`)
4. Limpe o cache do navegador (`Ctrl+Shift+R`)

## 📝 Exemplo de Estrutura Final:
```
modelo-1/
├── public/
│   └── images/
│       └── closet-background.jpg  ← SUA IMAGEM AQUI
├── src/
│   └── lib/
│       └── constants.ts  ← Já configurado!
```

---

**Pronto!** Após colocar a imagem, ela aparecerá automaticamente nas Telas 1 e 2! 🎨

