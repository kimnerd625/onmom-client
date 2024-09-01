export const getGroupId = () => {
  const storedUserString = sessionStorage.getItem("loginUser");
  if (storedUserString) {
    const user = JSON.parse(storedUserString);
    return user.groupId;
  }
  return null;
};
