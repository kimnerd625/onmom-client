import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // URL에서 userId와 groupId를 쿼리 파라미터로 추출
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const groupId = searchParams.get("groupId");

    if (!userId || !groupId) {
      return NextResponse.json(
        { error: "userId와 groupId가 필요합니다." },
        { status: 400 }
      );
    }

    // 클라이언트로부터 받은 쿠키를 포함하여 백엔드 API로 요청
    const cookie = request.headers.get("cookie") || "";

    // 백엔드 API로부터 데이터 가져오기
    const apiUrl = `http://15.165.54.182:8080/medication?userId=${userId}&groupId=${groupId}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie, // 쿠키를 수동으로 설정
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      // 백엔드에서 보낸 에러 메시지를 포함한 응답을 클라이언트로 전송
      return NextResponse.json(responseData, { status: response.status });
    }

    // 정상적인 응답을 클라이언트로 전송
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    // 예외 처리 및 에러 메시지 전송
    return NextResponse.json(
      { error: "약물 정보 가져오는 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
