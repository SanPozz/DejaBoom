import api from "./api.service";
import { toGame } from "./games.service";

export const getProfile = async (nickname) => {
    try {

        const { data } = await api.get(`/users/${encodeURIComponent(nickname)}/profile`);

        return {
            ...data,
            user: {...data.user, createdAt: new Date(data.user.createdAt)},
            recentReviews: data.recentReviews?.map(review => ({
                ...review,
                createdAt: new Date(review.createdAt),
                game: review.game ? toGame(review.game) : null,
            })) ?? []
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