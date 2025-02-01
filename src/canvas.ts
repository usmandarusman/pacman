import { CELL_SIZE, GAP_SIZE, GRID_HEIGHT, GRID_WIDTH, PACMAN_COLOR, PACMAN_COLOR_DEAD, PACMAN_COLOR_POWERUP } from './constants';
import { MusicPlayer } from './music-player';
import { Store } from './store';
import { Utils } from './utils';

const resizeCanvas = () => {
	const canvasWidth = GRID_WIDTH * (CELL_SIZE + GAP_SIZE);
	const canvasHeight = GRID_HEIGHT * (CELL_SIZE + GAP_SIZE) + 20; // Adding some space for months on top

	Store.config.canvas.width = canvasWidth;
	Store.config.canvas.height = canvasHeight;
};

const drawGrid = () => {
	Store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme().gridBackground;
	Store.config.canvas.getContext('2d')!.fillRect(0, 0, Store.config.canvas.width, Store.config.canvas.height);

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			const intensity = Store.grid[x][y].intensity;
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
	if (Store.pacman.deadRemainingDuration) {
		Store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR_DEAD;
	} else if (Store.pacman.powerupRemainingDuration) {
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

const drawSoundController = () => {
	if (!Store.config.enableSounds) {
		return;
	}

	const width = 30,
		height = 30,
		left = Store.config.canvas.width - width - 10,
		top = 10;
	Store.config.canvas.getContext('2d')!.fillStyle = `rgba(0, 0, 0, ${MusicPlayer.getInstance().isMuted ? 0.3 : 0.5})`;
	Store.config.canvas.getContext('2d')!.beginPath();
	Store.config.canvas.getContext('2d')!.moveTo(left + 10, top + 10);
	Store.config.canvas.getContext('2d')!.lineTo(left + 20, top + 5);
	Store.config.canvas.getContext('2d')!.lineTo(left + 20, top + 25);
	Store.config.canvas.getContext('2d')!.lineTo(left + 10, top + 20);
	Store.config.canvas.getContext('2d')!.closePath();
	Store.config.canvas.getContext('2d')!.fill();

	if (!MusicPlayer.getInstance().isMuted) {
		Store.config.canvas.getContext('2d')!.strokeStyle = `rgba(0, 0, 0, 0.4)`;
		Store.config.canvas.getContext('2d')!.lineWidth = 2;

		// First wave
		Store.config.canvas.getContext('2d')!.beginPath();
		Store.config.canvas.getContext('2d')!.arc(left + 25, top + 15, 5, 0, Math.PI * 2);
		Store.config.canvas.getContext('2d')!.stroke();

		// Second wave
		Store.config.canvas.getContext('2d')!.beginPath();
		Store.config.canvas.getContext('2d')!.arc(left + 25, top + 15, 8, 0, Math.PI * 2);
		Store.config.canvas.getContext('2d')!.stroke();
	} else {
		// Mute line
		Store.config.canvas.getContext('2d')!.strokeStyle = 'rgba(255, 0, 0, 0.6)';
		Store.config.canvas.getContext('2d')!.lineWidth = 3;
		Store.config.canvas.getContext('2d')!.beginPath();
		Store.config.canvas.getContext('2d')!.moveTo(left + 25, top + 5);
		Store.config.canvas.getContext('2d')!.lineTo(left + 5, top + 25);
		Store.config.canvas.getContext('2d')!.stroke();
	}
};

const listenToSoundController = () => {
	if (!Store.config.enableSounds) {
		return;
	}
	Store.config.canvas.addEventListener('click', function (event) {
		const rect = Store.config.canvas.getBoundingClientRect();
		const x = event.clientX - rect.left,
			y = event.clientY - rect.top;
		const width = 30,
			height = 30,
			left = Store.config.canvas.width - width - 10,
			top = 10;

		if (x >= left && x <= left + this.width && y >= top && y <= top + this.height) {
			if (MusicPlayer.getInstance().isMuted) {
				MusicPlayer.getInstance().unmute();
			} else {
				MusicPlayer.getInstance().mute();
			}
		}
	});
};

export const Canvas = {
	resizeCanvas,
	drawGrid,
	drawPacman,
	drawGhosts,
	renderGameOver,
	drawSoundController,
	listenToSoundController
};
