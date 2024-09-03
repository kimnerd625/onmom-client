/**
 * @param {string} base64 base64로 인코딩된 데이터
 * @param {string} mimeType 미디어 타입 (ex "image/png")
 */
export default function base64ToBlob(base64: string, mimeType: string) {
  // base64 문자열에서 'data:[<mediatype>];base64,' 부분을 제거합니다.
  const base64String = base64.replace(/^data:[a-zA-Z]+\/[a-zA-Z]+;base64,/, "");

  // base64 문자열을 디코딩하여 바이트 배열로 변환합니다.
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
