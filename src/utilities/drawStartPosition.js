const interpolate = (pointA, pointB) => {
  const dx = (pointB.x - pointA.x) / 4;
  const dy = (pointB.y - pointA.y) / 4;
  return [
    { x: pointA.x + dx, y: pointA.y + dy },
    { x: pointA.x + 2 * dx, y: pointA.y + 2 * dy },
    { x: pointA.x + 3 * dx, y: pointA.y + 3 * dy },
  ];
};

const startPosition = {
  points: [
    { x: 171, y: 120 },
    { x: 209, y: 179 },
    { x: 302, y: 312 },
    { x: 408, y: 428 },
    { x: 525, y: 515 },
    { x: 644, y: 576 },
  ],
};

export let interpolatedPoints = { points: [] };
startPosition.points.forEach((point, index) => {
  interpolatedPoints.points.push(point);
  if (index < startPosition.points.length - 1) {
    interpolatedPoints.points = interpolatedPoints.points.concat(
      interpolate(point, startPosition.points[index + 1])
    );
  }
});
