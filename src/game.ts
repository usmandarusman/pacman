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
import { Store } from './store';
import { SVG } from './svg';

const initializeGrid = () => {
	Store.pacman.points = 0;
	Store.pacman.totalPoints = 0;
	Store.grid = Array.from({ length: GRID_HEIGHT }, () => Array.from({ length: GRID_WIDTH }, () => ({ commitsCount: 0, intensity: 0 })));
	Store.monthLabels = Array(GRID_WIDTH).fill('');
	let maxCommits = 1;

	const now = new Date();
	const startOfCurrentWeek = new Date(now);
	startOfCurrentWeek.setDate(now.getDate() - now.getDay());

	Store.contributions.forEach((contribution) => {
		const contributionDate = new Date(contribution.date);
		const dayOfWeek = contributionDate.getDay();
		const weeksAgo = Math.floor((+startOfCurrentWeek - +contributionDate) / (1000 * 60 * 60 * 24 * 7));

		if (weeksAgo >= 0 && weeksAgo < GRID_WIDTH && dayOfWeek >= 0 && dayOfWeek < GRID_HEIGHT) {
			Store.grid[dayOfWeek][GRID_WIDTH - 1 - weeksAgo] = { commitsCount: contribution.count, intensity: 0 };
			if (contribution.count > maxCommits) maxCommits = contribution.count;
		}
	});

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			if (Store.grid[x][y].commitsCount > 0) {
				Store.grid[x][y].intensity = Store.grid[x][y].commitsCount / maxCommits;
			}
		}
	}

	for (let y = 0; y < GRID_WIDTH; y++) {
		const weeksAgo = GRID_WIDTH - 1 - y;
		const columnDate = new Date(startOfCurrentWeek);
		columnDate.setDate(columnDate.getDate() - weeksAgo * 7);
		Store.monthLabels[y] = MONTHS[columnDate.getMonth()];
	}
};

const placePacman = () => {
	let validCells = [];
	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			if (Store.grid[x][y].intensity > 0) validCells.push({ x, y });
		}
	}
	if (validCells.length > 0) {
		const randomCell = validCells[Math.floor(Math.random() * validCells.length)];
		Store.pacman = {
			x: randomCell.x,
			y: randomCell.y,
			direction: 'right',
			points: 0,
			totalPoints: 0,
			deadRemainingDuration: 0,
			powerupRemainingDuration: 0
		};
	}
	if (Store.config.outputFormat == 'canvas') Canvas.drawPacman();
};

const placeGhosts = () => {
	Store.ghosts = [];
	Store.scaredGhostsDestinations = [];
	for (let i = 0; i < 4; i++) {
		let x, y;
		do {
			x = Math.floor(Math.random() * GRID_HEIGHT);
			y = Math.floor(Math.random() * GRID_WIDTH);
		} while (Store.grid[x][y].intensity === 0);
		Store.ghosts.push({ x, y, name: GHOST_NAMES[i], scared: false, target: undefined });
		Store.scaredGhostsDestinations.push({ x: 0, y: 0 });
	}
	if (Store.config.outputFormat == 'canvas') Canvas.drawGhosts();
};

const startGame = async () => {
	if (Store.config.outputFormat == 'canvas') {
		Store.config.canvas = Store.config.canvas;
		Canvas.resizeCanvas();
		Canvas.listenToSoundController();
	}

	Store.frameCount = 0;
	Store.ghosts.forEach((ghost) => (ghost.scared = false));

	initializeGrid();
	if (Store.config.outputFormat == 'canvas') Canvas.drawGrid();

	if (Store.config.outputFormat == 'canvas') {
		if (!Store.config.enableSounds) {
			MusicPlayer.getInstance().mute();
		}
		await MusicPlayer.getInstance().preloadSounds();
		MusicPlayer.getInstance().startDefaultSound();
		await MusicPlayer.getInstance().play(Sound.BEGINNING);
	}

	placePacman();
	placeGhosts();

	GHOSTS.blinky.img.src = GHOSTS.blinky.imgDate;
	GHOSTS.clyde.img.src = GHOSTS.clyde.imgDate;
	GHOSTS.inky.img.src = GHOSTS.inky.imgDate;
	GHOSTS.pinky.img.src = GHOSTS.pinky.imgDate;
	GHOSTS.scared.img.src = GHOSTS.scared.imgDate;

	if (Store.config.outputFormat == 'svg') {
		const remainingCells = () => Store.grid.some((row) => row.some((cell) => cell.intensity > 0));
		while (remainingCells()) {
			await updateGame();
		}
		// One more time to generate svg
		await updateGame();
	} else {
		clearInterval(Store.gameInterval);
		Store.gameInterval = setInterval(async () => await updateGame(), DELTA_TIME);
	}
};

