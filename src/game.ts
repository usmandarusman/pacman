import { Canvas } from './canvas';
import { DELTA_TIME, GHOST_COLORS, GRID_HEIGHT, GRID_WIDTH, MONTHS, PACMAN_DEATH_DURATION, PACMAN_POWERUP_DURATION } from './constants';
import { Store } from './store';
import { SVG } from './svg';

const initializeGrid = () => {
	Store.grid = Array.from({ length: GRID_HEIGHT }, () => Array.from({ length: GRID_WIDTH }, () => 0));
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
			Store.grid[dayOfWeek][GRID_WIDTH - 1 - weeksAgo] = contribution.count;
			if (contribution.count > maxCommits) maxCommits = contribution.count;
		}
	});

	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			if (Store.grid[x][y] > 0) {
				Store.grid[x][y] = Store.grid[x][y] / maxCommits;
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
			if (Store.grid[x][y] > 0) validCells.push({ x, y });
		}
	}
	if (validCells.length > 0) {
		const randomCell = validCells[Math.floor(Math.random() * validCells.length)];
		Store.pacman = {
			x: randomCell.x,
			y: randomCell.y,
			direction: 'right',
			points: 0,
			deadReaminingDuration: 0,
			powerupReaminingDuration: 0
		};
	}
	if (Store.config.outputFormat == 'canvas') Canvas.drawPacman();
};

const placeGhosts = () => {
	Store.ghosts = [];
	Store.scaredGhostsDestinations = [];
	// Create 4 ghosts
	for (let i = 0; i < 4; i++) {
		const color = GHOST_COLORS[i % GHOST_COLORS.length];
		let x, y;
		do {
			x = Math.floor(Math.random() * GRID_HEIGHT);
			y = Math.floor(Math.random() * GRID_WIDTH);
		} while (Store.grid[x][y] === 0);
		Store.ghosts.push({ x, y, color, scared: false, target: undefined });
		Store.scaredGhostsDestinations.push({ x: 0, y: 0 });
	}
	if (Store.config.outputFormat == 'canvas') Canvas.drawGhosts();
};

const startGame = () => {
	if (Store.config.outputFormat == 'canvas') {
		Store.config.canvas = Store.config.canvas;
		Canvas.resizeCanvas();
	}

	Store.frameCount = 0;
	Store.ghosts.forEach((ghost) => (ghost.scared = false));

	initializeGrid();
	if (Store.config.outputFormat == 'canvas') Canvas.drawGrid();
	placePacman();
	placeGhosts();

	if (Store.config.outputFormat == 'svg') {
		const remainingCells = () => Store.grid.some((row) => row.some((cell) => cell > 0));
		while (remainingCells()) {
			updateGame();
		}
		// One more time to generate svg
		updateGame();
	} else {
		clearInterval(Store.gameInterval);
		Store.gameInterval = setInterval(() => updateGame(), DELTA_TIME);
	}
};

const updateGame = () => {
	Store.frameCount++;
	if (Store.frameCount % Store.config.gameSpeed !== 0) {
		Store.gameHistory.push({
			pacman: { ...Store.pacman },
			ghosts: Store.ghosts.map((ghost) => ({ ...ghost })),
			grid: Store.grid.map((row) => [...row])
		});
		return;
	}

	if (Store.pacman.deadReaminingDuration) {
		Store.pacman.deadReaminingDuration--;
		if (!Store.pacman.deadReaminingDuration) {
			// IT'S ALIVE!
		}
	}

	if (Store.pacman.powerupReaminingDuration) {
		Store.pacman.powerupReaminingDuration--;
		if (!Store.pacman.powerupReaminingDuration) {
			Store.ghosts.forEach((ghost) => (ghost.scared = false));
			Store.pacman.points = 0;
		}
	}

	const remainingCells = Store.grid.some((row) => row.some((cell) => cell > 0));
	if (!remainingCells) {
		if (Store.config.outputFormat == 'canvas') {
			clearInterval(Store.gameInterval);
			if (Store.config.outputFormat == 'canvas') Canvas.renderGameOver();
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
		grid: Store.grid.map((row) => [...row])
	});

	if (Store.config.outputFormat == 'canvas') Canvas.drawGrid();
	if (Store.config.outputFormat == 'canvas') Canvas.drawPacman();
	if (Store.config.outputFormat == 'canvas') Canvas.drawGhosts();
};

const movePacman = () => {
	if (Store.pacman.deadReaminingDuration) {
		return;
	}
	let targetCells: { x: number; y: number; distance: number }[] = [];

	if (Store.pacman.powerupReaminingDuration) {
		targetCells = Store.ghosts.map((ghost) => ({
			x: ghost.x,
			y: ghost.y,
			distance: Infinity
		}));
	} else {
		for (let x = 0; x < GRID_HEIGHT; x++) {
			for (let y = 0; y < GRID_WIDTH; y++) {
				if (Store.grid[x][y] > 0) targetCells.push({ x, y, distance: Infinity });
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

	if (Store.grid[Store.pacman.x][Store.pacman.y] > 0) {
		Store.pacman.points += 1;
		Store.grid[Store.pacman.x][Store.pacman.y] = 0;

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
			if (Store.pacman.powerupReaminingDuration && Math.random() < 0.5) return;

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
	if (Store.pacman.deadReaminingDuration) return;

	Store.ghosts.forEach((ghost, index) => {
		if (ghost.x === Store.pacman.x && ghost.y === Store.pacman.y) {
			if (Store.pacman.powerupReaminingDuration && ghost.scared) {
				respawnGhost(index);
				Store.pacman.points += 10;
			} else {
				Store.pacman.points = 0;
				Store.pacman.powerupReaminingDuration = 0;
				Store.pacman.deadReaminingDuration = PACMAN_DEATH_DURATION;
			}
		}
	});
};

const respawnGhost = (ghostIndex: number) => {
	let x, y;
	do {
		x = Math.floor(Math.random() * GRID_HEIGHT);
		y = Math.floor(Math.random() * GRID_WIDTH);
	} while ((Math.abs(x - Store.pacman.x) <= 2 && Math.abs(y - Store.pacman.y) <= 2) || Store.grid[x][y] === 0);
	Store.ghosts[ghostIndex] = {
		x,
		y,
		color: GHOST_COLORS[ghostIndex % GHOST_COLORS.length],
		scared: false,
		target: undefined
	};
};

const activatePowerUp = () => {
	Store.pacman.powerupReaminingDuration = PACMAN_POWERUP_DURATION;
	Store.ghosts.forEach((ghost) => (ghost.scared = true));
};

export const Game = {
	startGame
};
