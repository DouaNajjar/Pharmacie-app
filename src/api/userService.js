import { getItem, saveItem } from './asyncStorage';

const USER_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const getUsers = async () => {
  return (await getItem(USER_KEY)) || [];
};

export const addUser = async (user) => {
  const users = await getUsers();
  const newList = [...users, user];
  await saveItem(USER_KEY, newList);
  return newList;
};

export const login = async (email, password) => {
  const users = await getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    await saveItem(CURRENT_USER_KEY, user);
    return user;
  }
  return null;
};

export const logout = async () => {
  await saveItem(CURRENT_USER_KEY, null);
};

export const getCurrentUser = async () => {
  return await getItem(CURRENT_USER_KEY);
};