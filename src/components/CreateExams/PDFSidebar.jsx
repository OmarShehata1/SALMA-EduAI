// src/components/PDFViewer/PDFSidebar.jsx
const PDFSidebar = ({
  pdfFiles,
  currentPdf,
  fileInputRef,
  onFileChange,
  onPdfSelect,
  triggerFileInput,
  isUploading,
  isLoading
}) => {
  return (
    <div className="w-64 h-full bg-white shadow-md flex flex-col border-r border-gray-200">
      <div className="p-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="application/pdf"
          onChange={onFileChange}
          className="hidden"
          multiple
        />
        <button 
          className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors ${(isUploading || isLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={triggerFileInput}
          disabled={isUploading || isLoading}
        >
          {isUploading ? "Uploading..." : "Upload PDF(s)"}
        </button>
      </div>

      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="text-lg font-semibold">PDF List</h2>
        {isLoading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading && pdfFiles.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-sm italic">Loading PDFs...</p>
          </div>
        ) : pdfFiles.length > 0 ? (
          pdfFiles.map((pdf, index) => (
            <div
              key={pdf.id || index}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                currentPdf?.name === pdf.name ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
              onClick={() => onPdfSelect(pdf)}
            >
              <p className="truncate text-sm">{pdf.name}</p>
              {pdf.serverStored && (
                <span className="text-xs text-green-600 mt-1 block">Saved on server</span>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm p-4 italic">No PDFs uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default PDFSidebar;