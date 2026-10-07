import React, { useState } from 'react';
import { Sparkles, FileText, Calendar, AlertTriangle, ShieldAlert, Check, Copy, Download, Type, Zap, Activity, Sprout, CreditCard, Clock, Pill, HeartPulse, CalendarCheck, Fingerprint, CheckCircle2, AlertOctagon } from 'lucide-react';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  FileText,
  Calendar,
  AlertTriangle,
  ShieldAlert,
  Zap,
  CreditCard,
  CheckCircle2,
  AlertOctagon,
  Activity,
  Pill,
  HeartPulse,
  CalendarCheck,
  Sprout,
  Fingerprint,
  Check: CheckCircle2,
  Clock
};

export default function MandanaSummaryCard({ analysis, fontSize, onToggleFontSize }) {
  const [copied, setCopied] = useState(false);

  if (!analysis) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleCopy = () => {
    const textToCopy = `Saral / Mandana AI Document Simplifier
Document Type: ${analysis.docType}

${analysis.summaryPoints.map((p) => `${p.number}) ${p.title}\n   ${p.desc}`).join('\n\n')}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    triggerConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadText = () => {
    const textContent = `Saral: Mandana AI Document Simplifier
----------------------------------------
Document Type: ${analysis.docType}

${analysis.summaryPoints.map((p) => `${p.number}) ${p.title.toUpperCase()}\n${p.desc}`).join('\n\n')}

Audio Transcripts:
Hindi: ${analysis.tts?.hi || ''}
Telugu: ${analysis.tts?.te || ''}
English: ${analysis.tts?.en || ''}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mandana_Summary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Font size scale map
  const sizeClasses = {
    normal: { title: 'text-base', desc: 'text-sm', badge: 'text-xs' },
    large: { title: 'text-lg', desc: 'text-base', badge: 'text-sm' },
    xlarge: { title: 'text-xl', desc: 'text-lg', badge: 'text-base' }
  }[fontSize] || { title: 'text-base', desc: 'text-sm', badge: 'text-xs' };

  return (
    <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 md:p-7 shadow-2xl space-y-6 card-box">
      {/* Top Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
            <Sparkles className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-100 tracking-tight font-heading">
                Mandana AI Reasoning Pipeline Output
              </h2>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Simplified Rules
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              Document Detected: <strong className="text-amber-300">{analysis.docType}</strong>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Font Size Toggle Button */}
          <button
            onClick={onToggleFontSize}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Adjust Text Accessibility Size"
          >
            <Type className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Text Size: {fontSize.toUpperCase()}</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownloadText}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Structured Prompt Requirements Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analysis.summaryPoints.map((point) => {
          const IconComp = ICON_MAP[point.icon] || FileText;

          // Color themes for high contrast
          const colorStyles = [
            { bg: 'bg-blue-950/40', border: 'border-blue-700/60', numBg: 'bg-blue-600', text: 'text-blue-200' },
            { bg: 'bg-amber-950/40', border: 'border-amber-700/60', numBg: 'bg-amber-600', text: 'text-amber-200' },
            { bg: 'bg-emerald-950/40', border: 'border-emerald-700/60', numBg: 'bg-emerald-600', text: 'text-emerald-200' },
            { bg: 'bg-rose-950/40', border: 'border-rose-700/60', numBg: 'bg-rose-600', text: 'text-rose-200' }
          ][(point.number - 1) % 4];

          return (
            <div
              key={point.number}
              className={`p-4 md:p-5 rounded-xl border ${colorStyles.border} ${colorStyles.bg} backdrop-blur-sm shadow-md transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                {/* Large high-contrast number badge */}
                <div className={`w-8 h-8 rounded-lg ${colorStyles.numBg} text-white font-extrabold flex items-center justify-center shrink-0 shadow-md text-base`}>
                  {point.number}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${colorStyles.text}`} />
                    <h3 className={`font-bold text-slate-100 ${sizeClasses.title}`}>
                      {point.title}
                    </h3>
                  </div>

                  <p className={`text-slate-200 leading-relaxed font-medium whitespace-pre-line ${sizeClasses.desc}`}>
                    {point.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
