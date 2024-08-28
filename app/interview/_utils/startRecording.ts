export const startRecording = async (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setAudioUrl: React.Dispatch<React.SetStateAction<string | null>>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>,
  audioChunksRef: React.MutableRefObject<Blob[]>,
  audioContextRef: React.MutableRefObject<AudioContext | null>,
  analyserRef: React.MutableRefObject<AnalyserNode | null>,
  playQuestion: (index: number) => void
) => {
  setIsRecording(true);
  setAudioUrl(null);
  audioChunksRef.current = [];

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = audioContextRef.current!;
  const source = audioContext.createMediaStreamSource(stream);
  const destination = audioContext.createMediaStreamDestination();

  source.connect(analyserRef.current!);
  analyserRef.current!.connect(destination);

  mediaRecorderRef.current = new MediaRecorder(destination.stream);

  mediaRecorderRef.current.ondataavailable = (event) => {
    audioChunksRef.current.push(event.data);
  };

  mediaRecorderRef.current.onstop = () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/mpeg",
    });
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log("Generated audio URL:", audioUrl);
    setAudioUrl(audioUrl);
  };

  mediaRecorderRef.current.start();

  playQuestion(0);
};
