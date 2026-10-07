import React, { useRef, useState } from 'react';
import { Camera, FileText, Upload, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import CameraModal from './CameraModal';

export default function UploadScreen({
  lang,
  onUploadFile,
  onSelectSampleDocument,
  documentsList
}) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Translations
  const t = {
    en: {
      headline: "Upload your document",
      subtitle: "Take a photo or choose a PDF. We will explain it simply.",
      dropTitle: "Drop a photo or PDF here",
      takePhoto: "Take photo",
      chooseFile: "Choose file",
      privacyText: "Your name, phone and account numbers are hidden before analysis.",
      sampleLabel: "Try an example document:"
    },
    te: {
      headline: "మీ పత్రాన్ని అప్‌లోడ్ చేయండి",
      subtitle: "ఫోటో తీయండి లేదా PDF ఎంచుకోండి. మేము దానిని సులభంగా వివరిస్తాము.",
      dropTitle: "ఇక్కడ ఫోటో లేదా PDF వేయండి",
      takePhoto: "ఫోటో తీయండి",
      chooseFile: "ఫైల్ ఎంచుకోండి",
      privacyText: "విశ్లేషణకు ముందు మీ పేరు, ఫోన్ మరియు ఖాతా నంబర్‌లు సురక్షితంగా దాచబడతాయి.",
      sampleLabel: "ఉదాహరణ పత్రాన్ని ప్రయత్నించండి:"
    },
    hi: {
      headline: "अपना दस्तावेज़ अपलोड करें",
      subtitle: "फ़ोटो लें या PDF चुनें। हम इसे सरल भाषा में समझाएंगे।",
      dropTitle: "यहाँ फ़ोटो या PDF डालें",
      takePhoto: "फ़ोटो लें",
      chooseFile: "फ़ाइल चुनें",
      privacyText: "विश्लेषण से पहले आपका नाम, फोन और खाता नंबर सुरक्षित/गुप्त रखे जाते हैं।",
      sampleLabel: "उदाहरण दस्तावेज़ देखें:"
    }
  }[lang] || {
    headline: "Upload your document",
    subtitle: "Take a photo or choose a PDF. We will explain it simply.",
    dropTitle: "Drop a photo or PDF here",
    takePhoto: "Take photo",
    chooseFile: "Choose file",
    privacyText: "Your name, phone and account numbers are hidden before analysis.",
    sampleLabel: "Try an example document:"
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      onUploadFile(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 md:py-8 animate-fadeIn">
      {/* Title & Subtitle */}
      <div className="space-y-1.5 text-left">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading m-0">
          {t.headline}
        </h2>
        <p className="text-sm md:text-base text-slate-600 font-medium m-0">
          {t.subtitle}
        </p>
      </div>

      {/* Main Upload Drop Area matching User Image 1 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`bg-blue-50/60 border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all flex flex-col items-center justify-center space-y-5 ${
          isDragOver
            ? 'border-blue-600 bg-blue-100/70 scale-[1.01]'
            : 'border-blue-400 hover:border-blue-500'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden"
        />

        <h3 className="text-lg md:text-xl font-bold text-slate-800 m-0 font-heading">
          {t.dropTitle}
        </h3>

        {/* Buttons side-by-side */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm md:text-base px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            <span>{t.takePhoto}</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-white hover:bg-blue-50 active:scale-95 border-2 border-blue-600 text-blue-600 font-bold text-sm md:text-base px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            <Upload className="w-5 h-5" />
            <span>{t.chooseFile}</span>
          </button>
        </div>
      </div>

      {/* Privacy Assurance Pill Banner matching User Image 1 */}
      <div className="bg-teal-50/90 border border-teal-300/80 rounded-2xl p-4 flex items-center gap-3 text-teal-900 shadow-sm">
        <div className="w-6 h-6 rounded-full bg-teal-200/80 flex items-center justify-center shrink-0 text-teal-700">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <p className="text-xs md:text-sm font-semibold m-0 leading-snug">
          {t.privacyText}
        </p>
      </div>

      {/* Example Document Selector Chips */}
      <div className="pt-4 border-t border-slate-200 space-y-3">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          {t.sampleLabel}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {documentsList.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectSampleDocument(doc.id)}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${doc.categoryColor}`}>
                  {doc.category[lang] || doc.category.en}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${doc.urgencyColor}`}>
                  {doc.urgency[lang] || doc.urgency.en}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                {doc.title[lang] || doc.title.en}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(file, dataUrl) => {
          onUploadFile(file, dataUrl);
        }}
      />
    </div>
  );
}
