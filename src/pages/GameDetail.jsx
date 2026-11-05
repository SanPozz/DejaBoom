import Sidebar from "../components/app/Sidebar"

import GameCover from "../components/app/GameDetail/GameCover"

import ColumnaCentro from "../components/app/GameDetail/ColumnaCentro"

import DerechaGameDetail from "../components/app/GameDetail/DerechaGameDetail"

import SimilarGamesCarousel from "../components/app/GameDetail/SimilarGamesCarousel"

import PopularListsSection from "../components/app/GameDetail/PopularListsSection"
import CommentSection from "../components/app/GameDetail/CommentSection"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { getCoverUrl } from "../services/games.service"


const getCompanies = (game, role) =>
  game?.involved_companies?.filter((item) => item[role]).map((item) => item.company.name) ?? []

const GameDetail = () => {

  const { id: gameId } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/games/${gameId}`)
      .then((response) => {
        console.log(response.data)
        setGame(response.data)
      })
      .catch((error) => {
        console.error("Error fetching game details:", error)
      })
  }, [gameId])

  return (
    <div className="flex w-full bg-background min-h-screen text-secondary font-sans antialiased">

        <Sidebar />

        <div className="flex-1 w-full overflow-y-auto">

            <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-[220px_1fr_260px] gap-8 items-start">

                <GameCover url={getCoverUrl(game?.cover?.url, "t_cover_big_2x")} title={game?.name} />

                <ColumnaCentro 
                   genres={game?.genres?.map((genre) => genre.name) ?? []}
                   platforms={game?.platforms?.map((platform) => platform.name) ?? []}
                    title={game?.name}
                   releaseDate={game?.first_release_date
                     ? new Date(game.first_release_date * 1000).toLocaleDateString("es-AR", { timeZone: "UTC" })
                     : ""}
                   description={game?.summaryEs}
                   studios={getCompanies(game, "developer")}
                   publishers={getCompanies(game, "publisher")}
                />

                <DerechaGameDetail gameName={game?.name} />

            </main>

            <CommentSection />

            <SimilarGamesCarousel />

            <PopularListsSection gameName={game?.name} />

        </div>




    </div>
  )
}

export default GameDetail