
// components/PDFViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

function PDFViewer({ pdfData, pdfName }) {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRendering, setPageRendering] = useState(false);
  const [pageNumPending, setPageNumPending] = useState(null);
  const [scale, setScale] = useState(1.5);
  const [numPages, setNumPages] = useState(0);
  
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);
  const pdfViewerRef = useRef(null);

  // إنشاء وثيقة PDF عند تغيير البيانات
  useEffect(() => {
    if (pdfData) {
      console.log("بدء معالجة بيانات PDF في المكون PDFViewer");
      
      window.pdfjsLib.getDocument(pdfData).promise
        .then(pdf => {
          console.log("تم تحميل PDF بنجاح، عدد الصفحات:", pdf.numPages);
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setCurrentPage(1);
        })
        .catch(error => {
          console.error('خطأ في تحميل PDF:', error);
        });
    }
  }, [pdfData]);





useEffect(() => {
    if (pdfDoc && currentPage) {
      const canvas = document.getElementById('pdf-canvas');
      const context = canvas.getContext('2d');
  
      pdfDoc.getPage(currentPage).then(page => {
        const viewport = page.getViewport({ scale: 1.0 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        page.render({
          canvasContext: context,
          viewport: viewport,
        });
      });
    }
  }, [pdfDoc, currentPage]);

  // عرض الصفحة الحالية عند تغييرها
  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [currentPage, pdfDoc, scale]);

  // تنقل لوحة المفاتيح
  useKeyboardNavigation({
    onLeftArrow: () => changePage(-1),
    onRightArrow: () => changePage(1),
    enabled: pdfDoc !== null
  });

  const renderPage = (pageNum) => {
    if (pageRendering) {
      setPageNumPending(pageNum);
      return;
    }
    
    setPageRendering(true);
    
    pdfDoc.getPage(pageNum).then(page => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const viewport = page.getViewport({ scale });
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      
      const renderTask = page.render(renderContext);
      
      renderTask.promise.then(() => {
        setPageRendering(false);
        
        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          setPageNumPending(null);
        }
        
        createTextLayer(page, viewport);
      });
    });
  };

  const createTextLayer = (page, viewport) => {
    page.getTextContent().then(textContent => {
      if (textLayerRef.current) {
        while (textLayerRef.current.firstChild) {
          textLayerRef.current.removeChild(textLayerRef.current.firstChild);
        }
      } else {
        const textLayer = document.createElement('div');
        textLayer.setAttribute('id', 'text-layer');
        textLayer.style.position = 'absolute';
        textLayer.style.left = canvasRef.current.offsetLeft + 'px';
        textLayer.style.top = canvasRef.current.offsetTop + 'px';
        textLayer.style.height = canvasRef.current.height + 'px';
        textLayer.style.width = canvasRef.current.width + 'px';
        pdfViewerRef.current.appendChild(textLayer);
        textLayerRef.current = textLayer;
      }
      
      textLayerRef.current.style.height = canvasRef.current.height + 'px';
      textLayerRef.current.style.width = canvasRef.current.width + 'px';
      
      window.pdfjsLib.renderTextLayer({
        textContent: textContent,
        container: textLayerRef.current,
        viewport: viewport,
        textDivs: []
      });
    });
  };

  const changePage = (offset) => {
    const newPage = currentPage + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    const pageNumber = parseInt(e.target.value);
    if (pageNumber >= 1 && pageNumber <= numPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleZoomChange = (newScale) => {
    setScale(newScale);
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-header">
        <div className="pdf-name">{pdfName}</div>
        <div className="pdf-controls">
          <button 
            className="zoom-btn" 
            onClick={() => handleZoomChange(scale - 0.25)}
            disabled={scale <= 0.5}
          >
            -
          </button>
          <span className="zoom-level">{Math.round(scale * 100)}%</span>
          <button 
            className="zoom-btn" 
            onClick={() => handleZoomChange(scale + 0.25)}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="pdf-viewer" ref={pdfViewerRef}>
        <canvas ref={canvasRef} id="pdf-canvas"></canvas>
      </div>
      
      <div className="page-controls">
        <button 
          id="prev-page" 
          onClick={() => changePage(-1)}
          disabled={currentPage <= 1}
        >
         Previous Page 
        </button>
        
        <div className="page-input">
          <input 
            id="page-number" 
            type="number" 
            value={currentPage}
            onChange={handlePageInputChange}
            min="1" 
            max={numPages} 
          />
          <span>/ {numPages}</span>
        </div>
        
        <button 
          id="next-page" 
          onClick={() => changePage(1)}
          disabled={currentPage >= numPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;
