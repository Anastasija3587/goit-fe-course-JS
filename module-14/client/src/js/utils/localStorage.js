const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Get state error: ", error);
  }
};

export default { remove };
