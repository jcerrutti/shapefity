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
      circles: [],
      points: [],
      shapeDrawed: false,
    };
  }

  onClickHandler = ({ evt }) => {
    if (this.state.shapeDrawed) return;

    const { clientX, clientY } = evt;

    this.setState(prevState => {
      return this.addPoints(prevState.points, prevState.circles, clientX, clientY);
    });
  };

  addPoints(prevPoints, circles, pointX, pointY) {
    let newPoints = [...prevPoints, pointX, pointY];
    const newCircles = [...circles, { x: pointX, y: pointY }];
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
      circles: newCircles,
      points: newPoints,
      shapeDrawed: newPoints.length === 8,
      circlePoints: circleCenter,
      circleRadius,
    };
  }

  circleMoved = ({ evt }, index) => {
    const { clientX, clientY } = evt;

    this.updatePoints({ x: clientX, y: clientY }, index);
  };

  updatePoints = ({ x, y }, index) => {
    this.setState(prevState => {
      const newPoints = [...prevState.points];

      // Select the starting index, knowing that the points are based on couples (2)
      const startIndex = index * 2;
      newPoints[startIndex] = x;
      newPoints[startIndex + 1] = y;

      const fourthCoord = getParallelogramFourthVertex(
        [newPoints[0], newPoints[1]],
        [newPoints[2], newPoints[3]],
        [newPoints[4], newPoints[5]]
      );

      debugger
      newPoints[newPoints.length - 2] = [fourthCoord[0]];
      newPoints[newPoints.length - 1] = [fourthCoord[1]];

      return {
        points: newPoints,
      };
    });
  };

  render() {
    const { points, circles, shapeDrawed, circlePoints, circleRadius } = this.state;
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.onClickHandler}>
          <Layer>
            <Group>
              <Parallelogram points={points}></Parallelogram>
              {circles.map(({ x, y }, index) => (
                <Circle
                  x={x}
                  y={y}
                  radius={6}
                  fill={'red'}
                  draggable
                  onDragMove={e => this.circleMoved(e, index)}
                ></Circle>
              ))}
              {false && (
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
