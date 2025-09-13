README — E‑Commerce (React + Vite)

O QUE É O PROJETO
-----------------
Aplicação web de e‑commerce (SPA) construída com React + Vite. O foco é demonstrar um fluxo completo:
catálogo de produtos, busca por nome com sugestões, carrinho de compras com persistência, e checkout
com preenchimento automático de endereço via CEP (ViaCEP).

O QUE ELE FAZ (FUNCIONALIDADES)
-------------------------------
- Lista produtos consumindo a FakeStore API.
- Busca por nome com debounce e lista suspensa de resultados.
- Carrinho lateral (Sheet do shadcn UI) com adicionar/remover, ajuste de quantidade e subtotal.
- Persistência do carrinho em localStorage (Zustand + persist).
- Página de detalhes do produto (/products/:id).
- Checkout com React Hook Form e Busca CEP (ViaCEP) para preencher rua/bairro/cidade/UF.
- Rotas principais: "/", "/products/:id", "/checkout", "/success".

STACK / FRAMEWORKS E BIBLIOTECAS
--------------------------------
- Framework base: React 18 (com Vite).
- Estilo: Tailwind CSS (projeto preparado para Tailwind v4).
- Componentes de UI: shadcn UI (componentes gerados no diretório src/components/ui).
- Ícones: lucide-react (e opcionalmente react-icons).
- Estado global do carrinho: Zustand (com persistência em localStorage).
- Formulários: react-hook-form.
- Roteamento: react-router-dom.
- Integrações externas: 
  • FakeStore API (catálogo de produtos) 
  • ViaCEP (consulta de CEP para autocompletar endereço)
- Acessibilidade e base dos componentes shadcn: Radix UI (embutido nos componentes gerados).

ESTRUTURA DE PASTAS (RESUMO)
----------------------------
src/
  components/
    AddToCartButton.jsx
    CartButton.jsx
    CartSheet.jsx
    SearchProductsInput.jsx
    ui/                       # componentes shadcn gerados (button, input, sheet, etc.)
  hooks/
    useProductSearch.js       # busca com debounce (FakeStore)
    useViaCEP.js              # integração ViaCEP + máscara/normalização de CEP
  pages/
    Home.jsx
    Product.jsx               # detalhes do produto
    CheckoutPage.jsx          # formulário + Busca CEP
    SuccessPage.jsx           # confirmação de pedido
    NotFound.jsx
  stores/
    cart-store.(ts|js)        # estado do carrinho (add/inc/dec/remove/subtotal/persist)
    cart-ui.(ts|js)           # abrir/fechar Sheet do carrinho
  App.jsx                     # define as rotas
  main.jsx                    # monta o app (BrowserRouter)
  index.css

PACOTES QUE PRECISAM SER INSTALADOS
-----------------------------------
Dependências de runtime:
- react-router-dom
- zustand
- react-hook-form
- lucide-react
- (opcional) react-icons

Dependências de estilo/UI (conforme seu setup do Tailwind/shadcn):
- tailwindcss
- @tailwindcss/vite                # se você estiver usando Tailwind v4 com Vite
- (shadcn UI) componentes são gerados por arquivo; não há pacote único,
  mas você pode adicioná-los pelo CLI: 
  npx shadcn@latest add button input label textarea card separator sheet

Observações:
- Caso use Tailwind v3, o setup típico envolve também postcss e autoprefixer.
- Se o projeto usa alias "@/...", configure o jsconfig.json com:
  {
    "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } }
  }
