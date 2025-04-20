import React from 'react';
import PDFViewer from '../components/PdfViewer';

function CreateExam() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 mt-12">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-6">
        <PDFViewer />
      </div>
    </div>
  );
}

export default CreateExam;
