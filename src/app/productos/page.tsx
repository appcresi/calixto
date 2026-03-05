import { Suspense }      from 'react'
import { getProducts }   from '@/lib/firestore'
import ProductCard       from '@/components/product/ProductCard'
import type { ProductCategory } from '@/types'

const CATEGORIES: { slug: ProductCategory; label: string }[] = [
  { slug: 'aceites',    label: 'Aceites de Oliva' },
  { slug: 'varietales', label: 'Varietales'        },
  { slug: 'acetos',     label: 'Acetos'            },
  { slug: 'aceitunas',  label: 'Aceitunas'         },
  { slug: 'salsas',     label: 'Salsas'            },
]

interface Props {
  searchParams: Promise<{ categoria?: string }>
}

export default async function ProductosPage({ searchParams }: Props) {
  const params   = await searchParams
  const category = params.categoria as ProductCategory | undefined

  const products = await getProducts({ category }).catch(() => [])

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-cream-warm px-8 md:px-20 py-14 border-b border-cream-warm">
        <p className="section-label">Catálogo completo</p>
        <h1 className="section-title">
          {category
            ? CATEGORIES.find(c => c.slug === category)?.label ?? 'Productos'
            : 'Todos los productos'}
        </h1>
      </div>

      <div className="px-8 md:px-20 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href="/productos"
            className={`text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-200 font-light
                        ${!category
                          ? 'bg-green-deep text-cream border-green-deep'
                          : 'border-green-deep/20 text-green-deep hover:border-gold hover:text-gold'}`}
          >
            Todos
          </a>
          {CATEGORIES.map(cat => (
            <a
              key={cat.slug}
              href={`/productos?categoria=${cat.slug}`}
              className={`text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-200 font-light
                          ${category === cat.slug
                            ? 'bg-green-deep text-cream border-green-deep'
                            : 'border-green-deep/20 text-green-deep hover:border-gold hover:text-gold'}`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Grid */}
        <Suspense fallback={<ProductsGridSkeleton />}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-green-olive mb-3">
                No hay productos en esta categoría
              </p>
              <p className="text-sm text-gray-400 font-light">
                Próximamente agregaremos más productos.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-cream-warm" />
          <div className="p-5 border-t border-cream-warm space-y-2">
            <div className="h-2 w-16 bg-cream-warm rounded" />
            <div className="h-5 w-3/4 bg-cream-warm rounded" />
            <div className="h-3 w-full bg-cream-warm rounded" />
            <div className="h-6 w-1/3 bg-cream-warm rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
