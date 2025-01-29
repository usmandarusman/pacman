import { CELL_SIZE, CONTRIBUTION_COLOR_BASE, EMPTY_COLOR, GAP_SIZE, GRID_HEIGHT, GRID_WIDTH, PACMAN_COLOR } from './constants';
import { Store } from './store';

export const drawGrid = () => {
	Store.canvas.getContext('2d')!.clearRect(0, 0, Store.canvas.width, Store.canvas.height);

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			const intensity = Store.grid[x][y];
			if (intensity > 0) {
				const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
				const color = `rgba(${CONTRIBUTION_COLOR_BASE[0]}, ${CONTRIBUTION_COLOR_BASE[1]}, ${CONTRIBUTION_COLOR_BASE[2]}, ${adjustedIntensity})`;
				Store.canvas.getContext('2d')!.fillStyle = color;
			} else {
				Store.canvas.getContext('2d')!.fillStyle = EMPTY_COLOR;
			}
			Store.canvas.getContext('2d')!.beginPath();
			Store.canvas.getContext('2d')!.roundRect(y * (CELL_SIZE + GAP_SIZE), x * (CELL_SIZE + GAP_SIZE) + 15, CELL_SIZE, CELL_SIZE, 5);
			Store.canvas.getContext('2d')!.fill();
		}
	}

	Store.canvas.getContext('2d')!.fillStyle = 'black';
	Store.canvas.getContext('2d')!.font = '10px Arial';
	Store.canvas.getContext('2d')!.textAlign = 'center';

	let lastMonth = '';
	for (let y = 0; y < GRID_WIDTH; y++) {
		if (Store.monthLabels[y] !== lastMonth) {
			const xPos = y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
			Store.canvas.getContext('2d')!.fillText(Store.monthLabels[y], xPos, 10);
			lastMonth = Store.monthLabels[y];
		}
	}
};

export const drawPacman = () => {
	const x = Store.pacman.y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
	const y = Store.pacman.x * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2 + 15;
	const radius = CELL_SIZE / 2;

	// Change Pac-Man's color to red if he's on power-up, else yellow
	Store.canvas.getContext('2d')!.fillStyle = Store.pacman.powerUp ? 'red' : PACMAN_COLOR;

	const mouthAngle = Store.pacmanMouthOpen ? 0.25 * Math.PI : 0.1 * Math.PI;

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

	Store.canvas.getContext('2d')!.beginPath();
	Store.canvas.getContext('2d')!.arc(x, y, radius, startAngle, endAngle);
	Store.canvas.getContext('2d')!.lineTo(x, y);
	Store.canvas.getContext('2d')!.fill();
};

export const drawGhosts = () => {
	Store.ghosts.forEach((ghost) => {
		const x = ghost.y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
		const y = ghost.x * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2 + 15;
		const radius = CELL_SIZE / 2;

		Store.canvas.getContext('2d')!.fillStyle = ghost.scared ? 'blue' : ghost.color;
		Store.canvas.getContext('2d')!.beginPath();
		Store.canvas.getContext('2d')!.arc(x, y, radius, 0, Math.PI);
		Store.canvas.getContext('2d')!.rect(x - radius, y, radius * 2, radius);
		Store.canvas.getContext('2d')!.fill();

		Store.canvas.getContext('2d')!.fillStyle = 'white';
		Store.canvas.getContext('2d')!.beginPath();
		Store.canvas.getContext('2d')!.arc(x - radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
		Store.canvas.getContext('2d')!.arc(x + radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
		Store.canvas.getContext('2d')!.fill();

		Store.canvas.getContext('2d')!.fillStyle = 'black';
		Store.canvas.getContext('2d')!.beginPath();
		Store.canvas.getContext('2d')!.arc(x - radius / 3, y - radius / 3, radius / 8, 0, Math.PI * 2);
		Store.canvas.getContext('2d')!.arc(x + radius / 3, y - radius / 3, radius / 8, 0, Math.PI * 2);
		Store.canvas.getContext('2d')!.fill();
	});
};

export const renderGameOver = () => {
	Store.canvas.getContext('2d')!.fillStyle = 'black';
	Store.canvas.getContext('2d')!.font = '20px Arial';
	Store.canvas.getContext('2d')!.textAlign = 'center';
	Store.canvas.getContext('2d')!.fillText('Game Over', Store.canvas.width / 2, Store.canvas.height / 2);
};

export const gameOver = () => {
	clearInterval(Store.gameInterval);

	Store.canvas.getContext('2d')!.fillStyle = 'black';
	Store.canvas.getContext('2d')!.font = '20px Arial';
	Store.canvas.getContext('2d')!.textAlign = 'center';
	Store.canvas.getContext('2d')!.fillText('You Lost!', Store.canvas.width / 2, Store.canvas.height / 2);
};
