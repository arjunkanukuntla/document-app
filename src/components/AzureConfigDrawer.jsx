import React, { useState, useEffect } from 'react';
import { Key, Globe, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw, ChevronDown, ChevronUp, Cpu, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export default function AzureConfigDrawer({ config, onChangeConfig }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setTestStatus({ type: 'success', text: 'Azure Credentials Saved to Local Browser Storage!' });
    setTimeout(() => setTestStatus(null), 3000);
  };

  const isConfigured = Boolean(
    config.visionEndpoint?.trim() && config.visionKey?.trim()
  );

  const isSpeechConfigured = Boolean(
    config.speechRegion?.trim() && config.speechKey?.trim()
  );

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 text-slate-100 transition-all">
      {/* Top Banner Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-blue-950/80 text-blue-300 px-3 py-1 rounded-full border border-blue-800/60 font-medium text-xs">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Azure AI Vision & Speech</span>
          </div>

          <div className="flex items-center gap-2">
            {isConfigured ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Azure OCR Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Demo / Fallback Mode
              </span>
            )}

            {isSpeechConfigured && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                Azure TTS Active
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onChangeConfig({ ...config, isDemoMode: !config.isDemoMode })}
            className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              config.isDemoMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {config.isDemoMode ? 'Demo Mode Active' : 'Live Mode'}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 px-3 py-1 rounded-lg hover:bg-indigo-600/50 transition-all"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isOpen ? 'Close Azure Settings' : 'Configure Azure Keys'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Configuration Drawer */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 p-4 md:p-6 transition-all animate-fadeIn">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  Azure AI Services & Mandana Pipeline Credentials
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enter your Microsoft Azure API Endpoints & Keys. Your keys stay 100% private in your local browser cache.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowKeys(!showKeys)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"
              >
                {showKeys ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showKeys ? 'Hide Keys' : 'Show Keys'}</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vision OCR Endpoint */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    Azure Vision OCR Endpoint
                  </label>
                  <input
                    type="text"
                    value={config.visionEndpoint || ''}
                    onChange={(e) => onChangeConfig({ ...config, visionEndpoint: e.target.value })}
                    placeholder="https://<your-region>.api.cognitive.microsoft.com/"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Vision OCR Subscription Key */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-cyan-400" />
                    Azure Vision Subscription Key
                  </label>
                  <input
                    type={showKeys ? 'text' : 'password'}
                    value={config.visionKey || ''}
                    onChange={(e) => onChangeConfig({ ...config, visionKey: e.target.value })}
                    placeholder="e.g. 4a8e7b99c1d2e3f4567890abcdef1234"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Azure Speech Region */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-purple-400" />
                    Azure Speech Region
                  </label>
                  <input
                    type="text"
                    value={config.speechRegion || ''}
                    onChange={(e) => onChangeConfig({ ...config, speechRegion: e.target.value })}
                    placeholder="e.g. centralindia, eastus, switzerlandnorth"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                {/* Azure Speech Key */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-purple-400" />
                    Azure Speech Subscription Key
                  </label>
                  <input
                    type={showKeys ? 'text' : 'password'}
                    value={config.speechKey || ''}
                    onChange={(e) => onChangeConfig({ ...config, speechKey: e.target.value })}
                    placeholder="e.g. 9f8e7d6c5b4a39281706543210fedcba"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Status Notice & Submit */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>If fields are empty, Jan-Vani automatically runs in <b>Built-in Hackathon Demo Engine</b>.</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-900/30"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Save Azure Keys
                  </button>
                </div>
              </div>

              {testStatus && (
                <div className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                  testStatus.type === 'success' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-red-950/80 text-red-300 border border-red-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{testStatus.text}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
