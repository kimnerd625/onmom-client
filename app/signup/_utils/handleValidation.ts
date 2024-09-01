// handleEmailChange: 이메일 유효성 검사
export const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>, // 입력 이벤트 객체
  setEmail: React.Dispatch<React.SetStateAction<string>>, // 이메일 상태를 업데이트하는 함수
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>> // 이메일 유효성 상태를 업데이트하는 함수
) => {
  const email = e.target.value;
  setEmail(email);
  // 이메일 유효성 검사: 정규 표현식을 사용하여 이메일 형식 검사
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  setEmailValid(isValid); // 유효성 검사 결과를 상태로 설정
};

// handlePhoneChange: 핸드폰 번호 유효성 검사 및 포맷팅
export const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>, // 입력 이벤트 객체
  setPhone: React.Dispatch<React.SetStateAction<string>> // 전화번호 상태를 업데이트하는 함수
) => {
  // 입력된 값에서 숫자만 남기기
  const rawValue = e.target.value.replace(/[^0-9]/g, "");
  let formattedValue = rawValue;
  // 핸드폰 번호 포맷팅: 3자리 이상 7자리 이하일 경우 중간에 하이픈 추가
  if (rawValue.length > 3 && rawValue.length <= 7) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
  }
  // 핸드폰 번호 포맷팅: 7자리 이상일 경우 중간과 끝에 하이픈 추가
  else if (rawValue.length > 7) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(
      3,
      7
    )}-${rawValue.slice(7)}`;
  }
  // 입력 초과 방지 : 13자
  if (formattedValue.length > 13) {
    formattedValue = formattedValue.slice(0, 13);
  }
  // 상태 업데이트
  setPhone(formattedValue);
};
