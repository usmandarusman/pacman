/******/ var __webpack_modules__ = ({

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawGhosts: () => (/* binding */ drawGhosts),
/* harmony export */   drawGrid: () => (/* binding */ drawGrid),
/* harmony export */   drawPacman: () => (/* binding */ drawPacman),
/* harmony export */   renderGameOver: () => (/* binding */ renderGameOver)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/store.ts");


const drawGrid = () => {
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').clearRect(0, 0, _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.width, _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.height);
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
            const intensity = _store__WEBPACK_IMPORTED_MODULE_1__.Store.grid[x][y];
            if (intensity > 0) {
                const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
                const color = `rgba(${_constants__WEBPACK_IMPORTED_MODULE_0__.CONTRIBUTION_COLOR_BASE[0]}, ${_constants__WEBPACK_IMPORTED_MODULE_0__.CONTRIBUTION_COLOR_BASE[1]}, ${_constants__WEBPACK_IMPORTED_MODULE_0__.CONTRIBUTION_COLOR_BASE[2]}, ${adjustedIntensity})`;
                _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = color;
            }
            else {
                _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_COLOR;
            }
            _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').beginPath();
            _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas
                .getContext('2d')
                .roundRect(y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE), x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, 5);
            _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fill();
        }
    }
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = 'black';
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').font = '10px Arial';
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').textAlign = 'center';
    let lastMonth = '';
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y] !== lastMonth) {
            const xPos = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillText(_store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y], xPos, 10);
            lastMonth = _store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y];
        }
    }
};
const drawPacman = () => {
    const x = _store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    const y = _store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2 + 15;
    const radius = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    // Change Pac-Man's color to red if he's on power-up, dead, else yellow
    if (_store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.deadReaminingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
    }
    else if (_store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.powerupReaminingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_POWERUP;
    }
    else {
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR;
    }
    const mouthAngle = _store__WEBPACK_IMPORTED_MODULE_1__.Store.pacmanMouthOpen ? 0.25 * Math.PI : 0.1 * Math.PI;
    let startAngle, endAngle;
    switch (_store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.direction) {
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
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').beginPath();
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').arc(x, y, radius, startAngle, endAngle);
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').lineTo(x, y);
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fill();
};
const drawGhosts = () => {
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.ghosts.forEach((ghost) => {
        const x = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
        const y = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2 + 15;
        const radius = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = ghost.scared ? 'blue' : ghost.color;
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').beginPath();
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').arc(x, y, radius, 0, Math.PI);
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').rect(x - radius, y, radius * 2, radius);
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fill();
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = 'white';
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').beginPath();
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').arc(x - radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').arc(x + radius / 3, y - radius / 3, radius / 4, 0, Math.PI * 2);
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fill();
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = 'black';
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').beginPath();
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').arc(x - radius / 3, y - radius / 3, radius / 8, 0, Math.PI * 2);
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').arc(x + radius / 3, y - radius / 3, radius / 8, 0, Math.PI * 2);
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fill();
    });
};
const renderGameOver = () => {
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillStyle = 'black';
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').font = '20px Arial';
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').textAlign = 'center';
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.getContext('2d').fillText('Game Over', _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.width / 2, _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.height / 2);
};


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CELL_SIZE: () => (/* binding */ CELL_SIZE),
/* harmony export */   CONTRIBUTION_COLOR_BASE: () => (/* binding */ CONTRIBUTION_COLOR_BASE),
/* harmony export */   DELTA_TIME: () => (/* binding */ DELTA_TIME),
/* harmony export */   EMPTY_COLOR: () => (/* binding */ EMPTY_COLOR),
/* harmony export */   GAME_SPEED: () => (/* binding */ GAME_SPEED),
/* harmony export */   GAP_SIZE: () => (/* binding */ GAP_SIZE),
/* harmony export */   GHOST_COLORS: () => (/* binding */ GHOST_COLORS),
/* harmony export */   GRID_HEIGHT: () => (/* binding */ GRID_HEIGHT),
/* harmony export */   GRID_WIDTH: () => (/* binding */ GRID_WIDTH),
/* harmony export */   MONTHS: () => (/* binding */ MONTHS),
/* harmony export */   PACMAN_COLOR: () => (/* binding */ PACMAN_COLOR),
/* harmony export */   PACMAN_COLOR_DEAD: () => (/* binding */ PACMAN_COLOR_DEAD),
/* harmony export */   PACMAN_COLOR_POWERUP: () => (/* binding */ PACMAN_COLOR_POWERUP),
/* harmony export */   PACMAN_DEATH_DURATION: () => (/* binding */ PACMAN_DEATH_DURATION),
/* harmony export */   PACMAN_POWERUP_DURATION: () => (/* binding */ PACMAN_POWERUP_DURATION)
/* harmony export */ });
const CELL_SIZE = 20;
const GAP_SIZE = 2;
const GRID_WIDTH = 52;
const GRID_HEIGHT = 7;
const PACMAN_COLOR = 'yellow';
const PACMAN_COLOR_POWERUP = 'red';
const PACMAN_COLOR_DEAD = '#80808064';
const GHOST_COLORS = ['red', 'pink', 'cyan', 'orange'];
const CONTRIBUTION_COLOR_BASE = [34, 139, 34];
const EMPTY_COLOR = '#ececef';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const GAME_SPEED = 1; // 1 => Maximum speed
const DELTA_TIME = 250;
const PACMAN_DEATH_DURATION = 10;
const PACMAN_POWERUP_DURATION = 25;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startGame: () => (/* binding */ startGame)
/* harmony export */ });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svg */ "./src/svg.ts");




