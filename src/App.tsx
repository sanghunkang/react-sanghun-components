import React from 'react';
// import WordCloud from './WordCloud/WordCloud';
// import { WordInfo }from './WordCloud/types';
import ResponseChain from './ResponseChain/ResponseChain';
import { ResponseTransition }from './ResponseChain/types';

import './App.css';
import './scss/main.scss';

// const mockData: WordInfo[] = [
//   { text: 'water', count: 10 },
//   { text: 'cup', count: 2 },
//   { text: 'bottle', count: 2 },
//   { text: 'computer', count: 4 },
//   { text: 'pasta', count: 6 },
//   { text: 'chopstick', count: 4 },
//   { text: 'trevi', count: 2 },
//   { text: 'human', count: 20 },
// ];

const mockData: ResponseTransition[] = [
  
]

function App() {
  return (
    <div className="App">
      {/* <WordCloud data={mockData.sort((wordInfo1, wordInfo2) => wordInfo2.count - wordInfo1.count)}/> */}
      <ResponseChain data={mockData}/>
    </div>
  );
}

export default App;
