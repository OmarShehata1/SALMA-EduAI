// src/components/PDFViewer/PDFContent.jsx
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer } from "@react-pdf-viewer/core";
import * as pdfjs from "pdfjs-dist";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Set the worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFContent = ({ currentPdf, pdfContainerRef, onTextSelection }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  return (
    <div className="flex-1 h-full relative" ref={pdfContainerRef}>
      {currentPdf ? (
        <div className="flex flex-col h-full">
          <div className="py-3 px-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium truncate">{currentPdf.name}</h3>
          </div>
          
          <div 
            className="flex-1 overflow-auto"
            onMouseUp={onTextSelection}
          >
            <Worker
              workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}
            >
              <div className="h-full">
                <Viewer
                  fileUrl={currentPdf.url}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </div>
            </Worker>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
          <svg className="w-16 h-16 text-center text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="text-gray-500">Select a PDF from the list or upload new ones</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFContent;