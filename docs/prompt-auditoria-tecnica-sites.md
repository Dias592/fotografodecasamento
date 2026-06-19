# Prompt de Auditoria Técnica e Correção — Sites Next.js na Hostinger

> Prompt reutilizável para diagnosticar e corrigir problemas técnicos de SEO,
> deploy e configuração em sites Next.js hospedados na Hostinger (ou similar).
> Baseado nas correções reais aplicadas em ivandiasfotografo.com.br (junho 2026).

---

## Como usar

Copie o bloco abaixo e cole no Claude Code (ou outro assistente de código)
com o projeto aberto. Substitua `[DOMINIO]` pelo domínio do site e
`[REPO]` pelo caminho do repositório GitHub.

---

## Prompt

```
Você é um engenheiro de SEO técnico e DevOps. Vou pedir que faça uma
auditoria completa do site [DOMINIO], hospedado na Hostinger com
integração GitHub. O repositório é [REPO].

Execute TODAS as etapas abaixo em sequência. Não pule nenhuma. Reporte
o resultado de cada etapa antes de prosseguir para a próxima.

═══════════════════════════════════════════════════════════════════════
FASE 1 — DIAGNÓSTICO (não mude nada, só observe)
═══════════════════════════════════════════════════════════════════════

1.1 — STATUS DO SITE
  Rodar:
    curl -sI https://[DOMINIO]/
    curl -sI https://[DOMINIO]/[ALGUMA-PAGINA-INTERNA]/
    curl -sI https://www.[DOMINIO]/
  Reportar: HTTP status de cada um. Se algum retornar 503, 404, ou
  redirect inesperado, anotar.

1.2 — WWW vs NON-WWW
  Rodar:
    curl -sI https://[DOMINIO]/ | grep -i location
    curl -sI https://www.[DOMINIO]/ | grep -i location
  Reportar: existe redirect 301 de www→non-www (ou vice-versa)?
  Se ambos retornam 200, o site tem duplicação de domínio canônico.

1.3 — SITEMAP
  Rodar:
    curl -sI https://[DOMINIO]/sitemap.xml
    curl -s https://[DOMINIO]/sitemap.xml | grep -c "<url>"
  Reportar: sitemap existe? Quantas URLs? O domínio dentro do sitemap
  é consistente (todas www ou todas sem www)?

1.4 — ENCODING DO CÓDIGO-FONTE
  No projeto local, rodar:
    grep -rl "Ã§\|Ã£\|Ã©\|Ã³\|Ã¡\|Ãª\|Ã­\|Ãº\|â€\|â†'" \
      --include="*.ts" --include="*.tsx" --include="*.json" \
      --include="*.md" --include="*.js" .
  Se retornar arquivos, há mojibake (UTF-8 lido como Latin-1).
  Listar os arquivos afetados.

1.5 — NEXT.JS CONFIG
  Ler next.config.js e verificar:
  - output: 'export' está presente? (site estático)
  - distDir está definido? (conflito potencial)
  - trailingSlash: true? (afeta URLs canônicas)
  - images.unoptimized: true? (necessário para export)

1.6 — DEPLOY / HOSTING
  Verificar:
  - Existe .github/workflows/*.yml? (GitHub Actions)
  - O workflow deploya via FTP, GitHub Pages, ou outro?
  - A Hostinger está usando integração nativa com GitHub?
  Checar últimos deploys via API:
    curl -s "https://api.github.com/repos/[OWNER]/[REPO]/actions/runs?per_page=5" \
      | node -e "const d=require('fs').readFileSync(0,'utf8');const j=JSON.parse(d);
        j.workflow_runs.forEach(r=>console.log(r.conclusion,r.created_at.slice(0,19),
        r.head_commit.message.slice(0,60)))"
  Se todos falharam: identificar em qual step falha.

1.7 — JSON-LD STRUCTURED DATA
  Localizar o template de schema (geralmente lib/schema.ts ou similar).
  Verificar se getArticleSchema (ou equivalente) tem:
  - "@type": "BlogPosting" (não apenas "Article")
  - publisher como Organization com logo (não Person)
  - image dinâmica por artigo (não hardcoded)
  - datePublished e dateModified em ISO8601 com timezone
  - mainEntityOfPage como objeto WebPage

1.8 — META TAGS
  Localizar generateMetadata no app/blog/[slug]/page.tsx (ou equivalente).
  Verificar:
  - Title: está dentro de 60 caracteres? (incluindo template suffix)
  - Description: está dentro de 155 caracteres?
  - og:image está presente?
  - og:url coincide com canonical?
  - canonical tem trailing slash consistente com trailingSlash config?

1.9 — SITEMAP GENERATION
  Verificar next-sitemap.config.js (ou equivalente):
  - siteUrl está correto (com ou sem www, consistente)?
  - O sitemap é gerado para TODAS as páginas? Comparar count do
    sitemap com count de páginas reais.
  - O build script copia o sitemap para o diretório correto?

═══════════════════════════════════════════════════════════════════════
FASE 2 — CORREÇÕES (aplicar em ordem de prioridade)
═══════════════════════════════════════════════════════════════════════

PRIORIDADE 1 — DEPLOY FUNCIONAL
Se o deploy está quebrado:
  a) Se Hostinger usa integração nativa com GitHub:
     - Verificar se a config predefinida é "Next.js"
     - Se output: 'export' está no next.config.js MAS a Hostinger
       roda next start (SSR):
       REMOVER output: 'export' e distDir do next.config.js
       MUDAR diretório de saída na Hostinger de 'out' para '.next'
     - Se o site é realmente estático e não precisa de SSR:
       MANTER output: 'export' MAS mudar config da Hostinger para
       "Static site" (se disponível) em vez de "Next.js"
  b) Se usa GitHub Actions com FTP:
     - Verificar se as credenciais FTP (secrets) estão corretas
     - Testar conexão FTP manualmente
  c) Se usa GitHub Pages:
     - Verificar se o workflow de Pages está configurado corretamente

PRIORIDADE 2 — ENCODING (MOJIBAKE)
Se encontrou arquivos com mojibake na etapa 1.4:
  Mapa de substituição:
    Ã£ → ã    Ã¡ → á    Ã¢ → â    Ã© → é    Ãª → ê
    Ã­ → í    Ã³ → ó    Ã´ → ô    Ãº → ú    Ã§ → ç
    Ã€ → À    Ã‰ → É    Ã" → Ó    Ãƒ → Ã    Ã‡ → Ç
    â€™ → '   â€œ → "   â€ → "   â€" → –    â€" → —
    â†' → →   Â© → ©    Â· → ·    Â  → (remover)
  Aplicar em todos os arquivos afetados.
  REESCREVER o arquivo inteiro se necessário (não patch por patch).
  Confirmar com grep que zero ocorrências restam.

PRIORIDADE 3 — JSON-LD / STRUCTURED DATA
Atualizar getArticleSchema para incluir:
  {
    "@type": "BlogPosting",
    "headline": titulo.slice(0, 110),
    "image": [urlCompletaDaImagemDoArtigo],
    "author": {
      "@type": "Person",
      "name": "[AUTOR]",
      "url": "https://[DOMINIO]/sobre/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "[NOME DO NEGOCIO]",
      "logo": {
        "@type": "ImageObject",
        "url": "https://[DOMINIO]/[CAMINHO-DO-LOGO]"
      }
    },
    "datePublished": "YYYY-MM-DDT00:00:00-03:00",
    "dateModified": "YYYY-MM-DDT00:00:00-03:00",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://[DOMINIO]/blog/[slug]/"
    }
  }
  Confirmar que o componente que renderiza o schema passa a imagem
  real do artigo (não uma imagem genérica hardcoded).

PRIORIDADE 4 — META TAGS (TITLE, DESCRIPTION, OG)
  a) Title: criar função truncateTitle(title, max=60) que corta na
     última palavra antes do limite. Usar title: { absolute: ... }
     no generateMetadata para evitar que o template suffix estoure
     o limite.
  b) Description: truncar a 155 chars com corte em espaço.
  c) Open Graph: adicionar ao generateMetadata:
     openGraph: {
       images: [{ url: post.image, width: 1200, height: 630 }],
       url: '/blog/[slug]/',
       type: 'article',
       publishedTime: post.date,
       modifiedTime: post.updatedDate || post.date,
     }
  d) Twitter card: adicionar twitter: { card: 'summary_large_image' }
  e) Canonical: garantir trailing slash consistente.

PRIORIDADE 5 — WWW vs NON-WWW
  a) Escolher domínio canônico (recomendado: sem www).
  b) Atualizar SITE_URL em TODOS os arquivos do projeto:
       grep -rl "https://www\.[DOMINIO]" --include="*.ts" \
         --include="*.tsx" --include="*.js" .
     Substituir por https://[DOMINIO] (sem www).
  c) Para redirect 301:
     - Hostinger com CDN (hcdn): .htaccess NÃO funciona para
       redirects. Configurar no painel Hostinger:
       Domínios → Redirecionamentos → www → non-www
     - Hostinger sem CDN / Apache puro: criar public/.htaccess:
         RewriteEngine On
         RewriteCond %{HTTPS} off
         RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
         RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
         RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
     - Next.js SSR (sem export): middleware.ts funciona:
         import { NextResponse } from 'next/server';
         import type { NextRequest } from 'next/server';
         export function middleware(request: NextRequest) {
           const host = request.headers.get('host') || '';
           if (host.startsWith('www.')) {
             const url = new URL(request.url);
             url.host = host.replace('www.', '');
             url.protocol = 'https';
             return NextResponse.redirect(url, 301);
           }
           return NextResponse.next();
         }
         export const config = { matcher: '/:path*' };

PRIORIDADE 6 — SITEMAP COMPLETO
  a) Verificar se next-sitemap.config.js tem siteUrl correto.
  b) Se o sitemap tem menos URLs que o total de páginas:
     - Confirmar que o build script roda next-sitemap DEPOIS do
       next build
     - Se output: 'export': o sitemap é gerado em public/ mas
       precisa ser copiado para out/:
         "build": "next build && next-sitemap && node -e \"
           require('fs').copyFileSync('public/sitemap.xml','out/sitemap.xml');
           require('fs').copyFileSync('public/robots.txt','out/robots.txt')\""
     - Se SSR (sem export): o sitemap em public/ é servido
       automaticamente pelo Next.js. Nenhuma cópia necessária.
  c) Remover postbuild duplicado se existir.

PRIORIDADE 7 — INDEXNOW
  Após corrigir tudo acima, submeter todas as URLs ao IndexNow:
  a) Gerar chave: criar arquivo public/[chave].txt contendo a chave
  b) POST para https://api.indexnow.org/indexnow:
     {
       "host": "[DOMINIO]",
       "key": "[CHAVE]",
       "keyLocation": "https://[DOMINIO]/[CHAVE].txt",
       "urlList": ["https://[DOMINIO]/pagina1/", ...]
     }
  c) Usar curl para o POST (WebFetch só faz GET):
     curl -s -o /dev/null -w "%{http_code}" -X POST \
       "https://api.indexnow.org/indexnow" \
       -H "Content-Type: application/json; charset=utf-8" \
       -d @payload.json

═══════════════════════════════════════════════════════════════════════
FASE 3 — VALIDAÇÃO PÓS-CORREÇÃO
═══════════════════════════════════════════════════════════════════════

3.1 — Confirmar que TypeScript compila sem erros:
  npx tsc --noEmit

3.2 — Confirmar que o build passa:
  npm run build
  Reportar: quantas páginas geradas, tempo de build.

3.3 — Confirmar que o deploy completa com sucesso na Hostinger.

3.4 — Testar amostra de URLs:
  curl -sI https://[DOMINIO]/
  curl -sI https://[DOMINIO]/blog/[ARTIGO-ANTIGO]/
  curl -sI https://[DOMINIO]/blog/[ARTIGO-NOVO]/
  Todos devem retornar 200.

3.5 — Verificar sitemap em produção:
  curl -s https://[DOMINIO]/sitemap.xml | grep -c "<url>"
  Deve refletir o total real de páginas.

3.6 — Testar redirect www:
  curl -sI https://www.[DOMINIO]/
  Deve retornar 301 → https://[DOMINIO]/

3.7 — Verificar JSON-LD de um artigo:
  curl -s https://[DOMINIO]/blog/[SLUG]/ | grep -o '"@type":"BlogPosting"'
  Deve encontrar BlogPosting (não Article).

3.8 — Verificar OG tags:
  curl -s https://[DOMINIO]/blog/[SLUG]/ | grep 'og:image'
  Deve ter og:image com URL da imagem do artigo.

3.9 — Verificar title length:
  curl -s https://[DOMINIO]/blog/[SLUG]/ | grep -o '<title>[^<]*</title>'
  Deve ter no máximo 60 caracteres.

═══════════════════════════════════════════════════════════════════════
FASE 4 — RELATÓRIO FINAL
═══════════════════════════════════════════════════════════════════════

Gerar relatório com:
  | Problema              | Antes        | Depois       | Status |
  |-----------------------|-------------|-------------|--------|
  | Deploy                | [status]    | [status]    | ✅/❌  |
  | Páginas 503           | [count]     | 0           | ✅/❌  |
  | Sitemap URLs          | [count]     | [count]     | ✅/❌  |
  | JSON-LD válido        | Não         | Sim         | ✅/❌  |
  | OG tags completas     | Não         | Sim         | ✅/❌  |
  | Title ≤60 chars       | [count err] | 0           | ✅/❌  |
  | Description ≤155      | [count err] | 0           | ✅/❌  |
  | www redirect 301      | Não         | Sim         | ✅/❌  |
  | Encoding UTF-8        | [count err] | 0           | ✅/❌  |
  | IndexNow enviado      | Não         | [count] URLs| ✅/❌  |

```

