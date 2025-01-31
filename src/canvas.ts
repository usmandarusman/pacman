import { CELL_SIZE, GAP_SIZE, GRID_HEIGHT, GRID_WIDTH, PACMAN_COLOR, PACMAN_COLOR_DEAD, PACMAN_COLOR_POWERUP } from './constants';
import { Store } from './store';
import { Utils } from './utils';

const drawGrid = () => {
	Store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme().gridBackground;
	Store.config.canvas.getContext('2d')!.fillRect(0, 0, Store.config.canvas.width, Store.config.canvas.height);

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			const intensity = Store.grid[x][y];
			if (intensity > 0) {
				const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
				const color = Utils.hexToRGBA(Utils.getCurrentTheme().contributionBoxColor, adjustedIntensity);
				Store.config.canvas.getContext('2d')!.fillStyle = color;
			} else {
				Store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme().emptyContributionBoxColor;
			}
			Store.config.canvas.getContext('2d')!.beginPath();
			Store.config.canvas
				.getContext('2d')!
				.roundRect(y * (CELL_SIZE + GAP_SIZE), x * (CELL_SIZE + GAP_SIZE) + 15, CELL_SIZE, CELL_SIZE, 5);
			Store.config.canvas.getContext('2d')!.fill();
		}
	}

	Store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme().textColor;
	Store.config.canvas.getContext('2d')!.font = '10px Arial';
	Store.config.canvas.getContext('2d')!.textAlign = 'center';

	let lastMonth = '';
	for (let y = 0; y < GRID_WIDTH; y++) {
		if (Store.monthLabels[y] !== lastMonth) {
			const xPos = y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
			Store.config.canvas.getContext('2d')!.fillText(Store.monthLabels[y], xPos, 10);
			lastMonth = Store.monthLabels[y];
		}
	}
};

const drawPacman = () => {
	const x = Store.pacman.y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
	const y = Store.pacman.x * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2 + 15;
	const radius = CELL_SIZE / 2;

	// Change Pac-Man's color to red if he's on power-up, dead, else yellow
	if (Store.pacman.deadReaminingDuration) {
		Store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR_DEAD;
	} else if (Store.pacman.powerupReaminingDuration) {
		Store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR_POWERUP;
	} else {
		Store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR;
	}

	const mouthAngle = Store.pacmanMouthOpen ? 0.35 * Math.PI : 0.1 * Math.PI;

	let startAngle, endAngle;
	switch (Store.pacman.direction) {
		case 'up':
			startAngle = 1.5 * Math.PI + mouthAngle;
			endAngle = 1.5 * Math.PI - mouthAngle;
			break;
		case 'down':
			startAngle = 0.5 * Math.PI + mouthAngle;
			endAngle = 0.5 * Math.PI - mouthAngle;
			break;
		case 'left':
			startAngle = Math.PI + mouthAngle;
			endAngle = Math.PI - mouthAngle;
			break;
		case 'right':
		default:
			startAngle = 0 + mouthAngle;
			endAngle = 2 * Math.PI - mouthAngle;
			break;
	}

	Store.config.canvas.getContext('2d')!.beginPath();
	Store.config.canvas.getContext('2d')!.arc(x, y, radius, startAngle, endAngle);
	Store.config.canvas.getContext('2d')!.lineTo(x, y);
	Store.config.canvas.getContext('2d')!.fill();
};

const drawGhosts = () => {
	Store.ghosts.forEach((ghost) => {
		const x = ghost.y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
		const y = ghost.x * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2 + 15;
		const radius = CELL_SIZE / 2;

		Store.config.canvas.getContext('2d')!.fillStyle = ghost.scared ? 'blue' : ghost.color;
		Store.config.canvas.getContext('2d')!.beginPath();
		Store.config.canvas.getContext('2d')!.arc(x, y, radius, 0, Math.PI);
		Store.config.canvas.getContext('2d')!.rect(x - radius, y, radius * 2, radius);
		Store.config.canvas.getContext('2d')!.fill();

		Store.config.canvas.getContext('2d')!.fillStyle = 'white';
		Store.config.canvas.getContext('2d')!.beginPath();
		Store.config.canvas.getContext('2d')!.arc(x - radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
		Store.config.canvas.getContext('2d')!.arc(x + radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
		Store.config.canvas.getContext('2d')!.fill();

		Store.config.canvas.getContext('2d')!.fillStyle = 'black';
		Store.config.canvas.getContext('2d')!.beginPath();
		Store.config.canvas.getContext('2d')!.arc(x - radius / 3, y - radius / 3, radius / 8, 0, Math.PI * 2);
		Store.config.canvas.getContext('2d')!.arc(x + radius / 3, y - radius / 3, radius / 8, 0, Math.PI * 2);
		Store.config.canvas.getContext('2d')!.fill();
	});
};

const renderGameOver = () => {
	Store.config.canvas.getContext('2d')!.fillStyle = 'black';
	Store.config.canvas.getContext('2d')!.font = '20px Arial';
	Store.config.canvas.getContext('2d')!.textAlign = 'center';
	Store.config.canvas.getContext('2d')!.fillText('Game Over', Store.config.canvas.width / 2, Store.config.canvas.height / 2);
};

export const Canvas = {
	drawGrid,
	drawPacman,
	drawGhosts,
	renderGameOver
};
