import Sidebar from "../components/app/Sidebar"
import SearchBar from "../components/app/SearchBar"

import hero from "../assets/Login/hero-bg.png"
import GameOfTheWeek from "../components/app/GameOfTheWeek"
import GameGrids from "../components/app/GameGrids"
import PopularReviews from "../components/app/PopularReviews"
import PopularLists from "../components/app/PopularLists"

const Home = () => {
  return (
    <div className="flex w-full">
      <Sidebar />

      <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 bg-background">
              <SearchBar />
          </header>

          <main className="overflow-y-auto flex-1">
              <GameOfTheWeek />

              <GameGrids />

              <PopularReviews />

              <PopularLists />
          </main>
      </div>
    </div>
  )
}

export default Home