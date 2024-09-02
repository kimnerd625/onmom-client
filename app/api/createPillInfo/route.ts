import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 클라이언트로부터 요청된 데이터를 파싱
    const { userId, groupId, medicineName, startDate, endDate, frequency } =
      await request.json();

    // 약물 정보 생성 API URL 설정
    const apiUrl = "http://15.165.54.182:8080/medication";

    // 백엔드로 POST 요청 전송
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        groupId,
        medicineName,
        startDate,
        endDate,
        frequency,
      }),
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
      { error: "약물 정보 생성 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
