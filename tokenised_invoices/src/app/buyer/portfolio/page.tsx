'use client'

import PortfolioCard from '@/components/PortfolioCard'

export default function BuyerPortfolioPage() {
  // Simulated buyer invoice ownership (replace with real data later)
  const ownedInvoices = [
    {
      token: 'INV001',
      issuer: 'Acme Inc.',
      maturityDate: '2025-07-10',
      payout: 1000,
      quantity: 1
    },
    {
      token: 'INV003',
      issuer: 'Globex Corp.',
      maturityDate: '2025-08-15',
      payout: 1200,
      quantity: 2
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📒 Your Owned Invoices</h1>
      <div className="grid gap-4">
        {ownedInvoices.map((inv, idx) => (
          <PortfolioCard key={idx} {...inv} />
        ))}
      </div>
    </div>
  )
}
