// TypeScript 인터페이스 정의
interface DeepGramMessage {
  channel: {
    alternatives: {
      transcript: string;
    }[];
  };
  is_final: boolean;
}

//
let mediaRecorder: MediaRecorder | null = null;

// getAudioAllow : 브라우저 상 오디오 허용
export const getAudioAllow = async (): Promise<MediaRecorder | null> => {
  try {
    const mediaStream = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder = new MediaRecorder(mediaStream, { mimeType: "audio/webm" });
    return mediaRecorder;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// handleSpeak : 웹 소켓 - 말하기 핸들링
export const handleSpeak = async (
  setTranscript: (transcript: string) => void,
  maxTranscriptLength: number = 100 // maxTranscriptLength : 한 번에 인식할 최대 문장 길이, 100자
): Promise<void> => {
  if (mediaRecorder) {
    const socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?language=ko&chunk_size=2000",
      ["token", process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY as string]
    );

    socket.onopen = () => {
      if (mediaRecorder) {
        mediaRecorder.addEventListener("dataavailable", async (event) => {
          if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(5000); // 2초마다 데이터 청크를 전송
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
            if (transcript.length <= maxTranscriptLength) {
              setTranscript(transcript);
            } else {
              setTranscript(transcript.slice(0, maxTranscriptLength) + "...");
            }
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

// stopRecording : 녹음 중지
export const stopRecording = (): void => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
};

// handleGetAudio : DeepGram AI 말하기
export const handleGetAudio = async (
  setTranscript: (transcript: string) => void,
  maxTranscriptLength: number = 100
): Promise<void> => {
  mediaRecorder = await getAudioAllow();
  if (mediaRecorder) {
    await handleSpeak(setTranscript, maxTranscriptLength);
  }
};
