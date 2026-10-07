import React, { useState } from 'react';
import { Eye, EyeOff, FileText, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function RawTextDrawer({ rawText }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!rawText) return null;

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-850 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-300">
            Raw OCR Text Stream (Azure AI Vision Raw Output Inspection)
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
            {rawText.length} chars
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <span>{isOpen ? 'Hide Raw OCR' : 'Inspect Raw OCR'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">
              Extracted Raw Text Lines from Document Image:
            </span>
            <button
              onClick={handleCopyRaw}
              className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded flex items-center gap-1 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Raw Text'}</span>
            </button>
          </div>

          <pre className="text-xs text-cyan-200 font-mono bg-slate-900 p-3.5 rounded-lg border border-slate-800 whitespace-pre-wrap overflow-x-auto max-h-60 leading-relaxed shadow-inner">
            {rawText}
          </pre>
        </div>
      )}
    </div>
  );
}
