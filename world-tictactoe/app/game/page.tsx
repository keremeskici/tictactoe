'use client'

import { useState } from 'react'
import { TicTacToeBoard } from '@/components/TicTacToeBoard'
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'
import { useRouter } from 'next/navigation'
import { useMiniKit } from '@/hooks/useMiniKit'

export default function GamePage() {
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  useMiniKit()             // preload / sanity-check

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) return alert('Open inside World App!')
    const { finalPayload } = await MiniKit.commandsAsync.verify({
      action: process.env.NEXT_PUBLIC_ACTION_ID!,      // incognito action from portal
      verification_level: VerificationLevel.Orb,
    })
    if (finalPayload.status === 'success') {
      // optional: POST to backend to store nullifier_hash
      await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: finalPayload }),
      })
      setVerified(true)
    } else {
      alert('Verification failed or cancelled.')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      {!verified ? (
        <>
          <h2 className="text-2xl font-semibold">Verify you’re human to start</h2>
          <button
            onClick={handleVerify}
            className="px-6 py-3 rounded-xl bg-black text-white hover:scale-105 transition"
          >
            Verify with World ID
          </button>
        </>
      ) : (
        <TicTacToeBoard />
      )}
      <button onClick={() => router.back()} className="underline mt-4 text-sm">
        ← back
      </button>
    </main>
  )
}