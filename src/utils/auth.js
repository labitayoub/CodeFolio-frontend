export const removeToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => !!localStorage.getItem('token');
