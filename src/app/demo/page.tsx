"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image" // Adicionar Image
import { Camera, User, Share2, ShoppingBag, Check, ArrowLeftCircle, LogIn, UserPlus, Sparkles, RefreshCw, Home } from "lucide-react"
import { FaApple, FaFacebook, FaGoogle, FaWhatsapp } from "react-icons/fa" // Adicionar icones sociais e whatsapp
import { ExperimentarView } from "@/components/views/ExperimentarView"
import { useState } from "react"
import { Produto } from "@/lib/types"

function DemoPageContent() {
  const searchParams = useSearchParams()
  const tela = searchParams.get("tela") || "1"

  const MOCK_USER_PHOTO = "/mock-person.jpg"
  const MOCK_RESULT_PHOTO = "/mock-result.jpg"

  const [demoSelectedProducts, setDemoSelectedProducts] = useState<Produto[]>([])

  const mockCatalog: Produto[] = [
      { id: '1', nome: 'Vestido Floral', preco: 199.90, imagemUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500&auto=format&fit=crop', categoria: 'Vestidos' },
      { id: '2', nome: 'Blusa Seda', preco: 149.90, imagemUrl: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=500&auto=format&fit=crop', categoria: 'Blusas' },
       { id: '3', nome: 'Saia Longa', preco: 179.90, imagemUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=500&auto=format&fit=crop', categoria: 'Saias' },
        { id: '4', nome: 'Vestido Festa', preco: 299.90, imagemUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop', categoria: 'Vestidos' },
  ]

  // --- TELA 1: LOGIN (Minimalista) ---
  if (tela === "1") {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-white text-zinc-800">
        {/* Background Image Fixa */}
        <div className="fixed inset-0 z-0 opacity-30">
          <img src="/background.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>

        {/* Overlay de cor clara */}
        <div className="fixed inset-0 z-0 bg-white/80 backdrop-blur-sm" />

        {/* Conteúdo do Formulário */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-8 overflow-y-auto">
          
          {/* Caixa com Logo e Nome da Loja */}
          <div className="w-full max-w-sm mb-6">
            <div
              className="rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md px-3 py-2 shadow-lg flex items-center justify-center gap-2"
            >
              {/* Botão de voltar não faz nada no demo */}
              <button
                onClick={() => {}}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-zinc-600 opacity-0 cursor-default"
              >
                <ArrowLeftCircle className="h-5 w-5" />
              </button>
              {/* No demo, vamos usar um placeholder de logo */}
              <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-300 flex-shrink-0 bg-zinc-100 flex items-center justify-center">
                <span className="font-serif font-bold text-zinc-700 text-lg">S</span>
              </div>
              <h3
                className="text-base font-bold text-zinc-700"
                translate="no"
              >
                Sua Loja
              </h3>
            </div>
          </div>

          {/* Card Principal do Formulário */}
          <div
            className="w-full max-w-sm space-y-6 rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-md p-6 shadow-2xl text-center"
          >
            {/* Título Principal e Subtítulo */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-zinc-800 mb-1">
                Bem-vindo(a) à nova era <br /> da Moda Digital
              </h1>
              <p className="text-sm text-zinc-600">
                (Provador Virtual IA)
              </p>
            </div>

            {/* Botão de Ação Único (Login/Cadastro) */}
            <button
              onClick={() => { /* No demo, este botão não faz nada */ }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-700 text-white py-2.5 font-semibold text-sm transition-all hover:bg-zinc-800"
            >
              <UserPlus className="h-4 w-4" />
              Cadastrar conta
            </button>

            {/* Formulário (campos desabilitados) */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="tel"
                disabled
                placeholder="WhatsApp com DDD"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-800 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all text-sm"
              />
              <input
                type="password"
                disabled
                placeholder="Senha"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-800 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all text-sm"
              />
              <button
                type="submit"
                disabled
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-teal-600 text-white py-3 font-bold text-sm transition hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
            </form>

            {/* Divisor e Login Social */}
            <div className="space-y-4">
              <p className="text-sm text-zinc-600">Continuar com...</p>
              <div className="flex justify-center gap-4">
                <button disabled className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 opacity-50 cursor-not-allowed">
                  <FaGoogle />
                </button>
                <button disabled className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 opacity-50 cursor-not-allowed">
                  <FaApple />
                </button>
                <button disabled className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 opacity-50 cursor-not-allowed">
                  <FaFacebook />
                </button>
              </div>
            </div>
            
            {/* Link de Rodapé */}
            <p className="text-sm text-zinc-600">
              Não tem uma conta?{" "}
              <button
                type="button"
                onClick={() => { /* No demo, este botão não faz nada */ }}
                className="font-bold underline text-zinc-800 hover:text-zinc-900 transition opacity-50 cursor-not-allowed"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // --- TELA 2: UPLOAD (USANDO VIEW REAL) ---
  if (tela === "2") {
    // Mock de router para ExperimentarView
    const mockRouter = { push: (path: string) => console.log("Demo navigate to:", path), back: () => console.log("Demo back") };
    
    return (
      <ExperimentarView 
        lojistaData={{ 
            id: 'demo',
            nome: "Sua Loja", 
            logoUrl: null,
            descricao: "Loja de demonstração",
            salesConfig: {}, 
            redesSociais: { instagram: "@lojademo" },
            descontoRedesSociais: 10,
            descontoRedesSociaisExpiraEm: new Date(Date.now() + 86400000).toISOString()
        }}
        isLoadingCatalog={false}
        filteredCatalog={mockCatalog}
        categories={["Todos", "Vestidos", "Blusas", "Saias"]}
        activeCategory="Todos"
        setActiveCategory={() => {}}
        userPhotoUrl={MOCK_USER_PHOTO}
        isRefineMode={false}
        refineBaseImageUrl={null}
        handleChangePhoto={() => {}}
        handleRemovePhoto={() => {}}
        handlePhotoUpload={() => {}}
        selectedProducts={demoSelectedProducts}
        toggleProductSelection={(p) => {
            setDemoSelectedProducts(prev => {
                const exists = prev.find(i => i.id === p.id)
                if (exists) return prev.filter(i => i.id !== p.id)
                return [...prev, p]
            })
        }}
        categoryWarning={null}
        handleSocialClick={() => {}}
        handleShareApp={() => {}}
        descontoAplicado={true}
        formatPrice={(v) => `R$ ${v?.toFixed(2).replace('.', ',')}`}
        handleVisualize={() => { /* No demo, este botão não faz nada */ }}
        isGenerating={false}
        generationError={null}
        showFavoritesModal={false}
        setShowFavoritesModal={() => {}}
        isLoadingFavorites={false}
        favorites={[]}
        router={mockRouter}
        lojistaId="demo"
      />
    )
  }

  // --- TELA 3: RESULTADO (Minimalista) ---
  if (tela === "3") {
    // Mock de router para ResultadoPage
    const mockRouter = { push: (path: string) => console.log("Demo navigate to:", path), back: () => console.log("Demo back") };

    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-white text-zinc-800">
        {/* Imagem de Fundo Fixa */}
        <div className="fixed inset-0 z-0">
          <img
            src="/background.jpg"
            alt="Fundo"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
        </div>

        {/* Conteúdo Principal */}
        <div className="relative z-10 min-h-screen flex flex-col p-4 items-center justify-center space-y-4">
          {/* Caixa com Logo e Nome da Loja (adaptada) */}
          <div className="w-full max-w-sm">
            <div
              className="rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md px-3 py-2 shadow-sm flex items-center justify-center gap-2 relative"
            >
              <button
                onClick={() => mockRouter.push("/demo?tela=2")}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-zinc-900 transition"
              >
                <ArrowLeftCircle className="h-5 w-5" />
              </button>
              <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-300 flex-shrink-0 bg-zinc-100 flex items-center justify-center">
                <span className="font-serif font-bold text-zinc-700 text-lg">S</span>
              </div>
              <h3
                className="text-base font-bold text-zinc-700"
                translate="no"
              >
                Sua Loja
              </h3>
            </div>
          </div>

          {/* Card Principal do Look */}
          <div
            className="relative w-full max-w-sm space-y-4 rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-md p-4 shadow-sm"
          >
            {/* Imagem Gerada */}
            <div className="w-full rounded-xl overflow-hidden border border-zinc-200">
              <img
                src={MOCK_RESULT_PHOTO}
                alt="Resultado"
                className="h-auto w-full object-cover rounded-lg"
              />
            </div>

            {/* Título e Botões de Ação */}
            <div className="space-y-4 text-center">
              <h2 className="text-lg font-bold text-zinc-800">Look Perfeito!</h2>
              <p className="text-sm text-zinc-600">Com: Vestido Floral</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled
                  className="flex items-center justify-center gap-2 rounded-lg bg-green-600 text-white py-2.5 font-semibold text-sm opacity-50 cursor-not-allowed"
                >
                  <FaWhatsapp className="h-4 w-4" /> Comprar
                </button>
                <button
                  disabled
                  className="flex items-center justify-center gap-2 rounded-lg bg-zinc-200 text-zinc-700 py-2.5 font-semibold text-sm opacity-50 cursor-not-allowed"
                >
                  <Share2 className="h-4 w-4" /> Compartilhar
                </button>
              </div>

              {/* Outras Ações */} 
              <div className="flex flex-col gap-3 mt-4">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white py-2.5 font-semibold text-sm opacity-50 cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" /> Adicionar Acessório
                </button>
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-sky-600 text-white py-2.5 font-semibold text-sm opacity-50 cursor-not-allowed"
                >
                  <RefreshCw className="h-4 w-4" /> Remixar Look
                </button>
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-200 text-zinc-700 py-2.5 font-semibold text-sm opacity-50 cursor-not-allowed"
                >
                  <Home className="h-4 w-4" /> Criar outro
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div className="text-zinc-800">Selecione uma tela para pré-visualizar.</div>
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="text-zinc-800">Carregando...</div>}>
      <DemoPageContent />
    </Suspense>
  )
}
