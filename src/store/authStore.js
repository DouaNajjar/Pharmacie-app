import { create } from 'zustand';
import { login, logout, getCurrentUser } from '../api/userService';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  
  loadCurrentUser: async () => {
    const user = await getCurrentUser();
    set({ user, isLoading: false });
  },
  
  login: async (email, password) => {
    const user = await login(email, password);
    if (user) {
      set({ user });
      return true;
    }
    return false;
  },
  
  logout: async () => {
    await logout();
    set({ user: null });
  }
}));