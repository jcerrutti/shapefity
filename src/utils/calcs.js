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

export function getCircleRadius([x1, y1], [x2, y2]) {
  const angleDeg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const deltaX = Math.abs(x2 - x1);
  const deltaY = Math.abs(y2 - y1);
  return Math.abs(deltaX * deltaY * Math.sin(angleDeg));
}