const initializeGrid = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid = Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT }, () => Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH }, () => 0));
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.monthLabels = Array(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH).fill('');
    let maxCommits = 1;
    const now = new Date();
    const startOfCurrentWeek = new Date(now);
    startOfCurrentWeek.setDate(now.getDate() - now.getDay());
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.contributions.forEach((contribution) => {
        const contributionDate = new Date(contribution.date);
        const dayOfWeek = contributionDate.getDay();
        const weeksAgo = Math.floor((+startOfCurrentWeek - +contributionDate) / (1000 * 60 * 60 * 24 * 7));
        if (weeksAgo >= 0 && weeksAgo < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH && dayOfWeek >= 0 && dayOfWeek < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT) {
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[dayOfWeek][_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - weeksAgo] = contribution.count;
            if (contribution.count > maxCommits)
                maxCommits = contribution.count;
        }
    });
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
            if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] > 0) {
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] = _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] / maxCommits;
            }
        }
    }
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
        const weeksAgo = _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - y;
        const columnDate = new Date(startOfCurrentWeek);
        columnDate.setDate(columnDate.getDate() - weeksAgo * 7);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.monthLabels[y] = _constants__WEBPACK_IMPORTED_MODULE_1__.MONTHS[columnDate.getMonth()];
    }
};
const placePacman = () => {
    let validCells = [];
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
            if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] > 0)
                validCells.push({ x, y });
        }
    }
    if (validCells.length > 0) {
        const randomCell = validCells[Math.floor(Math.random() * validCells.length)];
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman = {
            x: randomCell.x,
            y: randomCell.y,
            direction: 'right',
            points: 0,
            deadReaminingDuration: 0,
            powerupReaminingDuration: 0
        };
    }
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.drawPacman();
};
const placeGhosts = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts = [];
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.scaredGhostsDestinations = [];
    // Create 4 ghosts
    for (let i = 0; i < 4; i++) {
        const color = _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_COLORS[i % _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_COLORS.length];
        let x, y;
        do {
            x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
            y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
        } while (_store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] === 0);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.push({ x, y, color, scared: false, target: undefined });
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.scaredGhostsDestinations.push({ x: 0, y: 0 });
    }
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.drawGhosts();
};
const startGame = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.frameCount = 0;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.forEach((ghost) => (ghost.scared = false));
    initializeGrid();
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.drawGrid();
    placePacman();
    placeGhosts();
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'svg') {
        const remainingCells = () => _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid.some((row) => row.some((cell) => cell > 0));
        while (remainingCells()) {
            updateGame();
        }
        // One more time to generate svg
        updateGame();
    }
    else {
        clearInterval(_store__WEBPACK_IMPORTED_MODULE_2__.Store.gameInterval);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.gameInterval = setInterval(() => updateGame(), _constants__WEBPACK_IMPORTED_MODULE_1__.DELTA_TIME);
    }
};
const updateGame = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.frameCount++;
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.frameCount % _constants__WEBPACK_IMPORTED_MODULE_1__.GAME_SPEED !== 0) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.gameHistory.push({
            pacman: Object.assign({}, _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman),
            ghosts: _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.map((ghost) => (Object.assign({}, ghost))),
            grid: _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid.map((row) => [...row])
        });
        return;
    }
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadReaminingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadReaminingDuration--;
        if (!_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadReaminingDuration) {
            // HE'S ALIVE
        }
    }
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration--;
        if (!_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration) {
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.forEach((ghost) => (ghost.scared = false));
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.points = 0;
        }
    }
    const remainingCells = _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid.some((row) => row.some((cell) => cell > 0));
    if (!remainingCells) {
        if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas') {
            clearInterval(_store__WEBPACK_IMPORTED_MODULE_2__.Store.gameInterval);
            if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
                _canvas__WEBPACK_IMPORTED_MODULE_0__.renderGameOver();
        }
        if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'svg') {
            const animatedSVG = _svg__WEBPACK_IMPORTED_MODULE_3__.generateAnimatedSVG();
            const svgBlob = new Blob([animatedSVG], {
                type: 'image/svg+xml;charset=utf-8'
            });
            const svgUrl = URL.createObjectURL(svgBlob);
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.svgCallback(svgUrl);
        }
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.gameOverCallback();
        return;
    }
    movePacman();
    moveGhosts();
    checkCollisions();
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacmanMouthOpen = !_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacmanMouthOpen;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.gameHistory.push({
        pacman: Object.assign({}, _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman),
        ghosts: _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.map((ghost) => (Object.assign({}, ghost))),
        grid: _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid.map((row) => [...row])
    });
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.drawGrid();
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.drawPacman();
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.drawGhosts();
};
const movePacman = () => {
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadReaminingDuration) {
        return;
    }
    let targetCells = [];
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration) {
        targetCells = _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.map((ghost) => ({
            x: ghost.x,
            y: ghost.y,
            distance: Infinity
        }));
    }
    else {
        for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
            for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
                if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] > 0)
                    targetCells.push({ x, y, distance: Infinity });
            }
        }
    }
    if (targetCells.length === 0)
        return;
    const closest = targetCells.reduce((closest, cell) => {
        const distance = Math.abs(cell.x - _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x) + Math.abs(cell.y - _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y);
        return distance < closest.distance ? Object.assign(Object.assign({}, cell), { distance }) : closest;
    }, { x: _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x, y: _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y, distance: Infinity });
    const dx = closest.x - _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x;
    const dy = closest.y - _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y;
    if (Math.abs(dx) > Math.abs(dy)) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x += Math.sign(dx);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.direction = dx > 0 ? 'down' : 'up';
    }
    else {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y += Math.sign(dy);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.direction = dy > 0 ? 'right' : 'left';
    }
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x][_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y] > 0) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.points += 1;
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x][_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y] = 0;
        if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.points >= 30)
            activatePowerUp();
    }
};
const moveGhosts = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.forEach((ghost, index) => {
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
            if (newX >= 0 && newX < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT && newY >= 0 && newY < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH) {
                ghost.x = newX;
                ghost.y = newY;
            }
            if (ghost.x === ghost.target.x && ghost.y === ghost.target.y) {
                ghost.target = getRandomDestination(ghost.x, ghost.y);
            }
        }
        else {
            const directions = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];
            const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
            // If Pacman has the power-up, ghosts move slower (move every other frame)
            if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration && Math.random() < 0.5)
                return;
            const newX = ghost.x + dx;
            const newY = ghost.y + dy;
            if (newX >= 0 && newX < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT && newY >= 0 && newY < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH) {
                ghost.x = newX;
                ghost.y = newY;
            }
        }
    });
};
const getRandomDestination = (x, y) => {
    const maxDistance = 10;
    const randomX = x + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance;
    const randomY = y + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance;
    return {
        x: Math.max(0, Math.min(randomX, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT - 1)),
        y: Math.max(0, Math.min(randomY, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1))
    };
};
const checkCollisions = () => {
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadReaminingDuration)
        return;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.forEach((ghost, index) => {
        if (ghost.x === _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x && ghost.y === _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y) {
            if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration && ghost.scared) {
                respawnGhost(index);
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.points += 10;
            }
            else {
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.points = 0;
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration = 0;
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadReaminingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_DEATH_DURATION;
            }
        }
    });
};
const respawnGhost = (ghostIndex) => {
    let x, y;
    do {
        x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
        y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
    } while ((Math.abs(x - _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x) <= 2 && Math.abs(y - _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y) <= 2) || _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y] === 0);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts[ghostIndex] = {
        x,
        y,
        color: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_COLORS[ghostIndex % _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_COLORS.length],
        scared: false,
        target: undefined
    };
};
const activatePowerUp = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupReaminingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_POWERUP_DURATION;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.forEach((ghost) => (ghost.scared = true));
};


