import {
  getParallelogramFourthVertex,
  getParallelogramCenter,
  getCircleRadius,
} from '../utils/calcs';

export function getParallelogramInformation(points) {
  const parallelogramFourthCoordinate = getParallelogramFourthVertex(
    [points[0], points[1]],
    [points[2], points[3]],
    [points[4], points[5]]
  );

  const parallelogramCenter = getParallelogramCenter(
    [points[0], points[1]],
    [points[4], points[5]]
  );

  return {
    parallelogramFourthCoordinate,
    parallelogramCenter,
  };
}

export function getCircleInformation(parallelogramPoints) {
  return getCircleRadius(
    [parallelogramPoints[0], parallelogramPoints[1]],
    [parallelogramPoints[2], parallelogramPoints[3]],
    [parallelogramPoints[4], parallelogramPoints[5]]
  );
}
