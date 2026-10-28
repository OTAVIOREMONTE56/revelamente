# RevelaMente

Site independente, gratuito, sem backend ou dependências. Todo o projeto está nesta pasta. Não há ligação com o site anterior.

## Visualizar

Abra `index.html` diretamente no Chrome, Edge, Firefox ou Safari. A página inicial e os seis testes funcionam sem servidor local. Os scripts são carregados em ordem com `defer`, sem módulos ou requisições de dados.

O navegador pode restringir o salvamento entre arquivos locais e o compartilhamento; para testar essas funções no mesmo contexto da publicação, use um servidor HTTP. No Visual Studio Code, instale **Live Server**, abra esta pasta e escolha **Open with Live Server** em `index.html`.

Se tiver Python instalado, outra opção é abrir um terminal nesta pasta e executar `python -m http.server 8080`. Depois visite `http://localhost:8080`. Para testar no celular na mesma rede Wi-Fi, use o IP local do computador e a porta do servidor, permitindo o acesso na rede privada se solicitado pelo sistema.

## Publicar gratuitamente no GitHub Pages

Veja o passo a passo detalhado em [PUBLICAR.md](PUBLICAR.md), incluindo envio pelo navegador e correção de erros de publicação. O `index.html` já está na raiz deste projeto; envie o conteúdo desta pasta para a raiz do novo repositório.

1. Crie um **novo repositório público**, por exemplo `revelamente`. Não use o repositório do projeto anterior.
2. Envie o **conteúdo desta pasta** para a raiz desse repositório. O arquivo `index.html` precisa ficar na raiz. Inclua `.nojekyll`.
3. Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`. Salve.
4. Aguarde o GitHub informar o endereço da publicação: `https://SEU-USUARIO.github.io/revelamente/`.
5. Abra a página e um teste direto no celular. O site utiliza caminhos relativos e funciona em subpastas do GitHub Pages.

Não é necessário contratar hospedagem, banco de dados ou domínio. A publicação ainda precisa ser feita na sua conta GitHub; nenhum repositório ou site foi publicado automaticamente.

## Links para TikTok

Substitua `SEU-USUARIO` pelo seu usuário real:

| Teste | Caminho após `https://SEU-USUARIO.github.io/revelamente/` |
|---|---|
| Descubra seu lado oculto | `quizzes/lado-oculto.html` |
| Você é razão ou emoção? | `quizzes/razao-ou-emocao.html` |
| Qual é seu estilo de amar? | `quizzes/estilo-de-amar.html` |
| Descubra seu maior ponto forte | `quizzes/ponto-forte.html` |
| Você é introvertido ou extrovertido? | `quizzes/introvertido-ou-extrovertido.html` |
| Como você reage sob pressão? | `quizzes/sob-pressao.html` |

Cada HTML inclui título, descrição, Open Graph e Twitter Card próprios. O compartilhamento usa o recurso nativo do aparelho ou copia o texto e o link; há um campo para cópia manual quando a área de transferência não estiver disponível. A mensagem inclui o título do resultado. O link abre o teste, sem expor respostas individuais.

## Organização e manutenção

- `data/catalog.js`: nomes, descrições e identidade dos cards.
- `data/questions.js`: 10 enunciados por teste.
- `data/answers.js`: quatro alternativas por pergunta.
- `data/results.js`: quatro perfis por teste, com título, interpretação e reflexão.
- `assets/app.js`: navegação, pontuação, armazenamento e compartilhamento.
- `assets/style.css`: cores, componentes e adaptação às telas.
- `quizzes/`: páginas diretamente acessíveis e seus metadados sociais.

Cada alternativa soma um ponto ao perfil na mesma posição (A → perfil 0, B → 1, C → 2, D → 3). Vence o perfil com maior contagem. Se houver empate, todos os títulos empatados são informados; a primeira interpretação é mostrada como uma leitura possível, sem apresentar um vencedor exclusivo. As posições não correspondem a melhor ou pior. Ao alterar alternativas, preserve a correspondência com os perfis. O teste é recreativo, sem validação científica.

Para incluir um quiz, acrescente uma entrada em cada arquivo de dados e copie um HTML de `quizzes/`, ajustando `data-quiz`, título e metadados. O catálogo inclui o novo card automaticamente. Para mudar a logo, substitua o conteúdo da constante `logo` em `assets/app.js` por uma imagem local com texto alternativo e tamanho definido. A marca tipográfica atual já funciona sem uma imagem oficial.

## Privacidade e acessibilidade

Não há login, cookies de rastreamento, analytics ou requisições externas. O progresso fica em `localStorage`, expira após sete dias sem respostas e é limpo na próxima visita. Existe uma ação de limpeza no rodapé. Quando o armazenamento está bloqueado, o teste funciona na aba atual. O compartilhamento depende das permissões do navegador e funciona melhor sob HTTPS, fornecido pelo GitHub Pages.

A interface oferece navegação por teclado, foco visível, link para pular ao conteúdo, progresso com rótulo, foco no enunciado novo e respeito à preferência de movimento reduzido. O CSS adapta a experiência para celulares e computadores. Uma verificação em aparelhos Android e iPhone reais continua recomendada antes da divulgação.
