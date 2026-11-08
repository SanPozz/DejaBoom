import { Clock } from "lucide-react"

const ROWS = [
  ["hastily", "Historia principal"],
  ["normally", "Historia + extras"],
  ["completely", "Completista"],
]

// IGDB devuelve los tiempos en segundos. Se redondea a la media hora.
const formatDuration = (seconds) => {
  const hours = seconds / 3600
  if (hours < 1) return `${Math.max(1, Math.round(seconds / 60))} min`
  return `${(Math.round(hours * 2) / 2).toLocaleString("es-AR")} h`
}

const TimeToBeatCard = ({ timeToBeat }) => {
  const rows = ROWS.filter(([key]) => timeToBeat?.[key] > 0)
  if (rows.length === 0) return null

  const max = Math.max(...rows.map(([key]) => timeToBeat[key]))

  return (
    <div className="bg-background-secondary border border-tertiary/15 rounded-xl p-4 space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-wider">
        <Clock size={16} className="text-primary" />
        Duración
      </h3>

      <dl className="space-y-3">
        {rows.map(([key, label]) => (
          <div key={key} className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <dt className="text-tertiary">{label}</dt>
              <dd className="font-bold text-primary">{formatDuration(timeToBeat[key])}</dd>
            </div>
            <div className="h-1.5 rounded-full bg-tertiary/10 overflow-hidden" aria-hidden>
              <div
                className="h-full rounded-full bg-primary/70"
                style={{ width: `${(timeToBeat[key] / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </dl>

      {timeToBeat.count > 0 && (
        <p className="text-[11px] text-tertiary/60">
          Según {timeToBeat.count.toLocaleString("es-AR")} {timeToBeat.count === 1 ? "jugador" : "jugadores"} de IGDB
        </p>
      )}
    </div>
  )
}

export default TimeToBeatCard
