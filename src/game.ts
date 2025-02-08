import { Canvas } from './canvas';
import {
	DELTA_TIME,
	GHOST_NAMES,
	GHOSTS,
	GRID_HEIGHT,
	GRID_WIDTH,
	MONTHS,
	PACMAN_DEATH_DURATION,
	PACMAN_POWERUP_DURATION
} from './constants';
import { MusicPlayer, Sound } from './music-player';
import { SVG } from './svg';
import { StoreType } from './types';

const initializeGrid = (store: StoreType) => {
	store.pacman.points = 0;
	store.pacman.totalPoints = 0;
	store.grid = Array.from({ length: GRID_HEIGHT }, () => Array.from({ length: GRID_WIDTH }, () => ({ commitsCount: 0, intensity: 0 })));
	store.monthLabels = Array(GRID_WIDTH).fill('');
	let maxCommits = 1;

	const now = new Date();
	const startOfCurrentWeek = new Date(now);
	startOfCurrentWeek.setDate(now.getDate() - now.getDay());

	store.contributions.forEach((contribution) => {
		const contributionDate = new Date(contribution.date);
		const dayOfWeek = contributionDate.getDay();
		const weeksAgo = Math.floor((+startOfCurrentWeek - +contributionDate) / (1000 * 60 * 60 * 24 * 7));

		if (weeksAgo >= 0 && weeksAgo < GRID_WIDTH && dayOfWeek >= 0 && dayOfWeek < GRID_HEIGHT) {
			store.grid[dayOfWeek][GRID_WIDTH - 1 - weeksAgo] = { commitsCount: contribution.count, intensity: 0 };
			if (contribution.count > maxCommits) maxCommits = contribution.count;
		}
	});

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			if (store.grid[x][y].commitsCount > 0) {
				store.grid[x][y].intensity = store.grid[x][y].commitsCount / maxCommits;
			}
		}
	}

	for (let y = 0; y < GRID_WIDTH; y++) {
		const weeksAgo = GRID_WIDTH - 1 - y;
		const columnDate = new Date(startOfCurrentWeek);
		columnDate.setDate(columnDate.getDate() - weeksAgo * 7);
		store.monthLabels[y] = MONTHS[columnDate.getMonth()];
	}
};

const placePacman = (store: StoreType) => {
	let validCells = [];
	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			if (store.grid[x][y].intensity > 0) validCells.push({ x, y });
		}
	}
	if (validCells.length > 0) {
		const randomCell = validCells[Math.floor(Math.random() * validCells.length)];
		store.pacman = {
			x: randomCell.x,
			y: randomCell.y,
			direction: 'right',
			points: 0,
			totalPoints: 0,
			deadRemainingDuration: 0,
			powerupRemainingDuration: 0
		};
	}
	if (store.config.outputFormat == 'canvas') Canvas.drawPacman(store);
};

const placeGhosts = (store: StoreType) => {
	store.ghosts = [];
	store.scaredGhostsDestinations = [];
	for (let i = 0; i < 4; i++) {
		let x, y;
		do {
			x = Math.floor(Math.random() * GRID_HEIGHT);
			y = Math.floor(Math.random() * GRID_WIDTH);
		} while (store.grid[x][y].intensity === 0);
		store.ghosts.push({ x, y, name: GHOST_NAMES[i], scared: false, target: undefined });
		store.scaredGhostsDestinations.push({ x: 0, y: 0 });
	}
	if (store.config.outputFormat == 'canvas') Canvas.drawGhosts(store);
};

const stopGame = async (store: StoreType) => {
	clearInterval(store.gameInterval);
};

const startGame = async (store: StoreType) => {
	if (store.config.outputFormat == 'canvas') {
		store.config.canvas = store.config.canvas;
		Canvas.resizeCanvas(store);
		Canvas.listenToSoundController(store);
	}

	store.frameCount = 0;
	store.ghosts.forEach((ghost) => (ghost.scared = false));

	initializeGrid(store);
	if (store.config.outputFormat == 'canvas') Canvas.drawGrid(store);

	if (store.config.outputFormat == 'canvas') {
		if (!store.config.enableSounds) {
			MusicPlayer.getInstance().mute();
		}
		await MusicPlayer.getInstance().preloadSounds();
		MusicPlayer.getInstance().startDefaultSound();
		await MusicPlayer.getInstance().play(Sound.BEGINNING);
	}

	const remainingCells = () => store.grid.some((row) => row.some((cell) => cell.intensity > 0));
	if (remainingCells()) {
		placePacman(store);
		placeGhosts(store);
	}

	GHOSTS.blinky.img.src = GHOSTS.blinky.imgDate;
	GHOSTS.clyde.img.src = GHOSTS.clyde.imgDate;
	GHOSTS.inky.img.src = GHOSTS.inky.imgDate;
	GHOSTS.pinky.img.src = GHOSTS.pinky.imgDate;
	GHOSTS.scared.img.src = GHOSTS.scared.imgDate;

	if (store.config.outputFormat == 'svg') {
		while (remainingCells()) {
			await updateGame(store);
		}
		// One more time to generate svg
		await updateGame(store);
	} else {
		clearInterval(store.gameInterval);
		store.gameInterval = setInterval(async () => await updateGame(store), DELTA_TIME);
	}
};

