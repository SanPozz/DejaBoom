import Bone from "../Bone"

const ReviewDetailSkeleton = () => (
  <div aria-busy="true" aria-label="Cargando reseña">
    <header className="border-b border-white/6">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-10 space-y-6">
        <Bone className="h-4 w-16" />

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Bone className="w-36 sm:w-44 aspect-3/4 shrink-0 rounded-xl" />

          <div className="flex-1 w-full space-y-4">
            <Bone className="h-3 w-24" />
            <Bone className="h-9 w-2/3" />
            <div className="flex items-center gap-2.5">
              <Bone className="w-8 h-8 rounded-full" />
              <Bone className="h-4 w-24" />
              <Bone className="h-6 w-28 rounded-full" />
            </div>
            <div className="flex gap-2">
              <Bone className="h-6 w-16 rounded-full" />
              <Bone className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
      <div className="space-y-8 min-w-0">
        <div className="bg-background-secondary border border-white/[0.07] rounded-2xl p-6 space-y-3">
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-3/4" />
          <div className="pt-4 mt-2 border-t border-white/6 flex gap-4">
            <Bone className="h-4 w-12" />
            <Bone className="h-4 w-12" />
            <Bone className="h-4 w-24" />
          </div>
        </div>

        <div className="space-y-5">
          <Bone className="h-4 w-32" />
          <div className="flex gap-4">
            <Bone className="w-8 h-8 rounded-full shrink-0" />
            <Bone className="h-24 w-full rounded-lg" />
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-4">
              <Bone className="w-8 h-8 rounded-full shrink-0" />
              <Bone className="h-20 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        <Bone className="h-64 w-full rounded-2xl" />
        <Bone className="h-24 w-full rounded-xl" />
        <Bone className="h-24 w-full rounded-xl" />
      </aside>
    </div>
  </div>
)

export default ReviewDetailSkeleton
