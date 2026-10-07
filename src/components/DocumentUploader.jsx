import React, { useRef, useState } from 'react';
import { Upload, Camera, FileText, Sparkles, AlertTriangle, Shield, RefreshCcw, ZoomIn } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';
import CameraModal from './CameraModal';

export default function DocumentUploader({
  selectedSampleId,
  currentImageSrc,
  isScanning,
  onSelectSample,
  onUploadCustomImage
}) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      onUploadCustomImage(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Fallback Mode & Hackathon Sample Buttons Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hackathon Sample Documents (Instant 1-Click Demo)</span>
            </h3>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 font-semibold px-2.5 py-1 rounded-full border border-slate-700">
            Bulletproof Offline Demo
          </span>
        </div>

        {/* 4 Sample Document Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_DOCUMENTS.map((doc) => {
            const isSelected = selectedSampleId === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => onSelectSample(doc.id)}
                className={`text-left p-3 rounded-xl border transition-all relative group overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-950 to-slate-900 border-indigo-500 ring-2 ring-indigo-500/50 shadow-lg'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${doc.badgeColor}`}>
                    {doc.category}
                  </span>
                  {doc.urgent && (
                    <span className="text-[10px] font-bold text-red-400 bg-red-950/60 border border-red-800/80 px-1.5 py-0.5 rounded">
                      Urgent
                    </span>
                  )}
                </div>

                <div className="font-semibold text-xs text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                  {doc.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {doc.subtitle}
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-400"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Upload Dropzone & Camera Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Top Upload Dropzone */}
        <div className="lg:col-span-6 flex flex-col">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 md:p-8 text-center transition-all flex flex-col items-center justify-center min-h-[340px] flex-1 relative ${
              isDragOver
                ? 'border-emerald-500 bg-emerald-950/20'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
              <Upload className="w-8 h-8" />
            </div>

            <h4 className="text-base font-bold text-slate-100 mb-1">
              Upload Official Document Image
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">
              Drag & drop a bill, hospital prescription, land record, or government notice here (PNG, JPG, WEBP).
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-900/40 transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Browse File</span>
              </button>

              <button
                onClick={() => setIsCameraOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/40 transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Use Camera</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Card with Scanning Beam Laser */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col h-full min-h-[340px] shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <ZoomIn className="w-4 h-4 text-emerald-400" />
                <span>Document Live Optical Preview</span>
              </div>

              {isScanning && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/60 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Scanning Document with Azure Vision OCR...</span>
                </div>
              )}
            </div>

            {/* Document Image Container with Laser Beam */}
            <div className="relative flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-2 min-h-[250px]">
              {currentImageSrc ? (
                <div className="relative w-full h-full max-h-[300px] flex items-center justify-center">
                  <img
                    src={currentImageSrc}
                    alt="Document preview"
                    className="max-h-[300px] w-auto object-contain rounded shadow-lg"
                  />

                  {/* Animated Scanning Laser Line */}
                  {isScanning && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-scan-laser z-20 pointer-events-none">
                      <div className="w-full h-8 bg-emerald-500/10 -translate-y-4"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-slate-500 p-6">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No document selected. Choose a sample above or upload a photo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(file, dataUrl) => {
          onUploadCustomImage(file, dataUrl);
        }}
      />
    </div>
  );
}
