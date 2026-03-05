import Link from 'next/link'

const LINKS = {
  'Productos':  [
    { label: 'Aceites de Oliva', href: '/productos?categoria=aceites'    },
    { label: 'Varietales',       href: '/productos?categoria=varietales' },
    { label: 'Acetos',           href: '/productos?categoria=acetos'     },
    { label: 'Aceitunas',        href: '/productos?categoria=aceitunas'  },
    { label: 'Salsas',           href: '/productos?categoria=salsas'     },
  ],
  'Empresa': [
    { label: 'Nuestra historia', href: '/nosotros'       },
    { label: 'El olivar',        href: '/olivar'         },
    { label: 'Sustentabilidad',  href: '/sustentabilidad'},
    { label: 'Recetas',          href: '/recetas'        },
  ],
  'Ayuda': [
    { label: 'Envíos',              href: '/envios'      },
    { label: 'Devoluciones',        href: '/devoluciones'},
    { label: 'Preguntas frecuentes',href: '/faq'         },
    { label: 'Contacto',            href: '/contacto'    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c]">
      <div className="max-w-screen-xl mx-auto px-8 md:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-14 mb-14
                        pb-14 border-b border-white/[0.07]">

          <div>
            <div className="font-serif text-[1.7rem] font-semibold text-cream tracking-[0.07em]">
              CALIXTO
            </div>
            <span className="block text-[9px] tracking-[0.2em] uppercase text-gold font-light mt-1 mb-5">
              Origen & Sabor
            </span>
            <p className="text-[13px] text-cream/40 font-light leading-relaxed">
              Aceites virgen extra y productos gourmet de los olivares sanjuaninos. Cosecha propia, primera prensada en frío.
            </p>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-gold font-medium mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-cream/40 font-light hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-cream/20 font-light tracking-wide">
            © {new Date().getFullYear()} Calixto — Origen & Sabor. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-cream/20 font-light">San Juan, Argentina</p>
        </div>
      </div>
    </footer>
  )
}
