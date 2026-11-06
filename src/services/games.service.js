import axios from "axios"

// IGDB devuelve la portada como miniatura (t_thumb, 90x128). Se reemplaza por un tamaño real:
// t_cover_big (264x374) o t_cover_big_2x (528x748) para pantallas retina.
export const getCoverUrl = (url, size = "t_cover_big") =>
    url ? `https:${url.replace(/t_[a-z0-9_]+/, size)}` : null

const toGame = (game) => ({
    id: game.id,
    title: game.name,
    genres: game.genres?.map((genre) => genre.name) ?? [],
    platforms: game.platforms?.map((platform) => platform.name) ?? [],
    cover: getCoverUrl(game.cover?.url),
    artwork: getCoverUrl(game.artworks?.[0]?.url, "t_1080p"),
    summary: game.summary ?? "",
    releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
})

export const searchGames = async (query, signal) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/search`, {
            params: { q: query },
            signal,
        });
        return response.data.map(toGame);
    } catch (error) {
        if (axios.isCancel(error)) throw error;
        console.error("Error searching games:", error);
        return [];
    }
}

export const searchGameById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/${id}`);
        return toGame(response.data);
    } catch (error) {
        console.error("Error fetching game by ID:", error);
        return null;
    }
}