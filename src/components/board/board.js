import React, { Component } from 'react';

import { Stage, Layer, Group, Circle } from 'react-konva';
import Parallelogram from '../shapes/parallelogram';
import {
  getParallelogramFourthVertex,
  getParallelogramCenter,
  getCircleRadius,
} from '../../utils/calcs';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      shapeDrawed: false,
    };
  }

  componentDidMount() {
    console.log(this.parallelogramRef);
  }

  onClickHandler = ({ evt }) => {
    if (this.state.shapeDrawed) return;

    const { clientX, clientY } = evt;

    this.setState(prevState => {
      return this.updatePoints(prevState.points, clientX, clientY);
    });
  };

  updatePoints(prevPoints, pointX, pointY) {
    let newPoints = [...prevPoints, pointX, pointY];
    let circleCenter = [];
    let circleRadius = 0;
    if (newPoints.length > 5) {
      const fourthCoord = getParallelogramFourthVertex(
        [newPoints[0], newPoints[1]],
        [newPoints[2], newPoints[3]],
        [newPoints[4], newPoints[5]]
      );
      newPoints = [...newPoints, ...fourthCoord];
      circleCenter = getParallelogramCenter(
        [newPoints[0], newPoints[1]],
        [newPoints[4], newPoints[5]]
      );
      circleRadius = getCircleRadius([newPoints[0], newPoints[1]], [newPoints[2], newPoints[3]]);
    }
    return {
      points: newPoints,
      shapeDrawed: newPoints.length === 8,
      circlePoints: circleCenter,
      circleRadius,
    };
  }
  render() {
    const { points, shapeDrawed, circlePoints, circleRadius } = this.state;
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.onClickHandler}>
          <Layer>
            <Group>
              <Parallelogram
                points={points}
              ></Parallelogram>
              {shapeDrawed && (
                <Circle
                  x={circlePoints[0]}
                  y={circlePoints[1]}
                  radius={circleRadius}
                  fill={'green'}
                ></Circle>
              )}
            </Group>
          </Layer>
        </Stage>
      </div>
    );
  }
}
