# Prompt para criar um novo site (Claude Code)

Copie este documento, preencha os campos `[ENTRE COLCHETES]` com as informações
do novo nicho/cliente, e cole no Claude Code dentro da pasta do novo projeto.
Ele já contém todo o padrão de qualidade ("10/10") usado no site
ivandiasfotografo.com.br.

---

## 1. Briefing do negócio

- **Nome do negócio:** [ex: Studio Fulano Fotografia]
- **Profissional/responsável:** [nome]
- **Nicho/serviço principal:** [ex: fotógrafo de eventos corporativos]
- **Cidade/região de atuação:** [ex: São Paulo - Zona Sul]
- **Bairros/cidades vizinhas a cobrir no SEO local:** [lista de 10-30 bairros/cidades]
- **Diferenciais:** [ex: 15 anos de experiência, 700+ casamentos, equipamento X]
- **Serviços oferecidos:** [lista, ex: Cobertura completa, Pré-wedding, Drone, Mini wedding]
- **Contatos:** WhatsApp [num], telefone [num], e-mail [email], Instagram [@user]
- **Domínio:** [https://www.dominio.com.br]
- **Paleta de cores / identidade visual:** [se já existir, descrever ou anexar]
- **Imagens disponíveis:** [pasta/local das fotos do portfólio]

---

## 2. Stack e estrutura técnica

Crie o projeto em **Next.js (App Router) com export estático**, replicando exatamente
esta configuração:

- `next.config.js`:
  - `reactStrictMode: true`
  - `output: 'export'`, `distDir: 'out'`, `trailingSlash: true`
  - `compress: true`
  - `images.unoptimized: true`
  - `experimental.optimizePackageImports: ['framer-motion']`
- Tailwind CSS para estilos
- Estrutura: `app/`, `components/`, `lib/`, `public/`, `scripts/`

---

## 3. Páginas a criar

- `/` Home — hero, serviços, prova social/depoimentos, CTA WhatsApp
- `/sobre`
- `/servicos` + uma página por serviço (`/servicos/[slug]`)
- `/portfolio` (galeria categorizada)
- `/contato` (WhatsApp, telefone, e-mail, mapa)
- `/blog` + artigos individuais (`/blog/[slug]`)

### Estratégia de conteúdo do blog (SEO local)
- 1 artigo por bairro/cidade da lista de cobertura local (problema/dúvida + como o serviço resolve)
- Artigos informacionais: como escolher o profissional, preços, contrato, prazos,
  dúvidas frequentes do nicho
- Meta: 50-80 artigos
- Todos com `lastmod` atualizado no sitemap a cada build

---

## 4. Componentes essenciais

- Navbar responsiva
- Footer com dados de contato + redes sociais
- WhatsAppFloat (botão flutuante)
- LoadingScreen
- PageTransition (framer-motion)
- SchemaOrg (componente que injeta JSON-LD)
- Skip link de acessibilidade (`#main-content`)

---

## 5. SEO técnico (app/layout.tsx)

Configurar `metadata` completo:
- `metadataBase` com a URL do domínio
- `title.default` + `title.template` (`%s | [Nome do Negócio]`)
- `description` única com palavra-chave principal + cidade + diferencial
- `keywords`: variações de "[serviço] em [cidade]" + bairros
- `alternates.canonical` em todas as páginas
- `openGraph` completo (imagem 1200x630, locale `pt_BR`)
- `twitter` card `summary_large_image`
- `robots: { index: true, follow: true }`
- **`verification.google`**: deixar pronto para receber o código do Search Console
  (não esquecer de preencher depois)
- favicon, shortcut icon, apple-touch-icon

---

## 6. Schema.org (lib/schema.ts + components/SchemaOrg.tsx)

Implementar e injetar no `<body>`:
- `LocalBusiness` (nome, área de atuação, telefone, horário)
- `Person` (profissional)
- `WebSite`
- `Service` (um por serviço)
- `ContactPage`
- `Blog`
- `FAQPage` (FAQ da home)

---

## 7. Sitemap e robots (next-sitemap.config.js)

- `siteUrl`: domínio com `https://www.`
- `generateRobotsTxt: true`
- `exclude: ['/api/*']`
- `transform` com prioridades:
  - Home: 1.0 | Portfólio/Serviços principal: 0.9 | Páginas de serviço: 0.8
  - Contato: 0.8 | Sobre/Blog index: 0.7 | Artigos de blog: 0.6
- `lastmod`: data do build
- `robotsTxtOptions.policies`: liberar `*`, Googlebot, Googlebot-Image, Bingbot,
  GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, anthropic-ai, facebookexternalhit, Twitterbot, WhatsApp
- Rodar `next-sitemap` no script de build

---

## 8. Analytics

- Google Analytics 4 via `next/script` (`strategy="afterInteractive"`)
- ID do GA4: [G-XXXXXXXXXX] (criar propriedade no GA antes ou deixar placeholder)

---

## 9. Design e UX

- Mobile-first, sem cortes/quebras de imagens em telas pequenas
- `aspect-ratio`/`object-fit` corretos em todas as imagens
- Animações leves (framer-motion), sem prejudicar performance
- Testar Core Web Vitals após build

---

## 10. Deploy (GitHub Actions → Hostinger via FTP)

Criar `.github/workflows/deploy.yml`:
- Trigger: `push` em `main` + `workflow_dispatch`
- Steps: checkout → setup-node v20 (cache npm) → `npm ci` → `npm run build`
- Deploy com `SamKirkland/FTP-Deploy-Action@v4.3.5`
  - `local-dir: ./out/`
  - `server-dir: /public_html/`
  - `dangerous-clean-slate: false`
- Avisar para cadastrar os secrets no GitHub: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

---

## 11. Pós-deploy (passos manuais que o usuário fará)

Ao final, listar para o usuário (não executar sozinho):
1. Confirmar secrets de FTP cadastrados no GitHub e primeiro deploy concluído
2. Criar/configurar Google Search Console, verificar propriedade e preencher
   `verification.google` no `layout.tsx`
3. Enviar `https://www.dominio.com.br/sitemap.xml` no Search Console
4. Solicitar indexação manual da Home e páginas principais
5. Configurar Google Meu Negócio (Perfil da Empresa)
6. Enviar sitemap também no Bing Webmaster Tools
7. Testar preview de `og:image` no debugger do WhatsApp/Facebook

---

## 12. Critério de pronto ("10/10")

1. `npm run build` sem erros
2. Todas as páginas com title/description/canonical únicos
3. Schemas válidos (validator.schema.org)
4. Sitemap e robots gerados corretamente
5. GA4 configurado
6. Mobile sem quebras de layout
7. WhatsApp/contato funcionando em todas as páginas
8. Blog com conteúdo local relevante (~50+ artigos)
9. Repositório git criado e código commitado
10. Workflow de deploy pronto (aguardando apenas secrets do usuário)
