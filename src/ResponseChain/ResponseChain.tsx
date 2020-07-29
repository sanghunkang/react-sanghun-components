import React, { useEffect, useState, useRef } from 'react';
// import ResponseChainColumn from './ResponseChainColumn';
import ResponseOption from './ResponseOption';
import ResponseTransitions from './ResponseTransitions';
import { Coordinate, ResponseTransition }from './types';


function findColumnWidth(
  svgWidth: number,
  svgSpacing: number,
  numCols: number): number {
  return ((svgWidth - (svgSpacing * (numCols + 1)))/numCols);
}

function findColumnHeight(
  svgHeight: number,
  svgPaddingVertical: number,
): number {
  return (svgHeight - svgPaddingVertical * 2);
}


// function 
function findCumulativeRelativeFrequency(distribution: number[], index: number): number {
  if (index === 0) {
    return 0;
  }

  let base = Object.values(distribution).reduce((x1, x2) => x1 + x2);
  let sum = Object.values(distribution).slice(0, index).reduce((x1, x2) => x1 + x2);
  return sum / base;
}

function findRelativeFrequency(distribution: number[], index: number): number {
  return Object.values(distribution)[index] / Object.values(distribution).reduce((x1, x2) => x1 + x2);
}

function findX(
  paddingX: number,
  svgWidth: number,
  svgSpacing: number,
  numCols: number,
  i: number) {

  return paddingX 
    + findColumnWidth(svgWidth, svgSpacing, numCols) * i 
    + svgSpacing * i;
}

function findY(
  svgPaddingVertical: number,
  svgHeight: number, 
  j: number,
  rows: any[],
): number {
  return svgPaddingVertical 
    + findColumnHeight(svgHeight, svgPaddingVertical) * findCumulativeRelativeFrequency(rows, j);
  // return svgPaddingVertical
  //   + findRowHeight(svgHeight, svgSpacingVertical, Object.keys(rows).length) * j
  //   + svgSpacingVertical * j;
}




const consolidatedTransitions: {[key: string]: any} = {};


interface Props {
  data: ResponseTransition[],
}

export default function ResponseChain(props: Props) {
  const ref = useRef<SVGSVGElement| null>(null);
  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(0);
  const [paddingX, setPaddingX] = useState<number>(0);
  const [svgSpacing, setSvgSpacing] = useState<number>(0);
  const [svgPaddingVertical, setSvgPaddingVertical] = useState<number>(0);
  const [svgSpacingVertical, setSvgSpacingVertical] = useState<number>(0);
  const [coordinateStorage, setCoordinateStorage] = useState<Map<string, Coordinate>>(new Map<string, Coordinate>());

  useEffect(() => {
    props.data.forEach((responseTransition: ResponseTransition) => {
      if (!consolidatedTransitions.hasOwnProperty(responseTransition.sourceQuestion)) {
        consolidatedTransitions[responseTransition.sourceQuestion] = {};
      }

      if (!consolidatedTransitions.hasOwnProperty(responseTransition.targetQuestion)) {
        consolidatedTransitions[responseTransition.targetQuestion] = {};
      }

      if (consolidatedTransitions[responseTransition.sourceQuestion].hasOwnProperty(responseTransition.sourceOption)) {
        consolidatedTransitions[responseTransition.sourceQuestion][responseTransition.sourceOption] += responseTransition.count;
      } else {
        consolidatedTransitions[responseTransition.sourceQuestion][responseTransition.sourceOption] = responseTransition.count;
      }

      if (consolidatedTransitions[responseTransition.targetQuestion].hasOwnProperty(responseTransition.targetOption)) {
        consolidatedTransitions[responseTransition.targetQuestion][responseTransition.targetOption] += responseTransition.count;
      } else {
        consolidatedTransitions[responseTransition.targetQuestion][responseTransition.targetOption] = responseTransition.count;
      }
    });
    
    console.log(consolidatedTransitions);

    if (ref.current) {
      console.log(ref.current.getBoundingClientRect());
      let boundingClientRect = ref.current.getBoundingClientRect();
      
      setSvgWidth(boundingClientRect.width);
      setSvgHeight(boundingClientRect.height);
      setPaddingX(boundingClientRect.width * 0.05);
      setSvgSpacing(boundingClientRect.width * 0.05);
      setSvgPaddingVertical(boundingClientRect.height * 0.05);
      setSvgSpacingVertical(0);

      Object.entries(consolidatedTransitions).map((data: any, i: number) => {
        return Object.keys(data[1]).map((option, j) => {
          let svgWidth = boundingClientRect.width;
          let svgHeight = boundingClientRect.height;
          let paddingX = boundingClientRect.width * 0.05;
          let svgPaddingVertical = boundingClientRect.height * 0.05;
          let svgSpacing = boundingClientRect.width * 0.05;
          let svgSpacingVertical = 0;

          setCoordinateStorage(r => {
            r.set(option, {
              x: findX(paddingX, svgWidth, svgSpacing, Object.entries(consolidatedTransitions).length, i),
              y: findY(svgPaddingVertical, svgHeight, j, data[1]),
              width: findColumnWidth(svgWidth, svgSpacing, Object.entries(consolidatedTransitions).length) * 0.8,
              height: svgHeight * 0.9  * 0.1,
            });
            return r;
          })
        });
      });
    }
  }, []);

  // consolidatedTransitions.sort((wordInfo1: ResponseTransition, wordInfo2: ResponseTransition) => wordInfo2.count - wordInfo1.count)
  return (
    <svg
      className="response-chain"
      ref={element => { ref.current = element; }}>
      {/* Columns */}
      {Object.entries(consolidatedTransitions).map((data: any, i: number) => {
        return(
          // <ResponseChainColumn />
          <g className="response-chain__column">
            <rect
              className="response-chain__column"
              x={paddingX + findColumnWidth(svgWidth, svgSpacing, Object.entries(consolidatedTransitions).length) * i + svgSpacing * i}
              y={svgHeight * 0.05}
              width={findColumnWidth(svgWidth, svgSpacing, Object.entries(consolidatedTransitions).length)}
              height={findColumnHeight(svgHeight, svgPaddingVertical)}
            />
          </g>
        );
      })}

      {/* Transitions */}
      <ResponseTransitions
        responseTransitions={props.data}
        coordinateMap={coordinateStorage}
        paddingX={paddingX}
      />

      {/* Options */}
      {Object.entries(consolidatedTransitions).map((data: any, i: number) => {
        // console.log(Object.entries(data[1]));
        // console.log(Object.entries(data[1]).sort((wordInfo1: any, wordInfo2: any) => wordInfo2[1] - wordInfo1[1]));

        return(
          <g>
            {Object.keys(data[1]).map((option, j) => {
              return(<ResponseOption 
                index={j}
                x={coordinateStorage.get(option)!.x}
                y={coordinateStorage.get(option)!.y}
                paddingX={findColumnWidth(svgWidth, svgSpacing, Object.entries(consolidatedTransitions).length) * 0.1}
                paddingY={svgHeight * 0.9 * 0.05}
                containerWidth={findColumnWidth(svgWidth, svgSpacing, Object.entries(consolidatedTransitions).length)}
                containerHeight={findColumnHeight(svgHeight, svgPaddingVertical)}
                relativeFrequency={findRelativeFrequency(data[1], j)}
                optionText={option}
              />);
            })}
          </g>
        );
      })}


    </svg>
  )
}