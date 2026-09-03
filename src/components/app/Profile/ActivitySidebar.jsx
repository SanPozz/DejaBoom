import React from 'react'

export default function ActivitySidebar({ joinedDate }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-wider text-tertiary mb-6 border-b border-tertiary/10 pb-2">
        Actividad
      </h2>

      <div className="bg-background-secondary border border-tertiary/15 rounded-lg p-4 sm:p-6 space-y-4 text-sm font-light">
        <div className="pb-4 border-b border-tertiary/10">
          <p className="text-tertiary/70 mb-1">Racha de días activos</p>
          <p className="text-3xl font-bold text-primary">15 días</p>
        </div>

        <div className="pb-4 border-b border-tertiary/10">
          <p className="text-tertiary/70 mb-1">Último logro desbloqueado</p>
          <p className="text-secondary font-semibold">Crítico de Juegos</p>
          <p className="text-tertiary/40 text-xs mt-0.5">Hace 3 días</p>
        </div>

        <div>
          <p className="text-tertiary/70 mb-1">Miembro desde</p>
          <p className="text-secondary font-semibold">
            {joinedDate}
          </p>
        </div>
      </div>
    </div>
  )
}
