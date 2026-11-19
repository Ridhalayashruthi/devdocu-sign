import React from "react";
import Link from "next/link";
import { FileText, ShieldCheck, ArrowLeft, Mail, Code2 } from "lucide-react";

export const metadata = {
  title: "About DevDocu-Sign | 100% Private Browser-Based PDF Signer",
  description:
    "Learn how DevDocu-Sign protects your document privacy by processing and signing PDF files entirely inside your web browser with zero server uploads.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">DevDocu-Sign</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to PDF Signer
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            Privacy-First Web Architecture
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            About DevDocu-Sign
          </h1>

          <p className="text-slate-600 leading-relaxed">
            DevDocu-Sign was built with a simple mission: signing a PDF
            document should be fast, free, and 100% private. Most online PDF
            tools require you to upload sensitive contracts, offer letters,
            invoices, or IDs to remote cloud servers before you can place a
            signature.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 pt-2">
            How Our Zero-Upload Technology Works
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Instead of sending your files over the internet, DevDocu-Sign runs
            directly inside your browser memory using modern client-side web
            technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
            <li>
              <strong className="text-slate-900">Local Rendering:</strong> Your
              PDF pages are rendered locally on an HTML5 canvas without leaving
              your device.
            </li>
            <li>
              <strong className="text-slate-900">Transparent Ink Capture:</strong>{" "}
              Your handwritten signature is captured as a clean, transparent PNG
              image in browser memory.
            </li>
            <li>
              <strong className="text-slate-900">Direct Binary Embedding:</strong>{" "}
              The final signed PDF is assembled directly on your computer and
              saved straight to your downloads folder.
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>Built by Ridhalayasruthi</span>
            </div>
            <a
              href="mailto:contact@devdocusign.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <Mail className="w-4 h-4" />
              Contact &amp; Feedback
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
