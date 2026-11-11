import { OceanEngine } from './src/engine';

const canvas = document.querySelector<HTMLCanvasElement>('#ocean')!;
const engine = new OceanEngine(canvas, [{kind: 'hammerhead', size: 1.25}, {kind: 'thresher', size: 1}, {kind: 'mako', size: 0.85}, {kind: 'koi', size: 0.95}]);