---

## Problemas mais comuns e soluções rápidas

### 1. Hostinger + Next.js = 503 em todas as páginas
**Causa**: `output: 'export'` no next.config.js + Hostinger rodando `next start` (SSR).
**Fix**: remover `output: 'export'` e `distDir`, mudar diretório de saída na Hostinger para `.next`.

### 2. Sitemap com menos URLs que o real
**Causa**: next-sitemap gera em `public/` mas o deploy usa `out/` (com export).
**Fix**: copiar sitemap de `public/` para `out/` no build script, ou remover `output: 'export'`.

### 3. Mojibake (Ã§ em vez de ç)
**Causa**: arquivo salvo com encoding Windows-1252 em vez de UTF-8.
**Fix**: reescrever o arquivo com encoding correto. Usar o mapa de substituição da Prioridade 2.

### 4. JSON-LD inválido no Google
**Causa**: publisher como Person (precisa ser Organization), image hardcoded, dates sem timezone.
**Fix**: atualizar getArticleSchema com publisher Organization + logo + image dinâmica.

### 5. .htaccess ignorado na Hostinger
**Causa**: CDN da Hostinger (hcdn) processa requests antes do Apache.
**Fix**: configurar redirects no painel Hostinger, não via .htaccess.

### 6. GitHub Actions FTP falha mas Hostinger deploya normalmente
**Causa**: a Hostinger tem integração nativa com GitHub (separada do Actions).
**Fix**: ignorar/desativar o workflow de FTP. Usar a integração nativa.

---

## Checklist de protocolo de publicação (para sites com blog/artigos)

Antes de considerar qualquer artigo "publicado":

- [ ] HTML gerado sem erros (build passa)
- [ ] JSON-LD BlogPosting + FAQPage válidos
- [ ] Title ≤ 60 chars, description ≤ 155 chars
- [ ] og:image, og:title, og:description, og:url presentes
- [ ] Canonical URL correta (com/sem www consistente, trailing slash)
- [ ] Pelo menos 1 link de entrada (footer, hub, artigo relacionado)
- [ ] Pelo menos 1 link de saída (contato, artigo do mesmo cluster)
- [ ] Sitemap inclui a nova URL
- [ ] IndexNow disparado para a(s) nova(s) URL(s)
- [ ] Página retorna HTTP 200 em produção após deploy
