import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HighlightedText from '../components/HighlightedText';
import { analyzeInfoApi } from '../utils/api'; 

function Analyze() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { result, loading } = useSelector(state => state.info);

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Enter Information</h2>
      <textarea 
        className='w-full p-3 border rounded mt-3' 
        rows='5' 
        placeholder='Paste your information here...'
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        className='mt-3 bg-green-500 text-white px-4 py-2 rounded' 
        onClick={() => analyzeInfoApi(text, dispatch)}  // Use the API function
      >
        {loading ? 'Analyzing...' : 'Check Authenticity'}
      </button>
      {result && (
        <div className='mt-5 p-4 border rounded bg-gray-100'>
          <h3 className='text-lg font-semibold'>Result:</h3>
          <p>Authenticity: <span className='font-bold'>{result.authenticity}</span></p>
          <p>Confidence: <span className='font-bold'>{result.confidence}</span></p>
          <h4 className='mt-3 text-md font-semibold'>Highlighted Information:</h4>
          <HighlightedText text={text} result={result} />
        </div>
      )}
    </div>
  );
}
export default Analyze;
