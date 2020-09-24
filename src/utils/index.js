export const logout = () => {
  localStorage.removeItem("fake-access-token");
};
export const isLogin = () => {
  if (localStorage.getItem("fake-access-token")) {
    return true;
  }
  return false;
};
