function HighlightedText({ text, result }) {
    if (!result) return text;
    let highlightedText = text;
    result.flaggedInfo.forEach(({ sentence, status }) => {
      const colorClass = status === 'Fake' ? 'bg-red-200' : 'bg-green-200';
      const highlighted = `<span class='${colorClass} p-1 rounded'>${sentence}</span>`;
      highlightedText = highlightedText.replace(sentence, highlighted);
    });
    return <div className='mt-2 p-2 border rounded bg-white' dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  }
  export default HighlightedText;
  