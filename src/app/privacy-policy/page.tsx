import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | DevDocu-Sign",
  description:
    "Read the DevDocu-Sign Privacy Policy. Your PDF files and signatures are processed locally in your browser and are never uploaded or stored on any server.",
};

export default function PrivacyPolicyPage() {
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
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs space-y-6 text-sm text-slate-600 leading-relaxed">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: November 2026
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              1. Zero Document Upload &amp; Local File Processing
            </h2>
            <p>
              DevDocu-Sign is designed as a 100% client-side application. Any
              PDF documents you select and any electronic signatures you draw
              are processed exclusively within your web browser&apos;s local
              memory. We do not upload, transmit, view, or store your PDF files
              or signature images on any server.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              2. Analytics &amp; Advertising Cookies (Google AdSense)
            </h2>
            <p>
              We may use third-party advertising services such as Google AdSense
              to support keeping this tool free. Google and its partners may use
              cookies to serve ads based on your prior visits to this website or
              other websites on the internet. You may opt out of personalized
              advertising by visiting Google&apos;s Ads Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              3. Data Security
            </h2>
            <p>
              Because your files never leave your computer or mobile device,
              closing or refreshing your browser tab immediately clears all
              document and signature data from memory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, you can reach
              us at{" "}
              <a
                href="mailto:contact@devdocusign.com"
                className="text-blue-600 hover:underline"
              >
                contact@devdocusign.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}