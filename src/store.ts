import type { Config, StoreType } from './types';

export const Store: StoreType = {
	contributions: [],
	pacman: { x: 0, y: 0, direction: 'right', points: 0, powerUp: false },
	ghosts: [],
	grid: [],
	monthLabels: [],
	pacmanMouthOpen: true,
	gameInterval: 0,
	scaredGhostsDestinations: [],
	gameHistory: [],
	config: undefined as unknown as Config
};
