"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, Trash2, ShieldCheck, PenTool } from "lucide-react";
import SignaturePad from "@/components/SignaturePad";
import PdfWorkspace, { SignaturePlacement } from "@/components/PdfWorkspace";

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [placement, setPlacement] = useState<SignaturePlacement>({
    pageNumber: 1,
    xPercent: 0.55,
    yPercent: 0.75,
    widthPercent: 0.25,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }
    setPdfFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setSignatureUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">DevDocu-Sign</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          100% Client-Side & Private (Files Never Leave Your Browser)
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col">
        {!pdfFile ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 min-h-[420px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-10 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-blue-600 bg-blue-50/70"
                : "border-slate-300 bg-white hover:border-blue-500 hover:bg-slate-50/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              Drop your PDF here to start signing
            </h1>
            <p className="text-slate-500 max-w-md mb-6 text-sm">
              Select or drag and drop any PDF document. Everything is processed
              locally in your browser for maximum privacy.
            </p>
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              Choose PDF File
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Document Toolbar */}
            <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium text-sm truncate">
                  {pdfFile.name}
                </span>
                <span className="text-xs text-slate-500">
                  ({(pdfFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSignModal(true)}
                  className="flex items-center gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  {signatureUrl ? "Redraw Signature" : "Create Signature"}
                </button>

                <button
                  onClick={handleRemoveFile}
                  className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </div>

            {/* Interactive PDF Canvas & Draggable Signature */}
            <PdfWorkspace
              pdfFile={pdfFile}
              signatureUrl={signatureUrl}
              placement={placement}
              onPlacementChange={setPlacement}
            />
          </div>
        )}
      </main>

      {/* Signature Pad Modal */}
      {showSignModal && (
        <SignaturePad
          onSave={(dataUrl) => {
            setSignatureUrl(dataUrl);
            setShowSignModal(false);
          }}
          onCancel={() => setShowSignModal(false)}
        />
      )}
    </div>
  );
}
