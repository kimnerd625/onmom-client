// TypeScript 인터페이스 정의
interface DeepGramMessage {
  channel: {
    alternatives: {
      transcript: string;
    }[];
  };
  is_final: boolean;
}

let mediaRecorder: MediaRecorder | null = null;

// 오디오 허용
export const getAudioAllow = async (): Promise<MediaRecorder | null> => {
  try {
    const mediaStream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder = new MediaRecorder(mediaStream);
    return mediaRecorder;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 웹 소켓 - 말하기 핸들링
export const handleSpeak = async (
  setTranscript: (transcript: string) => void
): Promise<void> => {
  if (mediaRecorder) {
    const socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?language=ko",
      ["token", process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY as string]
    );

    socket.onopen = () => {
      if (mediaRecorder) {
        mediaRecorder.addEventListener("dataavailable", async (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(500);
      }
    };

    socket.onmessage = (message) => {
      try {
        const received: DeepGramMessage = JSON.parse(message.data);

        // channel이나 alternatives가 정의되지 않은 경우를 처리
        if (
          received.channel &&
          received.channel.alternatives &&
          received.channel.alternatives.length > 0
        ) {
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript && received.is_final) {
            console.log(transcript);
            setTranscript(transcript);
          }
        } else {
          console.warn("No transcript found in the received message.");
        }
      } catch (error) {
        console.error("Error parsing message data:", error, message.data);
      }
    };

    socket.onclose = () => {
      console.log("Connection Closed.");
    };
  }
};

// 녹음 중지 함수 추가
export const stopRecording = (): void => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
};

// DeepGram AI 말하기 함수
export const handleGetAudio = async (
  setTranscript: (transcript: string) => void
): Promise<void> => {
  mediaRecorder = await getAudioAllow();
  if (mediaRecorder) {
    await handleSpeak(setTranscript);
  }
};
