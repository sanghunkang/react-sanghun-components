import React from 'react';

interface ResponseOptionProps {
  index: number,
  x: number,
  y: number,
  paddingX: number,
  paddingY: number,
  containerWidth: number,
  containerHeight: number,
  relativeFrequency: number,
  optionText: string,
}


// 8 그 중 가장 힘들었던 점은 무엇입니까?       
const responseMap: {[key: string]: string} = {
// const responseMap8: {[key: string]: string} = {
  '8번_#1': '실업이나 소득감소',
  '8번_#2': '사람들과의 교류',
  '8번_#3': '대중교통 이용',
  '8번_#4': '장보기나 외식',
  '8번_#5': '여가활동이나 여행',
  '8번_#6': '주거환경',
  '8번_#7': '없음',
// }

// 10  그 중 가장 어려움을 겪고 있는 계층은 누구라고 생각하십니까?    
// const responseMap10: {[key: string]: string} = {
  '10번_#1': '장애인 ',
  '10번_#2': '저소득 취약계층(노숙인 포함)  ',
  '10번_#3': '돌봄이 필요한 유아/어린이  ',
  '10번_#4': '장기간 등교하지 못하는 학생 ',
  '10번_#5': '취업기회가 줄어든 청년과 취업준비생 ',
  '10번_#6': '아이를 돌봐야하는 맞벌이 부모  ',
  '10번_#7': '소득감소와 실업의 위기를 느끼는 노동자 ',
  '10번_#8': '매출 부진을 겪는 소상공인/자영업자 ',
  '10번_#9': '요양원, 교도소 등 집단격리 시설의 장기 격리자들 ',
  '10번_#99': ' 기타  ',
// }

// 12  그 중 가장 훌륭한 정책은 무엇이라고 생각하십니까?      
// const responseMap12: {[key: string]: string} = {
  '12번_#1': '무증상 감염자 무료 선제검사 등 적극적인 방역정책',
  '12번_#2': '자영업자 생존자금 지원 등 소상공인 지원정책',
  '12번_#3': '사회적 거리두기의 선도적 실시',
  '12번_#4': '재난긴급생활비 및 특수고용직 특별지원 금 등 지원 정책',
  '12번_#5': 'CAC 글로벌 서밋 등 세계도시와 공유하는 국제협력 정책',
  '12번_#99': ' 기타',
// }

// 13  코로나19에 대응하는 과정에서 가장 도움이 되었던 사람은 누구입니까?
// const responseMap13: {[key: string]: string} = {
  '13번_#1': '공무원(보건의료, 복지, 교사, 기타)',
  '13번_#2': '가족',
  '13번_#3': '이웃',
  '13번_#4': '친구나 동료',
  '13번_#5': '온라인 친구(페이스북, 인스타, 카카오톡 등의 친구)',
  '13번_#99': ' 기타',
}

export default function ResponseOption(props: ResponseOptionProps) {
  console.log(props.optionText, props.y, props.relativeFrequency, props.containerHeight);

  return (
    <g>
      <rect
        className="response-chain__option-rect"
        x={props.x + props.paddingX}
        y={props.y}
        width={props.containerWidth * 0.8}
        height={props.containerHeight * props.relativeFrequency}
        opacity={1 - (0.1 * props.index)}
      />
      <text
        className="response-chain__option-text"
        x={props.x + props.paddingX}
        y={props.y}
        fontSize={12}
      >
        {props.optionText + ': '+ responseMap[props.optionText]}
      </text>
    </g>
  )
}