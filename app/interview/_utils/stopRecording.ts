export const stopRecording = (
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  setIsRecording(false);
  mediaRecorderRef.current?.stop();
};
