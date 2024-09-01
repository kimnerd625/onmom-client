import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const groupName = formData.get("groupName");
    const role = formData.get("role");
    const image = formData.get("image");
    const userId = formData.get("userId");

    if (!groupName || !role || !image || !userId) {
      return NextResponse.json(
        {
          error: "FE : 업로드할 이미지 또는 필수 인자가 빠졌습니다.",
        },
        { status: 400 }
      );
    }
    const apiUrl = "http://15.165.54.182:8080/groups";
    // 클라이언트로부터 받은 쿠키를 가져옴
    const cookieHeader = request.headers.get("cookie");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        // 백앤드 서버로 쿠키를 전달
        Cookie: cookieHeader || "",
      },
      credentials: "include",
      body: formData,
    });

    // 백엔드에서 반환된 응답 데이터를 모두 읽음
    const responseData = await response.json();

    if (!response.ok) {
      // 백엔드에서 보낸 에러 메시지를 포함한 응답을 클라이언트로 전송
      return NextResponse.json(responseData, { status: response.status });
    }

    // 성공한 경우에도 백엔드에서 보낸 응답 데이터를 그대로 클라이언트로 전송
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "그룹생성 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
