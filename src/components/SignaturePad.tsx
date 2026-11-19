"use client";

import React, { useRef, useState, useEffect } from "react";
import { Eraser, Check, X } from "lucide-react";

interface SignaturePadProps {
  initialSignature?: string | null;
  onSave: (signatureDataUrl: string) => void;
  onCancel: () => void;
}

export default function SignaturePad({
  initialSignature,
  onSave,
  onCancel,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInk, setHasInk] = useState(Boolean(initialSignature));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Pre-load existing signature if user clicked "Redraw Signature"
    if (initialSignature) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setHasInk(true);
      };
      img.src = initialSignature;
    }
  }, [initialSignature]);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasInk(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInk) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-lg text-slate-900">
            {initialSignature ? "Edit or Redraw Signature" : "Draw Your Signature"}
          </h2>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 bg-slate-50">
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl overflow-hidden relative">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-48 cursor-crosshair touch-none block"
            />
            {!hasInk && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-400">
                Sign above using your trackpad, mouse, or touchscreen
              </span>
            )}
          </div>
        </div>

        <div className="px-5 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Eraser className="w-4 h-4" />
            Clear
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-medium text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!hasInk}
              onClick={handleSave}
              className="flex items-center gap-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Save Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}