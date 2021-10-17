export const checkUser = () => {
  return JSON.parse(localStorage.getItem("userLogin")) === undefined || JSON.parse(localStorage.getItem("userLogin")) === null ? false: true;
};

