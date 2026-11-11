import { OceanEngine } from './src/engine';

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
};

const canvas = document.querySelector<HTMLCanvasElement>('#ocean');
let started = false;

function start() {
  if (started || !canvas) return;
  started = true;
  // The ocean is decorative. Start it on the first sign of interaction, or
  // after the page has settled, so it never competes with first paint.
  new OceanEngine(canvas, [
    { kind: 'hammerhead', size: 1.25 },
    { kind: 'thresher', size: 1 },
    { kind: 'mako', size: 0.85 },
    { kind: 'koi', size: 0.95 },
  ]);
  document.documentElement.classList.add('ocean-ready');
}

function startWhenIdle() {
  const idle = window as IdleWindow;
  if (typeof idle.requestIdleCallback === 'function') {
    idle.requestIdleCallback(start, { timeout: 1200 });
  } else {
    window.setTimeout(start, 300);
  }
}

function startOnIntent() {
  startWhenIdle();
}

for (const type of ['pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart'] as const) {
  window.addEventListener(type, startOnIntent, { once: true, passive: true });
}

function armFallback() {
  window.setTimeout(startWhenIdle, 3000);
}

if (document.readyState === 'complete') {
  armFallback();
} else {
  window.addEventListener('load', armFallback, { once: true });
}
