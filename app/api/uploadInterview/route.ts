import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // FormData를 사용하여 파일을 처리합니다.
    const formData = await request.formData();
    const file = formData.get("file") as Blob;
    const groupId = formData.get("groupId"); // 추가된 필드

    if (!file) {
      console.log("No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 파일 및 기타 데이터를 로그로 출력하여 확인합니다.
    console.log("Received file:", file);
    console.log("Received groupId:", groupId);

    // FormData 객체를 새로 생성하고, 파일과 groupId를 추가합니다.
    const uploadData = new FormData();
    uploadData.append("audioFile", file);
    if (groupId) {
      uploadData.append("groupId", groupId.toString());
    }

    // 이 시점에서 데이터를 확인한 후 필요에 따라 변경하거나 추가 작업을 수행할 수 있습니다.

    // 다른 서버로 파일을 전송하는 경우:
    const apiUrl = "http://15.165.54.182:8080/diaries/create";

    const response = await fetch(apiUrl, {
      method: "POST",
      body: uploadData, // FormData 자체를 전송
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
