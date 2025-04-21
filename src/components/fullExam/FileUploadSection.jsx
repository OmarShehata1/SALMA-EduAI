
// FileUploadSection.jsx
import { Upload, FileText } from "lucide-react";

export default function FileUploadSection({ 
  files, 
  selectedFileIds, 
  handleFileUpload, 
  removeFile, 
  toggleFileSelection 
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload Content Files</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload PDFs or Documents
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </label>
      </div>
      
      {/* File List */}
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Select files to generate from:</h3>
          <ul className="border rounded-md divide-y divide-gray-200">
            {files.map((file) => (
              <li key={file.id} className="flex items-center justify-between py-2 px-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`file-${file.id}`}
                    checked={selectedFileIds.includes(file.id)}
                    onChange={() => toggleFileSelection(file.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                  />
                  <FileText className="w-4 h-4 text-gray-500 mr-2" />
                  <label
                    htmlFor={`file-${file.id}`}
                    className="text-sm cursor-pointer truncate"
                    title={file.name}
                  >
                    {file.name}
                  </label>
                </div>
                <button 
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}