import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiUrl = "http://15.165.54.182:8080/users/6";

    // 클라이언트로부터 받은 쿠키를 가져옴
    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 백엔드 서버로 쿠키를 전달
        Cookie: cookieHeader || "",
      },
      credentials: "include", // 쿠키를 포함하여 요청 (이 설정은 여전히 유효함)
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(responseData, { status: response.status });
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "회원 정보 조회 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
