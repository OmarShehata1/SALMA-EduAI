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
          <div className="text-center p-8">
            <p className="text-gray-500">Select a PDF from the list or upload new ones</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFContent;