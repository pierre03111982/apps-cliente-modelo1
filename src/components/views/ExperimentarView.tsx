"use client"

import Image from "next/image"
import {
  Upload,
  Camera,
  Wand2,
  Heart,
  X,
  Check,
  Filter,
  Share2,
  ShoppingBag,
  ArrowLeftCircle,
  Instagram,
  Facebook,
  Music2
} from "lucide-react"
import { ExperimentarViewProps } from "@/lib/types" // Vou precisar definir isso ou copiar
import { useRouter } from "next/navigation"; // Importar useRouter

// Definindo a interface aqui por enquanto para ser independente
export interface ExperimentarViewProps {
  lojistaData: any
  isLoadingCatalog: boolean
  filteredCatalog: any[]
  categories: string[]
  activeCategory: string
  setActiveCategory: (category: string) => void
  userPhotoUrl: string | null
  isRefineMode: boolean
  refineBaseImageUrl: string | null
  handleChangePhoto: () => void
  handleRemovePhoto: () => void
  handlePhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedProducts: any[]
  toggleProductSelection: (produto: any) => void
  categoryWarning: string | null
  handleSocialClick: (url: string) => void
  handleShareApp: () => void
  descontoAplicado: boolean
  formatPrice: (value?: number | null) => string
  handleVisualize: () => void
  isGenerating: boolean
  generationError: string | null
  showFavoritesModal: boolean
  setShowFavoritesModal: (show: boolean) => void
  isLoadingFavorites: boolean
  favorites: any[]
  router: any
  lojistaId: string
}

