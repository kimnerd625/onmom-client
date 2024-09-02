import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    let groupId = url.searchParams.get("groupId");

    // groupId가 유효한지 확인하고, 불필요한 따옴표 제거
    if (!groupId) {
      return NextResponse.json(
        { error: "그룹 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    // 따옴표 제거
    groupId = groupId.replace(/"/g, "");

    // groupId가 숫자인지 확인
    if (isNaN(Number(groupId))) {
      return NextResponse.json(
        { error: "유효하지 않은 그룹 ID입니다." },
        { status: 400 }
      );
    }

    const apiUrl = `http://15.165.54.182:8080/groups/${groupId}`;

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
      { error: "그림일기 조회 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
