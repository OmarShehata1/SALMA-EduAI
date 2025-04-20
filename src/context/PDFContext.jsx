// src/context/PDFContext.jsx
import { createContext, useContext, useState } from 'react';

const PDFContext = createContext();

export const usePDFContext = () => {
  const context = useContext(PDFContext);
  if (!context) {
    throw new Error('usePDFContext must be used within a PDFProvider');
  }
  return context;
};

export const PDFProvider = ({ children }) => {
  // Since we're not persisting PDFs on refresh, we can just start with empty state
  const [pdfFiles, setPdfFiles] = useState([]);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Simple method to add PDF files to state
  const addPdfFiles = (files) => {
    const newPdfFiles = Array.from(files)
      .filter((file) => file.type === "application/pdf")
      .map((file) => ({
        id: Date.now() + Math.random().toString(36).substring(2, 15),
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    if (newPdfFiles.length > 0) {
      setPdfFiles((prev) => [...prev, ...newPdfFiles]);
      if (!currentPdf) {
        setCurrentPdf(newPdfFiles[0]);
      }
      return true;
    }
    return false;
  };

  // Value object provided by the context
  const value = {
    pdfFiles,
    setPdfFiles,
    currentPdf,
    setCurrentPdf,
    selectedText,
    setSelectedText,
    addPdfFiles,
    currentPage,
    setCurrentPage
  };

  return <PDFContext.Provider value={value}>{children}</PDFContext.Provider>;
};