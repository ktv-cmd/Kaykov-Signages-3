"use client"

// Dynamic import with ssr:false keeps BrowserRouter out of the server render.
// Next.js handles the API routes; React Router handles all client-side navigation.
import dynamic from "next/dynamic"

const App = dynamic(() => import("../../src/App"), { ssr: false })

export default function CatchAll() {
  return <App />
}
