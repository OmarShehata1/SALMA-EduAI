// src/components/PDFViewer/PDFSelectionModal.jsx
const PDFSelectionModal = ({ selectedText, coordinates, onConfirm, onCancel }) => {
    return (
      <div
        className="absolute bg-white rounded-lg shadow-lg border border-gray-200"
        style={{
          left: `${coordinates.x}px`,
          top: `${coordinates.y}px`,
          transform: "translate(-50%, -100%)",
          zIndex: 50,
          maxWidth: "300px",
        }}
      >
        <div className="p-3">
          <h4 className="text-sm font-semibold mb-2">Confirm Selection</h4>
          <div className="text-xs bg-gray-50 p-2 rounded mb-3 max-h-24 overflow-y-auto">
            {selectedText.length > 100
              ? `${selectedText.substring(0, 100)}...`
              : selectedText}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PDFSelectionModal;