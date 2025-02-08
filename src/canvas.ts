import { CELL_SIZE, GAP_SIZE, GHOSTS, GRID_HEIGHT, GRID_WIDTH, PACMAN_COLOR, PACMAN_COLOR_DEAD, PACMAN_COLOR_POWERUP } from './constants';
import { MusicPlayer } from './music-player';
import { StoreType } from './types';
import { Utils } from './utils';

const resizeCanvas = (store: StoreType) => {
	const canvasWidth = GRID_WIDTH * (CELL_SIZE + GAP_SIZE);
	const canvasHeight = GRID_HEIGHT * (CELL_SIZE + GAP_SIZE) + 20; // Adding some space for months on top

	store.config.canvas.width = canvasWidth;
	store.config.canvas.height = canvasHeight;
};

const drawGrid = (store: StoreType) => {
	store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme(store).gridBackground;
	store.config.canvas.getContext('2d')!.fillRect(0, 0, store.config.canvas.width, store.config.canvas.height);

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			const intensity = store.grid[x][y].intensity;
			if (intensity > 0) {
				const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
				const color = Utils.hexToRGBA(Utils.getCurrentTheme(store).contributionBoxColor, adjustedIntensity);
				store.config.canvas.getContext('2d')!.fillStyle = color;
			} else {
				store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme(store).emptyContributionBoxColor;
			}
			store.config.canvas.getContext('2d')!.beginPath();
			store.config.canvas
				.getContext('2d')!
				.roundRect(y * (CELL_SIZE + GAP_SIZE), x * (CELL_SIZE + GAP_SIZE) + 15, CELL_SIZE, CELL_SIZE, 5);
			store.config.canvas.getContext('2d')!.fill();
		}
	}

	store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme(store).textColor;
	store.config.canvas.getContext('2d')!.font = '10px Arial';
	store.config.canvas.getContext('2d')!.textAlign = 'center';

	let lastMonth = '';
	for (let y = 0; y < GRID_WIDTH; y++) {
		if (store.monthLabels[y] !== lastMonth) {
			const xPos = y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
			store.config.canvas.getContext('2d')!.fillText(store.monthLabels[y], xPos, 10);
			lastMonth = store.monthLabels[y];
		}
	}
};

const drawPacman = (store: StoreType) => {
	const x = store.pacman.y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
	const y = store.pacman.x * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2 + 15;
	const radius = CELL_SIZE / 2;

	// Change Pac-Man's color to red if he's on power-up, dead, else yellow
	if (store.pacman.deadRemainingDuration) {
		store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR_DEAD;
	} else if (store.pacman.powerupRemainingDuration) {
		store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR_POWERUP;
	} else {
		store.config.canvas.getContext('2d')!.fillStyle = PACMAN_COLOR;
	}

	const mouthAngle = store.pacmanMouthOpen ? 0.35 * Math.PI : 0.1 * Math.PI;

	let startAngle, endAngle;
	switch (store.pacman.direction) {
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

	store.config.canvas.getContext('2d')!.beginPath();
	store.config.canvas.getContext('2d')!.arc(x, y, radius, startAngle, endAngle);
	store.config.canvas.getContext('2d')!.lineTo(x, y);
	store.config.canvas.getContext('2d')!.fill();
};

const drawGhosts = (store: StoreType) => {
	store.ghosts.forEach((ghost) => {
		const x = ghost.y * (CELL_SIZE + GAP_SIZE);
		const y = ghost.x * (CELL_SIZE + GAP_SIZE) + 15;
		const size = CELL_SIZE;

		const ctx = store.config.canvas.getContext('2d')!;
		if (ghost.scared) {
			ctx.drawImage(GHOSTS['scared'].img, x, y, size, size);
		} else {
			ctx.drawImage(GHOSTS[ghost.name].img, x, y, size, size);
		}
	});
};

const renderGameOver = (store: StoreType) => {
	store.config.canvas.getContext('2d')!.fillStyle = Utils.getCurrentTheme(store).textColor;
	store.config.canvas.getContext('2d')!.font = '20px Arial';
	store.config.canvas.getContext('2d')!.textAlign = 'center';
	store.config.canvas.getContext('2d')!.fillText('Game Over', store.config.canvas.width / 2, store.config.canvas.height / 2);
};

const drawSoundController = (store: StoreType) => {
	if (!store.config.enableSounds) {
		return;
	}

	const width = 30,
		height = 30,
		left = store.config.canvas.width - width - 10,
		top = 10;
	store.config.canvas.getContext('2d')!.fillStyle = `rgba(0, 0, 0, ${MusicPlayer.getInstance().isMuted ? 0.3 : 0.5})`;
	store.config.canvas.getContext('2d')!.beginPath();
	store.config.canvas.getContext('2d')!.moveTo(left + 10, top + 10);
	store.config.canvas.getContext('2d')!.lineTo(left + 20, top + 5);
	store.config.canvas.getContext('2d')!.lineTo(left + 20, top + 25);
	store.config.canvas.getContext('2d')!.lineTo(left + 10, top + 20);
	store.config.canvas.getContext('2d')!.closePath();
	store.config.canvas.getContext('2d')!.fill();

	if (!MusicPlayer.getInstance().isMuted) {
		store.config.canvas.getContext('2d')!.strokeStyle = `rgba(0, 0, 0, 0.4)`;
		store.config.canvas.getContext('2d')!.lineWidth = 2;

		// First wave
		store.config.canvas.getContext('2d')!.beginPath();
		store.config.canvas.getContext('2d')!.arc(left + 25, top + 15, 5, 0, Math.PI * 2);
		store.config.canvas.getContext('2d')!.stroke();

		// Second wave
		store.config.canvas.getContext('2d')!.beginPath();
		store.config.canvas.getContext('2d')!.arc(left + 25, top + 15, 8, 0, Math.PI * 2);
		store.config.canvas.getContext('2d')!.stroke();
	} else {
		// Mute line
		store.config.canvas.getContext('2d')!.strokeStyle = 'rgba(255, 0, 0, 0.6)';
		store.config.canvas.getContext('2d')!.lineWidth = 3;
		store.config.canvas.getContext('2d')!.beginPath();
		store.config.canvas.getContext('2d')!.moveTo(left + 25, top + 5);
		store.config.canvas.getContext('2d')!.lineTo(left + 5, top + 25);
		store.config.canvas.getContext('2d')!.stroke();
	}
};

const listenToSoundController = (store: StoreType) => {
	if (!store.config.enableSounds) {
		return;
	}
	store.config.canvas.addEventListener('click', function (event) {
		const rect = store.config.canvas.getBoundingClientRect();
		const x = event.clientX - rect.left,
			y = event.clientY - rect.top;
		const width = 30,
			height = 30,
			left = store.config.canvas.width - width - 10,
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
