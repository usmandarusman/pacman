import { CELL_SIZE, GAP_SIZE, GHOSTS, GRID_HEIGHT, GRID_WIDTH, PACMAN_COLOR, PACMAN_COLOR_DEAD, PACMAN_COLOR_POWERUP } from './constants';
import { Store } from './store';
import { Utils } from './utils';

const generateAnimatedSVG = () => {
	const svgWidth = GRID_WIDTH * (CELL_SIZE + GAP_SIZE);
	const svgHeight = GRID_HEIGHT * (CELL_SIZE + GAP_SIZE) + 20;
	let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
	svg += `<rect width="100%" height="100%" fill="${Utils.getCurrentTheme().gridBackground}"/>`;

	svg += generateGhostsPredefinition();

	// Month labels
	let lastMonth = '';
	for (let y = 0; y < GRID_WIDTH; y++) {
		if (Store.monthLabels[y] !== lastMonth) {
			const xPos = y * (CELL_SIZE + GAP_SIZE) + CELL_SIZE / 2;
			svg += `<text x="${xPos}" y="10" text-anchor="middle" font-size="10" fill="${Utils.getCurrentTheme().textColor}">${Store.monthLabels[y]}</text>`;
			lastMonth = Store.monthLabels[y];
		}
	}

	// Grid
	for (let x = 0; x < GRID_HEIGHT; x++) {
		for (let y = 0; y < GRID_WIDTH; y++) {
			const cellX = y * (CELL_SIZE + GAP_SIZE);
			const cellY = x * (CELL_SIZE + GAP_SIZE) + 15;
			const intensity = Store.gameHistory[0].grid[x][y];
			const color = intensity > 0 ? getContributionColor(intensity) : Utils.getCurrentTheme().emptyContributionBoxColor;
			svg += `<rect id="cell-${x}-${y}" x="${cellX}" y="${cellY}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="5" fill="${color}">
                <animate attributeName="fill" dur="${Store.gameHistory.length * 300}ms" repeatCount="indefinite" 
                    values="${generateCellColorValues(x, y)}" 
                    keyTimes="${generateKeyTimes()}"/>
            </rect>`;
		}
	}

	// Pacman
	svg += `<path id="pacman" d="${generatePacManPath(0.35)}"
        transform="translate(${Store.pacman.y * (CELL_SIZE + GAP_SIZE)}, ${Store.pacman.x * (CELL_SIZE + GAP_SIZE) + 15})">
		<animate attributeName="fill" dur="${Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generatePacManColors()}"/>
        <animateTransform attributeName="transform" type="translate" dur="${Store.gameHistory.length * 300}ms" repeatCount="indefinite"
            keyTimes="${generateKeyTimes()}"
            values="${generatePacManPositions()}"/>
        <animate attributeName="d" dur="0.2s" repeatCount="indefinite"
            values="${generatePacManPath(0.25)};${generatePacManPath(0.05)};${generatePacManPath(0.25)}"/>
    </path>`;

	// Ghosts
	Store.ghosts.forEach((ghost, index) => {
		svg += `<use id="ghost${index}" width="${CELL_SIZE}" height="${CELL_SIZE}" href="#ghost-${ghost.name}">
            <animateTransform attributeName="transform" type="translate" dur="${Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
            <animate attributeName="href" dur="${Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostColors(index)}"/>
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

const generateKeyTimes = () => {
	return Store.gameHistory.map((_, index) => index / (Store.gameHistory.length - 1)).join(';');
};

const generatePacManPositions = () => {
	return Store.gameHistory
		.map((state) => {
			const x = state.pacman.y * (CELL_SIZE + GAP_SIZE);
			const y = state.pacman.x * (CELL_SIZE + GAP_SIZE) + 15;
			return `${x},${y}`;
		})
		.join(';');
};

const generatePacManColors = () => {
	return Store.gameHistory
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

const generateCellColorValues = (x: number, y: number) => {
	return Store.gameHistory
		.map((state) => {
			const intensity = state.grid[x][y];
			return intensity > 0 ? getContributionColor(intensity) : Utils.getCurrentTheme().emptyContributionBoxColor;
		})
		.join(';');
};

const getContributionColor = (intensity: number) => {
	const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
	return Utils.hexToRGBA(Utils.getCurrentTheme().contributionBoxColor, adjustedIntensity);
};

const generateGhostPositions = (ghostIndex: number) => {
	return Store.gameHistory
		.map((state) => {
			const ghost = state.ghosts[ghostIndex];
			const x = ghost.y * (CELL_SIZE + GAP_SIZE);
			const y = ghost.x * (CELL_SIZE + GAP_SIZE) + 15;
			return `${x},${y}`;
		})
		.join(';');
};

const generateGhostColors = (ghostIndex: number) => {
	return Store.gameHistory
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
