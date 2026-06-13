# Playbook: Site Local "10/10" (Next.js + Hostinger + Google)

Checklist replicável para criar sites de nicho local (fotógrafo, advogado, dentista, etc.)
seguindo o mesmo padrão usado neste projeto. Use como roteiro do zero ao site indexado.

---

## 1. Stack e estrutura do projeto

- [ ] Next.js com `output: 'export'` (site estático, hospedagem barata tipo Hostinger)
- [ ] `next.config.js`:
  - `reactStrictMode: true`
  - `output: 'export'`, `distDir: 'out'`, `trailingSlash: true`
  - `compress: true`
  - `images.unoptimized: true` (obrigatório no export estático)
  - `experimental.optimizePackageImports` para libs pesadas (ex: framer-motion)
- [ ] Tailwind configurado (`tailwind.config.ts`)
- [ ] Estrutura de pastas: `app/`, `components/`, `lib/`, `public/`, `scripts/`

## 2. Conteúdo e páginas (mínimo para nicho local)

- [ ] Home (`/`) — hero, serviços, prova social, CTA
- [ ] Sobre (`/sobre`)
- [ ] Serviços (`/servicos` + páginas individuais por serviço, ex: `/servicos/pre-wedding`)
- [ ] Portfólio/Galeria (`/portfolio`)
- [ ] Contato (`/contato`) — WhatsApp, telefone, e-mail, mapa
- [ ] Blog (`/blog` + artigos individuais)

### Estratégia de blog para SEO local
- [ ] Artigos por **bairro/cidade da região de atuação** (ex: 1 artigo por cidade vizinha)
- [ ] Artigos por **tipo de serviço/dúvida do cliente** (como escolher, preços, contrato, prazos, etc.)
- [ ] Meta: 50-80 artigos cobrindo intenção de busca local + informacional
- [ ] Cada artigo com `lastmod` atualizado no sitemap

## 3. Design e UX

- [ ] Mobile-first, testar em viewport pequeno (sem cortes em imagens/heroes)
- [ ] Proporções de imagem corretas (object-fit, aspect-ratio definidos)
- [ ] Animações leves (framer-motion) sem travar performance
- [ ] Componentes reutilizáveis: Navbar, Footer, WhatsAppFloat, LoadingScreen, CustomCursor (opcional), PageTransition
- [ ] Skip link de acessibilidade (`#main-content`)
- [ ] Favicon e ícones (apple touch icon, shortcut icon)

## 4. SEO técnico (app/layout.tsx)

- [ ] `metadataBase` com URL completa do domínio (https://www.dominio.com.br)
- [ ] `title.default` + `title.template` (`%s | Nome do Negócio`)
- [ ] `description` única, com palavra-chave principal + localização + diferencial
- [ ] `keywords`: lista com variações de "[serviço] em [cidade]" + bairros principais
- [ ] `alternates.canonical` em todas as páginas
- [ ] `openGraph` completo (title, description, image 1200x630, locale `pt_BR`)
- [ ] `twitter` card `summary_large_image`
- [ ] `robots: { index: true, follow: true }`
- [ ] **`verification.google`** — preencher com o código do Search Console (NÃO deixar vazio)
- [ ] Ícones: favicon, shortcut, apple-touch-icon

## 5. Schema.org (lib/schema.ts + components/SchemaOrg.tsx)

Implementar e injetar no `<body>` via `<SchemaOrg schema={[...]} />`:
- [ ] `LocalBusiness` (nome, endereço/área de atuação, telefone, horário)
- [ ] `Person` (profissional responsável, se aplicável)
- [ ] `WebSite`
- [ ] `Service` (cada serviço oferecido)
- [ ] `ContactPage`
- [ ] `Blog`
- [ ] `FAQPage` (perguntas frequentes da home)

## 6. Sitemap e robots (next-sitemap.config.js)

- [ ] `siteUrl` = domínio com www e https
- [ ] `generateRobotsTxt: true`
- [ ] `exclude: ['/api/*']`
- [ ] `transform`: prioridades por tipo de página
  - Home: 1.0
  - Portfólio/Serviços principais: 0.9
  - Páginas de serviço individuais: 0.8
  - Contato: 0.8
  - Sobre/Blog index: 0.7
  - Artigos de blog: 0.6
- [ ] `lastmod` = data de geração (atualiza a cada build)
- [ ] `robotsTxtOptions.policies`: liberar `*`, Googlebot, Googlebot-Image, Bingbot,
      GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, anthropic-ai, facebookexternalhit, Twitterbot, WhatsApp
- [ ] Rodar `next-sitemap` no script de build (gera `sitemap.xml` e `robots.txt` em `out/`)

## 7. Analytics

- [ ] Google Analytics 4 (GA4) via `next/script`, `strategy="afterInteractive"`
  - Script `gtag/js?id=G-XXXXXXX`
  - `gtag('config', 'G-XXXXXXX')`
- [ ] (Opcional) Meta Pixel se houver tráfego pago via Instagram/Facebook

## 8. Build e deploy (GitHub Actions → Hostinger via FTP)

`.github/workflows/deploy.yml`:
- [ ] Trigger: `push` em `main` + `workflow_dispatch`
- [ ] Steps: checkout → setup-node (v20, cache npm) → `npm ci` → `npm run build`
- [ ] Deploy com `SamKirkland/FTP-Deploy-Action@v4.3.5`
  - `local-dir: ./out/`
  - `server-dir: /public_html/`
  - `dangerous-clean-slate: false`
- [ ] Cadastrar secrets no GitHub repo: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
- [ ] Confirmar no painel Hostinger que `public_html/` recebeu os arquivos após o primeiro push

## 9. Google Search Console (pós-deploy)

- [ ] Adicionar propriedade (domínio ou prefixo de URL com www)
- [ ] Verificar propriedade — usar o código de verificação no `metadata.verification.google`
      do `app/layout.tsx` (ou verificação via DNS, se preferir)
- [ ] Enviar sitemap: `https://www.dominio.com.br/sitemap.xml`
- [ ] Confirmar status "Processado" e nº de páginas encontradas
- [ ] Solicitar indexação manual da Home e páginas principais (Portfólio, Serviços, Contato)
- [ ] Acompanhar aba "Páginas" (Indexação) — verificar indexadas vs não indexadas

## 10. Outras configurações recomendadas

- [ ] Google Meu Negócio (Perfil da Empresa) — essencial para SEO local, mais importante
      às vezes que o site em si
- [ ] Google Bing Webmaster Tools (enviar o mesmo sitemap)
- [ ] Verificar Core Web Vitals (PageSpeed Insights) após deploy
- [ ] Testar `og:image` no debugger do Facebook/WhatsApp (compartilhar link e ver preview)
- [ ] Backup do `.env`/secrets fora do repositório

---

## Checklist rápido de "10/10" antes de considerar pronto

1. `npm run build` sem erros/warnings críticos
2. Site no ar refletindo o último deploy (checar `lastmod` do sitemap)
3. Todas as páginas com title/description/canonical únicos
4. Schemas válidos (testar em https://validator.schema.org/)
5. Sitemap enviado e processado no Search Console
6. `verification.google` preenchido
7. GA4 disparando (verificar em tempo real no GA)
8. Mobile sem cortes/quebras de layout
9. WhatsApp/contato funcionando em todas as páginas
10. Blog com conteúdo local relevante (mín. ~50 artigos para nicho competitivo)
