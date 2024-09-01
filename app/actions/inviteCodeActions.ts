"use server";

export async function getInviteCode(groupId: string): Promise<string> {
  try {
    const response = await fetch(`/groups/${groupId}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("초대 코드를 가져오는데 실패했습니다.");
    }

    const data = await response.json();

    if (data && typeof data.message === "string" && data.message.length === 5) {
      return data.message;
    } else {
      throw new Error("유효하지 않은 초대 코드 형식입니다.");
    }
  } catch (error) {
    console.error("Error fetching invite code:", error);
    throw error;
  }
}
