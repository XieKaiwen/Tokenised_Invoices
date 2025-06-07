'use client'

import { useEffect, useState } from 'react'

type Props = {
  issuer: string
  token: string
  issuePrice: number
  bidPrice: number
  maturityAmount: number
  quantity: number
  maturityDate: string
  startTimestamp: number // timestamp in milliseconds
}

export default function InvoiceCard(props: Props) {
  const [timeLeft, setTimeLeft] = useState(60) // seconds

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const secondsLeft = Math.max(0, 60 - Math.floor((now - props.startTimestamp) / 1000))
      setTimeLeft(secondsLeft)
    }, 1000)

    return () => clearInterval(interval)
  }, [props.startTimestamp])

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60).toString().padStart(2, '0')
    const s = (sec % 60).toString().padStart(2, '0')
    return `${min}:${s}`
  }

  return (
    <div className="border p-4 rounded shadow flex flex-col gap-2">
      <h2 className="font-semibold">{props.token} — {props.issuer}</h2>
      <p>Issue Price: ${props.issuePrice}</p>
      <p>Current Bid: ${props.bidPrice}</p>
      <p>Amount on Maturity: ${props.maturityAmount}</p>
      <p>Quantity: {props.quantity}</p>
      <p>Maturity Date: {props.maturityDate}</p>
      <p className="text-red-600 font-mono">⏱ Time Left: {formatTime(timeLeft)}</p>
      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded" disabled={timeLeft === 0}>
        {timeLeft > 0 ? 'Place Bid' : 'Expired'}
      </button>
    </div>
  )
}
