import React, { Profiler, useEffect, useState, useRef } from 'react';
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
      });
      console.log(renderingAnchorPoint);
    }
  }


  return(
    <div>
      <svg
        className="word-cloud"
        ref={element => { ref.current = element; }}>
        {/* <Profiler id="Content" onRender={onRenderCallback}> */}
          <GridCells
            width={752.390625}
            height={845.09375}
            resolution={20}
          />
        {/* </Profiler>s */}
        {  
          renderingInfos.map((wordPointProps, i) => {
            return <WordPoint
            key={'word-point' + i}
            updateRenderingAnchor={updateRenderingAnchor}
            {...wordPointProps}
            />
          })
        }
        
      </svg>
    </div>
  );
}


 
function GridCells(props: any) {
  console.log(props);

  return (
    <g>
      {
        [...Array(props.resolution)].map((row, i) => {
          return [...Array(props.resolution)].map((cell, j) => {
            return <GridCell
              key={i*props.resolution + j}
              fill={'#EE0000'}
              x={i * props.width/props.resolution}
              y={j * props.width/props.resolution}
              
              width={props.width/props.resolution}
              height={props.height/props.resolution}/>
          })
        })
      }
    </g>
  )
}

function GridCell(props: any) {
  const [fill, setFill] = useState<string>(props.fill);

  const handleMouseOver = () => {
    setFill("#000000")
  }

  return <rect
    onMouseOver={handleMouseOver}
    fill={fill}
    
    x={props.x}
    y={props.y}
    width={props.width}
    height={props.height}/>
}

function onRenderCallback(
  id: any, // the "id" prop of the Profiler tree that has just committed
  phase: any, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: any, // time spent rendering the committed update
  baseDuration: any, // estimated time to render the entire subtree without memoization
  startTime: any, // when React began rendering this update
  commitTime: any, // when React committed this update
  interactions: any, // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}