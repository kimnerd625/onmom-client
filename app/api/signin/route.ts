import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const apiUrl = "http://15.165.54.182:8080/auth/login";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 쿠키를 포함하여 요청
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // 백엔드에서 보낸 에러 메시지를 포함한 응답을 클라이언트로 전송
      return NextResponse.json(responseData, { status: response.status });
    }

    // 백엔드에서 받은 Set-Cookie 헤더를 추출
    const setCookieHeader = response.headers.get("set-cookie");

    const nextResponse = NextResponse.json(responseData, { status: 200 });

    if (setCookieHeader) {
      // Set-Cookie 헤더를 클라이언트에게 전달
      nextResponse.headers.set("Set-Cookie", setCookieHeader);
    }

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
