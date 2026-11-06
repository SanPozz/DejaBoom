import Bone from "../Bone"

const GameDetailSkeleton = () => (
  <main
    aria-busy="true"
    aria-label="Cargando juego"
    className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-[220px_1fr_260px] gap-8 items-start"
  >
    <Bone className="w-full max-w-55 aspect-3/4 rounded-xl" />

    <div className="space-y-6 min-w-0">
      <div className="space-y-3">
        <Bone className="h-10 w-3/4" />
        <Bone className="h-4 w-40" />
      </div>

      <div className="flex flex-wrap gap-2">
        {[20, 24, 16, 28].map((w, i) => (
          <Bone key={i} className="h-6 rounded-full" style={{ width: `${w * 4}px` }} />
        ))}
      </div>

      <div className="space-y-2.5">
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-2/3" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Bone className="h-3 w-16" />
          <Bone className="h-4 w-32" />
        </div>
        <div className="space-y-2">
          <Bone className="h-3 w-16" />
          <Bone className="h-4 w-32" />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <Bone className="h-48 w-full rounded-2xl" />
      <Bone className="h-12 w-full rounded-xl" />
      <Bone className="h-12 w-full rounded-xl" />
    </div>
  </main>
)

export default GameDetailSkeleton
