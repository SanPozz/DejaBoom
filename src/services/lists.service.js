import api from "./api.service";

import { toGame } from "./games.service";

const toList = (list) => ({
    ...list,
    createdAt: new Date(list.createdAt),
    updatedAt: new Date(list.updatedAt),
    covers: list.covers?.map(toGame) ?? [],
    games: list.games?.map(toGame) ?? [],
});

export const getUserLists = async (nickname) => {
    try {
        const { data } = await api.get(`/lists/user/${encodeURIComponent(nickname)}`);
        return data.map(toList);
    } catch (error) {
        console.error("Error al obtener listas del usuario:", error);
        throw error;
    }
}

export const getListById = async (listId) => {
    try {
        const { data } = await api.get(`/lists/${listId}`);
        return toList(data);
    } catch (error) {
        console.error("Error al obtener la lista:", error);
        throw error;
    }
}

export const createList = async (listData) => {
    try {
        const { data } = await api.post(`/lists`, listData);
        return data;
    } catch (error) {
        console.error("Error al crear la lista:", error);
        throw error;
    }
}

export const updateList = async (listId, listData) => {
    try {
        const { data } = await api.put(`/lists/${listId}`, listData);
        return data
    } catch (error) {
        console.error("Error al actualizar la lista:", error);
        throw error;
    }
}

export const deleteList = async (listId) => {
    try {
        const { data } = await api.delete(`/lists/${listId}`);
        return data;
    } catch (error) {
        console.error("Error al eliminar la lista:", error);
        throw error;
    }
}