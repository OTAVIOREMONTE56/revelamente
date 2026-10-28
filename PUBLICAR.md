# Publicar o RevelaMente no GitHub Pages

O projeto está pronto para hospedagem estática, sem instalação ou compilação. Mantenha um repositório exclusivo para ele.

## 1. Criar o repositório

No GitHub, escolha **New repository**, nomeie como `revelamente`, selecione **Public** e crie o repositório. Você pode marcar a opção de criar um README para facilitar o primeiro envio. Não use o repositório do site de relacionamentos.

## 2. Enviar os arquivos

Na aba **Code**, escolha **Add file → Upload files** (ou **uploading an existing file**, se o repositório estiver vazio).

Abra a pasta local `revelamente` e envie seu conteúdo, incluindo as pastas. Não envie a pasta externa inteira e não envie o ZIP: o GitHub não extrai ZIPs para publicar.

A estrutura na aba Code deve começar assim:

```text
index.html
.nojekyll
assets/
  app.js
  style.css
  favicon.svg
data/
  catalog.js
  questions.js
  answers.js
  results.js
quizzes/
  lado-oculto.html
  razao-ou-emocao.html
  estilo-de-amar.html
  ponto-forte.html
  introvertido-ou-extrovertido.html
  sob-pressao.html
```

Os arquivos de instruções também podem ser enviados. Confirme com **Commit changes** na branch `main`. Se `.nojekyll` não tiver sido incluído pelo seletor, use **Add file → Create new file**, digite `.nojekyll`, deixe vazio e confirme.

O `index.html` deve aparecer imediatamente ao abrir a aba Code. Se aparecer apenas uma pasta `revelamente`, os arquivos foram enviados um nível abaixo do necessário.

## 3. Ativar a publicação

Abra **Settings → Pages**. Em **Build and deployment**:

- **Source:** Deploy from a branch.
- **Branch:** main.
- **Folder:** / (root).

Clique em **Save** e aguarde a publicação. A documentação informa que isso pode levar até dez minutos. O endereço aparecerá nessa tela, com a opção **Visit site**. Para esse nome de repositório, será `https://SEU-USUARIO.github.io/revelamente/`.

## 4. Conferir e divulgar

Abra o endereço HTTPS no computador e no celular. Teste um quiz até o resultado, refaça e compartilhe. Recarregue no meio de outro teste para conferir a retomada. O resultado compartilhado aponta para o quiz online.

Para TikTok, use os links diretos listados no README, substituindo o usuário pelo seu. Não divulgue caminhos `file://` ou `localhost`: eles só funcionam no dispositivo local.

## Se algo não aparecer

- **404 na página inicial:** confira `index.html` na raiz, a branch `main` e `/ (root)` em Pages.
- **Tela escura:** confira se as pastas `data` e `assets` foram enviadas completas; recarregue com Ctrl + Shift + R. O projeto já usa scripts clássicos com `defer`, sem os módulos que causavam o bloqueio local anterior.
- **Visual sem estilo:** preserve os nomes e letras minúsculas de arquivos e pastas; o servidor distingue maiúsculas de minúsculas.
- **Mudança ainda não apareceu:** aguarde a execução na aba Actions. Confira erros de publicação nessa aba.

O projeto usa caminhos relativos, mantém a subpasta do repositório e não depende de domínio fixo. A publicação ainda precisa ser ativada na sua conta; preparar os arquivos não publica o site automaticamente.

Referências oficiais consultadas:

- [Criar um site GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Configurar a origem da publicação](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
