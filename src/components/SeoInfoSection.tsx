import React from "react";
import { Lock, Zap, CheckCircle2 } from "lucide-react";

export default function SeoInfoSection() {
  return (
    <section className="mt-12 space-y-10 text-slate-700">
      {/* 3-Column Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="bg-emerald-100 text-emerald-700 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-base text-slate-900 mb-2">
            Zero-Upload Browser Privacy
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike traditional e-signature platforms, your contracts, resumes,
            and legal PDFs never leave your device. All rendering and PDF
            embedding happen locally in your browser memory.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-base text-slate-900 mb-2">
            Instant Drag, Resize &amp; Date Stamps
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Draw crisp signatures using your trackpad, mouse, or touchscreen.
            Position your signature accurately across multi-page PDFs, adjust
            scale, and attach an automatic date stamp in one click.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="font-semibold text-base text-slate-900 mb-2">
            Free Forever, No Watermarks
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Export clean, standard-compliant PDF files ready for HR onboarding,
            rental agreements, invoices, and university applications without
            forced watermarks or paywalls.
          </p>
        </div>
      </div>

      {/* How-To & FAQ Section for Search Crawlers */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          How to Sign a PDF Online Without Uploading Your File
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
          <li>
            <strong className="text-slate-900">Select your PDF:</strong> Drag
            and drop any PDF document into the dropzone above or click to
            browse from your computer.
          </li>
          <li>
            <strong className="text-slate-900">Draw your signature:</strong>{" "}
            Click <em>Create Signature</em> to draw your signature smoothly on
            the transparent HTML5 canvas.
          </li>
          <li>
            <strong className="text-slate-900">Position &amp; resize:</strong>{" "}
            Drag your signature box anywhere on the document, adjust its size,
            and toggle the optional date stamp.
          </li>
          <li>
            <strong className="text-slate-900">Download signed PDF:</strong>{" "}
            Click <em>Download Signed PDF</em> to embed your signature directly
            into the PDF file and save it locally.
          </li>
        </ol>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Frequently Asked Questions
          </h3>
          <div>
            <h4 className="font-medium text-sm text-slate-900">
              Is DevDocu-Sign safe for confidential documents?
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Yes. DevDocu-Sign runs 100% client-side using WebAssembly and
              JavaScript. Your PDF is never transmitted over the network or
              stored on any external server.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-slate-900">
              Does it work on multi-page PDF documents?
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Yes. You can navigate between pages using the page toolbar and
              place your signature on any specific page before exporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
