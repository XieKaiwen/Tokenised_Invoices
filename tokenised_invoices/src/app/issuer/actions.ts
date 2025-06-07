'use server'

import { writeFile } from 'fs/promises'

export async function createInvoice(formData: FormData) {
  const invoice = {
    invoiceId: formData.get('invoiceId'),
    issuerName: formData.get('issuerName'),
    tokenName: formData.get('tokenName'),
    issuePrice: parseFloat(formData.get('issuePrice') as string),
    amountDue: parseFloat(formData.get('amountDue') as string),
    maturityDate: formData.get('maturityDate'),
    quantity: parseInt(formData.get('quantity') as string),
    timestamp: new Date().toISOString(),
    tokenId: `inv_${formData.get('invoiceId')}_${Date.now()}`
  }

  const filename = `./public/meta-${invoice.tokenId}.json`
  await writeFile(filename, JSON.stringify(invoice, null, 2))

  return { tokenId: invoice.tokenId }
}
