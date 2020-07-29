import React, { useEffect, useState, useRef } from 'react';
import { WordPointProps } from './types';

type BBox = {

}


function findAppendingTo(prevAppendingTo: string| undefined): string {
  if (prevAppendingTo === 'up') {
    return 'right';
  } else if (prevAppendingTo === 'right') {
    return 'down';
  } else if (prevAppendingTo === 'down') {
    return 'left';
  } else if (prevAppendingTo === 'left') {
    return 'up';
  } else {
    return '';
  }
}




export default function WordPoint(props: WordPointProps) {
  const ref = useRef<SVGTextElement| null>(null);
  const [className, setClassName] = useState<string>('word-point__text');
  const [bBox, setBBox] = useState<any>({
    x: props.x, 
    y: props.y,
  });


  useEffect(() => {
    if (ref.current) {
      // ref.current.style.visibility = "hidden";
      // setBBox({
      //   x: bBox.x - ref.current.getBBox().width / 2,
      //   y: bBox.y,
      // });
      // ref.current.style.visibility = "";
      
      console.log(ref.current.getBBox());
      

      // let appendingTo: string = findAppendingTo(props.appendingTo);
      // if (appendingTo === 'up') {
        props.updateRenderingAnchor({
          x: props.x,
          y: props.y - ref.current.getBBox().height,
        });
      //   appendingTo: appendingTo,
      // } else if (appendingTo === 'right') {
      //   props.updateRenderingAnchor({
      //     x: props.x + ref.current.getBBox().width,
      //     y: props.y,
      //     appendingTo: appendingTo,
      //   });
      // } else if (appendingTo === 'down') {
      //   props.updateRenderingAnchor({
      //     x: props.x,
      //     y: props.y + ref.current.getBBox().height,
      //     appendingTo: appendingTo,
      //   });
      // } else if (appendingTo === 'left') {
      //   props.updateRenderingAnchor({
      //     x: props.x + ref.current.getBBox().width,
      //     y: props.y + ref.current.getBBox().height,
      //     appendingTo: appendingTo,
      //   });
      // } else {
      //   props.updateRenderingAnchor({
      //     x: props.x + ref.current.getBBox().width,
      //     y: props.y + ref.current.getBBox().height,
      //     appendingTo: appendingTo,
      //   });
      // }

    }
  }, []);

  const handleMouseOver = (e: React.MouseEvent) => {
    setClassName('word-point__text mouse-over');
    if (ref.current) {
      ref.current.animate([
        // keyframes
        { transform: 'translateY(2px)' }, 
        { transform: 'translateY(-2px)' }
      ], { 
        // timing options
        duration: 100,
        // iterations: Infinity
      });
    }
  } 

  const handleMouseOut = (e: React.MouseEvent) => {
    setClassName('word-point__text');
  } 

  return (
    <g>
      <text 
        className={className}
        ref={element => { ref.current = element; }}
        x={bBox.x}
        y={bBox.y}
        fontSize={props.weight * 5}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}  
      >
        {props.text}
      </text>
    </g>
  )
}
