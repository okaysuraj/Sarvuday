import { UnavailableScreen } from '../../components/common/Screen';
export default function Page() {
  return (
    <UnavailableScreen
      title="Voice journal"
      message="Voice recording and transcription are currently unavailable. You can write a text journal entry instead."
    />
  );
}
