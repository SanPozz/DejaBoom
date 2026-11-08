import { Check } from "lucide-react"

const Checkbox = ({ checked, onChange, label, description }) => (
  <label
    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 cursor-pointer select-none transition-all ${
      checked
        ? "border-primary/60 bg-primary/5"
        : "border-primary/25 bg-background hover:border-primary/50"
    }`}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="peer sr-only"
    />
    <span
      aria-hidden
      className={`size-5 shrink-0 rounded-md border flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${
        checked
          ? "bg-primary border-primary shadow-[0_0_12px_rgba(103,228,91,0.35)]"
          : "border-primary/40 bg-background"
      }`}
    >
      <Check
        size={14}
        strokeWidth={3}
        className={`text-background transition-all ${checked ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      />
    </span>
    <span className="min-w-0">
      <span className="block text-sm font-semibold text-secondary">{label}</span>
      {description && <span className="block text-xs text-tertiary">{description}</span>}
    </span>
  </label>
)

export default Checkbox
