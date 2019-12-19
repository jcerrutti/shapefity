import React, { Component } from 'react';

import { Stage, Layer, Group, Circle } from 'react-konva';

import './board.css';
import Parallelogram from '../customShapes/Parallelogram';
import { getParallelogramInformation, getCircleInformation } from '../../services/shape';
import TextInformation from '../customShapes/TextInformation';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  onResetClickHandler = () => {
    this.setState(this.getDefaultState());
  };

  getDefaultState = () => {
    return {
      circles: [],
      points: [],
      parallelogramDrawed: false,
      circleRadius: null,
      circleCoordinates: [],
      textInformation: [],
    };
  };

  onStateClickHandler = ({ evt }) => {
    if (this.state.parallelogramDrawed) return;

    const { layerX, layerY } = evt;

    this.setState(prevState => {
      return this.addPoints(prevState.points, prevState.circles, layerX, layerY);
    });
  };

  addPoints(prevPoints, circles, pointX, pointY) {
    let newPoints = [...prevPoints, pointX, pointY];
    let circleRadius = 0;
    let circleCoordinates = [];
    let textInformation = [];
    if (newPoints.length > 5) {
      const {
        parallelogramFourthCoordinate: fourthCoordinate,
        parallelogramCenter,
      } = getParallelogramInformation(newPoints);
      circleCoordinates = parallelogramCenter;
      newPoints = [...newPoints, ...fourthCoordinate];

      circleRadius = getCircleInformation(newPoints);

      textInformation = [
        {
          key: 'Shapes Radius',
          value: circleRadius,
        },
      ];
    }
    return {
      circles: [...circles, { x: pointX, y: pointY }],
      points: newPoints,
      parallelogramDrawed: newPoints.length === 8,
      circleCoordinates,
      circleRadius,
      textInformation,
    };
  }

  onDragPointHandler = ({ evt }, index) => {
    const { layerX, layerY } = evt;

    this.updatePoints({ x: layerX, y: layerY }, index);
  };

  updatePoints = ({ x, y }, index) => {
    this.setState(prevState => {
      const newPoints = [...prevState.points];

      // Select the starting index, knowing that the points are based on couples (2)
      const startIndex = index * 2;
      newPoints[startIndex] = x;
      newPoints[startIndex + 1] = y;

      const {
        parallelogramFourthCoordinate: fourthCoordinate,
        parallelogramCenter,
      } = getParallelogramInformation(newPoints);

      newPoints[newPoints.length - 2] = fourthCoordinate[0];
      newPoints[newPoints.length - 1] = fourthCoordinate[1];

      const circleRadius = getCircleInformation(newPoints);

      const textInformation = [
        {
          key: 'Shapes Radius',
          value: circleRadius,
        },
      ];

      return {
        points: newPoints,
        circleCoordinates: parallelogramCenter,
        circleRadius,
        textInformation,
      };
    });
  };

  render() {
    const {
      points,
      circles,
      parallelogramDrawed,
      circleCoordinates,
      circleRadius,
      textInformation,
    } = this.state;
    return (
      <div>
        <button onClick={this.onResetClickHandler} className="button button-reset">
          Reset Board
        </button>
        <Stage className="stage" width={700} height={600} onClick={this.onStateClickHandler}>
          <Layer>
            <Group>
              {parallelogramDrawed && (
                <Circle
                  x={circleCoordinates[0]}
                  y={circleCoordinates[1]}
                  radius={circleRadius}
                  stroke={'yellow'}
                ></Circle>
              )}
              <TextInformation textInformation={textInformation}></TextInformation>
              <Parallelogram points={points}></Parallelogram>
              {circles.map(({ x, y }, index) => (
                <Circle
                  key={index}
                  x={x}
                  y={y}
                  radius={6}
                  fill={'red'}
                  draggable
                  onDragMove={e => this.onDragPointHandler(e, index)}
                ></Circle>
              ))}
            </Group>
          </Layer>
        </Stage>
      </div>
    );
  }
}
