import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RefreshCw, Send, ArrowLeft, Volume2, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { runAzureSpeechTTS } from '../services/azureServices';

export default function ResultScreen({
  doc,
  lang,
  currentImageSrc,
  rawOcrText,
  azureConfig,
  onBackToUpload
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [askQuery, setAskQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const audioRef = useRef(null);

  // Active language text contents
  const title = doc.title[lang] || doc.title.en;
  const category = doc.category[lang] || doc.category.en;
  const urgency = doc.urgency[lang] || doc.urgency.en;
  const mainSummary = doc.mainSummary[lang] || doc.mainSummary.en;
  const actionHeading = doc.actionHeading[lang] || doc.actionHeading.en;
  const actionPoints = doc.actionPoints[lang] || doc.actionPoints.en;
  const pills = doc.pills[lang] || doc.pills.en;
  const audioText = doc.audioText[lang] || doc.audioText.en;

  const listenLabel = {
    en: "Listen in English",
    te: "తెలుగులో వినండి",
    hi: "हिंदी में सुनें"
  }[lang] || "Listen in English";

  // Handle Play/Pause Audio Synthesis
  const handleTogglePlay = async () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoadingAudio(true);

    try {
      if (azureConfig?.speechRegion?.trim() && azureConfig?.speechKey?.trim()) {
        const url = await runAzureSpeechTTS(
          audioText,
          lang,
          azureConfig.speechRegion,
          azureConfig.speechKey
        );
        setAudioUrl(url);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
          }
        }, 100);
      } else {
        // Web Speech API Fallback
        speakWebSpeech(audioText, lang);
      }
    } catch (err) {
      console.warn('Azure TTS fallback:', err);
      speakWebSpeech(audioText, lang);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const speakWebSpeech = (text, language) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'te') utterance.lang = 'te-IN';
      else utterance.lang = 'en-IN';

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle Interactive Ask Jan-Vani Chat
  const handleAskSubmit = (e) => {
    e.preventDefault();
    if (!askQuery.trim()) return;

    const userQ = askQuery.trim();
    setAskQuery('');

    let aiReply = "";
    const qLower = userQ.toLowerCase();

    if (qLower.includes('ignore') || qLower.includes('వదిలేయవచ్చా') || qLower.includes('छोड़')) {
      aiReply = lang === 'te'
        ? "లేదు! దీనిని వదిలేయవద్దు. ఆలస్యం అయితే పెనాల్టీ పడుతుంది."
        : lang === 'hi'
        ? "नहीं! इसे नज़रअंदाज़ न करें। देरी होने पर पेनल्टी लग सकती है।"
        : "No! Do not ignore this letter. Failure to respond on time will lead to penalties.";
    } else if (qLower.includes('where') || qLower.includes('ఎక్కడ') || qLower.includes('कहाँ')) {
      aiReply = lang === 'te'
        ? "మీ దగ్గరలోని బ్యాంకు లేదా మీసేవ కేంద్రానికి వెళ్లండి."
        : lang === 'hi'
        ? "अपने निकटतम बैंक शाखा या जन सेवा केंद्र जाएं।"
        : "Visit your nearest bank branch or MeeSeva / Digital Seva center.";
    } else {
      aiReply = lang === 'te'
        ? "నోటీసులో పేర్కొన్న గడువు లోగా అవసరమైన మొత్తాన్ని చెల్లించి రసీదు పొందండి."
        : lang === 'hi'
        ? "नोटिस में बताई गई अंतिम तिथि से पहले राशि जमा कर रसीद प्राप्त करें।"
        : "Please follow the 3 action steps listed on the left card and keep your payment receipt safe.";
    }

    setChatHistory((prev) => [...prev, { q: userQ, a: aiReply }]);
  };

  return (
    <div className="space-y-6 py-2 animate-fadeIn">
      {/* Top Navigation Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToUpload}
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Upload Another Document</span>
        </button>
      </div>

      {/* Main 2-Column Grid Layout matching User Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Result Action Card */}
        <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-3xl p-6 md:p-7 shadow-sm space-y-6">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-blue-600 text-white font-bold text-xs px-4 py-1.5 rounded-xl shadow-sm">
              {category}
            </span>
            <span className="bg-red-500 text-white font-extrabold text-xs px-4 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
              {urgency}
            </span>
          </div>

          {/* Main Summary Sentence */}
          <div className="text-base md:text-lg font-bold text-slate-800 leading-snug">
            {mainSummary}
          </div>

          {/* What to do Section */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-sm font-extrabold text-slate-900 font-heading m-0">
              {actionHeading}
            </h4>

            <ul className="space-y-2 text-sm text-slate-700 font-medium list-none p-0 m-0">
              {actionPoints.map((pt, idx) => (
                <li key={idx} className="leading-relaxed">
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* 3 Color Action Pills matching User Image 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            {pills.map((pill, idx) => (
              <div
                key={idx}
                className={`${pill.color} px-4 py-2.5 rounded-2xl text-center shadow-sm flex flex-col items-center justify-center`}
              >
                <span className="text-[11px] opacity-90 font-medium block">
                  {pill.label}
                </span>
                <span className="text-xs md:text-sm font-extrabold block line-clamp-1">
                  {pill.value}
                </span>
              </div>
            ))}
          </div>

          {/* Audio Player Bar matching User Image 2 */}
          <div className="bg-slate-100/90 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                disabled={isLoadingAudio}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all shrink-0"
              >
                {isLoadingAudio ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Progress track */}
              <div className="w-36 sm:w-48 h-2 bg-slate-300 rounded-full overflow-hidden relative">
                <div
                  className={`h-full bg-blue-600 transition-all ${
                    isPlaying ? 'w-3/4 animate-pulse' : 'w-1/4'
                  }`}
                ></div>
              </div>
            </div>

            {/* Audio Label */}
            <span className="text-xs md:text-sm font-bold text-blue-600 shrink-0">
              {listenLabel}
            </span>
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
        </div>

        {/* Right Column (5 cols): Original Document & Ask Jan-Vani */}
        <div className="lg:col-span-5 space-y-6">
          {/* Original Document Preview Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-800 font-heading m-0">
              Original document
            </h4>

            <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-2 min-h-[220px]">
              {currentImageSrc ? (
                <img
                  src={currentImageSrc}
                  alt="Original document"
                  className="max-h-[250px] w-auto object-contain rounded shadow-sm"
                />
              ) : (
                <div className="text-slate-400 text-xs text-center p-4">
                  <FileText className="w-8 h-8 mx-auto mb-1 opacity-40" />
                  <span>Document scanned</span>
                </div>
              )}
            </div>
          </div>

          {/* Ask Saral Interactive Section matching User Image 2 */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-800 font-heading m-0">
              Ask Saral
            </h4>

            {chatHistory.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto text-xs p-2 bg-slate-50 rounded-xl">
                {chatHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-bold text-blue-700 m-0">Q: {item.q}</p>
                    <p className="text-slate-700 m-0">A: {item.a}</p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAskSubmit} className="relative">
              <input
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                placeholder="Can I ignore this letter?"
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 pr-10"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
