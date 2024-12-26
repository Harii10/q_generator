import React, { useState, useEffect } from 'react';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [bgColor, setBgcolor] = useState('')

  const fetchQuote = async () => {
    const url = 'https://get-quotes-api.p.rapidapi.com/random';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8b471baf5emshc213ea75e42329fp1096e8jsne19051b9f517',
		'x-rapidapi-host': 'get-quotes-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
  setQuote(result.quote.quote)
  setAuthor(result.quote.author)
  colorGenerator()
} catch (error) {
	console.error("Error fetching", error);
}
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote on component mount
  }, []);

  const colorGenerator = () =>{
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgcolor(randomColor)
  }

  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{ backgroundColor: bgColor }}>
      <div id="quote-box" className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <p id="text" className="text-xl font-semibold text-gray-800 mb-4">
          "{quote}"
        </p>
        <p id="author" className="text-right text-gray-600">
          - {author}, 
        </p>
        <div className="mt-6 flex justify-center">
          <button
            id="new-quote"
            onClick={fetchQuote}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            New Quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote}" - ${author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900"
          >
            Tweet Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