export function ExperimentarView({
  lojistaData,
  isLoadingCatalog,
  filteredCatalog,
  categories,
  activeCategory,
  setActiveCategory,
  userPhotoUrl,
  isRefineMode,
  refineBaseImageUrl,
  handleChangePhoto,
  handleRemovePhoto,
  handlePhotoUpload,
  selectedProducts,
  toggleProductSelection,
  categoryWarning,
  handleSocialClick,
  handleShareApp,
  descontoAplicado,
  formatPrice,
  handleVisualize,
  isGenerating,
  generationError,
  showFavoritesModal,
  setShowFavoritesModal,
  isLoadingFavorites,
  favorites,
  router,
  lojistaId
}: ExperimentarViewProps) {
  return (
    <div className="relative min-h-screen w-full font-sans text-zinc-800">
      {/* Background Image Fixa */}
      <div className="fixed inset-0 z-0">
         <img src="/background.jpg" alt="Background" className="w-full h-full object-cover opacity-30" />
         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 min-h-screen p-4 pb-24">
        <div className="mx-auto max-w-6xl space-y-4">
          {/* Caixa com Logo e Nome da Loja (adaptada) */}
          <div>
            <div
              className="rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md px-3 sm:px-4 py-2 shadow-sm flex items-center justify-center gap-2 relative"
            >
              <button
                onClick={() => router.push(`/${lojistaId}/login`)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-zinc-900 transition"
              >
                <ArrowLeftCircle className="h-5 w-5" />
              </button>
              {lojistaData?.logoUrl && (
                <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-300 flex-shrink-0">
                  <Image
                    src={lojistaData.logoUrl}
                    alt={lojistaData.nome || "Logo"}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <h3
                className="text-base font-bold text-zinc-700"
                translate="no"
              >
                {lojistaData?.nome || "Loja"}
              </h3>
            </div>
          </div>

          {/* Upload de Foto e Área Personalize o seu Look */}
          <div
            className={`flex flex-col sm:flex-row items-stretch gap-4 ${
              userPhotoUrl ? "justify-center" : "justify-center"
            }`}
          >
            {/* Upload de Foto */}
            <div className={`${userPhotoUrl ? 'w-full sm:max-w-[48%] md:max-w-[42%]' : 'w-full'}`}>
              {userPhotoUrl && !isRefineMode ? (
                <div className="relative inline-block">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-200 shadow-sm inline-block">
                    <img
                      src={userPhotoUrl}
                      alt="Sua foto"
                      className="h-auto w-auto max-w-full object-cover block rounded-lg cursor-pointer"
                      onClick={handleChangePhoto}
                      title="Clique para trocar a foto"
                    />
                  </div>
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute right-2 top-2 rounded-full bg-red-500/80 p-1.5 text-white transition hover:bg-red-600 z-10"
                    title="Remover foto"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleChangePhoto}
                    className="absolute bottom-2 right-2 rounded-full bg-zinc-700/80 p-1.5 text-white transition hover:bg-zinc-800 z-10"
                    title="Trocar foto"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              ) : isRefineMode ? (
                <div className="relative inline-block">
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-200 shadow-sm inline-block">
                    {refineBaseImageUrl && (
                      <img
                        src={refineBaseImageUrl}
                        alt="Look base para refinamento"
                        className="h-auto w-auto max-w-full object-cover block rounded-lg"
                      />
                    )}
                  </div>
                  <div className="absolute top-2 left-2 bg-zinc-700/90 text-white px-2 py-0.5 rounded-md text-xs font-semibold">
                    Modo Refinamento
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="photo-upload"
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-zinc-100 transition-colors p-6 sm:p-8 md:p-10"
                >
                  <Camera className="h-10 w-10 text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-600 text-center px-2">
                    Adicionar sua foto
                  </span>
                  <span className="text-xs text-zinc-400 mt-1 text-center px-2">Para provador virtual</span>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Área: Personalize o seu Look */}
            {userPhotoUrl && (
              <div
                className="w-full sm:flex-1 self-stretch rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md p-4 shadow-sm flex flex-col min-h-0 sm:max-w-[48%] md:max-w-[42%]"
              >
                <div className="mb-4 shrink-0">
                  <div className="rounded-lg border border-zinc-300 bg-zinc-100 p-2 shadow-sm">
                    <h2 className="text-center text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                      Provador Virtual com IA
                    </h2>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 flex-1 justify-between min-h-0">
                  <div className="flex flex-col gap-3 shrink-0">
                    {/* Passos */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-sm font-bold text-zinc-700 shadow-sm">1</div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-semibold text-zinc-700">Adicione sua foto</span>
                        {userPhotoUrl && (<div className="mt-1 h-1 w-full rounded-full bg-green-500"></div>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${selectedProducts.length > 0 ? 'bg-green-500 text-white' : 'bg-zinc-300 text-zinc-700'}`}>2</div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-semibold text-zinc-700">Escolha o Produto</span>
                        {selectedProducts.length > 0 && (<div className="mt-1 h-1 w-full rounded-full bg-green-500"></div>)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${userPhotoUrl && selectedProducts.length > 0 ? 'bg-green-500 text-white' : 'bg-zinc-300 text-zinc-700'}`}>3</div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-semibold text-zinc-700">Crie seu Look</span>
                        {userPhotoUrl && selectedProducts.length > 0 && (<div className="mt-1 h-1 w-full rounded-full bg-green-500"></div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Caixa com Produtos Selecionados */}
          {userPhotoUrl && selectedProducts.length > 0 && (
            <div
              className="rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md p-3 shadow-sm w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto"
            >
              <h3 className="mb-2 text-center text-sm font-bold text-zinc-700">
                Produtos Selecionados
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedProducts.map((produto, index) => (
                  <div key={produto.id || index} className="rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-sm relative">
                    {/* Botão para remover produto */}
                    <button
                      onClick={() => toggleProductSelection(produto)}
                      className="absolute right-1 top-1 z-10 rounded-full bg-red-500/80 p-1 text-white transition hover:bg-red-600"
                      title="Remover produto"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {/* Imagem do Produto */}
                    {produto.imagemUrl && (
                      <div className="relative aspect-square w-full">
                        <Image
                          src={produto.imagemUrl}
                          alt={produto.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {/* Informações do Produto */}
                    <div className="p-2 bg-zinc-100">
                      <h3 className="text-left text-xs font-semibold text-zinc-800 line-clamp-2 h-8">
                        {produto.nome}
                      </h3>
                      <div className="flex flex-col gap-0.5 mt-1">
                        {(() => {
                          const desconto = lojistaData?.descontoRedesSociais;
                          const expiraEm = lojistaData?.descontoRedesSociaisExpiraEm;
                          const descontoValido =
                            desconto &&
                            desconto > 0 &&
                            (!expiraEm || new Date(expiraEm) >= new Date());
                          if (descontoAplicado && descontoValido) {
                            return (
                              <>
                                <p className="text-left text-xs text-zinc-500 line-through">
                                  {formatPrice(produto.preco)}
                                </p>
                                <div className="flex items-center gap-1 flex-wrap">
                                  <p className="text-left text-sm font-bold text-green-600">
                                    {formatPrice(
                                      produto.preco
                                        ? produto.preco * (1 - desconto / 100)
                                        : 0
                                    )}
                                  </p>
                                  <p className="text-left text-[10px] font-semibold text-green-500 leading-tight">
                                    Desconto aplicado
                                  </p>
                                </div>
                              </>
                            );
                          }
                          return (
                            <p className="text-left text-sm font-bold text-zinc-800">
                              {formatPrice(produto.preco)}
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aviso sobre seleção de produtos */}
          {userPhotoUrl && (
            <div
              className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md p-3 shadow-sm"
            >
              {isRefineMode ? (
                <p className="text-xs font-medium text-yellow-700 text-center">
                  ✨ <span className="font-bold">Modo Refinamento:</span> Adicione até <span className="font-bold">2 acessórios leves</span>.
                </p>
              ) : (
                <p className="text-xs font-medium text-yellow-700 text-center">
                  💡 Você pode selecionar até <span className="font-bold">2 produtos</span> de <span className="font-bold">categorias diferentes</span>
                </p>
              )}
            </div>
          )}

          {/* Caixa de Redes Sociais e Desconto */}
          <div
            className="rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md px-4 py-3 shadow-sm"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-md border border-red-200 bg-red-50/70 px-3 py-1.5">
                <p className="text-xs font-medium text-red-700 text-center">Siga, Curta ou Compartilhe !!!<br/>Aplique o seu Desconto agora!</p>
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {lojistaData?.redesSociais?.instagram ? (<button onClick={() => handleSocialClick(lojistaData.redesSociais.instagram!.startsWith('http') ? lojistaData.redesSociais.instagram! : `https://instagram.com/${lojistaData.redesSociais.instagram!.replace('@', '')}`)} className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white transition hover:scale-110 cursor-pointer"><Instagram className="h-4 w-4" /></button>) : (<div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white opacity-50"><Instagram className="h-4 w-4" /></div>)}
                {lojistaData?.redesSociais?.facebook ? (<button onClick={() => handleSocialClick(lojistaData.redesSociais.facebook!.startsWith('http') ? lojistaData.redesSociais.facebook! : `https://facebook.com/${lojistaData.redesSociais.facebook!}`)} className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white transition hover:scale-110 cursor-pointer"><Facebook className="h-4 w-4" /></button>) : (<div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white opacity-50"><Facebook className="h-4 w-4" /></div>)}
                {lojistaData?.redesSociais?.tiktok ? (<button onClick={() => handleSocialClick(lojistaData.redesSociais.tiktok!.startsWith('http') ? lojistaData.redesSociais.tiktok! : `https://tiktok.com/@${lojistaData.redesSociais.tiktok!.replace('@', '')}`)} className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white transition hover:scale-110 cursor-pointer"><Music2 className="h-4 w-4" /></button>) : (<div className="flex items-center justify-center w-9 h-9 rounded-full bg-black text-white opacity-50"><Music2 className="h-4 w-4" /></div>)}
                <button onClick={handleShareApp} className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 text-white transition hover:scale-110 cursor-pointer" title="Compartilhar aplicativo"><Share2 className="h-4 w-4" /></button>
              </div>
              {(() => { const desconto = lojistaData?.descontoRedesSociais; const expiraEm = lojistaData?.descontoRedesSociaisExpiraEm; if (!desconto || desconto <= 0) { return null } if (expiraEm) { const dataExpiracao = new Date(expiraEm); const agora = new Date(); if (dataExpiracao < agora) { return null } } return (
                <>
                  <p className="text-sm font-bold text-zinc-700 text-center">
                    GANHE <span className="text-xl font-black text-green-600">{desconto}%</span> de DESCONTO!
                  </p>
                  {descontoAplicado && (<p className="text-xs font-semibold text-green-500 text-center animate-pulse">✓ Desconto aplicado!</p>)}
                </>
              )})()}
            </div>
          </div>

          {/* Card Principal */}
          <div
            className="rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-md p-5 shadow-sm"
          >
            {/* Abas de Categoria */}
            <div className="mb-4 overflow-x-auto pb-2 -mx-2 sm:mx-0">
              <div className="flex gap-2 justify-start sm:justify-center px-2 sm:px-0 min-w-max sm:min-w-0 flex-wrap sm:flex-nowrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap flex-shrink-0 ${
                      activeCategory === category
                        ? "bg-zinc-900 text-white border border-zinc-900 shadow-md"
                        : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Aviso de categoria */}
            {categoryWarning && (<div className="mb-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-3"><p className="text-sm font-medium text-yellow-700">{categoryWarning}</p></div>)}

            {/* Grid de Produtos */}
            {isLoadingCatalog ? (<div className="py-10 text-center text-zinc-400 text-xs">Carregando produtos...</div>) : filteredCatalog.length === 0 ? (<div className="py-10 text-center text-zinc-500 text-xs">Nenhum produto encontrado.</div>) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pb-4 pr-2 custom-scrollbar justify-items-center">
                {filteredCatalog.map((produto) => { const isSelected = selectedProducts.some((p) => p.id === produto.id); return (
                  <button
                    key={produto.id}
                    onClick={() => toggleProductSelection(produto)}
                    className={`group relative overflow-hidden rounded-xl border transition w-full ${
                      isSelected
                        ? "border-green-500 bg-green-50 shadow-md shadow-green-500/20"
                        : "border-zinc-200 bg-white hover:border-zinc-300"
                    }`}
                  >
                    {produto.imagemUrl && (<div className="relative aspect-square w-full"><Image src={produto.imagemUrl} alt={produto.nome} fill className="object-cover" /></div>)}
                    <div className="p-2 bg-zinc-100">
                      <h3 className="text-left text-xs font-semibold text-zinc-800 line-clamp-2 h-8">
                        {produto.nome}
                      </h3>
                      <div className="mt-1 flex flex-col gap-0.5">{(() => { const desconto = lojistaData?.descontoRedesSociais; const expiraEm = lojistaData?.descontoRedesSociaisExpiraEm; const descontoValido = desconto && desconto > 0 && (!expiraEm || new Date(expiraEm) >= new Date()); if (descontoAplicado && descontoValido) { return (<><p className="text-left text-xs text-zinc-500 line-through">{formatPrice(produto.preco)}</p><div className="flex items-center gap-1"><p className="text-left text-sm font-bold text-green-600">{formatPrice(produto.preco ? produto.preco * (1 - (desconto / 100)) : 0)}</p><p className="text-left text-[10px] font-semibold text-green-500">Desconto aplicado</p></div></>) } return (
                        <p className="text-left text-sm font-bold text-zinc-800">
                          {formatPrice(produto.preco)}
                        </p>
                      )})()}</div>
                    </div>
                    {isSelected && (<div className="absolute right-2 top-2 rounded-full bg-green-500 text-white p-1 shadow-md"><Check className="h-3 w-3" /></div>)}
                  </button>
                )})}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botão FAB - Visualize */}
      {(userPhotoUrl) && selectedProducts.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
              <button 
                onClick={handleVisualize}
                disabled={isGenerating}
                className="bg-zinc-900 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-zinc-800 transition-transform hover:scale-105 disabled:opacity-70 text-sm font-bold"
              >
                  {isGenerating ? (
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                      <Wand2 className="h-4 w-4" />
                  )}
                  Visualizar
              </button>
          </div>
      )}

      {/* Mensagem de erro */}
      {generationError && (<div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 backdrop-blur"><p className="text-sm font-medium text-red-700">{generationError}</p></div>)}

      {/* Modal de Favoritos (mantido como está) */}
      {showFavoritesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-xl border border-white/20 bg-white/10 backdrop-blur-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Meus Favoritos</h2>
              <button onClick={() => setShowFavoritesModal(false)} className="text-white/70 hover:text-white transition"><X className="h-5 w-5" /></button>
            </div>
            {isLoadingFavorites ? (
              <div className="py-10 text-center text-white/70">Carregando...</div>
            ) : favorites.length === 0 ? (
              <div className="py-10 text-center text-white/70">
                <Heart className="mx-auto mb-3 h-14 w-14 text-white/30" />
                <p>Você ainda não tem favoritos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {favorites.map((favorito) => (
                  <div
                    key={favorito.id}
                    onClick={() => {
                      // Salvar dados do favorito no sessionStorage
                      const favoritoLook: GeneratedLook = {
                        id: favorito.id || `favorito-${Date.now()}`,
                        imagemUrl: favorito.imagemUrl,
                        titulo: favorito.productName || "Look favorito",
                        produtoNome: favorito.productName || "",
                        produtoPreco: favorito.productPrice || null,
                        compositionId: favorito.compositionId || null,
                        jobId: favorito.jobId || null,
                      }
                      sessionStorage.setItem(`favorito_${lojistaId}`, JSON.stringify(favoritoLook))
                      sessionStorage.setItem(`from_favoritos_${lojistaId}`, "true")
                      // Fechar modal e recarregar página
                      setShowFavoritesModal(false)
                      // Recarregar a página para aplicar as mudanças
                      window.location.href = `/${lojistaId}/resultado?from=favoritos`
                    }}
                    className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 transition cursor-pointer"
                  >
                    {favorito.imagemUrl && (
                      <div className="relative aspect-square w-full">
                        <Image
                          src={favorito.imagemUrl}
                          alt={favorito.productName || "Look favorito"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {favorito.productName && (
                      <div className="p-2 bg-zinc-100">
                        <p className="text-sm font-semibold text-zinc-800 line-clamp-2">
                          {favorito.productName}
                        </p>
                        {favorito.productPrice && (
                          <p className="mt-0.5 text-xs font-bold text-green-600">
                            {formatPrice(favorito.productPrice)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

