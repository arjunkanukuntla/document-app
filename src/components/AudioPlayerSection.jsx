import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RefreshCw, Languages, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { runAzureSpeechTTS } from '../services/azureServices';

export default function AudioPlayerSection({ analysis, azureConfig }) {
  const [selectedLang, setSelectedLang] = useState('hi'); // Default Hindi for rural India focus
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [audioError, setAudioError] = useState('');
  const [isAzureLive, setIsAzureLive] = useState(false);

  const audioRef = useRef(null);

  // Trigger TTS synthesis when language changes or analysis updates
  const handleSynthesizeAndPlay = async (lang) => {
    setSelectedLang(lang);
    setAudioError('');
    setIsLoadingAudio(true);
    setIsPlaying(false);

    const transcriptText = analysis.tts?.[lang] || analysis.tts?.hi || 'Notice document simplified by Mandana AI.';

    try {
      // Check if Azure Speech Credentials are valid
      if (azureConfig?.speechRegion?.trim() && azureConfig?.speechKey?.trim()) {
        const generatedAudioUrl = await runAzureSpeechTTS(
          transcriptText,
          lang,
          azureConfig.speechRegion,
          azureConfig.speechKey
        );
        setAudioUrl(generatedAudioUrl);
        setIsAzureLive(true);

        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
          }
        }, 100);
      } else {
        // Fallback: Web Speech Synthesis API
        setIsAzureLive(false);
        speakWebSpeech(transcriptText, lang);
      }
    } catch (err) {
      console.warn('Azure TTS REST API call failed, using Web Speech fallback:', err);
      setIsAzureLive(false);
      speakWebSpeech(transcriptText, lang);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const speakWebSpeech = (text, lang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed;
      if (lang === 'hi') utterance.lang = 'hi-IN';
      else if (lang === 'te') utterance.lang = 'te-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setAudioError('Browser does not support Web Speech API.');
    }
  };

  const togglePlayPause = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      }
    } else {
      // Re-trigger synthesis
      handleSynthesizeAndPlay(selectedLang);
    }
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-purple-500/40 rounded-2xl p-5 md:p-6 shadow-2xl space-y-5">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-400 shadow-inner">
            <Volume2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 font-heading">
              <span>Azure AI Voice Synthesis</span>
              {isAzureLive ? (
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 px-2 py-0.5 rounded-full">
                  Azure Neural Voice Live
                </span>
              ) : (
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/50 px-2 py-0.5 rounded-full">
                  Speech Synth Ready
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              Listen to Mandana simplified document summary in Indian regional languages.
            </p>
          </div>
        </div>

        {/* Audio Spectrum Wave Animation */}
        {isPlaying && (
          <div className="flex items-end gap-1 h-7 px-3 py-1 bg-purple-950/60 border border-purple-800/80 rounded-full">
            <span className="w-1 bg-purple-400 rounded-full animate-wave-1"></span>
            <span className="w-1 bg-purple-300 rounded-full animate-wave-2"></span>
            <span className="w-1 bg-indigo-400 rounded-full animate-wave-3"></span>
            <span className="w-1 bg-cyan-400 rounded-full animate-wave-4"></span>
            <span className="w-1 bg-emerald-400 rounded-full animate-wave-5"></span>
          </div>
        )}
      </div>

      {/* Language Listen Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Languages className="w-4 h-4 text-purple-400" />
          <span>Select Voice Language (తెలుగు / हिंदी / English)</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Hindi */}
          <button
            onClick={() => handleSynthesizeAndPlay('hi')}
            disabled={isLoadingAudio}
            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              selectedLang === 'hi'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-amber-400 shadow-lg shadow-orange-900/40 ring-2 ring-amber-400/40'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">🇮🇳</span>
            <span>Listen in Hindi (हिंदी)</span>
          </button>

          {/* Telugu */}
          <button
            onClick={() => handleSynthesizeAndPlay('te')}
            disabled={isLoadingAudio}
            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              selectedLang === 'te'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400/40'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">🇮🇳</span>
            <span>Listen in Telugu (తెలుగు)</span>
          </button>

          {/* English */}
          <button
            onClick={() => handleSynthesizeAndPlay('en')}
            disabled={isLoadingAudio}
            className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              selectedLang === 'en'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/40 ring-2 ring-blue-400/40'
                : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">🇬🇧</span>
            <span>Listen in English</span>
          </button>
        </div>
      </div>

      {/* Main Audio Player Controls Box */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayPause}
            disabled={isLoadingAudio}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white flex items-center justify-center shadow-lg shadow-purple-900/50 transition-all disabled:opacity-50"
          >
            {isLoadingAudio ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <div>
            <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <span>Playing Voice Transcript ({selectedLang.toUpperCase()})</span>
              {isPlaying && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs md:max-w-md mt-0.5">
              "{analysis.tts?.[selectedLang] || analysis.tts?.hi}"
            </p>
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Speed:</span>
          {[0.75, 1.0, 1.25].map((spd) => (
            <button
              key={spd}
              onClick={() => changeSpeed(spd)}
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                playbackSpeed === spd
                  ? 'bg-purple-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      {audioError && (
        <div className="text-xs text-amber-400 bg-amber-950/80 p-2.5 rounded-lg border border-amber-800/80 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{audioError}</span>
        </div>
      )}
    </div>
  );
}
