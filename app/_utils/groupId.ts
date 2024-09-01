export const getGroupId = (): string | null => {
  // 브라우저 환경인지 확인
  if (typeof window === "undefined") {
    return null; // 서버에서는 null 반환
  }

  // 브라우저에서만 sessionStorage 접근
  return sessionStorage.getItem("groupId");
};
export const setGroupId = (groupId: number): void => {
  const userData = JSON.stringify(groupId);
  sessionStorage.setItem("groupId", userData);
};

export const removeGroupId = (): void => sessionStorage.removeItem("groupId");
