import React, { useState } from 'react';
import { Settings, X, Key, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AzureConfigModal({ isOpen, onClose, config, onChangeConfig }) {
  const [showKeys, setShowKeys] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>Azure AI Cloud Service Settings</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Enter custom Azure Computer Vision & Azure Speech REST API credentials. Leave empty to use default standard API services.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="space-y-3.5"
        >
          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              Azure Vision OCR Endpoint
            </label>
            <input
              type="text"
              value={config.visionEndpoint || ''}
              onChange={(e) => onChangeConfig({ ...config, visionEndpoint: e.target.value })}
              placeholder="https://<your-region>.api.cognitive.microsoft.com/"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
              <Key className="w-3.5 h-3.5 text-blue-600" />
              Azure Vision Key
            </label>
            <input
              type={showKeys ? 'text' : 'password'}
              value={config.visionKey || ''}
              onChange={(e) => onChangeConfig({ ...config, visionKey: e.target.value })}
              placeholder="Enter Azure Subscription Key"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              Azure Speech Region & Key
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={config.speechRegion || ''}
                onChange={(e) => onChangeConfig({ ...config, speechRegion: e.target.value })}
                placeholder="e.g. centralindia"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
              <input
                type={showKeys ? 'text' : 'password'}
                value={config.speechKey || ''}
                onChange={(e) => onChangeConfig({ ...config, speechKey: e.target.value })}
                placeholder="Speech Key"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowKeys(!showKeys)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              {showKeys ? 'Hide Keys' : 'Show Keys'}
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
