import React, { useState } from 'react';

export default function SeccionComentarios({ 
  comentariosIniciales = [
    {
      id: 1,
      usuario: "Kai_99",
      inicial: "K",
      avatarColor: "bg-cyan-500",
      tiempo: "Hace 2 horas",
      texto: "El diseño de sonido en este nivel es una locura absoluta. Recomiendo jugarlo completamente con auriculares."
    },
    {
      id: 2,
      usuario: "Mara_G",
      inicial: "M",
      avatarColor: "bg-amber-500",
      tiempo: "Hace 5 horas",
      texto: "¿Alguien más se quedó trabado en el tercer jefe? Siento que el aumento de dificultad ahí es demasiado brusco."
    }
  ] 
}) {
  const [comentarios, setComentarios] = useState(comentariosIniciales);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const comentarioCreado = {
      id: Date.now(),
      usuario: "Tú",
      inicial: "YO",
      avatarColor: "bg-[color:var(--color-primary)]",
      tiempo: "Ahora mismo",
      texto: nuevoComentario
    };

    setComentarios([comentarioCreado, ...comentarios]);
    setNuevoComentario("");
  };

  return (
    /* CONTENEDOR CLAVE: 'max-w-3xl' evita que ocupe todo el ancho de la pantalla y 'w-full' mantiene la flexibilidad */
    <div className="w-full max-w-3xl mx-auto  space-y-6 border-t border-[color:var(--color-tertiary)]/10 pt-6 font-sans">
      
      {/* Encabezado */}
      <div className="flex justify-between items-baseline border-b border-[color:var(--color-tertiary)]/10 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[color:var(--color-tertiary)]">
          Comentarios <span className="text-[color:var(--color-tertiary)]/40 font-normal lowercase">({comentarios.length})</span>
        </h3>
      </div>

      {/* Formulario de entrada */}
      <form onSubmit={manejarEnvio} className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-[color:var(--color-primary)] flex items-center justify-center font-black text-black text-xs shrink-0 shadow-md">
          YO
        </div>
        
        <div className="flex-1 space-y-3">
          <textarea 
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Añade un comentario sobre este juego..."
            rows="3"
            className="w-full bg-[color:var(--color-background-secondary)] text-sm text-[color:var(--color-secondary)] placeholder-[color:var(--color-tertiary)]/30 rounded-lg p-3 border border-[color:var(--color-tertiary)]/15 focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-1 focus:ring-[color:var(--color-primary)]/20 transition-all resize-none font-light"
          />
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-[color:var(--color-primary)] hover:opacity-90 text-black font-bold text-xs px-4 py-2 rounded-md transition-all shadow-lg active:scale-95 duration-100"
            >
              Publicar
            </button>
          </div>
        </div>
      </form>

      {/* Listado Dinámico */}
      <div className="space-y-5 pt-2">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="flex gap-4 items-start animate-fade-in">
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full ${comentario.avatarColor} flex items-center justify-center font-bold text-black text-xs shrink-0`}>
              {comentario.inicial}
            </div>
            
            {/* Globo del comentario */}
            <div className="flex-1 bg-[color:var(--color-background-secondary)]/30 p-3 rounded-lg border border-[color:var(--color-tertiary)]/10 space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-[color:var(--color-secondary)] hover:underline cursor-pointer">
                  {comentario.usuario}
                </span>
                <span className="text-[10px] text-[color:var(--color-tertiary)]/50">
                  {comentario.tiempo}
                </span>
              </div>
              <p className="text-sm text-[color:var(--color-secondary)]/90 font-light leading-relaxed">
                {comentario.texto}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
