import React from 'react';
import WordCloud from './WordCloud/WordCloud';
import { WordInfo }from './WordCloud/types';

import './App.css';
import './scss/main.scss';

const mockData: WordInfo[] = [
  { text: 'water', count: 10 },
  { text: 'cup', count: 2 },
  { text: 'bottle', count: 2 },
  { text: 'computer', count: 4 },
  { text: 'pasta', count: 6 },
  { text: 'chopstick', count: 4 },
  { text: 'trevi', count: 2 },
];

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <WordCloud data={mockData.sort((wordInfo1, wordInfo2) => wordInfo2.count - wordInfo1.count)}></WordCloud>
      </header>
    </div>
  );
}

export default App;
