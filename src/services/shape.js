export function buildParallelogram(stroke, strokeWidth, radius, fillColor = null) {
  return {
    radius,
    stroke,
    strokeWidth,
    fill: fillColor,
  };
}

export function buildCircle(color, stroke, filled = false) {}
