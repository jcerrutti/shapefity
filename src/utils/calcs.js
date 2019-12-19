export function getParallelogramFourthVertex([x1, y1], [x2, y2], [x3, y3]) {
  const x4 = x1 + (x3 - x2);
  const y4 = y1 + (y3 - y2);

  return [x4, y4];
}

export function getParallelogramCenter([x1, y1], [x3, y3]) {
  const x = (x1 + x3) / 2;
  const y = (y1 + y3) / 2;

  return [x, y];
}

export function getCircleRadius([x1, y1], [x2, y2], [x3, y3]) {
  var AB = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var BC = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
  var AC = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));
  const angleDegRad = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));

  const circleArea = Math.abs(AB * BC * Math.sin(angleDegRad));
  const circleRadius = Math.sqrt(circleArea / Math.PI);

  return circleRadius;
}
