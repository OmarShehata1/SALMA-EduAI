// src/components/PDFViewer/index.jsx
import { useState, useRef } from "react";
import PDFSidebar from "./PDFSidebar";
import PDFContent from "./PDFContent";
import PDFSelectionModal from "./PDFSelectionModal";
import { useNavigate } from "react-router-dom";

const PDFViewer = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [selectedText, setSelectedText] = useState("");
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
    const newPdfFiles = files
      .filter((file) => file.type === "application/pdf")
      .map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    if (newPdfFiles.length > 0) {
      setPdfFiles((prev) => [...prev, ...newPdfFiles]);
      if (!currentPdf) {
        setCurrentPdf(newPdfFiles[0]);
      }
    } else if (files.length > 0) {
      alert("Please select valid PDF files");
    }
  };

  const handlePdfSelect = (pdf) => {
    setCurrentPdf(pdf);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      setSelectedText(selectedText);

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
    // try {
    //   const response = await fetch("your-backend-endpoint", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       selectedText,
    //       pdfName: currentPdf?.name || "Unknown",
    //       timestamp: new Date().toISOString(),
    //     }),
    //   });

    //   if (!response.ok) throw new Error("Failed to send selection to backend");

    //   const result = await response.json();
    //   console.log("Selection saved:", result);

    // } catch (error) {
    //   console.error("Error sending selection:", error);
    //   alert("Failed to save selection. Please try again.");
    // }
    setShowModal(false);
    window.getSelection().removeAllRanges();

    // ✅ Navigate and pass the selected text
    navigate("/generate", {
      state: { selectedText },
    });
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
