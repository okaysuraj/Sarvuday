import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
        setTranscript(prev => prev + currentTranscript);
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
      } catch (e) {}
    } else {
      clearInterval(interval);
      try {
        recognitionRef.current?.stop();
      } catch (e) {}
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
        text: `[Voice Note] ${transcript}`
      });
      toast.success('Voice journal saved successfully!');
      navigate('/daily-journal');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save voice journal.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .neo-shadow-sm {
            box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
        .active-sink:active {
            box-shadow: none;
            transform: translate(2px, 2px);
        }
        .wave-bar {
            width: 8px;
            border-radius: 9999px;
            background-color: #002da5; /* primary */
            margin: 0 4px;
            border: 1px solid #1A1A1A;
            animation: pulse 1.5s infinite ease-in-out alternate;
        }
        @keyframes pulse {
            0% { height: 20px; }
            100% { height: 100px; }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-display-lg text-4xl md:text-display-lg text-ink-black mb-2">Voice Journal</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Speak your mind freely. We're listening.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-surface-container-lowest flex items-center justify-center neo-shadow active-sink">
            <span className="material-symbols-outlined text-ink-black">notifications</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recording Interface Container */}
        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-10 neo-shadow flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full border-[1.5px] border-ink-black bg-accent-pink opacity-50 z-0"></div>
          <div className="absolute bottom-12 right-12 w-24 h-24 border-[1.5px] border-ink-black bg-secondary-fixed rotate-12 opacity-50 z-0"></div>
          
          <div className="z-10 flex flex-col items-center w-full">
            <p className="font-headline-sm text-xl text-on-surface-variant mb-6">{isRecording ? 'Recording...' : (time > 0 ? 'Paused' : 'Ready')}</p>
            <div className="font-display-lg text-5xl md:text-display-lg text-primary mb-6 tracking-wider">{formatTime(time)}</div>
            
            {transcript && (
              <div className="w-full max-w-md p-4 mb-6 bg-surface-container-lowest rounded-xl border-[1px] border-ink-black max-h-32 overflow-y-auto italic">
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
                    animationPlayState: isRecording ? 'running' : 'paused'
                  }}
                ></div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center items-center gap-6">
              <button 
                onClick={toggleRecording}
                className="w-16 h-16 rounded-full border-[1.5px] border-ink-black bg-surface-container-lowest flex items-center justify-center neo-shadow hover:-translate-y-1 transition-transform active-sink"
              >
                <span className="material-symbols-outlined text-ink-black text-3xl">{isRecording ? 'pause' : 'mic'}</span>
              </button>
              <button 
                onClick={handleStop}
                disabled={!isRecording && time === 0}
                className={`w-20 h-20 rounded-full border-[1.5px] border-ink-black flex items-center justify-center neo-shadow transition-transform active-sink ${!isRecording && time === 0 ? 'bg-surface-variant opacity-50' : 'bg-primary hover:-translate-y-1'}`}
              >
                <span className="material-symbols-outlined text-on-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>stop</span>
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || time === 0}
                className={`h-16 rounded-full border-[1.5px] border-ink-black flex items-center justify-center neo-shadow transition-transform active-sink font-label-bold text-label-bold px-6 ${isSaving || time === 0 ? 'bg-surface-variant text-on-surface-variant opacity-50' : 'bg-secondary-container text-on-secondary-container hover:-translate-y-1'}`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Tips Sidebar */}
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-6 neo-shadow">
            <h3 className="font-headline-sm text-xl text-ink-black mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">lightbulb</span>
              Tips for Reflection
            </h3>
            <ul className="flex flex-col gap-4 font-body-md text-ink-black text-sm md:text-base">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary border-[1px] border-ink-black shrink-0"></div>
                <p>What was the strongest emotion you felt today?</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary border-[1px] border-ink-black shrink-0"></div>
                <p>Describe a moment that made you smile, however small.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary border-[1px] border-ink-black shrink-0"></div>
                <p>Is there a thought you keep returning to? Speak it out loud.</p>
              </li>
            </ul>
          </div>
          
          <div className="bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 neo-shadow-sm flex-1 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div>
              <h4 className="font-label-bold text-ink-black mb-2 uppercase tracking-wider text-xs">Current Tag</h4>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] border-ink-black bg-surface-container-lowest text-ink-black font-label-md">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                Anxiety
              </div>
            </div>
            <div className="mt-8 relative h-32 w-full border-[1.5px] border-ink-black rounded-xl bg-surface-container-lowest overflow-hidden">
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
