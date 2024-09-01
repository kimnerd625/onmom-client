import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // URLSearchParams를 사용하여 쿼리 파라미터를 파싱
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const groupId = searchParams.get("groupId");

    const apiUrl = `http://15.165.54.182:8080/medications?userId=${userId}&groupId=${groupId}`;

    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader || "",
      },
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(responseData, { status: response.status });
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "복약 정보 조회 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
