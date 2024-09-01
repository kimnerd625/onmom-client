import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const groupId = url.searchParams.get("groupId");
    const userId = url.searchParams.get("userId");
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");

    const apiUrl = `http://15.165.54.182:8080/diaries/monthly?groupId=${groupId}&userId=${userId}&year=${year}&month=${month}`;

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
      { error: "그림일기 월별 조회 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
