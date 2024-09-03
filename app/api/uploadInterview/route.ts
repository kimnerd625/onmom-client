import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // FormData를 사용하여 파일을 처리합니다.
    const formData = await request.formData();
    const file = formData.get("file") as File;
    let groupId = formData.get("groupId") as string;
    let userId = formData.get("userId") as string;

    // 파일이 없을 경우 오류 반환
    if (!file) {
      console.log("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // groupId와 userId에서 따옴표 제거
    groupId = groupId.replace(/"/g, "");
    userId = userId.replace(/"/g, "");

    console.log("Received file:", file);
    console.log("Received groupId:", groupId);
    console.log("Received userId:", userId);

    const apiUrl = "http://15.165.54.182:8080/diaries/create";

    // 백엔드로 전송할 데이터 준비
    const formDataToSend = new FormData();
    formDataToSend.append("audioFile", file, file.name);
    formDataToSend.append("groupId", groupId);
    formDataToSend.append("userId", userId);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formDataToSend,
      // 'Content-Type'을 명시하지 않습니다.
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.log("Backend response error:", responseData);
      return NextResponse.json(responseData, { status: response.status });
    }

    const responseData = await response.json();
    console.log("Backend response success:", responseData);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Error in API route:", error.message);
    return NextResponse.json(
      { error: "파일 업로드 중 오류가 발생했습니다: " + error.message },
      { status: 500 }
    );
  }
}
