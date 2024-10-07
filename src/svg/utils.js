export const NAME_SPACE = "http://www.w3.org/2000/svg";
export const TWO_PI = Math.PI * 2;
export const HALF_PI = Math.PI * 0.5;
export const QUARTER_PI = Math.PI * 0.25;
export const US_LETTER_RATIO = 8.5 / 11;

export function createSVG(children, props = {}) {
  const svg = document.createElementNS(NAME_SPACE, "svg");

  if (!props.viewBox) {
    svg.setAttribute("viewBox", "0 0 128 128");
  }

  if (!props.width) {
    svg.setAttribute("width", "800");
  }

  if (!props.height) {
    svg.setAttribute("height", "800");
  }

  Object.entries(props).forEach(([key, value]) => {
    svg.setAttribute(key, value);
  });

  if (Array.isArray(children)) {
    children.forEach((child) => {
      svg.appendChild(child);
    });
  } else {
    svg.appendChild(children);
  }

  return svg;
}

export function createGroup(children, props = {}) {
  const group = document.createElementNS(NAME_SPACE, "g");
  applyProps(group, props);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      group.appendChild(child);
    });
  } else {
    group.appendChild(children);
  }

  return group;
}

export function createPath(data, props = {}) {
  const path = document.createElementNS(NAME_SPACE, "path");
  path.setAttribute("d", data);

  applyProps(path, props);

  return path;
}

export function createCircle(cx, cy, r, props = {}) {
  const circle = document.createElementNS(NAME_SPACE, "circle");
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);

  applyProps(circle, props);

  return circle;
}

export function createRect(x, y, width, height, props = {}) {
  const rect = document.createElementNS(NAME_SPACE, "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);

  applyProps(rect, props);

  return rect;
}

function applyProps(element, props) {
  Object.entries(props).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function remap(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function distanceTo(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

export function roundTo(value, precision = 4) {
  const p = 10 ** precision;
  return Math.round(value * p) / p;
}

export function doLinesIntersect(a, b, c, d, p, q, r, s) {
  const det = (c - a) * (s - q) - (r - p) * (d - b);

  if (det === 0) {
    return false;
  } else {
    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

export function getLineIntersection(a, b, c, d, p, q, r, s) {
  const z1 = a - c;
  const z2 = p - r;
  const z3 = b - d;
  const z4 = q - s;
  const dist = z1 * z4 - z3 * z2;

  if (dist == 0) return null;

  const tempA = a * d - b * c;
  const tempB = p * s - q * r;
  const xCoor = (tempA * z2 - z1 * tempB) / dist;
  const yCoor = (tempA * z4 - z3 * tempB) / dist;

  if (
    xCoor < Math.min(a, c) ||
    xCoor > Math.max(a, c) ||
    xCoor < Math.min(p, r) ||
    xCoor > Math.max(p, r)
  ) {
    return null;
  }
  if (
    yCoor < Math.min(b, d) ||
    yCoor > Math.max(b, d) ||
    yCoor < Math.min(q, s) ||
    yCoor > Math.max(q, s)
  ) {
    return null;
  }

  return [xCoor, yCoor];
}
