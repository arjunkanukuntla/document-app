import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setIsInitializing(true);
    setCameraError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access denied or unavailable on this device. Please upload an image file instead.');
    } finally {
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `document_photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(file, dataUrl);
        stopCamera();
        onClose();
      }
    }, 'image/jpeg', 0.92);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <Camera className="w-5 h-5 text-emerald-400" />
            <span>Document Camera Capture</span>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Preview */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center text-amber-400 space-y-3">
              <AlertCircle className="w-10 h-10 mx-auto text-amber-500" />
              <p className="text-sm font-medium">{cameraError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Document Alignment Frame */}
              <div className="absolute inset-8 border-2 stroke-dasharray-4 border-dashed border-emerald-400/70 rounded-xl pointer-events-none flex items-center justify-center">
                <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                  Align Official Document Here
                </span>
              </div>
            </>
          )}

          {isInitializing && (
            <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center gap-2 text-slate-300 text-sm">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
              <span>Starting camera stream...</span>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              stopCamera();
              startCamera();
            }}
            disabled={cameraError}
            className="px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retake / Refresh</span>
          </button>

          <button
            onClick={handleSnap}
            disabled={cameraError || isInitializing}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/40 flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            <Camera className="w-5 h-5" />
            <span>Capture Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