const updateGame = async () => {
	Store.frameCount++;
	if (Store.frameCount % Store.config.gameSpeed !== 0) {
		Store.gameHistory.push({
			pacman: { ...Store.pacman },
			ghosts: Store.ghosts.map((ghost) => ({ ...ghost })),
			grid: Store.grid.map((row) => [...row.map((col) => col.intensity)])
		});
		return;
	}

	if (Store.pacman.deadRemainingDuration) {
		Store.pacman.deadRemainingDuration--;
		if (!Store.pacman.deadRemainingDuration) {
			// IT'S ALIVE!
			if (Store.config.outputFormat == 'canvas')
				MusicPlayer.getInstance()
					.play(Sound.GAME_OVER)
					.then(() => MusicPlayer.getInstance().startDefaultSound());
		}
	}

	if (Store.pacman.powerupRemainingDuration) {
		Store.pacman.powerupRemainingDuration--;
		if (!Store.pacman.powerupRemainingDuration) {
			Store.ghosts.forEach((ghost) => (ghost.scared = false));
			Store.pacman.points = 0;
		}
	}

	const remainingCells = Store.grid.some((row) => row.some((cell) => cell.intensity > 0));
	if (!remainingCells) {
		if (Store.config.outputFormat == 'canvas') {
			clearInterval(Store.gameInterval);
			if (Store.config.outputFormat == 'canvas') {
				Canvas.renderGameOver();
				MusicPlayer.getInstance()
					.play(Sound.BEGINNING)
					.then(() => MusicPlayer.getInstance().stopDefaultSound());
			}
		}

		if (Store.config.outputFormat == 'svg') {
			const animatedSVG = SVG.generateAnimatedSVG();
			const svgBlob = new Blob([animatedSVG], {
				type: 'image/svg+xml;charset=utf-8'
			});
			const svgUrl = URL.createObjectURL(svgBlob);
			Store.config.svgCallback(svgUrl);
		}

		Store.config.gameOverCallback();
		return;
	}

	movePacman();
	moveGhosts();
	checkCollisions();

	Store.pacmanMouthOpen = !Store.pacmanMouthOpen;

	Store.gameHistory.push({
		pacman: { ...Store.pacman },
		ghosts: Store.ghosts.map((ghost) => ({ ...ghost })),
		grid: Store.grid.map((row) => [...row.map((col) => col.intensity)])
	});

	if (Store.config.outputFormat == 'canvas') Canvas.drawGrid();
	if (Store.config.outputFormat == 'canvas') Canvas.drawPacman();
	if (Store.config.outputFormat == 'canvas') Canvas.drawGhosts();
	if (Store.config.outputFormat == 'canvas') Canvas.drawSoundController();
};

const movePacman = () => {
	if (Store.pacman.deadRemainingDuration) {
		return;
	}
	let targetCells: { x: number; y: number; distance: number }[] = [];

	if (Store.pacman.powerupRemainingDuration) {
		targetCells = Store.ghosts.map((ghost) => ({
			x: ghost.x,
			y: ghost.y,
			distance: Infinity
		}));
	} else {
		for (let x = 0; x < GRID_HEIGHT; x++) {
			for (let y = 0; y < GRID_WIDTH; y++) {
				if (Store.grid[x][y].intensity > 0) targetCells.push({ x, y, distance: Infinity });
			}
		}
	}

	if (targetCells.length === 0) return;

	const closest = targetCells.reduce(
		(closest, cell) => {
			const distance = Math.abs(cell.x - Store.pacman.x) + Math.abs(cell.y - Store.pacman.y);
			return distance < closest.distance ? { ...cell, distance } : closest;
		},
		{ x: Store.pacman.x, y: Store.pacman.y, distance: Infinity }
	);

	const dx = closest.x - Store.pacman.x;
	const dy = closest.y - Store.pacman.y;

	if (Math.abs(dx) > Math.abs(dy)) {
		Store.pacman.x += Math.sign(dx);
		Store.pacman.direction = dx > 0 ? 'down' : 'up';
	} else {
		Store.pacman.y += Math.sign(dy);
		Store.pacman.direction = dy > 0 ? 'right' : 'left';
	}

	if (Store.grid[Store.pacman.x][Store.pacman.y].intensity > 0) {
		Store.pacman.totalPoints += Store.grid[Store.pacman.x][Store.pacman.y].commitsCount;
		Store.pacman.points++;
		Store.config.pointsIncreasedCallback(Store.pacman.totalPoints);
		Store.grid[Store.pacman.x][Store.pacman.y].intensity = 0;

		if (Store.pacman.points >= 30) activatePowerUp();
	}
};

const moveGhosts = () => {
	Store.ghosts.forEach((ghost, index) => {
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
			if (Store.pacman.powerupRemainingDuration && Math.random() < 0.5) return;

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

const checkCollisions = () => {
	if (Store.pacman.deadRemainingDuration) return;

	Store.ghosts.forEach((ghost, index) => {
		if (ghost.x === Store.pacman.x && ghost.y === Store.pacman.y) {
			if (Store.pacman.powerupRemainingDuration && ghost.scared) {
				respawnGhost(index);
				Store.pacman.points += 10;
				if (Store.config.outputFormat == 'canvas') {
					MusicPlayer.getInstance().play(Sound.EAT_GHOST);
				}
			} else {
				Store.pacman.points = 0;
				Store.pacman.powerupRemainingDuration = 0;
				Store.pacman.deadRemainingDuration = PACMAN_DEATH_DURATION;
				if (Store.config.outputFormat == 'canvas') {
					MusicPlayer.getInstance()
						.play(Sound.GAME_OVER)
						.then(() => MusicPlayer.getInstance().stopDefaultSound());
				}
			}
		}
	});
};

const respawnGhost = (ghostIndex: number) => {
	let x, y;
	do {
		x = Math.floor(Math.random() * GRID_HEIGHT);
		y = Math.floor(Math.random() * GRID_WIDTH);
	} while ((Math.abs(x - Store.pacman.x) <= 2 && Math.abs(y - Store.pacman.y) <= 2) || Store.grid[x][y].intensity === 0);
	Store.ghosts[ghostIndex] = {
		x,
		y,
		name: GHOST_NAMES[ghostIndex % GHOST_NAMES.length],
		scared: false,
		target: undefined
	};
};

const activatePowerUp = () => {
	Store.pacman.powerupRemainingDuration = PACMAN_POWERUP_DURATION;
	Store.ghosts.forEach((ghost) => (ghost.scared = true));
};

export const Game = {
	startGame
};