/***/ }),

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: () => (/* binding */ Store)
/* harmony export */ });
const Store = {
    frameCount: 0,
    contributions: [],
    pacman: {
        x: 0,
        y: 0,
        direction: 'right',
        points: 0,
        deadReaminingDuration: 0,
        powerupReaminingDuration: 0
    },
    ghosts: [],
    grid: [],
    monthLabels: [],
    pacmanMouthOpen: true,
    gameInterval: 0,
    scaredGhostsDestinations: [],
    gameHistory: [],
    config: undefined
};


/***/ }),

/***/ "./src/svg.ts":
/*!********************!*\
  !*** ./src/svg.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAnimatedSVG: () => (/* binding */ generateAnimatedSVG)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/store.ts");


const generateAnimatedSVG = () => {
    const svgWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
    const svgHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 20;
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    // Month labels
    let lastMonth = '';
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y] !== lastMonth) {
            const xPos = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            svg += `<text x="${xPos}" y="10" text-anchor="middle" font-size="10" fill="black">${_store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y]}</text>`;
            lastMonth = _store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y];
        }
    }
    // Grid
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
            const cellX = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
            const cellY = x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
            const intensity = _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory[0].grid[x][y];
            const color = intensity > 0 ? getContributionColor(intensity) : _constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_COLOR;
            svg += `<rect id="cell-${x}-${y}" x="${cellX}" y="${cellY}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" rx="5" fill="${color}">
                <animate attributeName="fill" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite" 
                    values="${generateCellColorValues(x, y)}" 
                    keyTimes="${generateKeyTimes()}"/>
            </rect>`;
        }
    }
    // Pacman
    svg += `<path id="pacman" d="${generatePacManPath(0.25)}"
        transform="translate(${_store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE)}, ${_store__WEBPACK_IMPORTED_MODULE_1__.Store.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15})">
		<animate attributeName="fill" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generatePacManColors()}"/>
        <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
            keyTimes="${generateKeyTimes()}"
            values="${generatePacManPositions()}"/>
        <animate attributeName="d" dur="0.2s" repeatCount="indefinite"
            values="${generatePacManPath(0.25)};${generatePacManPath(0.05)};${generatePacManPath(0.25)}"/>
    </path>`;
    // Ghosts
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.ghosts.forEach((ghost, index) => {
        svg += `<path id="ghost${index}" d="${generateGhostPath(_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2)}" fill="${ghost.color}">
            <animate attributeName="fill" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostColors(index)}"/>
            <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
        </path>
        <circle cx="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 3}" cy="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 3}" r="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 8}" fill="white">
            <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
        </circle>
        <circle cx="${(_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE * 2) / 3}" cy="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 3}" r="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 8}" fill="white">
            <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
        </circle>
        <circle cx="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 3}" cy="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 3}" r="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 16}" fill="black">
            <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
        </circle>
        <circle cx="${(_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE * 2) / 3}" cy="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 3}" r="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 16}" fill="black">
            <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
        </circle>`;
    });
    svg += '</svg>';
    return svg;
};
const generatePacManPath = (mouthAngle) => {
    const radius = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    const startAngle = mouthAngle;
    const endAngle = 2 * Math.PI - mouthAngle;
    return `M ${radius},${radius}
            L ${radius + radius * Math.cos(startAngle)},${radius + radius * Math.sin(startAngle)}
            A ${radius},${radius} 0 1,1 ${radius + radius * Math.cos(endAngle)},${radius + radius * Math.sin(endAngle)}
            Z`;
};
const generateKeyTimes = () => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.map((_, index) => index / (_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length - 1)).join(';');
};
const generatePacManPositions = () => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory
        .map((state) => {
        const x = state.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = state.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
        return `${x},${y}`;
    })
        .join(';');
};
const generatePacManColors = () => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory
        .map((state) => {
        if (state.pacman.deadReaminingDuration) {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
        }
        else if (state.pacman.powerupReaminingDuration) {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_POWERUP;
        }
        else {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR;
        }
    })
        .join(';');
};
const generateCellColorValues = (x, y) => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory
        .map((state) => {
        const intensity = state.grid[x][y];
        return intensity > 0 ? getContributionColor(intensity) : _constants__WEBPACK_IMPORTED_MODULE_0__.EMPTY_COLOR;
    })
        .join(';');
};
const getContributionColor = (intensity) => {
    const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
    return `rgba(${_constants__WEBPACK_IMPORTED_MODULE_0__.CONTRIBUTION_COLOR_BASE[0]}, ${_constants__WEBPACK_IMPORTED_MODULE_0__.CONTRIBUTION_COLOR_BASE[1]}, ${_constants__WEBPACK_IMPORTED_MODULE_0__.CONTRIBUTION_COLOR_BASE[2]}, ${adjustedIntensity})`;
};
const generateGhostPositions = (ghostIndex) => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory
        .map((state) => {
        const ghost = state.ghosts[ghostIndex];
        const x = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
        return `${x},${y}`;
    })
        .join(';');
};
const generateGhostPath = (radius) => {
    return `M ${radius},${radius * 2}
            Q ${radius * 0.8},${radius * 1.5} ${radius * 0.5},${radius * 1.3}
            Q ${radius * 0.3},${radius * 1.1} 0,${radius}
            L 0,0
            L ${radius * 2},0
            L ${radius * 2},${radius}
            Q ${radius * 1.7},${radius * 1.1} ${radius * 1.5},${radius * 1.3}
            Q ${radius * 1.2},${radius * 1.5} ${radius},${radius * 2}
            Z`;
};
const generateGhostColors = (ghostIndex) => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory
        .map((state) => {
        const ghost = state.ghosts[ghostIndex];
        return ghost.scared ? 'blue' : ghost.color;
    })
        .join(';');
};


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGithubContribution: () => (/* binding */ getGithubContribution),
/* harmony export */   getGitlabContribution: () => (/* binding */ getGitlabContribution),
/* harmony export */   resizeCanvas: () => (/* binding */ resizeCanvas)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/store.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const resizeCanvas = () => {
    const canvasWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
    const canvasHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 20; // Adding some space for months on top
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.width = canvasWidth;
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas.height = canvasHeight;
};
const getGitlabContribution = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://gitlab.com/users/${username}/calendar.json`);
    const contributionsList = yield response.json();
    return Object.entries(contributionsList).map(([date, count]) => ({
        date: new Date(date),
        count: Number(count)
    }));
});
const getGithubContribution = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&page=1&per_page=1000`);
    const contributionsList = yield response.json();
    return Array.from(contributionsList.items
        .reduce((map, item) => {
        const dateString = item.commit.committer.date.split('T')[0];
        const date = new Date(dateString);
        const count = (map.get(dateString) || { count: 0 }).count + 1;
        return map.set(dateString, { date, count });
    }, new Map())
        .values());
});


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderContributions: () => (/* binding */ renderContributions)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const renderContributions = (conf) => __awaiter(void 0, void 0, void 0, function* () {
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config = conf;
    if (conf.platform == 'gitlab') {
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_2__.getGitlabContribution(conf.username);
    }
    else {
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_2__.getGithubContribution(conf.username);
    }
    if (_store__WEBPACK_IMPORTED_MODULE_1__.Store.config.outputFormat == 'canvas') {
        _store__WEBPACK_IMPORTED_MODULE_1__.Store.config.canvas = conf.canvas;
        _utils__WEBPACK_IMPORTED_MODULE_2__.resizeCanvas();
    }
    _game__WEBPACK_IMPORTED_MODULE_0__.startGame();
});

})();

var __webpack_exports__renderContributions = __webpack_exports__.renderContributions;
export { __webpack_exports__renderContributions as renderContributions };

//# sourceMappingURL=pacman-contribution-graph.js.map