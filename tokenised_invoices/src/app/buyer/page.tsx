'use client'

import InvoiceCard from '@/components/InvoiceCard'
import Link from 'next/link'

export default function BuyerPage() {
  const demoInvoices = [
    {
      issuer: 'Acme Inc.',
      token: 'INV001',
      issuePrice: 950,
      bidPrice: 980,
      maturityAmount: 1000,
      quantity: 1,
      maturityDate: '2025-07-10',
      startTimestamp: Date.now(), // started 5 sec ago
    },
    {
      issuer: 'Globex Corp.',
      token: 'INV002',
      issuePrice: 910,
      bidPrice: 940,
      maturityAmount: 1000,
      quantity: 2,
      maturityDate: '2025-08-01',
      startTimestamp: Date.now() , // started 30 sec ago
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Invoices</h1>
      <div className="grid gap-4">
        {demoInvoices.map((inv, idx) => (
          <InvoiceCard key={idx} {...inv} />
        ))}
      </div>

      <div className="mt-6">
        <Link href="/buyer/portfolio">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            View My Portfolio
          </button>
        </Link>
      </div>
    </div>
  )
}
