import React, { useEffect, useState, useRef } from 'react';
import WordPoint from './WordPoint';
import { WordInfo }from './types';

interface Props {
  data: WordInfo[],
}

type RenderingInfo = {
  x: number,
  y: number,
  weight: number,
  text: string,
}

// function createRenderingArray(wordInfos: WordInfo[]): RenderingInfo[] {
//   return wordInfos.sort((wordInfo1, wordInfo2) => wordInfo2.count - wordInfo1.count)
//   .map((wordInfo, i) => {
//     return {
//       x: (i + 1) * 30,
//       y: (i + 1) * 30,
//       weight: wordInfo.count,
//       text: wordInfo.text,
//     }
//   })
// } 

type RenderingAnchorPoint = {
  x: number,
  y: number,
  appendingTo: string,
}

export default function WordCloud(props: Props) {
  const ref = useRef<SVGSVGElement| null>(null);
  const [count, setCount] = useState<number>(0);
  const [renderingInfos, setRenderingInfos] = useState<RenderingInfo[]>([]);
  const [renderingAnchorPoint, setRenderingAnchorPoint] = useState<RenderingAnchorPoint | null>(null);

  // const renderingArray = createRenderingArray(props.data);


  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.getBoundingClientRect());
      let boundingClientRect = ref.current.getBoundingClientRect();
      setRenderingAnchorPoint({
        x: boundingClientRect.width * 0.35,
        y: boundingClientRect.height / 2,
        appendingTo: 'up',
      });
      console.log(renderingAnchorPoint);
    }
  }, [props])


  useEffect(() => {
    if (renderingAnchorPoint && count < props.data.length) {
      let wordInfo = props.data[count];
      console.log(props.data[count]);
    
      setRenderingInfos(r => [...r, {
        x: renderingAnchorPoint.x,
        y: renderingAnchorPoint.y,
        appendingTo: renderingAnchorPoint.appendingTo,
        weight: wordInfo.count,
        text: wordInfo.text,
      }]);
      setCount(count => count + 1);
    }

  }, [renderingAnchorPoint, props]);

  const updateRenderingAnchor = (boundingClientRect: any) => {
    if (count < props.data.length) {
      setRenderingAnchorPoint({
        x: boundingClientRect.x,
        y: boundingClientRect.y,
        appendingTo: boundingClientRect.appendingTo,
      });
      console.log(renderingAnchorPoint);
    }
  }


  return(
    <div>
      <svg
        className="word-cloud"
        ref={element => { ref.current = element; }}>
        {
          
          renderingInfos.map((wordPointProps, i) => {
            console.log(renderingInfos);
            return <WordPoint
              key={'word-point' + i}
              updateRenderingAnchor={updateRenderingAnchor}
              {...wordPointProps}
            />
          })
        }
        <GridCells
          width={752.390625}
          height={845.09375}
          resolution={100}
        />
      </svg>
    </div>
  );
}


 
function GridCells(props: any) {
  console.log(props);

  return (
    <g>
      {
        [...Array(props.resolution)].map((x, i) => {
          return <rect 
            x={i * props.width/100}
            y={i * props.width/100}
            width={props.width/100}
            height={props.height/100}/>
        })
      }
    </g>
  )
}