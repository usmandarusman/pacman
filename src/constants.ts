import { GameTheme, ThemeKeys } from './types';

export const CELL_SIZE = 20;
export const GAP_SIZE = 2;
export const GRID_WIDTH = 52;
export const GRID_HEIGHT = 7;
export const PACMAN_COLOR = 'yellow';
export const PACMAN_COLOR_POWERUP = 'red';
export const PACMAN_COLOR_DEAD = '#80808064';
export const GHOST_COLORS = ['red', 'pink', 'cyan', 'orange'];
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const DELTA_TIME = 250;
export const PACMAN_DEATH_DURATION = 10;
export const PACMAN_POWERUP_DURATION = 15;
export const GAME_THEMES: { [key in ThemeKeys]: GameTheme } = {
	github: {
		textColor: '#586069',
		gridBackground: '#ffffff',
		contributionBoxColor: '#9be9a8',
		emptyContributionBoxColor: '#ebedf0'
	},
	'github-dark': {
		textColor: '#8b949e',
		gridBackground: '#0d1117',
		contributionBoxColor: '#26a641',
		emptyContributionBoxColor: '#161b22'
	},
	gitlab: {
		textColor: '#626167',
		gridBackground: '#ffffff',
		contributionBoxColor: '#7992f5',
		emptyContributionBoxColor: '#ececef'
	},
	'gitlab-dark': {
		textColor: '#999999',
		gridBackground: '#1f1f1f',
		contributionBoxColor: '#2e7db1',
		emptyContributionBoxColor: '#2d2d2d'
	}
};
