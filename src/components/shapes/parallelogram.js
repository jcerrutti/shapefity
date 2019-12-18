import React, { Component } from 'react';

import { Line } from 'react-konva';

export default class Parallelogram extends Component {

  render() {
    const { points } = this.props;
    return (
      <Line
        points={points}
        stroke={'blue'}
        fill={null}
        shadowBlur={10}
        closed={true}
      />
    );
  }
}
