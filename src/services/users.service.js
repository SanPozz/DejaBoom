import api from "./api.service";
import { toGame } from "./games.service";

const toReview = (review) => ({
    ...review,
    createdAt: new Date(review.createdAt),
    game: review.game ? toGame(review.game) : null,
}); 

export const getProfile = async (nickname) => {
    try {

        const { data } = await api.get(`/users/${encodeURIComponent(nickname)}/profile`);

        return {
            ...data,
            user: {...data.user, createdAt: new Date(data.user.createdAt)},
            recentReviews: data.recentReviews?.map(toReview) ?? [],
            favoriteGames: data.favoriteGames?.map(toGame) ?? []
        }
    } catch (error) {
        console.error("Error al buscar perfil de usuario:", error);
        throw error;
    }
}

export const updateProfile = async (updatedData) => {
    try {
        const { data } = await api.patch("/users/me", updatedData);
        return data.user;
    } catch (error) {
        console.error("Error al actualizar perfil de usuario:", error);
        throw error;
    }
}

export const getUserReviews = async (nickname, { page, sort } = {}) => {

    try {
        const { data } = await api.get(`/users/${encodeURIComponent(nickname)}/reviews`, {
            params: { page, sort }
        });
        return {
            ...data,
            reviews: data.reviews?.map(toReview) ?? [],
        };
    } catch (error) {
        console.error("Error al obtener reseñas de usuario:", error);
        throw error;
    }

}

export const updateFavoriteGames = async (gameIds) => {
    try {
        const { data } = await api.patch("/users/me/favorites", { gameIds });
        return data.favoriteGames.map(toGame);
    } catch (error) {
        console.error("Error al actualizar juegos favoritos:", error);
        throw error;
    }
}
