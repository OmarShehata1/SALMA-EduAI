
import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import PDFUploader from '../components/PdfUploader';
import PDFList from '../components/PdfList';
import PDFViewer from '../components/PdfViewer';
import '../styles/createExam.css'

// تهيئة مكتبة PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.js';


function CreateExam() {
  const [pdfs, setPdfs] = useState([]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(-1);
  const [currentPdf, setCurrentPdf] = useState(null);

  const handleFileUpload = (files) => {
    const newPdfs = [...pdfs];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === 'application/pdf') {
        const pdfObject = {
          name: file.name,
          file: file
        };
        newPdfs.push(pdfObject);
      }
    }
    
    setPdfs(newPdfs);
  };

  const handlePdfSelect = (index) => {
    setCurrentPdfIndex(index);
    
    // حفظ اسم الملف في localStorage
    if (pdfs[index]) {
      localStorage.setItem("pdfName", pdfs[index].name);
    }
  };

  useEffect(() => {
    if (currentPdfIndex >= 0 && pdfs[currentPdfIndex]) {
      const fileReader = new FileReader();
      
      fileReader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        setCurrentPdf(typedarray);
      };
      
      fileReader.readAsArrayBuffer(pdfs[currentPdfIndex].file);
    }
  }, [currentPdfIndex, pdfs]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>PDF عارض</h2>
        <PDFUploader onFileUpload={handleFileUpload} />
        <PDFList 
          pdfs={pdfs} 
          onPdfSelect={handlePdfSelect} 
          currentPdfIndex={currentPdfIndex}
        />
      </div>
      <div className="main-content">
        {currentPdf ? (
          <PDFViewer 
            pdfData={currentPdf} 
            pdfName={currentPdfIndex >= 0 ? pdfs[currentPdfIndex].name : ''} 
          />
        ) : (
          <div className="empty-viewer">
             <p>Choose a PDF file or upload a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateExam;

