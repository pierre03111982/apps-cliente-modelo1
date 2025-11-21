"use client"

import React, { useEffect, useState, Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Step1LoginConsent } from "@/components/client-app/Step1LoginConsent"
import { Step2Workspace } from "@/components/client-app/Step2Workspace"
import { Step3Results } from "@/components/client-app/Step3Results"
import { LoadingOverlay } from "@/components/client-app/LoadingOverlay"
import { fetchLojistaData, fetchProdutos } from "@/lib/firebaseQueries"
import { getStorageClient } from "@/lib/firebase"
import type { GeneratedLook, LojistaData, Produto } from "@/lib/types"

const fallbackCatalog: Produto[] = [
  {
    id: "p1",
    nome: "Vestido Midi Floral",
    preco: 499.9,
    imagemUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=640&q=80",
    categoria: "Roupas",
    tamanhos: ["P", "M", "G"],
    cores: ["Floral rosa"],
    medidas: "Busto 98 cm; Cintura 80 cm",
    obs: "Tecido leve ideal para eventos diurnos.",
  },
  {
    id: "p2",
    nome: "Tênis Branco Minimalista",
    preco: 389.9,
    imagemUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=640&q=80",
    categoria: "Calçados",
    tamanhos: ["36", "38", "40", "42"],
    cores: ["Branco"],
    obs: "Solado em EVA com amortecimento para uso urbano.",
  },
  {
    id: "p3",
    nome: "Óculos de Sol Redondo",
    preco: 189.9,
    imagemUrl:
      "https://images.unsplash.com/photo-1523380094615-740d418bd0c2?auto=format&fit=crop&w=640&q=80",
    categoria: "Acessórios",
    tamanhos: ["Único"],
    cores: ["Preto", "Dourado"],
    obs: "Lentes com proteção UV400 e armação em metal leve.",
  },
  {
    id: "p4",
    nome: "Jaqueta Tech Prata",
    preco: 679,
    imagemUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=640&q=80",
    categoria: "Roupas",
    tamanhos: ["P", "M", "G"],
    cores: ["Prata"],
    medidas: "Comprimento 70 cm",
    obs: "Acabamento metalizado com forro térmico leve.",
  },
]

const fallbackLooks: GeneratedLook[] = [
  {
    id: "look-natural",
    titulo: "Look Natural",
    descricao: "Caimento perfeito para o dia a dia.",
    imagemUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=80",
    produtoNome: "Vestido Midi Floral",
    produtoPreco: 499.9,
    watermarkText: "Valor sujeito a alteração.",
  },
  {
    id: "look-criativo",
    titulo: "Look Criativo IA",
    descricao: "Versão cinematográfica criada pela Experimente AI.",
    imagemUrl:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80",
    produtoNome: "Vestido Midi Floral",
    produtoPreco: 499.9,
    watermarkText: "Imagem gerada com tecnologia Experimente AI.",
  },
]

const mockLojistaData: LojistaData = {
  id: "lojista-demo",
  nome: "Pierre Loja",
  logoUrl: "",
  redesSociais: {
    instagram: "https://instagram.com/pierreloja",
    tiktok: "https://www.tiktok.com/@pierreloja",
  },
  salesConfig: {
    whatsappLink: "https://wa.me/5511999998888",
    ecommerceUrl: "https://pierreloja.com/cart",
  },
  descontoRedesSociais: null,
}

function ClienteAppPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const lojistaId = (params?.lojistaId as string) || ""
  const isSimulator = searchParams?.get("simulator") === "1"
  // Se for simulador, começar direto no step 2 (personalização)
  const [step, setStep] = useState(isSimulator ? 2 : 1)
  const [isLoading, setIsLoading] = useState(false)
  // NÃO usar dados mock inicialmente - começar vazio e carregar do Firestore
  const [lojistaData, setLojistaData] = useState<LojistaData | null>(null)
  const [catalog, setCatalog] = useState<Produto[]>([])
  const [isCatalogLoading, setIsCatalogLoading] = useState(true)
  const [lookResults, setLookResults] = useState<GeneratedLook[]>(fallbackLooks)
  const [generationError, setGenerationError] = useState<string | null>(null)
  // Armazenar foto e produtos selecionados para regeneração
  const [lastPhoto, setLastPhoto] = useState<File | null>(null)
  const [lastSelectedProducts, setLastSelectedProducts] = useState<Produto[]>([])
  const [clienteData, setClienteData] = useState<{
    id: string
    nome: string
    whatsapp: string
    favoritos: any[]
  } | null>(null)

  // Resolver backend base (paineladm) a partir de env ou query param
  const resolvedBackendUrl =
    (typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("backend")
      : null) ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:3000";

  // Rastrear acesso via link compartilhado
  useEffect(() => {
    const shareCode = searchParams?.get("share")
    if (!shareCode || !lojistaId) return

    const trackShare = async () => {
      try {
        const backendUrl = resolvedBackendUrl
        const visitorId = clienteData?.id || createUniqueId()

        await fetch(`${backendUrl}/api/cliente/share/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lojistaId,
            shareCode,
            visitorId,
            isSignup: false, // Será true quando o cliente se cadastrar
          }),
        })

        console.log("[ClienteAppPage] ✅ Acesso via compartilhamento rastreado:", shareCode)
      } catch (error) {
        console.error("[ClienteAppPage] Erro ao rastrear compartilhamento:", error)
      }
    }

    trackShare()
  }, [searchParams, lojistaId, resolvedBackendUrl, clienteData?.id])

  // Registrar signup via compartilhamento quando cliente fizer login
  useEffect(() => {
    const shareCode = searchParams?.get("share")
    if (!shareCode || !lojistaId || !clienteData?.id) return

    const registerSignup = async () => {
      try {
        const backendUrl = resolvedBackendUrl
        await fetch(`${backendUrl}/api/cliente/share/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lojistaId,
            shareCode,
            isSignup: true,
            referredClienteId: clienteData.id,
            referredClienteNome: clienteData.nome,
            referredClienteWhatsapp: clienteData.whatsapp,
          }),
        })

        console.log("[ClienteAppPage] ✅ Signup via compartilhamento registrado")
      } catch (error) {
        console.error("[ClienteAppPage] Erro ao registrar signup:", error)
      }
    }

    registerSignup()
  }, [clienteData?.id, searchParams, lojistaId, resolvedBackendUrl])

  useEffect(() => {
    if (!lojistaId) {
      console.warn("[ClienteAppPage] lojistaId não encontrado nos params")
      return
    }

    let active = true

    async function loadData() {
      try {
        setIsCatalogLoading(true)
        console.log("[ClienteAppPage] Carregando dados da loja:", lojistaId)
        console.log("[ClienteAppPage] isSimulator:", isSimulator)
        
        // Se houver backend na URL (modo simulador), usar API do paineladm
        const backendUrl = searchParams?.get("backend") || resolvedBackendUrl || null
        let lojistaDb: LojistaData | null = null
        let produtosDb: Produto[] = []
        
        if (backendUrl) {
          console.log("[ClienteAppPage] Usando API do paineladm:", backendUrl)
          try {
            // Buscar dados da loja via API
            const perfilResponse = await fetch(`${backendUrl}/api/lojista/perfil?lojistaId=${lojistaId}`)
            if (perfilResponse.ok) {
              const perfilData = await perfilResponse.json()
              console.log("[ClienteAppPage] Dados recebidos da API:", perfilData)
              if (perfilData?.nome) {
                // Mapear dados da API para o formato esperado
                lojistaDb = {
                  id: lojistaId,
                  nome: perfilData.nome,
                  logoUrl: perfilData.logoUrl || null,
                  descricao: perfilData.descricao || null,
                  // Mapear redes sociais do formato da API (instagram, facebook, tiktok) para o formato esperado
                  redesSociais: {
                    instagram: perfilData.instagram || perfilData.redesSociais?.instagram || null,
                    facebook: perfilData.facebook || perfilData.redesSociais?.facebook || null,
                    tiktok: perfilData.tiktok || perfilData.redesSociais?.tiktok || null,
                  },
                  // Mapear salesConfig
                  salesConfig: perfilData.salesConfig || {
                    whatsappLink: perfilData.salesWhatsapp || null,
                    ecommerceUrl: perfilData.checkoutLink || null,
                  },
                  descontoRedesSociais: perfilData.descontoRedesSociais || null,
                  descontoRedesSociaisExpiraEm: perfilData.descontoRedesSociaisExpiraEm || null,
                }
                console.log("[ClienteAppPage] ✅ Dados da loja carregados via API:", lojistaDb.nome)
              }
            } else {
              console.warn("[ClienteAppPage] Erro ao buscar perfil via API:", perfilResponse.status, perfilResponse.statusText)
            }
            
            // Buscar produtos via API
            const produtosResponse = await fetch(`${backendUrl}/api/lojista/products?lojistaId=${lojistaId}`)
            if (produtosResponse.ok) {
              const produtosData = await produtosResponse.json()
              // A API pode retornar array direto ou objeto com { produtos: [...] }
              const produtosArray = Array.isArray(produtosData) 
                ? produtosData 
                : (produtosData?.produtos || [])
              
              if (Array.isArray(produtosArray) && produtosArray.length > 0) {
                produtosDb = produtosArray.map((p: any) => ({
                  id: p.id,
                  nome: p.nome || "Produto",
                  preco: p.preco || null,
                  imagemUrl: p.imagemUrl || null,
                  categoria: p.categoria || null,
                  tamanhos: Array.isArray(p.tamanhos) ? p.tamanhos : [],
                  cores: Array.isArray(p.cores) ? p.cores : [],
                  medidas: p.medidas || undefined,
                  estoque: p.estoque || null,
                  obs: p.obs || undefined,
                }))
                console.log("[ClienteAppPage] ✅ Produtos carregados via API:", produtosDb.length)
              } else {
                console.warn("[ClienteAppPage] Nenhum produto retornado pela API")
              }
            } else {
              console.warn("[ClienteAppPage] Erro ao buscar produtos via API:", produtosResponse.status, produtosResponse.statusText)
            }
          } catch (apiError) {
            console.warn("[ClienteAppPage] Erro ao buscar via API, tentando Firestore direto:", apiError)
          }
        }
        
        // Se não conseguiu via API ou não há backend explícito, tentar Firestore direto
        if ((!lojistaDb || produtosDb.length === 0) && !backendUrl) {
          console.log("[ClienteAppPage] Buscando dados diretamente do Firestore (sem backend)")
          const [lojistaDbFirestore, produtosDbFirestore] = await Promise.all([
            fetchLojistaData(lojistaId).catch((error) => {
              console.warn("[ClienteAppPage] Erro ao buscar lojista do Firebase:", error)
              return null
            }),
            fetchProdutos(lojistaId).catch((error) => {
              console.warn("[ClienteAppPage] Erro ao buscar produtos do Firebase:", error)
              return []
            }),
          ])
          
          if (lojistaDbFirestore && !lojistaDb) {
            lojistaDb = lojistaDbFirestore
          }
          if (produtosDbFirestore.length > 0 && produtosDb.length === 0) {
            produtosDb = produtosDbFirestore
          }
          
          // Se ainda não encontrou dados, tentar backend automático via proxy (para evitar CORS)
          if ((!lojistaDb || produtosDb.length === 0)) {
            console.log("[ClienteAppPage] Dados não encontrados no Firebase, tentando backend automático via proxy...")
            try {
              const apiUrl = `/api/simulator-proxy?lojistaId=${encodeURIComponent(lojistaId)}`

              const response = await fetch(apiUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              })
              
              if (response.ok) {
                const data = await response.json()
                if (!active) return
                
                if (data.lojistaData && !lojistaDb) {
                  const salesConfig = data.lojistaData.salesConfig || {}
                  lojistaDb = {
                    id: data.lojistaData.id || lojistaId,
                    nome: data.lojistaData.nome || "Loja",
                    logoUrl: data.lojistaData.logoUrl || null,
                    descricao: null,
                    redesSociais: data.lojistaData.redesSociais || {},
                    salesConfig: {
                      channel: salesConfig.channel || (salesConfig.checkoutLink ? "checkout" : "whatsapp"),
                      salesWhatsapp: salesConfig.salesWhatsapp || salesConfig.whatsapp || null,
                      checkoutLink: salesConfig.checkoutLink || salesConfig.ecommerceUrl || null,
                      whatsappLink: salesConfig.salesWhatsapp 
                        ? `https://wa.me/${salesConfig.salesWhatsapp.replace(/\D/g, "")}`
                        : salesConfig.whatsappLink || null,
                    },
                    descontoRedesSociais: data.lojistaData.descontoRedesSociais || null,
                  }
                }
                
                if (data.produtos && Array.isArray(data.produtos) && data.produtos.length > 0 && produtosDb.length === 0) {
                  produtosDb = data.produtos.map((p: any) => ({
                    id: p.id || String(Math.random()),
                    nome: p.nome || "Produto",
                    preco: typeof p.preco === "number" ? p.preco : null,
                    imagemUrl: p.imagemUrl || null,
                    categoria: p.categoria || "Outros",
                    tamanhos: Array.isArray(p.tamanhos) ? p.tamanhos : [],
                    cores: Array.isArray(p.cores) ? p.cores : [],
                    medidas: p.medidas || undefined,
                    estoque: p.estoque || null,
                    obs: p.obs || undefined,
                  }))
                }
              }
            } catch (error) {
              console.error("[ClienteAppPage] Erro ao buscar do backend automático:", error)
            }
          }
        } else if (backendUrl && (!lojistaDb || produtosDb.length === 0)) {
          console.warn("[ClienteAppPage] ⚠️ Backend disponível mas não conseguiu carregar dados. Verifique CORS e se a API está funcionando.")
        }

        if (!active) return

        console.log("[ClienteAppPage] Dados carregados:", { 
          lojista: lojistaDb?.nome || "não encontrado",
          produtos: produtosDb.length,
          lojistaDb: lojistaDb ? "encontrado" : "não encontrado"
        })

        if (lojistaDb) {
          setLojistaData(lojistaDb)
          console.log("[ClienteAppPage] ✅ Dados da loja atualizados:", lojistaDb.nome)
        } else {
          // Não setar mais Loja Demo aqui para evitar flash; fallback será tratado na renderização
          console.warn("[ClienteAppPage] ⚠️ Dados da loja não encontrados para lojistaId:", lojistaId)
          setLojistaData(null)
        }

        // Ordenar produtos por categoria e depois por nome
        const produtosOrdenados = produtosDb.length > 0 
          ? [...produtosDb].sort((a, b) => {
              // Primeiro ordenar por categoria (alfabética)
              const categoriaA = (a.categoria || "").toLowerCase()
              const categoriaB = (b.categoria || "").toLowerCase()
              if (categoriaA !== categoriaB) {
                return categoriaA.localeCompare(categoriaB, "pt-BR")
              }
              // Se a categoria for igual, ordenar por nome
              const nomeA = (a.nome || "").toLowerCase()
              const nomeB = (b.nome || "").toLowerCase()
              return nomeA.localeCompare(nomeB, "pt-BR")
            })
          : fallbackCatalog

        if (produtosDb.length > 0) {
          setCatalog(produtosOrdenados)
          console.log("[ClienteAppPage] ✅ Produtos carregados e ordenados:", produtosOrdenados.length)
        } else {
          console.warn("[ClienteAppPage] ⚠️ Nenhum produto encontrado, usando fallback")
          // Usar fallback apenas se não houver produtos
          setCatalog(produtosOrdenados)
        }
      } catch (error) {
        console.error("[ClienteAppPage] ❌ Erro ao carregar dados:", error)
        setLojistaData(null)
      } finally {
        if (active) {
          setIsCatalogLoading(false)
        }
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [lojistaId, isSimulator])

  const buildScenePrompts = (produtos: Produto[]) => {
    const principal = produtos[0]
    const categoria = principal?.categoria?.toLowerCase()
    const cor = principal?.cores?.[0]
    const nome = principal?.nome
    const detalhesCategoria = categoria ? ` (${categoria})` : ""
    const detalhesCor = cor ? ` na cor ${cor}` : ""

    return [
      `Ensaio fotográfico em estúdio moderno destacando ${nome ?? "o look"}${detalhesCategoria}${detalhesCor} com iluminação suave e fundo neutro.`,
      `Cenário criativo futurista ao ar livre com luzes neon envolvendo ${nome ?? "o look"}.`,
    ]
  }
  const createUniqueId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  }

  const uploadPersonPhoto = async (file: File, lojistaId: string) => {
    // Se houver backend na URL (modo simulador), usar API do paineladm
    const backendUrl = searchParams?.get("backend") || resolvedBackendUrl || null
    
    if (backendUrl) {
      console.log("[uploadPersonPhoto] Usando API do paineladm para upload:", backendUrl)
      try {
        const formData = new FormData()
        formData.append("photo", file)
        formData.append("lojistaId", lojistaId)
        
        const response = await fetch(`${backendUrl}/api/lojista/composicoes/upload-photo`, {
          method: "POST",
          body: formData,
        })
        
        if (!response.ok) {
          throw new Error(`Erro ao fazer upload: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("[uploadPersonPhoto] Upload via API concluído:", data.imageUrl?.substring(0, 50) + "...")
        return data.imageUrl
      } catch (error) {
        console.error("[uploadPersonPhoto] Erro ao fazer upload via API:", error)
        throw new Error("Erro ao fazer upload da foto via API do paineladm")
      }
    }
    
    // Fallback: tentar Firebase Storage direto (se configurado)
    const storage = getStorageClient()
    if (!storage) {
      throw new Error("Firebase Storage não configurado e backend não disponível.")
    }
    const extension = file.name?.split(".").pop()?.toLowerCase() || "jpg"
    const filePath = `lojas/${lojistaId}/clientes/uploads/${createUniqueId()}.${extension}`
    const storageRef = ref(storage, filePath)

    await uploadBytes(storageRef, file, {
      contentType: file.type || "image/jpeg",
    })

    return getDownloadURL(storageRef)
  }

  const buildLooksFromResponse = (
    payload: any,
    produtosSelecionados: Produto[],
    scenePrompts: string[]
  ): GeneratedLook[] => {
    const principal = produtosSelecionados[0] ?? catalog[0]
    const preco = principal?.preco ?? null
    const produtoNome = principal?.nome ?? "Produto"
    const compositionId = payload?.compositionId ?? null

    // Se a API retornar looks diretamente, usar eles
    if (payload?.looks && Array.isArray(payload.looks) && payload.looks.length > 0) {
      return payload.looks.map((look: any) => ({
        id: look.id || createUniqueId(),
        titulo: look.titulo || "Look Criativo IA",
        descricao: look.descricao || "Look gerado por IA.",
        imagemUrl: look.imagemUrl || fallbackLooks[0].imagemUrl,
        produtoNome: look.produtoNome || produtoNome,
        produtoPreco: look.produtoPreco ?? preco,
        watermarkText: look.watermarkText || "Imagem gerada por IA – Experimente AI",
        compositionId: look.compositionId || compositionId,
        jobId: look.jobId || null,
        downloadUrl: look.imagemUrl || null,
      }))
    }

    // Fallback: criar look criativo único
    const creativeLook: GeneratedLook = {
      id: compositionId ? `${compositionId}-creative` : createUniqueId(),
      titulo: "Look Criativo IA",
      descricao: scenePrompts[0] ?? "Look gerado por IA com os produtos selecionados.",
      imagemUrl: payload?.imagemUrl || fallbackLooks[0].imagemUrl,
      produtoNome,
      produtoPreco: preco,
      watermarkText: "Imagem gerada por IA – Experimente AI",
      compositionId,
      jobId: payload?.jobId ?? null,
      downloadUrl: payload?.imagemUrl || null,
    }

    return [creativeLook]
  }

  const handleLoginSuccess = async (nome: string, whatsapp: string) => {
    console.log("[ClienteAppPage] Login com sucesso:", { nome, whatsapp, lojista: lojistaId })
    
    // Buscar dados completos do cliente (incluindo favoritos) - usar proxy interno
    try {
      const cleanWhatsapp = whatsapp.replace(/\D/g, "")
      
      const res = await fetch(
        `/api/cliente/find?lojistaId=${encodeURIComponent(lojistaId)}&whatsapp=${encodeURIComponent(cleanWhatsapp)}`
      )
      
      if (res.ok) {
        const data = await res.json()
        if (data.cliente) {
          setClienteData({
            id: data.cliente.id,
            nome: data.cliente.nome || nome,
            whatsapp: data.cliente.whatsapp || cleanWhatsapp,
            favoritos: data.favoritos || [],
          })
          console.log("[ClienteAppPage] ✅ Dados do cliente carregados:", {
            nome: data.cliente.nome,
            favoritos: data.favoritos?.length || 0,
          })
        } else {
          // Cliente não encontrado, criar dados básicos
          setClienteData({
            id: "",
            nome,
            whatsapp: cleanWhatsapp,
            favoritos: [],
          })
        }
      }
    } catch (error) {
      console.error("[ClienteAppPage] Erro ao buscar dados do cliente:", error)
      // Continuar mesmo com erro
      setClienteData({
        id: "",
        nome,
        whatsapp: whatsapp.replace(/\D/g, ""),
        favoritos: [],
      })
    }
    
    setStep(2)
  }

  const handleGenerateLooks = async (foto: File, produtos: Produto[]) => {
    if (!foto || produtos.length === 0) return

    try {
      setGenerationError(null)
      setIsLoading(true)

      // Armazenar foto e produtos para regeneração
      setLastPhoto(foto)
      setLastSelectedProducts(produtos)

      const personImageUrl = await uploadPersonPhoto(foto, lojistaId)
      console.log("[handleGenerateLooks] ✅ Foto enviada com sucesso:", personImageUrl?.substring(0, 100) + "...")
      
      const scenePrompts = buildScenePrompts(produtos)
      const principal = produtos[0]

      if (!principal?.id) {
        throw new Error("Produto selecionado sem ID.")
      }

      // Coletar TODOS os IDs dos produtos selecionados
      const productIds = produtos.map(p => p.id).filter(Boolean)
      
      if (productIds.length === 0) {
        throw new Error("Nenhum produto válido selecionado.")
      }

      // Obter URL do backend dos query params ou usar backend resolvido (paineladm) como padrão
      const backendUrl =
        (typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("backend")
          : null) || resolvedBackendUrl

      const payload = {
        personImageUrl,
        productIds: productIds, // Enviar TODOS os produtos selecionados
        lojistaId: lojistaId,
        scenePrompts,
        options: { quality: "high", skipWatermark: false },
      }
      
      console.log("[handleGenerateLooks] Enviando requisição para API:", {
        backendUrl,
        personImageUrl: personImageUrl?.substring(0, 50) + "...",
        productIds: productIds,
        totalProdutos: productIds.length,
        produtos: produtos.map(p => ({ id: p.id, nome: p.nome })),
        lojistaId,
      })

      const response = await fetch(`${backendUrl}/api/lojista/composicoes/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Erro ao gerar composição: ${response.status}`)
      }

      const responseData = await response.json()
      
      // Se a API retornar looks diretamente, usar eles (inclui Look Criativo desativado)
      if (responseData.looks && Array.isArray(responseData.looks) && responseData.looks.length > 0) {
        console.log("[handleGenerateLooks] ✅ Usando looks retornados pela API:", responseData.looks.length)
        setLookResults(responseData.looks)
      } else {
        // Fallback: usar função antiga se não houver looks na resposta
        const generatedLooks = buildLooksFromResponse(responseData, produtos, scenePrompts)
        setLookResults(generatedLooks)
      }
      setStep(3)
    } catch (error) {
      console.error("Erro ao gerar looks:", error)
      setGenerationError(
        "Não foi possível gerar os looks agora. Tente novamente em alguns instantes."
      )
      setLookResults(fallbackLooks)
      setStep(3)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setStep(2)
  }

  const handleRegenerate = async () => {
    if (!lastPhoto || lastSelectedProducts.length === 0) {
      console.warn("[handleRegenerate] Não há foto ou produtos salvos para regenerar")
      return
    }
    // Chamar handleGenerateLooks com os mesmos dados
    await handleGenerateLooks(lastPhoto, lastSelectedProducts)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1LoginConsent
            lojistaNome={lojistaData?.nome ?? ""}
            lojistaLogoUrl={lojistaData?.logoUrl || null}
            descricao={lojistaData?.descricao ?? undefined}
            lojistaId={lojistaId}
            onLoginSubmit={handleLoginSuccess}
          />
        )
      case 2:
        return (
          <Step2Workspace
            catalog={catalog}
            isLoadingCatalog={isCatalogLoading}
            errorMessage={generationError}
            onGenerateLooks={handleGenerateLooks}
            lojistaNome={lojistaData?.nome}
            lojistaLogoUrl={lojistaData?.logoUrl}
            lojistaId={lojistaId}
            redesSociais={lojistaData?.redesSociais}
            descontoRedesSociais={lojistaData?.descontoRedesSociais}
            descontoRedesSociaisExpiraEm={lojistaData?.descontoRedesSociaisExpiraEm}
            initialPhoto={lastPhoto}
            isSimulator={isSimulator}
            clienteId={clienteData?.id || null}
            salesConfig={lojistaData?.salesConfig}
          />
        )
      case 3:
        return (
          <Step3Results
            lojistaId={lojistaId}
            lojistaNome={lojistaData?.nome || "Loja"}
            lojistaLogoUrl={lojistaData?.logoUrl || null}
            redesSociais={lojistaData?.redesSociais || {}}
            salesConfig={lojistaData?.salesConfig || {}}
            looks={lookResults}
            isLoadingLooks={isLoading}
            feedbackMessage={generationError}
            onReset={handleReset}
            onRegenerate={handleRegenerate}
            canRegenerate={!!lastPhoto && lastSelectedProducts.length > 0}
            clienteId={clienteData?.id || null}
            clienteNome={clienteData?.nome || null}
            clienteWhatsapp={clienteData?.whatsapp || null}
          />
        )
      default:
        return (
          <Step1LoginConsent
            lojistaNome={lojistaData?.nome || "Loja"}
            lojistaLogoUrl={lojistaData?.logoUrl || null}
            descricao={lojistaData?.descricao ?? undefined}
            lojistaId={lojistaId}
            onLoginSubmit={handleLoginSuccess}
          />
        )
    }
  }

  // Debug: verificar se o componente está sendo renderizado corretamente
  useEffect(() => {
    console.log("[ClienteAppPage] Componente renderizado com lojistaId:", lojistaId)
  }, [lojistaId])

  if (!lojistaId) {
    return (
      <main className="min-h-screen bg-black px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Erro: lojistaId não encontrado na URL</p>
          <p className="text-sm text-gray-500 mt-2">URL esperada: /[lojistaId]</p>
        </div>
      </main>
    )
  }

  // Mostrar erro se os dados da loja não foram carregados
  if (!isCatalogLoading && !lojistaData) {
    return (
      <main className="min-h-screen bg-black px-4 py-12 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-500 text-lg font-semibold mb-2">Erro ao carregar dados da loja</p>
          <p className="text-sm text-gray-500 mb-4">
            Não foi possível carregar os dados da loja para o ID: <code className="bg-gray-100 px-2 py-1 rounded">{lojistaId}</code>
          </p>
          <p className="text-xs text-gray-400">
            Verifique se o Firebase está configurado corretamente e se o lojistaId existe no Firestore.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12">
      {isLoading && <LoadingOverlay />}

      <div
        className={`mx-auto max-w-6xl transition-opacity duration-300 ${
          isLoading ? "pointer-events-none opacity-40" : "opacity-100"
        }`}
      >
          <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-blue-800/90 via-indigo-700/90 to-purple-500/90 p-6 shadow-xl shadow-black/30 backdrop-blur-md md:p-12">
          {renderStep()}
        </div>
      </div>
    </main>
  )
}

export default function ClienteAppPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ClienteAppPageContent />
    </Suspense>
  )
}



