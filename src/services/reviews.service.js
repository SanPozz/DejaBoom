

import api from "./api.service";


export const getReviewById = async (id) => {

  try {
  
  const { data } = await api.get(`/reviews/${id}`);
  return data;

  } catch (error) {
    console.error("Error getting review by ID:", error);
    throw error;
  }
};

export const createReview = async ({ gameId, rating, content, completed }) => {
  try {
    

    const { data } = await api.post(`/reviews/create`, { gameId, rating, content, completed });
    return data;
    
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const likeReview = async (reviewId) => {
  try {

    const { data } = await api.put(`/reviews/like`, { reviewId });
    return data;

  } catch (error) {
    console.error("Error liking review:", error);
    throw error;
  }
};

export const unlikeReview = async (reviewId) => {
  try {

    const { data } = await api.put(`/reviews/unlike`, { reviewId });
    return data;

  } catch (error) {
    console.error("Error unliking review:", error);
    throw error;
  }
};