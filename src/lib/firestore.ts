import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Product, Order, ProductCategory } from '@/types'

// ── Helpers ────────────────────────────────────────────────────────────────
function toDate(val: unknown): Date {
  if (val instanceof Timestamp) return val.toDate()
  if (val instanceof Date) return val
  return new Date()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToProduct(id: string, data: Record<string, any>): Product {
  return {
    ...data,
    id,
    createdAt: toDate(data.createdAt),
  } as Product
}

// ── Productos ──────────────────────────────────────────────────────────────
const PRODUCTS_COL = 'products'

export async function getProducts(opts?: {
  category?: ProductCategory
  featured?: boolean
  limitN?:   number
}): Promise<Product[]> {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

  if (opts?.category) constraints.push(where('category', '==', opts.category))
  if (opts?.featured)  constraints.push(where('featured', '==', true))
  if (opts?.limitN)    constraints.push(limit(opts.limitN))

  const snap = await getDocs(query(collection(db, PRODUCTS_COL), ...constraints))
  return snap.docs.map(d => docToProduct(d.id, d.data()))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const snap = await getDocs(
    query(collection(db, PRODUCTS_COL), where('slug', '==', slug), limit(1))
  )
  if (snap.empty) return null
  const d = snap.docs[0]
  return docToProduct(d.id, d.data())
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, PRODUCTS_COL, id))
  if (!snap.exists()) return null
  return docToProduct(snap.id, snap.data())
}

// ── Órdenes ────────────────────────────────────────────────────────────────
const ORDERS_COL = 'orders'

export async function createOrder(
  order: Omit<Order, 'id' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, ORDERS_COL), {
    ...order,
    createdAt: Timestamp.now(),
  })
  return ref.id
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const snap = await getDocs(
    query(
      collection(db, ORDERS_COL),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
  )
  return snap.docs.map(d => ({
    ...d.data(),
    id:        d.id,
    createdAt: toDate(d.data().createdAt),
  })) as Order[]
}
