export interface Pacman {
	x: number;
	y: number;
	direction: string;
	points: number;
	powerUp?: boolean;
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