const updateGame = async (store: StoreType) => {
	store.frameCount++;
	if (store.frameCount % store.config.gameSpeed !== 0) {
		store.gameHistory.push({
			pacman: { ...store.pacman },
			ghosts: store.ghosts.map((ghost) => ({ ...ghost })),
			grid: store.grid.map((row) => [...row.map((col) => col.intensity)])
		});
		return;
	}

	if (store.pacman.deadRemainingDuration) {
		store.pacman.deadRemainingDuration--;
		if (!store.pacman.deadRemainingDuration) {
			// IT'S ALIVE!
			if (store.config.outputFormat == 'canvas')
				MusicPlayer.getInstance()
					.play(Sound.GAME_OVER)
					.then(() => MusicPlayer.getInstance().startDefaultSound());
		}
	}

	if (store.pacman.powerupRemainingDuration) {
		store.pacman.powerupRemainingDuration--;
		if (!store.pacman.powerupRemainingDuration) {
			store.ghosts.forEach((ghost) => (ghost.scared = false));
			store.pacman.points = 0;
		}
	}

	const remainingCells = store.grid.some((row) => row.some((cell) => cell.intensity > 0));
	if (!remainingCells) {
		if (store.config.outputFormat == 'canvas') {
			clearInterval(store.gameInterval);
			if (store.config.outputFormat == 'canvas') {
				Canvas.renderGameOver(store);
				MusicPlayer.getInstance()
					.play(Sound.BEGINNING)
					.then(() => MusicPlayer.getInstance().stopDefaultSound());
			}
		}

		if (store.config.outputFormat == 'svg') {
			const animatedSVG = SVG.generateAnimatedSVG(store);
			const svgBlob = new Blob([animatedSVG], {
				type: 'image/svg+xml;charset=utf-8'
			});
			const svgUrl = URL.createObjectURL(svgBlob);
			store.config.svgCallback(svgUrl);
		}

		store.config.gameOverCallback();
		return;
	}

	movePacman(store);
	moveGhosts(store);
	checkCollisions(store);

	store.pacmanMouthOpen = !store.pacmanMouthOpen;

	store.gameHistory.push({
		pacman: { ...store.pacman },
		ghosts: store.ghosts.map((ghost) => ({ ...ghost })),
		grid: store.grid.map((row) => [...row.map((col) => col.intensity)])
	});

	if (store.config.outputFormat == 'canvas') Canvas.drawGrid(store);
	if (store.config.outputFormat == 'canvas') Canvas.drawPacman(store);
	if (store.config.outputFormat == 'canvas') Canvas.drawGhosts(store);
	if (store.config.outputFormat == 'canvas') Canvas.drawSoundController(store);
};

const movePacman = (store: StoreType) => {
	if (store.pacman.deadRemainingDuration) {
		return;
	}
	let targetCells: { x: number; y: number; distance: number }[] = [];

	if (store.pacman.powerupRemainingDuration) {
		targetCells = store.ghosts.map((ghost) => ({
			x: ghost.x,
			y: ghost.y,
			distance: Infinity
		}));
	} else {
		for (let x = 0; x < GRID_HEIGHT; x++) {
			for (let y = 0; y < GRID_WIDTH; y++) {
				if (store.grid[x][y].intensity > 0) targetCells.push({ x, y, distance: Infinity });
			}
		}
	}

	if (targetCells.length === 0) return;

	const closest = targetCells.reduce(
		(closest, cell) => {
			const distance = Math.abs(cell.x - store.pacman.x) + Math.abs(cell.y - store.pacman.y);
			return distance < closest.distance ? { ...cell, distance } : closest;
		},
		{ x: store.pacman.x, y: store.pacman.y, distance: Infinity }
	);

	const dx = closest.x - store.pacman.x;
	const dy = closest.y - store.pacman.y;

	if (Math.abs(dx) > Math.abs(dy)) {
		store.pacman.x += Math.sign(dx);
		store.pacman.direction = dx > 0 ? 'down' : 'up';
	} else {
		store.pacman.y += Math.sign(dy);
		store.pacman.direction = dy > 0 ? 'right' : 'left';
	}

	if (store.grid[store.pacman.x][store.pacman.y].intensity > 0) {
		store.pacman.totalPoints += store.grid[store.pacman.x][store.pacman.y].commitsCount;
		store.pacman.points++;
		store.config.pointsIncreasedCallback(store.pacman.totalPoints);
		store.grid[store.pacman.x][store.pacman.y].intensity = 0;

		if (store.pacman.points >= 30) activatePowerUp(store);
	}
};

