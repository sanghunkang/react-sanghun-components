import React from 'react';
// import WordCloud from './WordCloud/WordCloud';
// import { WordInfo }from './WordCloud/types';
import ResponseChain from './ResponseChain/ResponseChain';
import { ResponseTransition }from './ResponseChain/types';
import {mockData} from './mockdata';

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

// const mockData: ResponseTransition[] = [
//   {sourceQuestion: '8번', sourceOption: '8번_#1', targetQuestion: '10번', targetOption: '10번_#5', count: 4},
//   {sourceQuestion: '8번', sourceOption: '8번_#1', targetQuestion: '10번', targetOption: '10번_#7', count: 11},
//   {sourceQuestion: '8번', sourceOption: '8번_#1', targetQuestion: '10번', targetOption: '10번_#2', count: 4},
//   {sourceQuestion: '8번', sourceOption: '8번_#1', targetQuestion: '10번', targetOption: '10번_#6', count: 3},
//   {sourceQuestion: '8번', sourceOption: '8번_#1', targetQuestion: '10번', targetOption: '10번_#8', count: 3},
//   {sourceQuestion: '8번', sourceOption: '8번_#2', targetQuestion: '10번', targetOption: '10번_#1', count: 4},
//   {sourceQuestion: '8번', sourceOption: '8번_#2', targetQuestion: '10번', targetOption: '10번_#2', count: 3},
//   {sourceQuestion: '8번', sourceOption: '8번_#2', targetQuestion: '10번', targetOption: '10번_#4', count: 7},
//   {sourceQuestion: '8번', sourceOption: '8번_#2', targetQuestion: '10번', targetOption: '10번_#7', count: 7},
//   {sourceQuestion: '8번', sourceOption: '8번_#2', targetQuestion: '10번', targetOption: '10번_#8', count: 6},
//   {sourceQuestion: '10번', sourceOption: '10번_#5', targetQuestion: '12번', targetOption: '12번_#3', count: 2},
//   {sourceQuestion: '10번', sourceOption: '10번_#5', targetQuestion: '12번', targetOption: '12번_#1', count: 6},
//   {sourceQuestion: '10번', sourceOption: '10번_#5', targetQuestion: '12번', targetOption: '12번_#99', count: 3},
//   {sourceQuestion: '10번', sourceOption: '10번_#7', targetQuestion: '12번', targetOption: '12번_#1', count: 7},
//   {sourceQuestion: '10번', sourceOption: '10번_#7', targetQuestion: '12번', targetOption: '12번_#3', count: 6},
//   {sourceQuestion: '10번', sourceOption: '10번_#7', targetQuestion: '12번', targetOption: '12번_#2', count: 1},
//   {sourceQuestion: '10번', sourceOption: '10번_#7', targetQuestion: '12번', targetOption: '12번_#4', count: 6},
//   {sourceQuestion: '10번', sourceOption: '10번_#7', targetQuestion: '12번', targetOption: '12번_#99', count: 1},
//   {sourceQuestion: '10번', sourceOption: '10번_#2', targetQuestion: '12번', targetOption: '12번_#1', count: 3},
//   {sourceQuestion: '10번', sourceOption: '10번_#2', targetQuestion: '12번', targetOption: '12번_#4', count: 3},
//   {sourceQuestion: '10번', sourceOption: '10번_#2', targetQuestion: '12번', targetOption: '12번_#3', count: 5},
//   {sourceQuestion: '10번', sourceOption: '10번_#6', targetQuestion: '12번', targetOption: '12번_#4', count: 1},
//   {sourceQuestion: '10번', sourceOption: '10번_#6', targetQuestion: '12번', targetOption: '12번_#2', count: 1},
//   {sourceQuestion: '10번', sourceOption: '10번_#6', targetQuestion: '12번', targetOption: '12번_#1', count: 2},
//   {sourceQuestion: '10번', sourceOption: '10번_#6', targetQuestion: '12번', targetOption: '12번_#3', count: 3},
//   {sourceQuestion: '10번', sourceOption: '10번_#6', targetQuestion: '12번', targetOption: '12번_#99', count: 1},
//   {sourceQuestion: '10번', sourceOption: '10번_#8', targetQuestion: '12번', targetOption: '12번_#1', count: 2},
//   {sourceQuestion: '10번', sourceOption: '10번_#8', targetQuestion: '12번', targetOption: '12번_#4', count: 5},
//   {sourceQuestion: '10번', sourceOption: '10번_#8', targetQuestion: '12번', targetOption: '12번_#2', count: 3},
//   {sourceQuestion: '10번', sourceOption: '10번_#8', targetQuestion: '12번', targetOption: '12번_#3', count: 2},
//   {sourceQuestion: '10번', sourceOption: '10번_#8', targetQuestion: '12번', targetOption: '12번_#99', count: 2},
//   {sourceQuestion: '12번', sourceOption: '12번_#1', targetQuestion: '13번', targetOption: '13번_#1', count: 7},
//   {sourceQuestion: '12번', sourceOption: '12번_#1', targetQuestion: '13번', targetOption: '13번_#2', count: 5},
//   {sourceQuestion: '12번', sourceOption: '12번_#1', targetQuestion: '13번', targetOption: '13번_#5', count: 1},
//   {sourceQuestion: '12번', sourceOption: '12번_#2', targetQuestion: '13번', targetOption: '13번_#3', count: 1},
//   {sourceQuestion: '12번', sourceOption: '12번_#2', targetQuestion: '13번', targetOption: '13번_#2', count: 2},
//   {sourceQuestion: '12번', sourceOption: '12번_#3', targetQuestion: '13번', targetOption: '13번_#1', count: 3},
//   {sourceQuestion: '12번', sourceOption: '12번_#3', targetQuestion: '13번', targetOption: '13번_#2', count: 6},
//   {sourceQuestion: '12번', sourceOption: '12번_#3', targetQuestion: '13번', targetOption: '13번_#4', count: 1},
//   {sourceQuestion: '12번', sourceOption: '12번_#3', targetQuestion: '13번', targetOption: '13번_#5', count: 1},
//   {sourceQuestion: '12번', sourceOption: '12번_#4', targetQuestion: '13번', targetOption: '13번_#1', count: 3},
//   {sourceQuestion: '12번', sourceOption: '12번_#4', targetQuestion: '13번', targetOption: '13번_#2', count: 4},
//   {sourceQuestion: '12번', sourceOption: '12번_#4', targetQuestion: '13번', targetOption: '13번_#4', count: 1},
//   {sourceQuestion: '12번', sourceOption: '12번_#99',targetQuestion: '13번',targetOption: '13번_#1', count: 2},
//   {sourceQuestion: '12번', sourceOption: '12번_#99',targetQuestion: '13번',targetOption: '13번_#2', count: 1},
// ]


function App() {
  return (
    <div className="App">
      {/* <WordCloud data={mockData.sort((wordInfo1, wordInfo2) => wordInfo2.count - wordInfo1.count)}/> */}
      <ResponseChain data={mockData}/>
    </div>
  );
}

export default App;
