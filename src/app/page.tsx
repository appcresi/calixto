import Link            from 'next/link'
import { getProducts } from '@/lib/firestore'
import ProductCard     from '@/components/product/ProductCard'
import type { ProductCategory } from '@/types'

const CATEGORIES: { slug: ProductCategory; label: string; sublabel: string; count: string; bg: string }[] = [
  { slug: 'aceites',    label: 'Aceites de Oliva',    sublabel: 'Virgen Extra · Prensado en frío', count: '12 productos', bg: 'from-green-mid to-green-olive'  },
  { slug: 'varietales', label: 'Varietales',           sublabel: 'Monovarietales premium',          count: '8 productos',  bg: 'from-[#3d5a2a] to-[#6b8c3d]'   },
  { slug: 'acetos',     label: 'Acetos & Vinagres',    sublabel: 'Añejados artesanalmente',         count: '6 productos',  bg: 'from-[#4a1a1a] to-terra'        },
  { slug: 'aceitunas',  label: 'Aceitunas Gourmet',    sublabel: 'Marinadas y naturales',           count: '9 productos',  bg: 'from-green-deep to-[#2d6b2d]'   },
  { slug: 'salsas',     label: 'Salsas Artesanales',   sublabel: 'Con base de AOVE',               count: '7 productos',  bg: 'from-[#4a2800] to-terra'        },
]

export default async function HomePage() {
  const featured = await getProducts({ featured: true, limitN: 8 }).catch((err) => {
  console.error('Error cargando productos:', err)
  return []
})
console.log('Productos encontrados:', featured.length)

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] bg-gradient-to-br from-green-deep via-green-mid to-green-olive
                          grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none
                        [background-image:url('/noise.png')] bg-repeat" />

        {/* radial glow */}
        <div className="absolute inset-0 pointer-events-none
                        [background:radial-gradient(ellipse_at_70%_50%,rgba(201,168,76,0.13)_0%,transparent_60%)]" />

        <div className="relative z-10 flex flex-col justify-center px-10 md:px-20 py-20 animate-fade-up">
          <p className="section-label !text-gold-light !mb-6">
            San Juan — Los Andes · Desde 2008
          </p>
          <h1 className="font-serif text-cream font-light leading-[1.05]
                         text-5xl sm:text-6xl lg:text-[5.5rem] mb-6">
            El sabor de<br />los <em className="italic text-gold-light">Andes</em><br />en tu mesa
          </h1>
          <p className="text-cream/70 font-light text-base leading-relaxed max-w-md mb-11">
            Aceites virgen extra, varietales únicos y productos gourmet seleccionados en nuestros olivares de altura.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/productos" className="btn-primary">Ver productos</Link>
            <Link href="/nosotros"  className="btn-secondary !text-cream !border-cream/30 hover:!border-gold hover:!text-gold-light">
              Nuestra historia
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden md:flex items-center justify-center p-12">
          <div className="text-[14rem] animate-float select-none drop-shadow-2xl">🫒</div>
        </div>
      </section>

      {/* ── DIVIDER ─────────────────────────────────────────────────── */}
      <div className="bg-gold text-green-deep flex items-center justify-center gap-8
                      text-[11px] tracking-[0.22em] uppercase font-medium py-3.5 overflow-hidden">
        {['🫒 Cosecha propia', 'Virgen Extra', 'Sin gluten', 'San Juan · Los Andes', 'Acidez 0,3%', 'Envío a todo el país'].map((t, i) => (
          <span key={i} className="whitespace-nowrap">{t}</span>
        ))}
      </div>

      {/* ── CATEGORIES ──────────────────────────────────────────────── */}
      <section className="px-8 md:px-20 py-20 bg-ivory">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label">Explorá nuestras líneas</p>
            <h2 className="section-title">
              Todo el sabor de<br /><em className="italic text-green-olive">los olivares</em>
            </h2>
          </div>
          <Link href="/productos" className="btn-ghost hidden md:inline-block">
            Ver todo el catálogo →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/productos?categoria=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg}
                               transition-transform duration-500 group-hover:scale-105 text-8xl
                               flex items-center justify-center`}>
                {cat.slug === 'aceites'    && '🫒'}
                {cat.slug === 'varietales' && '🌿'}
                {cat.slug === 'acetos'     && '🍾'}
                {cat.slug === 'aceitunas'  && '🫒'}
                {cat.slug === 'salsas'     && '🍅'}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-serif text-[1.2rem] text-cream leading-tight">{cat.label}</p>
                <p className="text-[10px] text-gold-light tracking-wider uppercase mt-1 font-light">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────────── */}
      <section className="px-8 md:px-20 py-20 bg-cream">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label">Destacados de la temporada</p>
            <h2 className="section-title">
              Productos<br /><em className="italic text-green-olive">más elegidos</em>
            </h2>
          </div>
          <Link href="/productos" className="btn-ghost hidden md:inline-block">
            Ver todos →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-green-olive font-light py-12">
            Cargando productos…
          </p>
        )}
      </section>

      {/* ── BRAND BANNER ────────────────────────────────────────────── */}
      <section className="bg-green-deep px-8 md:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center
                          relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-serif font-bold text-[10rem]
                        text-white/[0.03] pointer-events-none select-none leading-none tracking-widest pr-8">
          CALIXTO
        </div>

        <div className="relative z-10">
          <p className="section-label !text-gold">Nuestra historia</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-cream leading-tight mb-6">
            Del olivar a tu<br /><em className="italic text-gold-light">mesa</em>, con orgullo
          </h2>
          <p className="text-cream/60 font-light leading-[1.8] text-sm mb-9 max-w-lg">
            En las laderas de los Andes sanjuaninos, a más de 800 metros de altura, cultivamos cada olivo con respeto por la tierra y pasión por el sabor. Nuestro aceite virgen extra nace de la primera prensada en frío.
          </p>
          <Link href="/nosotros" className="btn-primary">Conocer más</Link>

          <div className="flex gap-12 mt-10 pt-10 border-t border-cream/10">
            {[['15+', 'Años cultivando'], ['800m', 'Altura olivar'], ['0,3%', 'Acidez máxima']].map(([num, lbl]) => (
              <div key={lbl}>
                <p className="font-serif text-[2.2rem] font-semibold text-gold-light leading-none">{num}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-cream/40 mt-1.5 font-light">{lbl}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center text-[12rem] relative z-10 select-none animate-float">
          🫒
        </div>
      </section>
    </>
  )
}
