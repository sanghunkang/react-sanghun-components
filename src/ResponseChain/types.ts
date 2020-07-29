export type response = {
  option: number,
}

export type ResponseTransition = {
  sourceQuestion: string,
  sourceOption: string,
  targetQuestion: string,
  targetOption: string,
  count: number
}

export type Coordinate = {
  x: number,
  y: number,
  width: number,
  height: number,
}