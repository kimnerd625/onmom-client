export const getGroupId = (): string | null =>
  sessionStorage.getItem("groupId");

export const setGroupId = (groupId: number): void => {
  const userData = JSON.stringify(groupId);
  sessionStorage.setItem("groupId", userData);
};

export const removeGroupId = (): void => sessionStorage.removeItem("groupId");
