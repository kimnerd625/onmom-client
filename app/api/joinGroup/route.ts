import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { groupId, userId, code, role } = await request.json();

    console.log("Received data:", { groupId, userId, code, role });

    // code 배열을 문자열로 변환
    const inviteCode = code;

    const apiUrl = `http://15.165.54.182:8080/groups/${groupId}/invite/accept`;
    // 클라이언트로부터 받은 쿠키를 가져옴
    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 백엔드 서버로 쿠키를 전달
        Cookie: cookieHeader || "",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        inviteCode,
        role,
      }),
    });

    // 백엔드에서 반환된 응답 데이터를 모두 읽음
    const responseData = await response.json();
    console.log("Backend response:", responseData);

    if (!response.ok) {
      // 백엔드에서 보낸 에러 메시지를 포함한 응답을 클라이언트로 전송
      return NextResponse.json(responseData, { status: response.status });
    }

    // 성공한 경우에도 백엔드에서 보낸 응답 데이터를 그대로 클라이언트로 전송
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "초대수락 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
