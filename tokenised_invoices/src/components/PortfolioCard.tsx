'use client'

type Props = {
  token: string
  issuer: string
  maturityDate: string
  payout: number
  quantity: number
}

export default function PortfolioCard({ token, issuer, maturityDate, payout, quantity }: Props) {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-bold text-lg">{token}</h2>
      <p>Issuer: {issuer}</p>
      <p>Maturity Date: {maturityDate}</p>
      <p>Payout: ${payout}</p>
      <p>Quantity Owned: {quantity}</p>
    </div>
  )
}
