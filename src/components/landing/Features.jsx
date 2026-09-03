import features from "../../consts/features"

const Features = () => {
  

  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium mb-4">Todo lo que necesitas</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">Un hogar para tu vida gamer</h2>
          <p className="text-tertiary text-base sm:text-lg max-w-3xl mx-auto">
            Desde el primer cutscene hasta el trofeo platino, DejaBoom guarda un registro de todo y te conecta con jugadores que comparten tu gusto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:border-primary/60 hover:bg-primary/5 border-tertiary`}
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
                <p className="text-tertiary text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features