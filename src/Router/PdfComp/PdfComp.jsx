import { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfComp.css';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineZoomIn } from "react-icons/md";
import { MdZoomOut } from "react-icons/md";
import { FcFile } from "react-icons/fc";
import { MdOutlineSkipNext } from "react-icons/md";
import { MdOutlineSkipPrevious } from "react-icons/md";
import Slider from "react-slick";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

function PdfComp(props) {

    /* USEState Select File */
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [zoomPercent, setZoomPercent] = useState('90%');
    let [selectFile,setSelectFile] = useState('http://localhost:8000/'+props.documentos[0][1][1].source);


    const moveDocument=(event)=>{
        /* SETEAMOS LAS PAGINAS CON LAS QUE TRABAJAMOS */
        console.log("Index: ",props.documentos,event , 'http://localhost:8000/'+props.documentos[event][1][1].source);
        setSelectFile('http://localhost:8000/'+props.documentos[event][1][1].source);
        setPageNumber(1)
    }




    
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        if (pageNumber === 1) {
            return;
        }
        changePage(-1);
    }

    function nextPage() {
        if (pageNumber === numPages) {
            return;
        }
        changePage(1);
    }

    function goToPage(event) {
        const pageNumber = parseInt(event.target.value, 10);
        if (pageNumber > 0) {
            setPageNumber(pageNumber);
        }
    }

    function zoomIn() {
        setScale(scale => scale + 0.1);
      setZoomPercent(`${Math.round((scale + 0.1) * 100)}%`);
    }
  
    function zoomOut() {
      setScale(scale => scale - 0.1);
      setZoomPercent(`${Math.round((scale - 0.1) * 100)}%`);
    }
  
    function goToFirstPage() {
      setPageNumber(1);
    }
  
    function goToLastPage() {
      setPageNumber(numPages);
    }
  
    function downloadPdf() {
      window.open(selectFile)
    }
  
    function customLoading() {
      return <p className='m-0 p-0 fs-5- ff-monse-regular- fw-normal tx-black-'>Cargando pdf</p>;
    }


    

  return (
    <>
    <div className='row mt-4' style={{'maxWidth':'100%'}}>
            <div className='col-12'>
                
                <div style={{'width':'100%','display':'flex','alignItems':'center','justifyContent':'center'}}>
                            {props.documentos.map((obj,index)=>{
                                return(
                                    <div onClick={()=>moveDocument(index)} key={index} style={{'marginBottom':'100px','height':'200px','margin': '20px'}}   id="card-file" className='w-100 d-flex flex-row justify-content-center align-items-center align-self-center cursor- focus background-linear-1'>
                                        <div className='card overflow-out border-0 position-relative  bs-1-'>
                                            <div className='w-100 h-100 d-flex flex-row justify-content-center align-items-center align-self-center'>
                                                <FcFile size={60} color='black'></FcFile>
                                            </div>
                                            <span className='font_medium numberInform'>{index+1}</span>
                                        </div>
                                    </div>
                                )
                            })} 
                </div>
                
                <div className="pdf-container d-flex flex-column justify-content-center align-items-center align-self-center">
                    <div className="pdf-viewer">
                        <Document
                            file={selectFile}
                            renderMode='svg' 
                            onLoadSuccess={onDocumentLoadSuccess}
                            error={() => <p className='m-0 p-0 fs-5- ff-monse-regular- fw-normal tx-black-  font_medium whiteV2'>Ha ocurrido un error al cargar el archivo PDF</p>}
                            loading={customLoading}>
                            <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false}
                            error={() => <p className='m-0 p-0 fs-5- ff-monse-regular- fw-normal tx-black-  font_medium whiteV2'>No existen mas páginas para visualizar</p>}
                            noPagesFound={() => <p className='m-0 p-0 fs-5- ff-monse-regular- fw-normal tx-black-  font_medium whiteV2'>Ir a la primera página</p>}
                            goToFirstPage={() => <p className='m-0 p-0 fs-5- ff-monse-regular- fw-normal tx-black- font_medium whiteV2'>No se encontraron páginas</p>}/>
                        </Document>
                    </div>
              </div>
            </div>
    </div>
    </>
    
    );
}
export default PdfComp;