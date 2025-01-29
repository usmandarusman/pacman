import type { Contribution, Ghost, Pacman } from './types';

export const Store: {
	contributions: Contribution[];
	pacman: Pacman;
	ghosts: Ghost[];
	grid: number[][];
	monthLabels: string[];
	pacmanMouthOpen: boolean;
	gameInterval: number;
	scaredGhostsDestinations: { x: number; y: number }[];
	gameHistory: {
		pacman: Pacman;
		ghosts: Ghost[];
		grid: number[][];
	}[];
	canvas: HTMLCanvasElement;
	outputFormat: 'canvas' | 'svg';
	svgCallback: (blonUrl: string) => void;
	gameOverCallback: () => void;
} = {
	contributions: [],
	pacman: { x: 0, y: 0, direction: 'right', points: 0, powerUp: false },
	ghosts: [],
	grid: [],
	monthLabels: [],
	pacmanMouthOpen: true,
	gameInterval: 0,
	scaredGhostsDestinations: [],
	gameHistory: [],
	canvas: undefined as unknown as HTMLCanvasElement,
	outputFormat: 'canvas',
	svgCallback: (_: string) => {},
	gameOverCallback: () => {}
};
