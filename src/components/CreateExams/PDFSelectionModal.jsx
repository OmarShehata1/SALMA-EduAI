const PDFSelectionModal = ({ selectedText, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 sm:mx-0 animate-fadeIn">
        <div className="p-5">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Confirm Selection</h4>
          <div className="text-sm bg-gray-100 p-3 rounded-md mb-4 max-h-40 overflow-y-auto text-gray-700">
            {selectedText.length > 200
              ? `${selectedText.substring(0, 200)}...`
              : selectedText}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-sm bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition-colors"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFSelectionModal;
