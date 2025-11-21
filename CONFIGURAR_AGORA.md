# ⚠️ IMPORTANTE: Configure Antes de Deployar!

## 🎯 Você está na tela de configuração do projeto

Vejo que o repositório `apps-cliente-modelo1` está sendo importado. **ANTES de clicar em "Implantar"**, você precisa fazer uma configuração CRÍTICA!

## 🔴 PASSO CRÍTICO: Alterar Root Directory

### **O que fazer:**

1. **Encontre a seção "Diretório Raiz" (Root Directory)**
   - Você deve ver um campo com o valor `./`
   - Ao lado tem um botão **"Editar"**

2. **Clique no botão "Editar"**

3. **Altere o valor de `./` para:**
   ```
   apps-cliente/modelo-1
   ```
   ⚠️ **Digite exatamente assim**: `apps-cliente/modelo-1`

4. **Confirme a alteração**

## ✅ Outras Configurações (Opcional agora)

### **Configurações de Compilação:**
Você pode expandir `> Configurações de compilação e saída` e verificar:
- **Build Command**: Deve ser `npm run build` (padrão)
- **Output Directory**: Deve ser `.next` (padrão)
- **Install Command**: Deve ser `npm install` (padrão)

### **Variáveis de Ambiente:**
Você pode adicionar agora OU depois do deploy:
- `NEXT_PUBLIC_BACKEND_URL=https://www.experimenteai.com.br`
- `NEXT_PUBLIC_PAINELADM_URL=https://www.experimenteai.com.br`
- `NEXT_PUBLIC_MODELO1_URL=https://apps-cliente-modelo1.vercel.app` (você vai saber depois do deploy)

**💡 Dica**: É mais fácil adicionar depois do primeiro deploy, quando você souber a URL exata.

## 🚀 Depois de Configurar

1. ✅ **Root Directory alterado para**: `apps-cliente/modelo-1`
2. ✅ **Configurações verificadas** (opcional)
3. ✅ **Clique em "Implantar"** (botão cinza no final)

## ⏱️ O que acontece depois:

1. O Vercel vai fazer o build (pode levar alguns minutos)
2. Você verá os logs do build em tempo real
3. Se der erro, veja os logs para identificar o problema
4. Se funcionar, você receberá uma URL como:
   ```
   https://apps-cliente-modelo1.vercel.app
   ```

## 📝 Checklist Antes de Clicar em "Implantar":

- [ ] Root Directory alterado para `apps-cliente/modelo-1` ⚠️ **OBRIGATÓRIO**
- [ ] Nome do projeto está correto: `apps-cliente-modelo1` ✅
- [ ] Equipe selecionada está correta ✅
- [ ] Configurações de build verificadas (opcional)

## 🎯 Resumo Rápido:

1. **Clique em "Editar"** ao lado de "Diretório Raiz"
2. **Mude de `./` para `apps-cliente/modelo-1`**
3. **Clique em "Implantar"**
4. **Aguarde o build**
5. **Depois adicione as variáveis de ambiente**

---

**⚠️ NÃO ESQUEÇA**: O Root Directory DEVE ser `apps-cliente/modelo-1`, não `./`!

