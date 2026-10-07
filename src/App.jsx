import React, { useState, useEffect } from 'react';
import { Settings, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

import UploadScreen from './components/UploadScreen';
import ResultScreen from './components/ResultScreen';
import AzureConfigModal from './components/AzureConfigModal';
import { DOCUMENTS_DATA } from './data/sampleDocuments';
import { runAzureVisionOCR, runMandanaAIInference } from './services/azureServices';

export default function App() {
  // Active UI Language: 'en' | 'te' | 'hi'
  const [lang, setLang] = useState('en');

  // Screen View: 'upload' | 'result'
  const [view, setView] = useState('upload');

  // Selected Document & Image State
  const [currentDoc, setCurrentDoc] = useState(DOCUMENTS_DATA[0]);
  const [currentImageSrc, setCurrentImageSrc] = useState(DOCUMENTS_DATA[0].thumbnailSvg);
  const [rawOcrText, setRawOcrText] = useState(DOCUMENTS_DATA[0].rawOcrText);

  // Azure Config Modal State
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [azureConfig, setAzureConfig] = useState(() => {
    const saved = localStorage.getItem('saral_azure_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse azure config', e);
      }
    }
    return {
      visionEndpoint: '',
      visionKey: '',
      speechRegion: 'centralindia',
      speechKey: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('saral_azure_config', JSON.stringify(azureConfig));
  }, [azureConfig]);

  // Handle uploading custom document image or camera photo
  const handleUploadFile = async (file, dataUrl) => {
    setCurrentImageSrc(dataUrl);

    try {
      if (azureConfig.visionEndpoint?.trim() && azureConfig.visionKey?.trim()) {
        const extractedText = await runAzureVisionOCR(
          file,
          azureConfig.visionEndpoint,
          azureConfig.visionKey
        );
        setRawOcrText(extractedText);
      } else {
        setRawOcrText(`DOCUMENT ANALYSIS RESULT\nFile: ${file.name}\nExtracted content analyzed by Saral.`);
      }

      // Trigger confetti
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      setView('result');
    } catch (err) {
      console.error('OCR Error:', err);
      // Fallback cleanly to current document analysis
      setView('result');
    }
  };

  // Handle selecting an example document
  const handleSelectSampleDocument = (docId) => {
    const doc = DOCUMENTS_DATA.find((d) => d.id === docId) || DOCUMENTS_DATA[0];
    setCurrentDoc(doc);
    setCurrentImageSrc(doc.thumbnailSvg);
    setRawOcrText(doc.rawOcrText);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setView('result');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between font-sans">
      {/* Top Header matching User Image 1 & 2 */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setView('upload')}
            className="cursor-pointer flex items-center gap-2"
          >
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600 tracking-tight font-heading m-0">
              Saral
            </h1>
          </div>

          {/* Right Header Language Switcher Buttons matching User Image 2 */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* English */}
            <button
              onClick={() => setLang('en')}
              className={`text-xs md:text-sm font-bold px-4 py-1.5 rounded-xl transition-all ${
                lang === 'en'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              English
            </button>

            {/* Telugu */}
            <button
              onClick={() => setLang('te')}
              className={`text-xs md:text-sm font-bold px-4 py-1.5 rounded-xl transition-all ${
                lang === 'te'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              తెలుగు
            </button>

            {/* Hindi */}
            <button
              onClick={() => setLang('hi')}
              className={`text-xs md:text-sm font-bold px-4 py-1.5 rounded-xl transition-all ${
                lang === 'hi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              హిందీ
            </button>

            {/* Subtle Settings Gear */}
            <button
              onClick={() => setIsConfigOpen(true)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors ml-1"
              title="API Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 md:py-6">
        {view === 'upload' ? (
          <UploadScreen
            lang={lang}
            onUploadFile={handleUploadFile}
            onSelectSampleDocument={handleSelectSampleDocument}
            documentsList={DOCUMENTS_DATA}
          />
        ) : (
          <ResultScreen
            doc={currentDoc}
            lang={lang}
            currentImageSrc={currentImageSrc}
            rawOcrText={rawOcrText}
            azureConfig={azureConfig}
            onBackToUpload={() => setView('upload')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <span>Saral: Document &amp; Spoken Voice Simplifier</span>
          <button
            onClick={() => setView('upload')}
            className="text-blue-600 font-bold hover:underline"
          >
            Upload Document
          </button>
        </div>
      </footer>

      {/* Azure Settings Modal */}
      <AzureConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={azureConfig}
        onChangeConfig={(newConfig) => setAzureConfig(newConfig)}
      />
    </div>
  );
}

