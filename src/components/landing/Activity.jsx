

import ReviewLanding from "./ReviewLanding"

const Activity = () => {


  return (
    <section className="bg-background-secondary py-12 sm:py-16 lg:py-20 w-full flex flex-col lg:flex-row items-center justify-center border-t-2 border-tertiary px-4 sm:px-8 lg:px-16 gap-10 lg:gap-16">

        <div className='flex flex-col items-start w-full lg:w-1/2'>
            <span className='text-primary font-medium text-sm sm:text-md tracking-widest mb-2'>
                Mantenete al tanto
            </span>
            <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-secondary leading-snug'>
              Segui la <span className='text-primary'>actividad</span> de tus amigos y compartí con ellos.
            </h3>
            <p className='text-tertiary text-sm sm:text-md mb-6'>
              Podras ver las actividades de tus amigos, los juegos que terminaron, los que reseñaron y los que agregaron a su lista para jugar.
            </p>
        </div>

        <div className='w-full lg:w-1/2 flex flex-col gap-4'>
          <ReviewLanding user="Juan" game="Elden Ring" review="Uno de los mejores juegos que he jugado, increíble" rating={5} timeAgo="Hace 2 horas" />
          <ReviewLanding user="María" game="Cyberpunk 2077" review="Excelente experiencia, muy inmersivo y adictivo" rating={4.5} timeAgo="Hace 5 horas" />
          <ReviewLanding user="Carlos" game="Dark Souls III" review="Desafiante y satisfactorio, totalmente recomendado" rating={4} timeAgo="Hace 1 hora" />
        </div>

    </section>
  )
}

export default Activity