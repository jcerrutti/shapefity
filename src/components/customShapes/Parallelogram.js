import React from 'react';

import { Line } from 'react-konva';

export default function Parallelogram(props) {
  const { points } = props;
  return <Line points={points} stroke={'blue'} fill={null} shadowBlur={10} closed={true} />;
}
