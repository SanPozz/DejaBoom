import axios from "axios"

// IGDB devuelve la portada como miniatura (t_thumb, 90x128). Se reemplaza por un tamaño real:
// t_cover_big (264x374) o t_cover_big_2x (528x748) para pantallas retina.
export const getCoverUrl = (url, size = "t_cover_big") =>
    url ? `https:${url.replace(/t_[a-z0-9_]+/, size)}` : null

const getCompanies = (game, role) =>
    game.involved_companies?.filter((item) => item[role]).map((item) => item.company.name) ?? []

const toGame = (game) => ({
    id: game.id,
    title: game.name,
    genres: game.genres?.map((genre) => genre.name) ?? [],
    platforms: game.platforms?.map((platform) => platform.name) ?? [],
    description: game.summaryEs ?? game.summary ?? "",
    timeToBeat: game.timeToBeat ?? null,
    developers: getCompanies(game, "developer"),
    publishers: getCompanies(game, "publisher"),
    cover: getCoverUrl(game.cover?.url),
    coverLarge: getCoverUrl(game.cover?.url, "t_cover_big_2x"),
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

export const getSimilarGames = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/${id}/similar`);
        return response.data.map(toGame);
    } catch (error) {
        console.error("Error fetching similar games:", error);
        return [];
    }
}

export const getCommunityData = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/${id}/community`);
        return response.data;
    } catch (error) {
        console.error("Error fetching community data:", error);
        return null;
    }
}