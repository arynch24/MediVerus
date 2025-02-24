import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyzeInfoApi } from '../utils/api';
import PieChart from '../components/PieChart';
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/solid";

import * as pdfjsLib from 'pdfjs-dist/webpack';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Analyze() {
  const [text, setText] = useState('');
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const { result, loading } = useSelector(state => state.info);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    // Restrict file upload to only PDFs
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        let extractedText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          // Logging after textContent is defined
          console.log(textContent.items.map(item => item.str));

          extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
        }

        setText(extractedText);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1000);
      } catch (error) {
        console.error("Error reading PDF:", error);
        alert("Failed to extract text from PDF. Please try again.");
      }
    };
  };

  const wordCount = text.trim().split(/\s+/).filter(word => word).length;


  const handleDeleteButton = () => {
    setText('');
  }

  const [copied, setCopied] = useState(false);
  const handleCopyButton = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className='p-10 pt-25 flex flex-col md:flex-row h-lvh gap-6 bg-black '>
      {/* Left Section */}
      <div className='w-full h-1/2 md:w-3/4 md:h-6/7 flex flex-col justify-between border-1 border-gray-500 rounded-sm '>
        <div className='h-11 w-full flex items-center justify-between border-b border-gray-500 text-gray-200 '>
          <label className='p-2 rounded cursor-pointer flex items-center'>
            <ArrowUpTrayIcon className="w-4 h-4  ml-3 mr-2" />
            Import
            <input type='file' onChange={handleFileUpload} className='hidden' />
          </label>
          <div className='flex mr-3'>

            <button
              onClick={handleDeleteButton}
              className="flex items-center gap-2 px-4 py-2  transition-all"
            >
              <TrashIcon className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyButton}
              className="flex items-center rounded transition-all"
            >
              {copied ? <CheckIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <textarea
          className={`w-full p-3 h-6/8 transition-all focus:outline-none overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 duration-500 text-gray-200 ${animate ? 'bg-yellow-200' : ''}`}
          rows='5'
          placeholder='Paste your information here...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className=' m-2 flex items-center justify-between border  border-gray-500 rounded-md gap-4'>
          <span className='text-gray-200 ml-2 pr-2 border-r border-gray-500'> {wordCount} words</span>

          <button
            className='m-2 bg-[#3eb300] text-gray-100 p-2 rounded'
            onClick={() => analyzeInfoApi(text, dispatch)}
          >
            {loading ? 'Analyzing...' : 'Check Authenticity'}
          </button>
        </div>
      </div>

      {/* Right Section */}

      <div className='w-full md:w-1/4 h-1/2 p-4 border rounded flex flex-col items-center justify-center border-gray-500'>
        {result && (
          <>
            <div className='h-36 w-36'>
              <PieChart score={result.isFakeNews ? result.confidenceScoreOfFake : result.confidenceScoreOfReal} authenticity={result.isFakeNews} />
            </div>
            <p className={`mt-5 font-bold ${result.isFakeNews ? 'text-red-500' : 'text-green-500'}`}>

              {result.isFakeNews ? result.confidenceScoreOfFake.toFixed(2) : result.confidenceScoreOfReal.toFixed(2)}% Confidence
            </p>

            <p className='text-sm text-white mt-1'>{formattedDate}</p>
          </>
        )}
      </div>
    </div>
  );
}
export default Analyze;