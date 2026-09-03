import Sidebar from "../components/app/Sidebar"

import GameCover from "../components/app/GameDetail/GameCover"

import ColumnaCentro from "../components/app/GameDetail/ColumnaCentro"

import DerechaGameDetail from "../components/app/GameDetail/DerechaGameDetail"

import SimilarGamesCarousel from "../components/app/GameDetail/SimilarGamesCarousel"

import PopularListsSection from "../components/app/GameDetail/PopularListsSection"
import CommentSection from "../components/app/GameDetail/CommentSection"

const GameDetail = () => {
  return (
    <div className="flex w-full bg-background min-h-screen text-secondary font-sans antialiased">

        <Sidebar />

        <div className="flex-1 w-full overflow-y-auto">

            <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-[220px_1fr_260px] gap-8 items-start">

                <GameCover />

                <ColumnaCentro/>

                <DerechaGameDetail gameName="Ember Souls" />

            </main>

            <CommentSection />

            <SimilarGamesCarousel />

            <PopularListsSection gameName="Ember Souls" />

        </div>




    </div>
  )
}

export default GameDetail