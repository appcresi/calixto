'use client'

import { useState }     from 'react'
import { ShoppingBag, Check } from 'lucide-react'
import toast            from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded]  = useState(false)
  const { addItem, openCart } = useCartStore()

  function handleAdd() {
    addItem(product)
    setAdded(true)
    toast.success(`${product.name} agregado al carrito`)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={`flex items-center justify-center gap-3 w-full max-w-sm py-4
                  text-[12px] tracking-[0.18em] uppercase font-medium
                  transition-all duration-300
                  ${added
                    ? 'bg-green-olive text-cream'
                    : 'bg-green-deep text-cream hover:bg-gold hover:text-green-deep'}
                  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
    >
      {added
        ? <><Check size={16} /> Agregado al carrito</>
        : <><ShoppingBag size={16} strokeWidth={1.5} /> Agregar al carrito</>
      }
    </button>
  )
}
