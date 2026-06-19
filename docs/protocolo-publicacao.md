# Protocolo Permanente de Publicação
### Ivan Dias Fotógrafo — checklist obrigatório para QUALQUER artigo novo

> Isto não é uma tarefa única — é um protocolo fixo. Sempre que um novo
> artigo for adicionado ao site (espaço/buffet, bairro, cidade, ou qualquer
> outro), o Claude Code deve rodar esta checklist completa antes de
> considerar a publicação concluída.

---

## Por que isso existe

Toda vez que um artigo é criado sem passar por este protocolo, ele corre o
risco de ficar "órfão" — existe no código, mas nenhum link no site aponta
para ele. Páginas órfãs demoram muito mais para serem indexadas pelo Google
e quase nunca são citadas por IA, porque não recebem nenhuma transferência
de autoridade de outras páginas do site.

---

## Checklist obrigatória — rodar para CADA artigo novo, sem exceção

### 1. Conteúdo do artigo (antes de publicar)
- [ ] H1 único, sem duplicar título de artigo já existente
- [ ] Resposta direta de 50-80 palavras logo após cada H2
- [ ] Pelo menos 1 tabela Markdown com dado concreto (preço, capacidade, etc.)
- [ ] Seção de FAQ com 6+ perguntas
- [ ] Schema JSON-LD (`BlogPosting` + `FAQPage` no mesmo `@graph`)
- [ ] Meta title e meta description únicos
- [ ] Data de publicação/atualização visível no HTML renderizado
- [ ] Linguagem segura sobre experiência (nunca afirmar caso específico não
      confirmado — ver banco de frases seguras do briefing de espaços)
- [ ] "15 anos" / "desde 2011" / "700+ casamentos" — nunca "2004" / "22 anos"

### 2. Link interno de SAÍDA (o artigo novo precisa linkar para fora)
- [ ] Link para o artigo de cidade/bairro/grupo correspondente (se for um
      espaço) OU para 2-3 espaços relevantes (se for um artigo de cidade)
- [ ] Link para a página de contato/orçamento (CTA de fundo de funil)
- [ ] Link para pelo menos 1 artigo do mesmo cluster temático (ex.: outro
      espaço da mesma cidade, outro bairro vizinho)

### 3. Link interno de ENTRADA (algo no site precisa apontar para o artigo novo)
- [ ] **Footer**: adicionar a URL na seção correspondente (Bairros, ABC
      Paulista, Espaços por Cidade, Grupos Parceiros, ou nova seção se for
      uma categoria nova). Se a seção ficar grande, usar menu expansível
      ou página-índice — mas a URL precisa estar acessível por clique.
- [ ] **Home**: se o artigo for de alta prioridade (ex.: cidade nova, grupo
      novo), considerar incluir/rotacionar nos cards da seção de blog da
      home.
- [ ] **Artigo hub relacionado**: se existir uma página-hub (ex.: artigo de
      "ABC Paulista" ou "Grupo Welucci"), adicionar o link do artigo novo
      lá dentro.

### 4. Técnico — pós-deploy
- [ ] Confirmar que o `sitemap.xml` em produção já inclui a nova URL
- [ ] Disparar push no IndexNow (agrupar URLs do mesmo dia em uma única
      requisição em lote)
- [ ] Se o artigo usa um nome de espaço/buffet real não confirmado por Ivan
      Dias, confirmar que está em "modo guia informativo" (banco de frases
      seguras), nunca alegando caso específico

### 5. Relatório final (toda vez)
Ao final de cada rodada de publicação (mesmo que seja 1 artigo só), gerar
um resumo de 3 linhas confirmando: quantos artigos novos, quais seções do
footer/home foram tocadas, e se o IndexNow foi disparado.

---

## Regra de ouro

**Nenhum artigo é considerado "publicado" só porque está no código e no ar.
Ele só está de fato publicado quando passa pelas 4 seções desta checklist.**
