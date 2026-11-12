import { OceanEngine } from './src/engine';

const canvas = document.querySelector<HTMLCanvasElement>('#ocean');
let started = false;

function start() {
  if (started || !canvas || !window.matchMedia('(min-width: 900px)').matches) return;
  started = true;
  new OceanEngine(canvas, [
    { kind: 'hammerhead', size: 1.25 },
    { kind: 'thresher', size: 1 },
    { kind: 'mako', size: 0.85 },
    { kind: 'koi', size: 0.95 },
  ]);
  document.documentElement.classList.add('ocean-ready');
}

function schedule() {
  // Decorative background: let the cover paint and settle first, then fade in.
  window.setTimeout(start, 2500);
}

if (document.readyState === 'complete') {
  schedule();
} else {
  window.addEventListener('load', schedule, { once: true });
}
