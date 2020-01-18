console.clear();

const NUMBER_OF_SEGMENTS = 8;
const SEGMENTS_MIN_RADIUS = 100;
const SEGMENTS_MAX_RADIUS = 250;
const ORIGIN_POINT = {
  x: 230,
  y: 230
};
const SHAPE_MOVEMENT_ALLOWED_RADIUS = {
  min: 0.02,
  max: 0.05
};
const LINE_WIDTH = 7;
const LINE_COLOR = 'rgba(218, 186, 114, 1)';

class CircleSegment {
  constructor(radius, numberOfSegments) {
    const points = [];
    const segmentsStep = (Math.PI * 2.35) / numberOfSegments;
    for (let i = 0; i < numberOfSegments; i++) {
      const x = ORIGIN_POINT.x + Math.sin(i * segmentsStep) * radius;
      const y = ORIGIN_POINT.y + Math.cos(i * segmentsStep) * radius;
      const timeOffset = (Math.random() * 2 - 1) * 2;
      const moveRadius =
        Math.random() * SHAPE_MOVEMENT_ALLOWED_RADIUS.max +
        SHAPE_MOVEMENT_ALLOWED_RADIUS.min;
      points.push({
        x,
        y,
        timeOffset,
        moveRadius
      });
    }
    this._points = points;
  }
  update(dt, time) {
    this._points.forEach((point, i) => {
      point.x += Math.sin(time + point.timeOffset) * point.moveRadius;
      point.y += Math.cos(time + point.timeOffset) * point.moveRadius;
    });
  }
  render(ctx) {
    ctx.save();
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = LINE_COLOR;
    ctx.beginPath();
    ctx.moveTo(this._points[0].x, this._points[0].y);
    this._points.forEach((point, i) => {
      const nextPoint = this._points[i + 1] || this._points[0];
      const ctrlPoint = {
        x: (point.x + nextPoint.x) / 2,
        y: (point.y + nextPoint.y) / 2
      };
      ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
    });
    ctx.stroke();
    ctx.restore();
  }
}

class CircleAnimation {
  constructor() {
    this._shapes = [];
  }
  add(shape) {
    this._shapes.push(shape);
  }
  update(dt, time) {
    this._shapes.forEach(shape => shape.update(dt, time));
    return this;
  }
  render(ctx) {
    this._shapes.forEach(shape => shape.render(ctx));
    return this;
  }
}

let oldTime = 0;

const domElement = document.querySelector('#my-container');

const canvas = document.createElement('canvas');
domElement.appendChild(canvas);

const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 2;
const {
  width: domElWidth,
  height: domElHeight
} = domElement.getBoundingClientRect();

console.log(dpr);

if (dpr <= 1) {
  canvas.width = domElWidth * dpr;
  canvas.height = domElHeight * dpr;
  canvas.style.width = `${domElWidth}px`;
  canvas.style.height = `${domElHeight}px`;
} else if (dpr <= 2) {
  canvas.width = (domElWidth / 2) * dpr;
  canvas.height = (domElHeight / 2) * dpr;
  canvas.style.width = `${domElWidth}px`;
  canvas.style.height = `${domElHeight}px`;
} else {
  canvas.width = (domElWidth / 3) * dpr;
  canvas.height = (domElHeight / 3) * dpr;
  canvas.style.width = `${domElWidth}px`;
  canvas.style.height = `${domElHeight}px`;
}

const circleAnimationEffect = new CircleAnimation();

for (let i = 0; i < NUMBER_OF_SEGMENTS; i++) {
  const radiusDelta = SEGMENTS_MAX_RADIUS - SEGMENTS_MIN_RADIUS;
  const currentRadius =
    SEGMENTS_MIN_RADIUS + (i / NUMBER_OF_SEGMENTS) * radiusDelta;
  const segment = new CircleSegment(currentRadius, NUMBER_OF_SEGMENTS);
  circleAnimationEffect.add(segment);
}

const onRenderFrame = () => {
  window.requestAnimationFrame(onRenderFrame);
  const now = window.performance.now() / 1000;
  const dt = now - oldTime;
  oldTime = now;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circleAnimationEffect.update(dt, now).render(ctx);
};
window.requestAnimationFrame(onRenderFrame);
