import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const VoiceMoodJournal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript((prev) => prev + currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      try {
        recognitionRef.current?.start();
      } catch {
        /* Recognition may already be stopped or started. */
      }
    } else {
      clearInterval(interval);
      try {
        recognitionRef.current?.stop();
      } catch {
        /* Recognition may already be stopped or started. */
      }
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleStop = () => {
    setIsRecording(false);
  };

  const handleSave = async () => {
    if (!transcript.trim()) {
      toast.warning('No speech detected to save.');
      return;
    }
    setIsSaving(true);
    try {
      await axiosInstance.post('/user/tracking/journal', {
        text: `[Voice Note] ${transcript}`,
      });
      toast.success('Voice journal saved successfully!');
      navigate('/journal');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save voice journal.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex-1 pb-24">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-display-lg text-4xl md:text-display-lg text-ink-black mb-2">
            Voice Journal
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Speak your mind freely. We're listening.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full border-outline bg-surface-container-lowest flex items-center justify-center shadow-subtle active:scale-[0.98]">
            <span className="material-symbols-outlined text-ink-black">notifications</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recording Interface Container */}
        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest border-outline rounded-xl p-6 md:p-10 shadow-subtle flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full border-outline bg-surface opacity-50 z-0"></div>
          <div className="absolute bottom-12 right-12 w-24 h-24 border-outline bg-secondary-fixed opacity-50 z-0"></div>

          <div className="z-10 flex flex-col items-center w-full">
            <p className="font-headline-sm text-xl text-on-surface-variant mb-6">
              {isRecording ? 'Recording...' : time > 0 ? 'Paused' : 'Ready'}
            </p>
            <div className="font-display-lg text-5xl md:text-display-lg text-primary mb-6 tracking-wider">
              {formatTime(time)}
            </div>

            {transcript && (
              <div className="w-full max-w-md p-4 mb-6 bg-surface-container-lowest rounded-xl border-[1px] border-outline max-h-32 overflow-y-auto italic">
                {transcript}
              </div>
            )}

            {/* Visualizer */}
            <div className="flex items-end justify-center h-32 mb-12 w-full max-w-md gap-1">
              {[0.1, 0.3, 0.5, 0.2, 0.4, 0.6, 0.3, 0.1, 0.5, 0.2].map((delay, i) => (
                <div
                  key={i}
                  className="wave-bar"
                  style={{
                    animationDelay: `${delay}s`,
                    animationPlayState: isRecording ? 'running' : 'paused',
                  }}
                ></div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center items-center gap-6">
              <button
                onClick={toggleRecording}
                className="w-16 h-16 rounded-full border-outline bg-surface-container-lowest flex items-center justify-center shadow-subtle transition-transform active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-ink-black text-3xl">
                  {isRecording ? 'pause' : 'mic'}
                </span>
              </button>
              <button
                onClick={handleStop}
                disabled={!isRecording && time === 0}
                className={`w-20 h-20 rounded-full border-outline flex items-center justify-center shadow-subtle transition-transform active:scale-[0.98] ${!isRecording && time === 0 ? 'bg-surface-variant opacity-50' : 'bg-primary '}`}
              >
                <span
                  className="material-symbols-outlined text-on-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stop
                </span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || time === 0}
                className={`h-16 rounded-full border-outline flex items-center justify-center shadow-subtle transition-transform active:scale-[0.98] font-label-bold text-label-bold px-6 ${isSaving || time === 0 ? 'bg-surface-variant text-on-surface-variant opacity-50' : 'bg-secondary-container text-on-secondary-container '}`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="bg-accent-sage border-outline rounded-xl p-6 shadow-subtle">
            <h3 className="font-headline-sm text-xl text-ink-black mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">lightbulb</span>
              Tips for Reflection
            </h3>
            <ul className="flex flex-col gap-4 font-body-md text-ink-black text-sm md:text-base">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary border-[1px] border-outline shrink-0"></div>
                <p>What was the strongest emotion you felt today?</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary border-[1px] border-outline shrink-0"></div>
                <p>Describe a moment that made you smile, however small.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary border-[1px] border-outline shrink-0"></div>
                <p>Is there a thought you keep returning to? Speak it out loud.</p>
              </li>
            </ul>
          </div>

          <div className="bg-surface border-outline rounded-xl p-6 shadow-subtle flex-1 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div>
              <h4 className="font-label-bold text-ink-black mb-2 uppercase tracking-wider text-xs">
                Current Tag
              </h4>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-outline bg-surface-container-lowest text-ink-black font-label-md">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
                Anxiety
              </div>
            </div>
            <div className="mt-8 relative h-32 w-full border-outline rounded-xl bg-surface-container-lowest overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Stylized illustration"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByUSNudtV1yi1Y_MThDv9TuAngrDYpz_EsyZFfU6hHhgcdT3uEvYQDZ8oHPjYqn3-n-VvSIOYJQLdSsuizijeu80S5Cw0GwVWOx_FzBXzyYQPij1avzgkgR65ThihRH_LYI64gd2tEzbWB2yMyIvTtQSjG50vqdnUo7iCm7OXEpLuHk4BpFuDqD6aBHTT0ymRp4uUpYtHHB38ypXiKaci1NlgvpYV2gpDqEJdAhjEMjZmxLG_IhDeuUA"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMoodJournal;