const moveGhosts = (store: StoreType) => {
	store.ghosts.forEach((ghost, index) => {
		if (ghost.scared) {
			if (!ghost.target) {
				ghost.target = getRandomDestination(ghost.x, ghost.y);
			}

			const dx = ghost.target.x - ghost.x;
			const dy = ghost.target.y - ghost.y;
			const moveX = Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) : 0;
			const moveY = Math.abs(dy) >= Math.abs(dx) ? Math.sign(dy) : 0;

			const newX = ghost.x + moveX;
			const newY = ghost.y + moveY;

			if (newX >= 0 && newX < GRID_HEIGHT && newY >= 0 && newY < GRID_WIDTH) {
				ghost.x = newX;
				ghost.y = newY;
			}

			if (ghost.x === ghost.target.x && ghost.y === ghost.target.y) {
				ghost.target = getRandomDestination(ghost.x, ghost.y);
			}
		} else {
			const directions = [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1]
			];
			const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];

			// If Pacman has the power-up, ghosts move slower (move every other frame)
			if (store.pacman.powerupRemainingDuration && Math.random() < 0.5) return;

			const newX = ghost.x + dx;
			const newY = ghost.y + dy;

			if (newX >= 0 && newX < GRID_HEIGHT && newY >= 0 && newY < GRID_WIDTH) {
				ghost.x = newX;
				ghost.y = newY;
			}
		}
	});
};

const getRandomDestination = (x: number, y: number) => {
	const maxDistance = 10;
	const randomX = x + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance;
	const randomY = y + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance;
	return {
		x: Math.max(0, Math.min(randomX, GRID_HEIGHT - 1)),
		y: Math.max(0, Math.min(randomY, GRID_WIDTH - 1))
	};
};

const checkCollisions = (store: StoreType) => {
	if (store.pacman.deadRemainingDuration) return;

	store.ghosts.forEach((ghost, index) => {
		if (ghost.x === store.pacman.x && ghost.y === store.pacman.y) {
			if (store.pacman.powerupRemainingDuration && ghost.scared) {
				respawnGhost(store, index);
				store.pacman.points += 10;
				if (store.config.outputFormat == 'canvas') {
					MusicPlayer.getInstance().play(Sound.EAT_GHOST);
				}
			} else {
				store.pacman.points = 0;
				store.pacman.powerupRemainingDuration = 0;
				store.pacman.deadRemainingDuration = PACMAN_DEATH_DURATION;
				if (store.config.outputFormat == 'canvas') {
					MusicPlayer.getInstance()
						.play(Sound.GAME_OVER)
						.then(() => MusicPlayer.getInstance().stopDefaultSound());
				}
			}
		}
	});
};

const respawnGhost = (store: StoreType, ghostIndex: number) => {
	let x, y;
	do {
		x = Math.floor(Math.random() * GRID_HEIGHT);
		y = Math.floor(Math.random() * GRID_WIDTH);
	} while ((Math.abs(x - store.pacman.x) <= 2 && Math.abs(y - store.pacman.y) <= 2) || store.grid[x][y].intensity === 0);
	store.ghosts[ghostIndex] = {
		x,
		y,
		name: GHOST_NAMES[ghostIndex % GHOST_NAMES.length],
		scared: false,
		target: undefined
	};
};

const activatePowerUp = (store: StoreType) => {
	store.pacman.powerupRemainingDuration = PACMAN_POWERUP_DURATION;
	store.ghosts.forEach((ghost) => (ghost.scared = true));
};

export const Game = {
	startGame,
	stopGame
};
