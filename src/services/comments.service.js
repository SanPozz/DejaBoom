import api from './api.service';

export const getCommentsByReviewId = async (reviewId) => {
  const { data } = await api.get(`/reviews/${reviewId}/comments`);
  return data;
};

export const createComment = async (reviewId, content, parentId) => {
  const body = parentId == null ? { content } : { content, parentId };
  const { data } = await api.post(`/reviews/${reviewId}/comments`, body);
  return data;
};

export const likeComment = async (commentId) => {
  const { data } = await api.put(`/comments/${commentId}/like`);
  return data;
};

export const unlikeComment = async (commentId) => {
  const { data } = await api.delete(`/comments/${commentId}/like`);
  return data;
};
