'use client'

import { useState } from 'react'
import { createInvoice } from './actions'

export default function Page() {
  const [form, setForm] = useState({
    invoiceId: '',
    issuerName: '',
    tokenName: '',
    amountDue: '',
    issuePrice: '',
    maturityDate: '',
    quantity: 1,
  })

  const handleSubmit = async () => {
    const formData = new FormData()
    for (const key in form) {
      formData.append(key, (form as any)[key])
    }

    const result = await createInvoice(formData)
    alert(`Invoice token created: ${result.tokenId}`)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Issue a Tokenized Invoice</h1>
      <input placeholder="Invoice ID" className="input" onChange={e => setForm(f => ({...f, invoiceId: e.target.value}))} />
      <input placeholder="Issuer Name" className="input" onChange={e => setForm(f => ({...f, issuerName: e.target.value}))} />
      <input placeholder="Token Name" className="input" onChange={e => setForm(f => ({...f, tokenName: e.target.value}))} />
      <input type="number" placeholder="Issue Price ($)" className="input" onChange={e => setForm(f => ({...f, issuePrice: e.target.value}))} />
      <input type="number" placeholder="Amount Paid at Maturity ($)" className="input" onChange={e => setForm(f => ({...f, amountDue: e.target.value}))} />
      <input type="date" placeholder="Maturity Date" className="input" onChange={e => setForm(f => ({...f, maturityDate: e.target.value}))} />
      <input type="number" placeholder="Quantity" className="input" value={form.quantity} onChange={e => setForm(f => ({...f, quantity: parseInt(e.target.value)}))} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit Invoice</button>
    </div>
  )
}
