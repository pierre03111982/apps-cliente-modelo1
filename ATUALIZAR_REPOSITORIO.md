# Como Atualizar o Repositório do Modelo 2 no GitHub

## Passo 1: Criar o Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `apps-cliente-modelo2` (ou outro nome de sua escolha)
   - **Description**: (opcional) "Aplicativo cliente Modelo 2 - Experimente AI"
   - **Visibility**: Escolha Public ou Private
   - **NÃO marque** "Add a README file" (já temos arquivos)
3. Clique em **"Create repository"**

## Passo 2: Atualizar o Remote Local

Após criar o repositório, execute os seguintes comandos no terminal:

```bash
cd E:\projetos\apps-cliente\modelo-2

# Remover o remote antigo (que aponta para modelo-1)
git remote remove origin

# Adicionar o novo remote (substitua SEU_USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU_USUARIO/apps-cliente-modelo2.git

# Verificar se foi configurado corretamente
git remote -v

# Fazer push para o novo repositório
git push -u origin main
```

## Alternativa: Se já criou o repositório

Se você já criou o repositório, me informe o nome completo (ex: `pierre03111982/apps-cliente-modelo2`) e eu atualizo automaticamente!

