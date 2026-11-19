#### DevDocu-Sign — 100% Client-Side PDF Signer

A privacy-first electronic signature web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Unlike cloud-based e-signature platforms that upload confidential contracts and resumes to external servers, **DevDocu-Sign** processes, renders, signs, and exports PDF files entirely inside the user's browser memory. 

* **Live Demo:** [https://devdocu-sign.vercel.app](https://devdocu-sign.vercel.app)
* **GitHub Repository:** [https://github.com/Ridhalayashruthi/devdocu-sign](https://github.com/Ridhalayashruthi/devdocu-sign)

#### Key Features

* **Zero-Upload Browser Privacy:** Uses browser ArrayBuffer streams and WebAssembly (pdfjs-dist) so sensitive PDFs never leave the user's device.
* **Interactive HTML5 Canvas Signature Pad:** Smooth mouse, trackpad, and touch ink capture with transparent PNG export and existing-signature reload support.
* **Multi-Page PDF Renderer & WYSIWYG Placement:** Navigate multi-page PDFs, drag signatures using normalized percentage coordinates, resize stamps dynamically, toggle aligned date stamps, and click outside to preview the clean final document.
* **Direct Binary PDF Embedding:** Converts HTML top-left viewport coordinates to bottom-left PDF coordinate space and embeds signatures directly into the PDF binary via pdf-lib.
* **SEO & Trust Ready:** Includes dynamic sitemap.xml, robots.txt, JSON-LD WebApplication schema, and dedicated /about and /privacy-policy routes.

#### Tech Stack

* **Framework:** Next.js 16 (App Router) & React 19
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 & Lucide Icons
* **PDF Rendering & Manipulation:** pdfjs-dist & pdf-lib
* **Deployment:** Vercel CI/CD

#### Getting Started Locally

bash

# 1. Clone the repository
git clone https://github.com/Ridhalayashruthi/devdocu-sign.git
cd devdocu-sign

# 2. Install dependencies
npm install

# 3. Copy the PDF.js worker into public/
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs

# 4. Run the development server
npm run dev

Use code with caution.

Copy code text to clipboard.

Open [http://localhost:3000](http://localhost:3000) in your browser to test the application locally.