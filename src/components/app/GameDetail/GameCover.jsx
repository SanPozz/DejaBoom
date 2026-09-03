import coverPlaceholder from "../../../assets/230x345.svg"

import { Flag, Grid2X2 } from "lucide-react"

import coverDS3 from "../../../assets/covers/ds3_cover.png"

const game = {
    title: "Ember Souls",
    img: coverDS3,
    rating: 4.8,
    logs: 12400,
    onLists: 3200,
    id: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum et, corporis aut officiis hic deleniti sit unde ad alias ab natus! Ullam id asperiores illum incidunt eius rem inventore accusamus!"

}


const GameCover = () => {

  return (
<div className="sticky top-6 self-start w-[230px] shrink-0 z-10">
      
      {/* Contenedor de la Tarjeta */}
      <div className="bg-background-secondary border border-tertiary/15 rounded-xl shadow-md p-0 flex flex-col overflow-hidden">
        
        {/* Imagen de portada */}
        <div className="h-[345px] w-[230px] overflow-hidden rounded-t-xl">
          <img 
            src={game.img} 
            alt={game.title} 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
      
    </div>
  )
}

export default GameCover