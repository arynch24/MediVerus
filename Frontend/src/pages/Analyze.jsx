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
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        let extractedText = '';
        console.log(extractedText);
        for (let i = 1; i <= pdf.numPages; i++) {
          console.log(textContent.items.map(item => item.str))
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
        }
        setText(extractedText);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 1000);
      };
    } else {
      alert("Please upload a valid PDF file.");
    }
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
    <div className='p-10 md:pt-25 flex flex-col md:flex-row  md:h-lvh gap-6 bg-black '>
      {/* Left Section */}
      <div className='w-full md:w-3/4 md:h-6/7  flex-col border-1 border-gray-500 rounded-sm '>
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
        <div className=' mt-2 ml-2 mr-2 flex items-center justify-between border  border-gray-500 rounded-md gap-4'>
          <span className='text-gray-200 ml-2 pr-2 border-r border-gray-500'> {wordCount} words</span>

          <button
            className='m-1 bg-[#3eb300] text-gray-100 px-4 py-2 rounded'
            onClick={() => analyzeInfoApi(text, dispatch)}
          >
            {loading ? 'Analyzing...' : 'Check Authenticity'}
          </button>
        </div>
      </div>

      {/* Right Section */}
      {/* <div className='w-full md:w-1/4 md:h-2/4 p-4 border rounded bg-gray-100'>
        {result && (
          <>
            <h3 className='text-lg font-semibold'>Result:</h3>
            <p>Authenticity: <span className='font-bold'>{result.authenticity}</span></p>
            <p>Confidence: <span className='font-bold'>{result.confidence}</span></p>
            <h4 className='mt-3 text-md font-semibold'>Confidence Score:</h4>
            <Pie data={chartData} />
            <h4 className='mt-3 text-md font-semibold'>Highlighted Information:</h4>
            <HighlightedText text={text} result={result} />
          </>
        )}
      </div> */}
      <div className='w-full md:w-1/4 md:h-2/4 p-4 border rounded flex flex-col items-center justify-center border-gray-500'>

        <div className='h-36 w-36'>
          <PieChart score={90} authenticity={"Real"} />
          {/* <PieChart score={result.confidence} authenticity={result.authenticity}/> */}
        </div>
        <p
          className={`mt-4 font-bold ${result?.authenticity === "Real" ? "text-green-500" : "text-red-500"
            }`}
        >
          <span>90%</span> Confidence
        </p>

        <p className='text-sm text-white'>{formattedDate}</p>
      </div>
    </div>
  );
}
export default Analyze;