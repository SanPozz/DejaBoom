import api from './api.service';
//utiliza la api para adjuntar el token de firebase
export const getNotifications = async () => {
  const { data } = await api.get('/notifications');
  return data;
};

export const markNotificationAsRead = async (id) => {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data;
};

export const markAllNotificationsAsRead = async () => {
  const { data } = await api.patch('/notifications/read-all');
  return data;
};
