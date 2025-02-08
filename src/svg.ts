import { CELL_SIZE, GAP_SIZE, GHOSTS, GRID_HEIGHT, GRID_WIDTH, PACMAN_COLOR, PACMAN_COLOR_DEAD, PACMAN_COLOR_POWERUP } from './constants';
import { StoreType } from './types';
import { Utils } from './utils';

const generateAnimatedSVG = (store: StoreType) => {
	const svgWidth = GRID_WIDTH * (CELL_SIZE + GAP_SIZE);
	const svgHeight = GRID_HEIGHT * (CELL_SIZE + GAP_SIZE) + 20;
	let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
	svg += `<desc>Generated with https://github.com/abozanona/pacman-contribution-graph</desc>`;
	svg += `<rect width="100%" height="100%" fill="${Utils.getCurrentTheme(store).gridBackground}"/>`;

	svg += generateGhostsPredefinition();

	// Month labels
	let lastMonth = '';
	for (let y = 0; y < GRID_WIDTH; y++) {
		if (store.monthLabels[y] !== lastMonth) {
			const xPos = y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
			svg += `<text x="${xPos}" y="10" text-anchor="middle" font-size="10" fill="${Utils.getCurrentTheme(store).textColor}">${store.monthLabels[y]}</text>`;
			lastMonth = store.monthLabels[y];
		}
	}

	// Grid
	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			const cellX = y * (CELL_SIZE + GAP_SIZE);
			const cellY = x * (CELL_SIZE + GAP_SIZE) + 15;
			const intensity = store.gameHistory[0].grid[x][y];
			const color = intensity > 0 ? getContributionColor(store, intensity) : Utils.getCurrentTheme(store).emptyContributionBoxColor;
			svg += `<rect id="cell-${x}-${y}" x="${cellX}" y="${cellY}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="5" fill="${color}">
                <animate attributeName="fill" dur="${store.gameHistory.length * 300}ms" repeatCount="indefinite" 
                    values="${generateCellColorValues(store, x, y)}" 
                    keyTimes="${generateKeyTimes(store)}"/>
            </rect>`;
		}
	}

	// Pacman
	svg += `<path id="pacman" d="${generatePacManPath(0.35)}"
        transform="translate(${store.pacman.y * (CELL_SIZE + GAP_SIZE)}, ${store.pacman.x * (CELL_SIZE + GAP_SIZE) + 15})">
		<animate attributeName="fill" dur="${store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes(store)}"
                values="${generatePacManColors(store)}"/>
        <animateTransform attributeName="transform" type="translate" dur="${store.gameHistory.length * 300}ms" repeatCount="indefinite"
            keyTimes="${generateKeyTimes(store)}"
            values="${generatePacManPositions(store)}"/>
        <animate attributeName="d" dur="0.2s" repeatCount="indefinite"
            values="${generatePacManPath(0.25)};${generatePacManPath(0.05)};${generatePacManPath(0.25)}"/>
    </path>`;

	// Ghosts
	store.ghosts.forEach((ghost, index) => {
		svg += `<use id="ghost${index}" width="${CELL_SIZE}" height="${CELL_SIZE}" href="#ghost-${ghost.name}">
            <animateTransform attributeName="transform" type="translate" dur="${store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes(store)}"
                values="${generateGhostPositions(store, index)}"/>
            <animate attributeName="href" dur="${store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes(store)}"
                values="${generateGhostColors(store, index)}"/>
        </use>`;
	});

	svg += '</svg>';
	// TODO: minify SVG
	return svg;
};

const generatePacManPath = (mouthAngle: number) => {
	const radius = CELL_SIZE / 2;
	const startAngle = mouthAngle;
	const endAngle = 2 * Math.PI - mouthAngle;

	return `M ${radius},${radius}
            L ${radius + radius * Math.cos(startAngle)},${radius + radius * Math.sin(startAngle)}
            A ${radius},${radius} 0 1,1 ${radius + radius * Math.cos(endAngle)},${radius + radius * Math.sin(endAngle)}
            Z`;
};

const generateKeyTimes = (store: StoreType) => {
	return store.gameHistory.map((_, index) => index / (store.gameHistory.length - 1)).join(';');
};

const generatePacManPositions = (store: StoreType) => {
	return store.gameHistory
		.map((state) => {
			const x = state.pacman.y * (CELL_SIZE + GAP_SIZE);
			const y = state.pacman.x * (CELL_SIZE + GAP_SIZE) + 15;
			return `${x},${y}`;
		})
		.join(';');
};

const generatePacManColors = (store: StoreType) => {
	return store.gameHistory
		.map((state) => {
			if (state.pacman.deadRemainingDuration) {
				return PACMAN_COLOR_DEAD;
			} else if (state.pacman.powerupRemainingDuration) {
				return PACMAN_COLOR_POWERUP;
			} else {
				return PACMAN_COLOR;
			}
		})
		.join(';');
};

const generateCellColorValues = (store: StoreType, x: number, y: number) => {
	return store.gameHistory
		.map((state) => {
			const intensity = state.grid[x][y];
			return intensity > 0 ? getContributionColor(store, intensity) : Utils.getCurrentTheme(store).emptyContributionBoxColor;
		})
		.join(';');
};

const getContributionColor = (store: StoreType, intensity: number) => {
	const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
	return Utils.hexToRGBA(Utils.getCurrentTheme(store).contributionBoxColor, adjustedIntensity);
};

const generateGhostPositions = (store: StoreType, ghostIndex: number) => {
	return store.gameHistory
		.map((state) => {
			const ghost = state.ghosts[ghostIndex];
			const x = ghost.y * (CELL_SIZE + GAP_SIZE);
			const y = ghost.x * (CELL_SIZE + GAP_SIZE) + 15;
			return `${x},${y}`;
		})
		.join(';');
};

const generateGhostColors = (store: StoreType, ghostIndex: number) => {
	return store.gameHistory
		.map((state) => {
			const ghost = state.ghosts[ghostIndex];
			return ghost.scared ? '#scared' : '#' + ghost.name;
		})
		.join(';');
};

const generateGhostsPredefinition = () => {
	return `<defs>
		<symbol id="blinky" viewBox="0 0 100 100">
            <image href="${GHOSTS['blinky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="clyde" viewBox="0 0 100 100">
            <image href="${GHOSTS['clyde'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="inky" viewBox="0 0 100 100">
            <image href="${GHOSTS['inky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="pinky" viewBox="0 0 100 100">
            <image href="${GHOSTS['pinky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="scared" viewBox="0 0 100 100">
            <image href="${GHOSTS['scared'].imgDate}" width="100" height="100"/>
		</symbol>
	</defs>`;
};

export const SVG = {
	generateAnimatedSVG
};
