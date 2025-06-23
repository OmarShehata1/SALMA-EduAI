// src/components/PDFViewer/index.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PDFSidebar from "./PDFSidebar";
import PDFContent from "./PDFContent";
import PDFSelectionModal from "./PDFSelectionModal";
import { usePDFContext } from "../../context/PDFContext";
// import { useAuth } from "../../context/AuthProvider";

const PDFViewer = () => {
  const {
    pdfFiles,
    currentPdf,
    setCurrentPdf,
    selectedText,
    setSelectedText,
    addPdfFiles,
    uploadPdfsToServer,
    fetchPdfs,
    deletePdfFromServer,
    removePdfFile,
    loading,
  } = usePDFContext();

  // const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectionCoordinates, setSelectionCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const pdfContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
    // Track if initial fetch has been performed
  const fetchedRef = useRef(false);

  // Memoized fetch function to avoid dependency issues
  const memoizedFetchPdfs = useCallback(() => {
    fetchPdfs();
  }, [fetchPdfs]);

  // Fetch PDFs only once when component mounts
  useEffect(() => {
    if (!fetchedRef.current) {
      memoizedFetchPdfs(); // This will now get user from localStorage
      fetchedRef.current = true;
    }
  }, [memoizedFetchPdfs]); // Now properly includes the dependency

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // First add files locally for immediate display
    const added = addPdfFiles(files);

    if (!added) {
      alert("Please select valid PDF files");
      return;
    }

    // Then upload to server
    setIsUploading(true);
    try {
      const uploaded = await uploadPdfsToServer(files); // Will get user from localStorage
      if (!uploaded) {
        alert(
          "Failed to upload PDFs to server. They are available temporarily."
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePdfSelect = (pdf) => {
    setCurrentPdf(pdf);
  };

  const handlePdfDelete = async (pdfToDelete) => {
    try {
      // If this PDF is currently selected, clear the selection
      if (currentPdf && currentPdf.id === pdfToDelete.id) {
        setCurrentPdf(null);
      }

      // Remove from local state first for immediate UI feedback
      removePdfFile(pdfToDelete.id);

      // If the PDF was stored on server, delete it from there too
      if (pdfToDelete.id && pdfToDelete.serverStored !== false) {
        const deleted = await deletePdfFromServer(pdfToDelete.id);
        if (!deleted) {
          console.warn("Failed to delete PDF from server, but removed locally");
        }
      }
    } catch (error) {
      console.error("Error deleting PDF:", error);
      alert("Error deleting PDF. Please try again.");
      // Refresh the list to ensure consistency
      fetchPdfs();
    }
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

  // Check for user authentication
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id || !user.token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <PDFSidebar
        pdfFiles={pdfFiles}
        currentPdf={currentPdf}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
        onPdfSelect={handlePdfSelect}
        triggerFileInput={triggerFileInput}
        isUploading={isUploading}
        isLoading={loading}
        onPdfDelete={handlePdfDelete} // Pass the delete handler to sidebar
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