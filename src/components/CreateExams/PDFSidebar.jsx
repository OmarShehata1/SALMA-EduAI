// src/components/PDFViewer/PDFSidebar.jsx
const PDFSidebar = ({
    pdfFiles,
    currentPdf,
    fileInputRef,
    onFileChange,
    onPdfSelect,
    triggerFileInput
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
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
            onClick={triggerFileInput}
          >
            Upload PDF(s)
          </button>
        </div>
  
        <h2 className="text-lg font-semibold px-4 py-2 border-b border-gray-200">PDF List</h2>
        
        <div className="flex-1 overflow-y-auto">
          {pdfFiles.length > 0 ? (
            pdfFiles.map((pdf, index) => (
              <div
                key={index}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  currentPdf?.name === pdf.name ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => onPdfSelect(pdf)}
              >
                <p className="truncate text-sm">{pdf.name}</p>
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