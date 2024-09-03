import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    let userId = url.searchParams.get("userId");

    // userId가 유효한지 확인하고, 불필요한 따옴표 제거
    if (!userId) {
      return NextResponse.json(
        { error: "유저 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    // 따옴표 제거
    userId = userId.replace(/"/g, "");

    // groupId가 숫자인지 확인
    if (isNaN(Number(userId))) {
      return NextResponse.json(
        { error: "유효하지 않은 그룹 ID입니다." },
        { status: 400 }
      );
    }

    const apiUrl = `http://15.165.54.182:8080/users/groupId?userId=${userId}`;

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
      {
        error:
          "개별 사용자 그룹 아이디 조회 중 오류가 발생했습니다: " +
          error.message,
      },
      { status: 500 }
    );
  }
}
