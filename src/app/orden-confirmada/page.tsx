import Link from 'next/link'

export default function OrdenConfirmadaPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="text-center max-w-lg px-8">
        <div className="text-8xl mb-8 animate-float inline-block">🫒</div>
        <h1 className="font-serif text-4xl font-light text-green-deep mb-4">
          ¡Gracias por tu pedido!
        </h1>
        <p className="text-gray-500 font-light text-sm leading-relaxed mb-10">
          Recibimos tu orden correctamente. Te enviaremos un correo con el seguimiento en cuanto confirmemos el pago.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/"          className="btn-primary">Volver al inicio</Link>
          <Link href="/productos" className="btn-secondary">Seguir comprando</Link>
        </div>
      </div>
    </div>
  )
}
