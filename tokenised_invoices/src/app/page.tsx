'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold">Welcome to TokenInvoice</h1>
      <div className="flex gap-4">
        <button onClick={() => router.push('/issuer')} className="bg-blue-600 text-white px-6 py-3 rounded">
          Issuer
        </button>
        <button onClick={() => router.push('/buyer')} className="bg-green-600 text-white px-6 py-3 rounded">
          Buyer
        </button>
      </div>
    </div>
  )
}
