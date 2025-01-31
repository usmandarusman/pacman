export interface Pacman {
	x: number;
	y: number;
	direction: string;
	points: number;
	deadReaminingDuration: number;
	powerupReaminingDuration: number;
}

export interface Ghost {
	x: number;
	y: number;
	color: string;
	scared: boolean;
	target?: { x: number; y: number };
}

export interface Contribution {
	date: Date;
	count: number;
}

export interface StoreType {
	frameCount: number;
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
	config: Config;
}

export interface Config {
	platform: 'github' | 'gitlab';
	username: string;
	canvas: HTMLCanvasElement;
	outputFormat: 'canvas' | 'svg';
	svgCallback: (blonUrl: string) => void;
	gameOverCallback: () => void;
}
