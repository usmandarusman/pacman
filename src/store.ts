import type { Config, StoreType } from './types';

export const Store: StoreType = {
	frameCount: 0,
	contributions: [],
	pacman: {
		x: 0,
		y: 0,
		direction: 'right',
		points: 0,
		deadReaminingDuration: 0,
		powerupReaminingDuration: 0
	},
	ghosts: [],
	grid: [],
	monthLabels: [],
	pacmanMouthOpen: true,
	gameInterval: 0,
	scaredGhostsDestinations: [],
	gameHistory: [],
	config: undefined as unknown as Config
};
