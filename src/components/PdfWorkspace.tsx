'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Move } from 'lucide-react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';

export interface SignaturePlacement {
  pageNumber: number;
  xPercent: number;
  yPercent: number;
  widthPercent: number;
}

interface PdfWorkspaceProps {
  pdfFile: File;
  signatureUrl: string | null;
  placement: SignaturePlacement;
  onPlacementChange: (placement: SignaturePlacement) => void;
}

export default function PdfWorkspace({
  pdfFile,
  signatureUrl,
  placement,
  onPlacementChange,
}: PdfWorkspaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDraggingSig, setIsDraggingSig] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // 1. Load PDF document using bundled pdfjs worker
  useEffect(() => {
    let isMounted = true;
    const loadPdf = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const arrayBuffer = await pdfFile.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
          data: new Uint8Array(arrayBuffer),
        });
        const pdf = await loadingTask.promise;

        if (isMounted) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Failed to render PDF:', err);
      }
    };
    loadPdf();
    return () => {
      isMounted = false;
    };
  }, [pdfFile]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let renderTask: RenderTask | null = null;

    const renderPage = async () => {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
      });
      await renderTask.promise;
    };

    renderPage();
    return () => {
      if (renderTask) renderTask.cancel();
    };
  }, [pdfDoc, currentPage]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const sigLeftPx = placement.xPercent * rect.width;
    const sigTopPx = placement.yPercent * rect.height;

    dragOffset.current = {
      x: e.clientX - rect.left - sigLeftPx,
      y: e.clientY - rect.top - sigTopPx,
    };
    setIsDraggingSig(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSig || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let newX = (e.clientX - rect.left - dragOffset.current.x) / rect.width;
    let newY = (e.clientY - rect.top - dragOffset.current.y) / rect.height;

    newX = Math.max(0, Math.min(1 - placement.widthPercent, newX));
    newY = Math.max(0, Math.min(0.92, newY));

    onPlacementChange({
      ...placement,
      pageNumber: currentPage,
      xPercent: newX,
      yPercent: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDraggingSig(false);
  };

  const changePage = (delta: number) => {
    const next = Math.max(1, Math.min(numPages, currentPage + delta));
    setCurrentPage(next);
    onPlacementChange({ ...placement, pageNumber: next });
  };

  return (
    <div className='flex-1 flex flex-col bg-slate-200'>
      {/* Page Navigation Sub-bar */}
      <div className='bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            disabled={currentPage <= 1}
            onClick={() => changePage(-1)}
            className='p-1 rounded hover:bg-slate-100 disabled:opacity-40'
          >
            <ChevronLeft className='w-4 h-4' />
          </button>
          <span className='font-medium'>
            Page {currentPage} of {numPages}
          </span>
          <button
            type='button'
            disabled={currentPage >= numPages}
            onClick={() => changePage(1)}
            className='p-1 rounded hover:bg-slate-100 disabled:opacity-40'
          >
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>

        {signatureUrl ? (
          <span className='text-blue-700 font-medium'>
            Tip: Drag your signature box anywhere on the page
          </span>
        ) : (
          <span className='text-slate-400'>
            Click &ldquo;Create Signature&rdquo; above to place your stamp
          </span>
        )}
      </div>

      {/* Scrollable Page Canvas Stage */}
      <div
        className='flex-1 overflow-auto p-6 flex justify-center items-start'
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={containerRef}
          className='relative shadow-lg bg-white select-none'
        >
          <canvas ref={canvasRef} className='max-w-full h-auto block' />

          {/* Draggable Signature Overlay */}
          {signatureUrl && placement.pageNumber === currentPage && (
            <div
              onMouseDown={handleMouseDown}
              style={{
                left: `${placement.xPercent * 100}%`,
                top: `${placement.yPercent * 100}%`,
                width: `${placement.widthPercent * 100}%`,
              }}
              className={`absolute border-2 rounded-lg p-1 cursor-move transition-shadow group ${
                isDraggingSig
                  ? 'border-blue-600 bg-blue-50/40 shadow-xl'
                  : 'border-blue-500 border-dashed bg-blue-50/20 hover:bg-blue-50/40'
              }`}
            >
              <div className='absolute -top-6 left-0 bg-blue-600 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow-xs'>
                <Move className='w-3 h-3' />
                Drag to position
              </div>
              <img
                src={signatureUrl}
                alt='Placed signature'
                draggable={false}
                className='w-full h-auto pointer-events-none'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
