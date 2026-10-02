export const gameCatalog = [
  { id: 101, title: "The Last of Us Part II", platform: "PS5", score: 9.5, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" },
  { id: 102, title: "Life is Strange", platform: "PC", score: 9.2, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
  { id: 103, title: "Red Dead Redemption 2", platform: "PS5", score: 9.8, communityRating: 4.9, cover: "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80" },
  { id: 104, title: "Celeste", platform: "Switch", score: 9.4, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
  { id: 105, title: "Kentucky Route Zero", platform: "PC", score: 8.9, communityRating: 4.6, cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80" },
  { id: 106, title: "Journey", platform: "PS5", score: 9.1, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" },
  { id: 201, title: "Portal 2", platform: "PC", score: 9.7, communityRating: 4.9, cover: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80" },
  { id: 202, title: "Half-Life 2", platform: "PC", score: 9.6, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80" },
  { id: 203, title: "Bioshock Infinite", platform: "PC", score: 9.0, communityRating: 4.6, cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
  { id: 204, title: "Hades", platform: "PC", score: 9.5, communityRating: 4.9, cover: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80" },
  { id: 205, title: "Stardew Valley", platform: "PC", score: 9.3, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" },
  { id: 206, title: "Symphony", platform: "PC", score: 8.8, communityRating: 4.4, cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80" },
  { id: 301, title: "Animal Crossing", platform: "Switch", score: 9.2, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" },
  { id: 302, title: "Unpacking", platform: "PC", score: 8.9, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80" },
  { id: 303, title: "A Short Hike", platform: "PC", score: 8.7, communityRating: 4.5, cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" },
  { id: 304, title: "Spiritfarer", platform: "PC", score: 9.0, communityRating: 4.8, cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" },
  { id: 305, title: "Dorfromantik", platform: "PC", score: 8.8, communityRating: 4.6, cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" },
  { id: 306, title: "Sable", platform: "PC", score: 9.1, communityRating: 4.7, cover: "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80" },
]

const gameGroups = [
  gameCatalog.slice(0, 6),
  gameCatalog.slice(6, 12),
  gameCatalog.slice(12, 18),
  [],
  [],
  [],
]

const listMetadata = [
  { id: 1, title: "Juegos que me hicieron llorar", description: "Títulos con historias que se quedan contigo días después.", visibility: "Pública", mood: "Emocionales", covers: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80"] },
  { id: 2, title: "100% recomendado", description: "Los mejores juegos para sugerirle a cualquiera en una charla.", visibility: "Pública", mood: "Clásicos", covers: ["https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80"] },
  { id: 3, title: "Para jugar en la noche", description: "La mejor selección para tardes largas, calma y buena música.", visibility: "Privada", mood: "Relax", covers: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"] },
  { id: 4, title: "GOTY candidates", description: "Mis apuestas para el mejor juego del año según lo que he probado.", visibility: "Pública", mood: "Nuevos lanzamientos", covers: ["https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"] },
  { id: 5, title: "Compañeros de co-op", description: "Juegos perfectos para jugar con amigos y compartir sesiones largas.", visibility: "Pública", mood: "Cooperativos", covers: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1526509867162-5f2ca1d7d460?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"] },
  { id: 6, title: "RPGs que cambiarán tu vida", description: "Historias largas, decisiones importantes y mundos enormes.", visibility: "Pública", mood: "RPG", covers: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1528819622761-bec1b7a8d4f8?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"] },
]

export const listEditorSeeds = listMetadata.map((list, index) => ({
  ...list,
  author: "Tú",
  createdAt: ["12 de noviembre", "24 de octubre", "5 de septiembre"][index] ?? "Reciente",
  games: gameGroups[index],
}))