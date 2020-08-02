import React from 'react';
import { Coordinate, ResponseTransition } from './types';

interface ResponseTransitionsProps {
  responseTransitions: ResponseTransition[],
  coordinateMap: Map<string, Coordinate>,
  paddingX: number,
  // x: number,
  // y: number,
  // containerWidth: number,
  // optionText: string,
}

function findPath(
  sourceCoordinate: Coordinate,
  targetCoordinate: Coordinate,
  paddingX: number): string {
  let deltaX = (targetCoordinate.x + paddingX) - (sourceCoordinate.x + sourceCoordinate.width + paddingX);
  let deltaY = targetCoordinate.y - sourceCoordinate.y;

  return "M " 
    + (sourceCoordinate.x + sourceCoordinate.width + paddingX).toString() + " " + (sourceCoordinate.y + sourceCoordinate.height/2).toString() 
    + " q " + (deltaX * 0.5).toString() + "," + (0).toString()
    + " "  + (deltaX/2).toString() + " " + (deltaY/2).toString() 
    + " q " + (0).toString() + "," + (deltaY * 0.5).toString()
    + " "  + (deltaX/2).toString() + " " + (deltaY/2).toString();
}


export default function ResponseTransitions(props: ResponseTransitionsProps) {
  console.log(props.paddingX);

  return(
    <g>
      {props.responseTransitions.map((transition: ResponseTransition) => {
        
        let sourceCoordinate = props.coordinateMap.get(transition.sourceOption);
        let targetCoordinate = props.coordinateMap.get(transition.targetOption);

        if (sourceCoordinate && targetCoordinate) {
          return (
            <path 
              d={findPath(sourceCoordinate, targetCoordinate, sourceCoordinate.width * 0.125)}
              stroke="blue"
              strokeWidth={transition.count ** 1.2 /50}
              fill="none"
            />
          );
        } else {
          return null;
        }
      })}
    </g>
  )
}
