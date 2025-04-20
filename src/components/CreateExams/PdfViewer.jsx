// src/components/PDFViewer/index.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PDFSidebar from "./PDFSidebar";
import PDFContent from "./PDFContent";
import PDFSelectionModal from "./PDFSelectionModal";
import { usePDFContext } from "../../context/PDFContext";

const PDFViewer = () => {
  const { 
    pdfFiles, 
    currentPdf, 
    setCurrentPdf, 
    selectedText, 
    setSelectedText,
    addPdfFiles
  } = usePDFContext();
  
  const [showModal, setShowModal] = useState(false);
  const [selectionCoordinates, setSelectionCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const pdfContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const added = addPdfFiles(files);
    
    if (!added && files.length > 0) {
      alert("Please select valid PDF files");
    }
  };

  const handlePdfSelect = (pdf) => {
    setCurrentPdf(pdf);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      setSelectedText(text);

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = pdfContainerRef.current.getBoundingClientRect();

      setSelectionCoordinates({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top,
      });

      setShowModal(true);
    }
  };

  const handleConfirmSelection = () => {
    setShowModal(false);
    window.getSelection().removeAllRanges();

    // Navigate while keeping the context state intact
    navigate("/generate");
  };

  const handleCancelSelection = () => {
    setShowModal(false);
    window.getSelection().removeAllRanges();
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <PDFSidebar
        pdfFiles={pdfFiles}
        currentPdf={currentPdf}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
        onPdfSelect={handlePdfSelect}
        triggerFileInput={triggerFileInput}
      />

      <PDFContent
        currentPdf={currentPdf}
        pdfContainerRef={pdfContainerRef}
        onTextSelection={handleTextSelection}
      />

      {showModal && (
        <PDFSelectionModal
          selectedText={selectedText}
          coordinates={selectionCoordinates}
          onConfirm={handleConfirmSelection}
          onCancel={handleCancelSelection}
        />
      )}
    </div>
  );
};

export default PDFViewer;