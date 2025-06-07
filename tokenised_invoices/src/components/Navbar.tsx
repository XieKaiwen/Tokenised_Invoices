'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between">
      <div className="font-bold">TokenInvoice</div>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/issuer">Issuer</Link>
        <Link href="/buyer">Buyer</Link>
        <Link href="/portfolio">Portfolio</Link>
      </div>
    </nav>
  )
}
