import React from 'react';
import PDFViewer from '../components/CreateExams/PdfViewer';
import {Header}  from '../components/CreateExams/Header';
function CreateExam() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 mt-12">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg mb-5 mt-1">
      <Header />
      </div>
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-6">
        <PDFViewer />
      </div>
    </div>
  );
}

export default CreateExam;
