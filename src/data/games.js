export const games = [
  { id: 1, title: "Elden Ring", genres: ["RPG", "Acción"], platforms: ["PC", "PS5", "Xbox"] },
  { id: 2, title: "Baldur's Gate 3", genres: ["RPG", "Estrategia"], platforms: ["PC", "PS5"] },
  { id: 3, title: "Starfield", genres: ["RPG", "Ciencia ficción"], platforms: ["PC", "Xbox"] },
  { id: 4, title: "Hades", genres: ["Roguelike", "Acción"], platforms: ["PC", "Switch", "PS5"] },
  { id: 5, title: "Cyberpunk 2077", genres: ["RPG", "Acción"], platforms: ["PC", "PS5", "Xbox"] },
  { id: 6, title: "Hollow Knight", genres: ["Metroidvania", "Plataformas"], platforms: ["PC", "Switch"] },
  { id: 7, title: "Ember Souls", genres: ["Acción", "Aventura"], platforms: ["PC"] },
  { id: 8, title: "Stardew Valley", genres: ["Simulación", "Indie"], platforms: ["PC", "Switch"] },
]

const normalize = (text) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

// Hoy filtra la lista local. Cuando elijan RAWG o IGDB,
// solo hay que reemplazar esta función por un fetch (RAWG usa ?search=).
export const searchGames = (query) => {
  const q = normalize(query.trim())
  if (!q) return []

  return games
    .filter((game) =>
      [game.title, ...game.genres, ...game.platforms].some((field) =>
        normalize(field).includes(q)
      )
    )
    .slice(0, 6)
}