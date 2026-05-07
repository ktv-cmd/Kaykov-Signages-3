import { useEffect, useRef, useState } from "react"
import { Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { submitToGoogleSheets } from "@/lib/googleSheets"

const API_BASE = import.meta.env.VITE_SIGNAI_API_URL ?? ""
const LS_KEY = "signai_lead"

interface LeadData {
  name: string
  email: string
  phone: string
  company: string
}

interface Props {
  storefrontFile?: File
  logoFile?: File
  companyName?: string
  onConfirm: (leadId: string | null) => void
  onClose: () => void
}

export function LeadCaptureModal({ storefrontFile, logoFile, companyName, onConfirm, onClose }: Props) {
  const [form, setForm] = useState<LeadData>({ name: "", email: "", phone: "", company: "" })
  const [prefilled, setPrefilled] = useState(false)
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle")
  const [error, setError] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY)
      if (stored) {
        setForm(JSON.parse(stored))
        setPrefilled(true)
      } else if (companyName?.trim()) {
        setForm((f) => ({ ...f, company: companyName.trim() }))
      }
    } catch {}
    nameRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) { setError("Name and either email or phone are required."); return }
    setStatus("saving"); setError("")

    try {
      let leadId: string | null = null

      // Try the backend API first (only if a URL is configured)
      if (API_BASE) {
        try {
          const fd = new FormData()
          fd.append("name",    form.name.trim())
          fd.append("email",   form.email.trim())
          fd.append("phone",   form.phone.trim())
          fd.append("company", form.company.trim())
          if (storefrontFile) fd.append("storefront", storefrontFile)
          if (logoFile)       fd.append("logo",       logoFile)

          const res  = await fetch(`${API_BASE}/api/leads`, { method: "POST", body: fd })
          const json = await res.json().catch(() => ({}))
          if (res.ok) leadId = json.id ?? null
        } catch {
          // API unavailable — fall through to Google Sheets
        }
      }

      // Always send to Google Sheets as backup
      await submitToGoogleSheets({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        leadSource: "AI Sign Generator",
      })

      localStorage.setItem(LS_KEY, JSON.stringify(form))
      onConfirm(leadId)
    } catch (err) {
      setStatus("error")
      setError("Something went wrong. Please try again.")
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X size={18} />
        </button>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <img src="/favicon.png" alt="Kaykov Media" className="w-7 h-7 rounded object-cover shrink-0" />
            <span className="text-sm font-semibold text-gray-900">Sign Generator</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">
            Almost there — where should we send your design?
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your details to generate your sign mockup. We may follow up to help bring it to life.
          </p>
          {prefilled && (
            <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              Welcome back — details pre-filled
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {(["name", "email", "phone", "company"] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                {field === "name" ? "Full Name" : field === "email" ? "Email" : field === "phone" ? "Phone" : "Company Name"}
                {field === "name" ? <span className="text-red-500"> *</span> : (field === "email" || field === "phone") ? <span className="text-gray-400 font-normal"> *</span> : <span className="text-gray-400 font-normal"> (optional)</span>}
              </label>
              <input
                ref={field === "name" ? nameRef : undefined}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                placeholder={field === "name" ? "Jane Smith" : field === "email" ? "jane@example.com" : field === "phone" ? "+1 555 123 4567" : "Acme Inc."}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                required={field === "name"}
              />
            </div>
          ))}

          {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={status === "saving"}
            className={cn(
              "w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors mt-2",
              status === "saving" ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {status === "saving" ? (<><Loader2 size={15} className="animate-spin" />Saving…</>) : "Confirm & Generate My Sign"}
          </button>
          <p className="text-center text-xs text-gray-400">Your details are only used to follow up on your sign request.</p>
        </form>
      </div>
    </div>
  )
}
