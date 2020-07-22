export interface WordPointProps {
  y: number,
  x: number,
  appendingTo?: string,
  weight: number,
  text: string,
  updateRenderingAnchor: Function,
  
  
  // rref: any,
}

export type WordInfo = {
  text: string,
  count: number,
}