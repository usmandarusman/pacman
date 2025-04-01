/******/ var __webpack_modules__ = ({

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Canvas: () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _music_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music-player */ "./src/music-player.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



const resizeCanvas = (store) => {
    const canvasWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
    const canvasHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 20; // Adding some space for months on top
    store.config.canvas.width = canvasWidth;
    store.config.canvas.height = canvasHeight;
};
const drawGrid = (store) => {
    const ctx = store.config.canvas.getContext('2d');
    ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).gridBackground;
    ctx.fillRect(0, 0, store.config.canvas.width, store.config.canvas.height);
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; y++) {
            const intensity = store.grid[x][y].intensity;
            if (intensity > 0) {
                const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
                const color = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.hexToRGBA(_utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).contributionBoxColor, adjustedIntensity);
                ctx.fillStyle = color;
            }
            else {
                ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).emptyContributionBoxColor;
            }
            ctx.beginPath();
            store.config.canvas
                .getContext('2d')
                .roundRect(x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE), y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, 5);
            ctx.fill();
        }
    }
    ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).wallColor;
    for (let x = 0; x <= _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; x++) {
        for (let y = 0; y <= _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; y++) {
            // Draw horizontal walls
            if (_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.horizontal[x][y].active) {
                ctx.fillRect(x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE, y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE + 15, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
                // // TODO: For debug only
                // ctx.fillStyle = '#000';
                // ctx.fillText(WALLS.horizontal[x][y].id, x * (GAP_SIZE + CELL_SIZE), y * (GAP_SIZE + CELL_SIZE));
            }
            // Draw vertical walls
            if (_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.vertical[x][y].active) {
                ctx.fillRect(x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE, y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE + 15, _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
                // // TODO: For debug only
                // ctx.fillStyle = '#000';
                // ctx.fillText(WALLS.vertical[x][y].id, x * (GAP_SIZE + CELL_SIZE), (y + 1) * (GAP_SIZE + CELL_SIZE));
            }
        }
    }
    ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).textColor;
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    let lastMonth = '';
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; x++) {
        if (store.monthLabels[x] !== lastMonth) {
            const xPos = x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            ctx.fillText(store.monthLabels[x], xPos, 10);
            lastMonth = store.monthLabels[x];
        }
    }
};
const drawPacman = (store) => {
    const ctx = store.config.canvas.getContext('2d');
    const x = store.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    const y = store.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2 + 15;
    const radius = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    // Change Pac-Man's color to red if he's on power-up, dead, else yellow
    if (store.pacman.deadRemainingDuration) {
        ctx.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
    }
    else if (store.pacman.powerupRemainingDuration) {
        ctx.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_POWERUP;
    }
    else {
        ctx.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR;
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
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineTo(x, y);
    ctx.fill();
};
const preloadedImages = {};
const getLoadedImage = (key, imgDate) => {
    if (!preloadedImages[key]) {
        const image = new Image();
        image.src = imgDate;
        preloadedImages[key] = image;
    }
    return preloadedImages[key];
};
const drawGhosts = (store) => {
    store.ghosts.forEach((ghost) => {
        const x = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
        const size = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE;
        const ctx = store.config.canvas.getContext('2d');
        if (ghost.scared) {
            ctx.drawImage(getLoadedImage('scared', _constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['scared'].imgDate), x, y, size, size);
        }
        else {
            ctx.drawImage(getLoadedImage(ghost.name, _constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS[ghost.name].imgDate), x, y, size, size);
        }
    });
};
const renderGameOver = (store) => {
    const ctx = store.config.canvas.getContext('2d');
    ctx.fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).textColor;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', store.config.canvas.width / 2, store.config.canvas.height / 2);
};
const drawSoundController = (store) => {
    if (!store.config.enableSounds) {
        return;
    }
    const ctx = store.config.canvas.getContext('2d');
    const width = 30, height = 30, left = store.config.canvas.width - width - 10, top = 10;
    ctx.fillStyle = `rgba(0, 0, 0, ${_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted ? 0.3 : 0.5})`;
    ctx.beginPath();
    ctx.moveTo(left + 10, top + 10);
    ctx.lineTo(left + 20, top + 5);
    ctx.lineTo(left + 20, top + 25);
    ctx.lineTo(left + 10, top + 20);
    ctx.closePath();
    ctx.fill();
    if (!_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted) {
        ctx.strokeStyle = `rgba(0, 0, 0, 0.4)`;
        ctx.lineWidth = 2;
        // First wave
        ctx.beginPath();
        ctx.arc(left + 25, top + 15, 5, 0, Math.PI * 2);
        ctx.stroke();
        // Second wave
        ctx.beginPath();
        ctx.arc(left + 25, top + 15, 8, 0, Math.PI * 2);
        ctx.stroke();
    }
    else {
        // Mute line
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(left + 25, top + 5);
        ctx.lineTo(left + 5, top + 25);
        ctx.stroke();
    }
};
const listenToSoundController = (store) => {
    if (!store.config.enableSounds) {
        return;
    }
    store.config.canvas.addEventListener('click', function (event) {
        const rect = store.config.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left, y = event.clientY - rect.top;
        const width = 30, height = 30, left = store.config.canvas.width - width - 10, top = 10;
        if (x >= left && x <= left + this.width && y >= top && y <= top + this.height) {
            if (_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted) {
                _music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().unmute();
            }
            else {
                _music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().mute();
            }
        }
    });
};
const Canvas = {
    resizeCanvas,
    drawGrid,
    drawPacman,
    drawGhosts,
    renderGameOver,
    drawSoundController,
    listenToSoundController
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
/* harmony export */   DELTA_TIME: () => (/* binding */ DELTA_TIME),
/* harmony export */   GAME_THEMES: () => (/* binding */ GAME_THEMES),
/* harmony export */   GAP_SIZE: () => (/* binding */ GAP_SIZE),
/* harmony export */   GHOSTS: () => (/* binding */ GHOSTS),
/* harmony export */   GHOST_NAMES: () => (/* binding */ GHOST_NAMES),
/* harmony export */   GRID_HEIGHT: () => (/* binding */ GRID_HEIGHT),
/* harmony export */   GRID_WIDTH: () => (/* binding */ GRID_WIDTH),
/* harmony export */   MONTHS: () => (/* binding */ MONTHS),
/* harmony export */   PACMAN_COLOR: () => (/* binding */ PACMAN_COLOR),
/* harmony export */   PACMAN_COLOR_DEAD: () => (/* binding */ PACMAN_COLOR_DEAD),
/* harmony export */   PACMAN_COLOR_POWERUP: () => (/* binding */ PACMAN_COLOR_POWERUP),
/* harmony export */   PACMAN_DEATH_DURATION: () => (/* binding */ PACMAN_DEATH_DURATION),
/* harmony export */   PACMAN_POWERUP_DURATION: () => (/* binding */ PACMAN_POWERUP_DURATION),
/* harmony export */   WALLS: () => (/* binding */ WALLS),
/* harmony export */   hasWall: () => (/* binding */ hasWall),
/* harmony export */   setWall: () => (/* binding */ setWall)
/* harmony export */ });
const CELL_SIZE = 20;
const GAP_SIZE = 2;
const GRID_WIDTH = 52;
const GRID_HEIGHT = 7;
const PACMAN_COLOR = 'yellow';
const PACMAN_COLOR_POWERUP = 'red';
const PACMAN_COLOR_DEAD = '#80808064';
const GHOST_NAMES = ['blinky', 'clyde', 'inky', 'pinky'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DELTA_TIME = 200;
const PACMAN_DEATH_DURATION = 10;
const PACMAN_POWERUP_DURATION = 15;
const GAME_THEMES = {
    github: {
        textColor: '#586069',
        gridBackground: '#ffffff',
        contributionBoxColor: '#9be9a8',
        emptyContributionBoxColor: '#ebedf0',
        wallColor: '#000000'
    },
    'github-dark': {
        textColor: '#8b949e',
        gridBackground: '#0d1117',
        contributionBoxColor: '#26a641',
        emptyContributionBoxColor: '#161b22',
        wallColor: '#FFFFFF'
    },
    gitlab: {
        textColor: '#626167',
        gridBackground: '#ffffff',
        contributionBoxColor: '#7992f5',
        emptyContributionBoxColor: '#ececef',
        wallColor: '#000000'
    },
    'gitlab-dark': {
        textColor: '#999999',
        gridBackground: '#1f1f1f',
        contributionBoxColor: '#2e7db1',
        emptyContributionBoxColor: '#2d2d2d',
        wallColor: '#FFFFFF'
    }
};
const GHOSTS = {
    blinky: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4T+2TUQ7AIAhDy/0PzQIRAqxmLtnn/DJPWypBAVkKKOMCyOQN7IRElLrcnIrDLNK4wVtxNbkb6Hq+jOcSbim6QVzKEstkw92gxVeFrMpqokix4wA+NvCOnvfArvcEbHoe2G9QmmhDMUc65p3xYC6q3zQPxtdl3NgF5QpL/b/rs3IAAAAASUVORK5CYIIA'
    },
    clyde: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4T+2T0Q6AIAhFLx9sH1MfTIPCAeLKrcd8PHqP4JBQLN7BFacNlHkAs+AQcqIueBs2mVWjgtWwl4yCdrd/pHYLLlVEgR2yK0wy4SoI5TcGXU4wM+AEJQfwsUCuXngDOR4rqKbngf0C94gyFHmkbd4rbkxD/pv2jfR1Ky7sBNrzXbHpnBX+AAAAAElFTkSuQmCC'
    },
    inky: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAg0lEQVQ4T+WTWxKAIAhFuQvK/a+jFoT5QAVxypn+6vMEx6sDIO/jk12OAMs1WDVOXV3UBW+bRVbTFMFu8yCZBExH/g26VHCXI0AJpKgdUCUrTlkwxE+FECdzS7HiJemXgvyeO29gE7jD8wDVFX4vSLNtR1q2z+OVlaZxTaXYrq7HbxYBS8VgMVrqzkEAAAAASUVORK5CYIIA'
    },
    pinky: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4T+2T0Q2AIAwF281wC50Qt9DNagoptqVESfyUz4N3vJCCECxaD4o47gt6bsAo2IWUqAnehkUmbYpgNqwlvSCnur+dtnnAuYUVyCGJimTAi8DUzwmwOoGI7hYjDgAfC/jqiTfg47ZBND0P7BeoR+Sh8CMt8x5xYSWkv2nbcF834swuA/9u49Yy5bgAAAAASUVORK5CYIIA'
    },
    scared: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeUlEQVQ4T82TUQ6AMAhD7UX0/sdyF0GREVmDmTN+bH9r6Bs0A0t2VpFULwDrrfBkZFcA3YC3ZodViAFGzQHyP0B2w2NrB0/1AoDbHwLoQ5/nrw1OBuD5e/crbM9Aiz35njHWzpSB/m3+0r40mV41M8U19WJe3Uw/tQOKt08pUUbBEQAAAABJRU5ErkJgggAA'
    }
};
const WALLS = {
    horizontal: Array(GRID_WIDTH + 1)
        .fill(null)
        .map(() => Array(GRID_HEIGHT + 1).fill({ active: false, id: '' })),
    vertical: Array(GRID_WIDTH + 1)
        .fill(null)
        .map(() => Array(GRID_HEIGHT + 1).fill({ active: false, id: '' }))
};
const setWall = (x, y, direction, lineId) => {
    if (direction === 'horizontal') {
        if (x >= 0 && x < WALLS.horizontal.length && y >= 0 && y < WALLS.horizontal[0].length) {
            WALLS.horizontal[x][y] = { active: true, id: lineId };
        }
    }
    else {
        if (x >= 0 && x < WALLS.vertical.length && y >= 0 && y < WALLS.vertical[0].length) {
            WALLS.vertical[x][y] = { active: true, id: lineId };
        }
    }
};
const hasWall = (x, y, direction) => {
    switch (direction) {
        case 'up':
            return WALLS.horizontal[x][y].active;
        case 'down':
            return WALLS.horizontal[x + 1][y].active;
        case 'left':
            return WALLS.vertical[x][y].active;
        case 'right':
            return WALLS.vertical[x][y + 1].active;
    }
};


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _movement_ghosts_movement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./movement/ghosts-movement */ "./src/movement/ghosts-movement.ts");
/* harmony import */ var _movement_pacman_movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./movement/pacman-movement */ "./src/movement/pacman-movement.ts");
/* harmony import */ var _music_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./music-player */ "./src/music-player.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./svg */ "./src/svg.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const initializeGrid = (store) => {
    store.pacman.points = 0;
    store.pacman.totalPoints = 0;
    store.grid = Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH }, () => Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT }, () => ({ commitsCount: 0, intensity: 0 })));
    store.monthLabels = Array(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH).fill('');
    let maxCommits = 1;
    const now = new Date();
    const startOfCurrentWeek = new Date(now);
    startOfCurrentWeek.setDate(now.getDate() - now.getDay());
    store.contributions.forEach((contribution) => {
        const contributionDate = new Date(contribution.date);
        const dayOfWeek = contributionDate.getDay();
        const weeksAgo = Math.floor((+startOfCurrentWeek - +contributionDate) / (1000 * 60 * 60 * 24 * 7));
        if (weeksAgo >= 0 && weeksAgo < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH && dayOfWeek >= 0 && dayOfWeek < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT) {
            store.grid[_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - weeksAgo][dayOfWeek] = { commitsCount: contribution.count, intensity: 0 };
            if (contribution.count > maxCommits)
                maxCommits = contribution.count;
        }
    });
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; y++) {
            if (store.grid[x][y].commitsCount > 0) {
                store.grid[x][y].intensity = store.grid[x][y].commitsCount / maxCommits;
            }
        }
    }
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; x++) {
        const weeksAgo = _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - x;
        const columnDate = new Date(startOfCurrentWeek);
        columnDate.setDate(columnDate.getDate() - weeksAgo * 7);
        store.monthLabels[x] = _constants__WEBPACK_IMPORTED_MODULE_1__.MONTHS[columnDate.getMonth()];
    }
};
const placePacman = (store) => {
    store.pacman = {
        x: 0,
        y: 0,
        direction: 'right',
        points: 0,
        totalPoints: 0,
        deadRemainingDuration: 0,
        powerupRemainingDuration: 0,
        recentPositions: []
    };
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawPacman(store);
};
const placeGhosts = (store) => {
    store.ghosts = [];
    // Center gjosts in mid grid
    store.ghosts.push({ x: 23, y: 3, name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[0], scared: false, target: undefined });
    store.ghosts.push({ x: 24, y: 3, name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[1], scared: false, target: undefined });
    store.ghosts.push({ x: 27, y: 3, name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[2], scared: false, target: undefined });
    store.ghosts.push({ x: 28, y: 3, name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[3], scared: false, target: undefined });
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGhosts(store);
};
const stopGame = (store) => __awaiter(void 0, void 0, void 0, function* () {
    clearInterval(store.gameInterval);
});
const startGame = (store) => __awaiter(void 0, void 0, void 0, function* () {
    if (store.config.outputFormat == 'canvas') {
        store.config.canvas = store.config.canvas;
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.resizeCanvas(store);
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.listenToSoundController(store);
    }
    store.frameCount = 0;
    store.ghosts.forEach((ghost) => (ghost.scared = false));
    initializeGrid(store);
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGrid(store);
    if (store.config.outputFormat == 'canvas') {
        if (!store.config.enableSounds) {
            _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().mute();
        }
        yield _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().preloadSounds();
        _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().startDefaultSound();
        yield _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().play(_music_player__WEBPACK_IMPORTED_MODULE_4__.Sound.BEGINNING);
    }
    const remainingCells = () => store.grid.some((row) => row.some((cell) => cell.intensity > 0));
    if (remainingCells()) {
        placePacman(store);
        placeGhosts(store);
    }
    if (store.config.outputFormat == 'svg') {
        while (remainingCells()) {
            yield updateGame(store);
        }
        // One more time to generate svg
        yield updateGame(store);
    }
    else {
        clearInterval(store.gameInterval);
        store.gameInterval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () { return yield updateGame(store); }), _constants__WEBPACK_IMPORTED_MODULE_1__.DELTA_TIME);
    }
});
const updateGame = (store) => __awaiter(void 0, void 0, void 0, function* () {
    store.frameCount++;
    if (store.frameCount % store.config.gameSpeed !== 0) {
        store.gameHistory.push({
            pacman: Object.assign({}, store.pacman),
            ghosts: store.ghosts.map((ghost) => (Object.assign({}, ghost))),
            grid: store.grid.map((row) => [...row.map((col) => col.intensity)])
        });
        return;
    }
    if (store.pacman.deadRemainingDuration) {
        store.pacman.deadRemainingDuration--;
        if (!store.pacman.deadRemainingDuration) {
            // IT'S ALIVE!
            placeGhosts(store);
            if (store.config.outputFormat == 'canvas')
                _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance()
                    .play(_music_player__WEBPACK_IMPORTED_MODULE_4__.Sound.GAME_OVER)
                    .then(() => _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().startDefaultSound());
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
                _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.renderGameOver(store);
                _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance()
                    .play(_music_player__WEBPACK_IMPORTED_MODULE_4__.Sound.BEGINNING)
                    .then(() => _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().stopDefaultSound());
            }
        }
        if (store.config.outputFormat == 'svg') {
            const animatedSVG = _svg__WEBPACK_IMPORTED_MODULE_5__.SVG.generateAnimatedSVG(store);
            store.config.svgCallback(animatedSVG);
        }
        store.config.gameOverCallback();
        return;
    }
    _movement_pacman_movement__WEBPACK_IMPORTED_MODULE_3__.PacmanMovement.movePacman(store);
    checkCollisions(store);
    if (!store.pacman.deadRemainingDuration) {
        _movement_ghosts_movement__WEBPACK_IMPORTED_MODULE_2__.GhostsMovement.moveGhosts(store);
        checkCollisions(store);
    }
    store.pacmanMouthOpen = !store.pacmanMouthOpen;
    store.gameHistory.push({
        pacman: Object.assign({}, store.pacman),
        ghosts: store.ghosts.map((ghost) => (Object.assign({}, ghost))),
        grid: store.grid.map((row) => [...row.map((col) => col.intensity)])
    });
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGrid(store);
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawPacman(store);
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGhosts(store);
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawSoundController(store);
});
const checkCollisions = (store) => {
    if (store.pacman.deadRemainingDuration)
        return;
    store.ghosts.forEach((ghost, index) => {
        if (ghost.x === store.pacman.x && ghost.y === store.pacman.y) {
            if (store.pacman.powerupRemainingDuration && ghost.scared) {
                respawnGhost(store, index);
                store.pacman.points += 10;
                if (store.config.outputFormat == 'canvas') {
                    _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().play(_music_player__WEBPACK_IMPORTED_MODULE_4__.Sound.EAT_GHOST);
                }
            }
            else {
                store.pacman.points = 0;
                store.pacman.powerupRemainingDuration = 0;
                store.pacman.deadRemainingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_DEATH_DURATION;
                if (store.config.outputFormat == 'canvas') {
                    _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance()
                        .play(_music_player__WEBPACK_IMPORTED_MODULE_4__.Sound.GAME_OVER)
                        .then(() => _music_player__WEBPACK_IMPORTED_MODULE_4__.MusicPlayer.getInstance().stopDefaultSound());
                }
            }
        }
    });
};
const respawnGhost = (store, ghostIndex) => {
    let x, y;
    do {
        x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
        y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
    } while ((Math.abs(x - store.pacman.x) <= 2 && Math.abs(y - store.pacman.y) <= 2) || store.grid[x][y].intensity === 0);
    store.ghosts[ghostIndex] = {
        x,
        y,
        name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[ghostIndex % _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES.length],
        scared: false,
        target: undefined
    };
};
const Game = {
    startGame,
    stopGame
};


/***/ }),

/***/ "./src/grid.ts":
/*!*********************!*\
  !*** ./src/grid.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Grid: () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");

const setSymmetricWall = (x, y, direction, sym, lineId) => {
    if (direction == 'horizontal') {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(x, y, 'horizontal', lineId);
        if (sym == 'x') {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - x - 1, y, 'horizontal', lineId);
        }
        else if (sym == 'y') {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(x, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - y, 'horizontal', lineId);
        }
        else if (sym == 'xy') {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - x - 1, y, 'horizontal', lineId);
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(x, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - y, 'horizontal', lineId);
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - x - 1, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - y, 'horizontal', lineId);
        }
    }
    else {
        (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(x, y, 'vertical', lineId);
        if (sym == 'x') {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - x, y, 'vertical', lineId);
        }
        else if (sym == 'y') {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(x, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - y - 1, 'vertical', lineId);
        }
        else if (sym == 'xy') {
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - x, y, 'vertical', lineId);
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(x, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - y - 1, 'vertical', lineId);
            (0,_constants__WEBPACK_IMPORTED_MODULE_0__.setWall)(_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - x, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - y - 1, 'vertical', lineId);
        }
    }
};
const buildWalls = () => {
    // Left and right wings
    // L1
    setSymmetricWall(0, 2, 'horizontal', 'xy', 'L1');
    setSymmetricWall(1, 2, 'horizontal', 'xy', 'L1');
    // L2
    setSymmetricWall(4, 0, 'vertical', 'x', 'L2');
    setSymmetricWall(4, 1, 'vertical', 'x', 'L2');
    setSymmetricWall(4, 2, 'vertical', 'x', 'L2');
    setSymmetricWall(4, 3, 'vertical', 'x', 'L2');
    setSymmetricWall(4, 4, 'vertical', 'x', 'L2');
    // L3
    setSymmetricWall(3, 3, 'horizontal', 'x', 'L3');
    setSymmetricWall(2, 3, 'horizontal', 'x', 'L3');
    // L4
    setSymmetricWall(4, 5, 'horizontal', 'x', 'L4');
    // L5
    setSymmetricWall(6, 4, 'vertical', 'x', 'L5');
    setSymmetricWall(6, 3, 'vertical', 'x', 'L5');
    setSymmetricWall(6, 2, 'vertical', 'x', 'L5');
    // L6
    setSymmetricWall(6, 2, 'horizontal', 'x', 'L6');
    setSymmetricWall(7, 2, 'horizontal', 'x', 'L6');
    setSymmetricWall(8, 2, 'horizontal', 'x', 'L6');
    setSymmetricWall(9, 2, 'horizontal', 'x', 'L6');
    // L7
    setSymmetricWall(13, 2, 'horizontal', 'xy', 'L7');
    setSymmetricWall(14, 2, 'horizontal', 'xy', 'L7');
    setSymmetricWall(15, 2, 'horizontal', 'xy', 'L7');
    setSymmetricWall(16, 2, 'horizontal', 'xy', 'L7');
    setSymmetricWall(17, 2, 'horizontal', 'xy', 'L7');
    setSymmetricWall(18, 2, 'horizontal', 'xy', 'L7');
    // L8
    setSymmetricWall(16, 2, 'vertical', 'xy', 'L8');
    // L9
    setSymmetricWall(8, 1, 'horizontal', 'x', 'L9');
    setSymmetricWall(9, 1, 'horizontal', 'x', 'L9');
    setSymmetricWall(10, 1, 'horizontal', 'x', 'L9');
    setSymmetricWall(11, 1, 'horizontal', 'x', 'L9');
    // L10
    setSymmetricWall(12, 1, 'vertical', 'x', 'L10');
    setSymmetricWall(12, 3, 'vertical', 'x', 'L10');
    // L11
    setSymmetricWall(11, 4, 'horizontal', 'x', 'L11');
    setSymmetricWall(10, 4, 'horizontal', 'x', 'L11');
    setSymmetricWall(9, 4, 'horizontal', 'x', 'L11');
    setSymmetricWall(8, 4, 'horizontal', 'x', 'L11');
    // L12
    setSymmetricWall(8, 4, 'vertical', 'x', 'L12');
    setSymmetricWall(8, 5, 'vertical', 'x', 'L12');
    setSymmetricWall(8, 6, 'vertical', 'x', 'L12');
    // L13
    setSymmetricWall(23, 2, 'horizontal', 'x', 'L13');
    setSymmetricWall(24, 2, 'horizontal', 'x', 'L13');
    setSymmetricWall(23, 4, 'horizontal', 'x', 'L13');
    setSymmetricWall(24, 4, 'horizontal', 'x', 'L13');
    setSymmetricWall(25, 4, 'horizontal', 'x', 'L13');
    // L14
    setSymmetricWall(23, 2, 'vertical', 'x', 'L14');
    setSymmetricWall(23, 3, 'vertical', 'x', 'L14');
    // L15
    setSymmetricWall(26, 4, 'vertical', 'x', 'L15');
    setSymmetricWall(26, 5, 'vertical', 'x', 'L15');
    // L16
    setSymmetricWall(23, 6, 'horizontal', 'x', 'L16');
    setSymmetricWall(24, 6, 'horizontal', 'x', 'L16');
    setSymmetricWall(25, 6, 'horizontal', 'x', 'L16');
    // L17
    setSymmetricWall(26, 0, 'vertical', 'x', 'L17');
    // L18
    setSymmetricWall(24, 1, 'vertical', 'x', 'L18');
    setSymmetricWall(23, 1, 'horizontal', 'x', 'L18');
    setSymmetricWall(22, 1, 'horizontal', 'x', 'L18');
    setSymmetricWall(21, 1, 'horizontal', 'x', 'L18');
    setSymmetricWall(21, 1, 'vertical', 'x', 'L18');
    setSymmetricWall(21, 2, 'vertical', 'x', 'L18');
    setSymmetricWall(21, 3, 'vertical', 'x', 'L18');
    setSymmetricWall(20, 4, 'horizontal', 'x', 'L18');
    setSymmetricWall(19, 4, 'horizontal', 'x', 'L18');
    setSymmetricWall(19, 3, 'vertical', 'x', 'L18');
    setSymmetricWall(18, 3, 'horizontal', 'x', 'L18');
    // L19
    setSymmetricWall(22, 5, 'vertical', 'x', 'L19');
    setSymmetricWall(21, 5, 'horizontal', 'x', 'L19');
    setSymmetricWall(20, 5, 'horizontal', 'x', 'L19');
    setSymmetricWall(20, 5, 'vertical', 'x', 'L19');
    // L20
    setSymmetricWall(1, 6, 'horizontal', 'x', 'L20');
    setSymmetricWall(2, 6, 'horizontal', 'x', 'L20');
    setSymmetricWall(3, 5, 'vertical', 'x', 'L20');
    setSymmetricWall(3, 4, 'vertical', 'x', 'L20');
    // L21
    setSymmetricWall(5, 6, 'horizontal', 'x', 'L21');
    setSymmetricWall(6, 6, 'horizontal', 'x', 'L21');
};
const Grid = {
    buildWalls
};


/***/ }),

/***/ "./src/movement/ghosts-movement.ts":
/*!*****************************************!*\
  !*** ./src/movement/ghosts-movement.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GhostsMovement: () => (/* binding */ GhostsMovement)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _movement_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movement-utils */ "./src/movement/movement-utils.ts");


const moveGhosts = (store) => {
    store.ghosts.forEach((ghost) => {
        if (ghost.scared || Math.random() < 0.15) {
            moveScaredGhost(ghost, store);
        }
        else {
            moveGhostWithPersonality(ghost, store);
        }
    });
};
// When scared, ghosts move randomly but with some intelligence
const moveScaredGhost = (ghost, store) => {
    if (!ghost.target || (ghost.x === ghost.target.x && ghost.y === ghost.target.y)) {
        ghost.target = getRandomDestination(ghost.x, ghost.y);
    }
    const validMoves = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.getValidMoves(ghost.x, ghost.y);
    if (validMoves.length === 0)
        return;
    // Move toward target but with some randomness to appear "scared"
    const dx = ghost.target.x - ghost.x;
    const dy = ghost.target.y - ghost.y;
    // Filter moves that generally go toward the target
    let possibleMoves = validMoves.filter((move) => {
        const moveX = move[0];
        const moveY = move[1];
        return (dx > 0 && moveX > 0) || (dx < 0 && moveX < 0) || (dy > 0 && moveY > 0) || (dy < 0 && moveY < 0);
    });
    // If no valid moves toward target, use any valid move
    if (possibleMoves.length === 0) {
        possibleMoves = validMoves;
    }
    // Choose a random move from the possible moves
    const [moveX, moveY] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    // If Pacman has power-up, ghosts move slower
    if (store.pacman.powerupRemainingDuration && Math.random() < 0.5)
        return;
    ghost.x += moveX;
    ghost.y += moveY;
};
// Move ghost according to its personality
const moveGhostWithPersonality = (ghost, store) => {
    const target = calculateGhostTarget(ghost, store);
    ghost.target = target;
    const nextMove = BFSTargetLocation(ghost.x, ghost.y, target.x, target.y);
    if (nextMove) {
        ghost.x = nextMove.x;
        ghost.y = nextMove.y;
    }
};
// Find the next position to move to using BFS
const BFSTargetLocation = (startX, startY, targetX, targetY) => {
    // If we're already at the target, no need to move
    if (startX === targetX && startY === targetY)
        return null;
    const queue = [{ x: startX, y: startY, path: [] }];
    const visited = new Set();
    visited.add(`${startX},${startY}`);
    while (queue.length > 0) {
        const current = queue.shift();
        const { x, y, path } = current;
        const validMoves = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.getValidMoves(x, y);
        for (const [dx, dy] of validMoves) {
            const newX = x + dx;
            const newY = y + dy;
            const key = `${newX},${newY}`;
            if (visited.has(key))
                continue;
            visited.add(key);
            const newPath = [...path, { x: newX, y: newY }];
            if (newX === targetX && newY === targetY) {
                return newPath.length > 0 ? newPath[0] : null;
            }
            queue.push({ x: newX, y: newY, path: newPath });
        }
    }
    // If no path found, no need to move
    return null;
};
// Calculate ghost target based on personality
const calculateGhostTarget = (ghost, store) => {
    const { pacman } = store;
    let pacDirection = [0, 0];
    switch (ghost.name) {
        case 'blinky': // Red ghost - directly targets Pacman
            return { x: pacman.x, y: pacman.y };
        case 'pinky': // Pink ghost - targets 4 spaces ahead of Pacman
            pacDirection = getPacmanDirection(store);
            const lookAhead = 4;
            let fourAhead = {
                x: pacman.x + pacDirection[0] * lookAhead,
                y: pacman.y + pacDirection[1] * lookAhead
            };
            fourAhead.x = Math.min(Math.max(fourAhead.x, 0), _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - 1);
            fourAhead.y = Math.min(Math.max(fourAhead.y, 0), _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - 1);
            return fourAhead;
        case 'inky': // Blue ghost - complex targeting based on Blinky's position
            const blinky = store.ghosts.find((g) => g.name === 'blinky');
            pacDirection = getPacmanDirection(store);
            // Target is 2 spaces ahead of Pacman
            let twoAhead = {
                x: pacman.x + pacDirection[0] * 2,
                y: pacman.y + pacDirection[1] * 2
            };
            // Then double the vector from Blinky to that position
            if (blinky) {
                twoAhead = {
                    x: twoAhead.x + (twoAhead.x - blinky.x),
                    y: twoAhead.y + (twoAhead.y - blinky.y)
                };
            }
            twoAhead.x = Math.min(Math.max(twoAhead.x, 0), _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - 1);
            twoAhead.y = Math.min(Math.max(twoAhead.y, 0), _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - 1);
            return twoAhead;
        case 'clyde': // Orange ghost - targets Pacman when far, runs away when close
            const distanceToPacman = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.calculateDistance(ghost.x, ghost.y, pacman.x, pacman.y);
            if (distanceToPacman > 8) {
                return { x: pacman.x, y: pacman.y };
            }
            else {
                return { x: 0, y: _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - 1 };
            }
        default:
            // Default behavior targets Pacman directly
            return { x: pacman.x, y: pacman.y };
    }
};
const getPacmanDirection = (store) => {
    switch (store.pacman.direction) {
        case 'right':
            return [1, 0];
        case 'left':
            return [-1, 0];
        case 'up':
            return [0, -1];
        case 'down':
            return [0, 1];
        default:
            return [0, 0];
    }
};
// Get a random destination for scared ghosts
const getRandomDestination = (x, y) => {
    const maxDistance = 8;
    const randomX = x + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance;
    const randomY = y + Math.floor(Math.random() * (2 * maxDistance + 1)) - maxDistance;
    return {
        x: Math.max(0, Math.min(randomX, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH - 1)),
        y: Math.max(0, Math.min(randomY, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT - 1))
    };
};
const GhostsMovement = {
    moveGhosts
};


/***/ }),

/***/ "./src/movement/movement-utils.ts":
/*!****************************************!*\
  !*** ./src/movement/movement-utils.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MovementUtils: () => (/* binding */ MovementUtils)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");

// Check for walls and grid edges
const getValidMoves = (x, y) => {
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1] // down
    ];
    return directions.filter(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (newX < 0 || newX >= _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH || newY < 0 || newY >= _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT) {
            return false;
        }
        if (dx === -1) {
            return !_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.vertical[x][y].active;
        }
        else if (dx === 1) {
            return !_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.vertical[x + 1][y].active;
        }
        else if (dy === -1) {
            return !_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.horizontal[x][y].active;
        }
        else if (dy === 1) {
            return !_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.horizontal[x][y + 1].active;
        }
        return true;
    });
};
const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
const MovementUtils = {
    getValidMoves,
    calculateDistance
};


/***/ }),

/***/ "./src/movement/pacman-movement.ts":
/*!*****************************************!*\
  !*** ./src/movement/pacman-movement.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PacmanMovement: () => (/* binding */ PacmanMovement)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
/* harmony import */ var _movement_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movement-utils */ "./src/movement/movement-utils.ts");


const RECENT_POSITIONS_LIMIT = 5;
const movePacman = (store) => {
    if (store.pacman.deadRemainingDuration) {
        return;
    }
    const hasPowerup = !!store.pacman.powerupRemainingDuration;
    const scaredGhosts = store.ghosts.filter((ghost) => ghost.scared);
    let targetPosition;
    if (hasPowerup && scaredGhosts.length > 0) {
        const ghostPosition = findClosestScaredGhost(store);
        if (ghostPosition) {
            targetPosition = ghostPosition;
        }
        else {
            targetPosition = findOptimalTarget(store);
        }
    }
    else if (store.pacman.target) {
        if (store.pacman.target.x == store.pacman.x && store.pacman.target.y == store.pacman.y) {
            targetPosition = findOptimalTarget(store);
            store.pacman.target = { x: targetPosition === null || targetPosition === void 0 ? void 0 : targetPosition.x, y: targetPosition === null || targetPosition === void 0 ? void 0 : targetPosition.y };
        }
        else {
            targetPosition = store.pacman.target;
        }
    }
    else {
        targetPosition = findOptimalTarget(store);
        store.pacman.target = { x: targetPosition === null || targetPosition === void 0 ? void 0 : targetPosition.x, y: targetPosition === null || targetPosition === void 0 ? void 0 : targetPosition.y };
    }
    const nextPosition = calculateOptimalPath(store, targetPosition);
    if (nextPosition) {
        updatePacmanPosition(store, nextPosition);
    }
    else {
        makeDesperationMove(store);
    }
    checkAndEatPoint(store);
};
const findClosestScaredGhost = (store) => {
    const scaredGhosts = store.ghosts.filter((ghost) => ghost.scared);
    if (scaredGhosts.length === 0)
        return null;
    return scaredGhosts.reduce((closest, ghost) => {
        const distance = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.calculateDistance(ghost.x, ghost.y, store.pacman.x, store.pacman.y);
        return distance < closest.distance ? { x: ghost.x, y: ghost.y, distance } : closest;
    }, { x: store.pacman.x, y: store.pacman.y, distance: Infinity });
};
const findOptimalTarget = (store) => {
    let pointCells = [];
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; y++) {
            if (store.grid[x][y].intensity > 0) {
                const distance = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.calculateDistance(x, y, store.pacman.x, store.pacman.y);
                const value = store.grid[x][y].intensity / (distance + 1);
                pointCells.push({ x, y, value });
            }
        }
    }
    pointCells.sort((a, b) => b.value - a.value);
    return pointCells[0];
};
const calculateOptimalPath = (store, target) => {
    var _a;
    const queue = [
        { x: store.pacman.x, y: store.pacman.y, path: [], score: 0 }
    ];
    const visited = new Set();
    visited.add(`${store.pacman.x},${store.pacman.y}`);
    const dangerMap = createDangerMap(store);
    while (queue.length > 0) {
        queue.sort((a, b) => b.score - a.score);
        const current = queue.shift();
        const { x, y, path } = current;
        if (x === target.x && y === target.y) {
            return path.length > 0 ? path[0] : null;
        }
        const validMoves = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.getValidMoves(x, y);
        for (const [dx, dy] of validMoves) {
            const newX = x + dx;
            const newY = y + dy;
            const key = `${newX},${newY}`;
            if (!visited.has(key)) {
                const newPath = [...path, { x: newX, y: newY }];
                const danger = dangerMap.get(key) || 0;
                const pointValue = store.grid[newX][newY].intensity;
                const distanceToTarget = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.calculateDistance(newX, newY, target.x, target.y);
                let revisitPenalty = 0;
                if ((_a = store.pacman.recentPositions) === null || _a === void 0 ? void 0 : _a.includes(key)) {
                    revisitPenalty += 100; // Penalize recently visited positions
                }
                queue.push({
                    x: newX,
                    y: newY,
                    path: newPath,
                    score: pointValue - danger - distanceToTarget / 10 - revisitPenalty
                });
                visited.add(key);
            }
        }
    }
    return null;
};
const createDangerMap = (store) => {
    const dangerMap = new Map();
    const hasPowerup = !!store.pacman.powerupRemainingDuration;
    store.ghosts.forEach((ghost) => {
        if (ghost.scared)
            return;
        for (let dx = -5; dx <= 5; dx++) {
            for (let dy = -5; dy <= 5; dy++) {
                const x = ghost.x + dx;
                const y = ghost.y + dy;
                if (x >= 0 && x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH && y >= 0 && y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT) {
                    const key = `${x},${y}`;
                    const distance = Math.abs(dx) + Math.abs(dy);
                    const dangerValue = 15 - distance;
                    if (dangerValue > 0) {
                        const currentDanger = dangerMap.get(key) || 0;
                        dangerMap.set(key, Math.max(currentDanger, dangerValue));
                    }
                }
            }
        }
    });
    if (hasPowerup) {
        for (const [key, value] of dangerMap.entries()) {
            dangerMap.set(key, value / 5);
        }
    }
    return dangerMap;
};
const makeDesperationMove = (store) => {
    const validMoves = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.getValidMoves(store.pacman.x, store.pacman.y);
    if (validMoves.length === 0)
        return;
    const safestMove = validMoves.reduce((safest, [dx, dy]) => {
        const newX = store.pacman.x + dx;
        const newY = store.pacman.y + dy;
        let minGhostDistance = Infinity;
        store.ghosts.forEach((ghost) => {
            if (!ghost.scared) {
                const distance = _movement_utils__WEBPACK_IMPORTED_MODULE_1__.MovementUtils.calculateDistance(ghost.x, ghost.y, newX, newY);
                minGhostDistance = Math.min(minGhostDistance, distance);
            }
        });
        return minGhostDistance > safest.distance ? { dx, dy, distance: minGhostDistance } : safest;
    }, { dx: 0, dy: 0, distance: -Infinity });
    const newX = store.pacman.x + safestMove.dx;
    const newY = store.pacman.y + safestMove.dy;
    updatePacmanPosition(store, { x: newX, y: newY });
};
const updatePacmanPosition = (store, position) => {
    var _a;
    (_a = store.pacman).recentPositions || (_a.recentPositions = []);
    store.pacman.recentPositions.push(`${position.x},${position.y}`);
    if (store.pacman.recentPositions.length > RECENT_POSITIONS_LIMIT) {
        store.pacman.recentPositions.shift();
    }
    const dx = position.x - store.pacman.x;
    const dy = position.y - store.pacman.y;
    if (dx > 0)
        store.pacman.direction = 'right';
    else if (dx < 0)
        store.pacman.direction = 'left';
    else if (dy > 0)
        store.pacman.direction = 'down';
    else if (dy < 0)
        store.pacman.direction = 'up';
    store.pacman.x = position.x;
    store.pacman.y = position.y;
};
const checkAndEatPoint = (store) => {
    if (store.grid[store.pacman.x][store.pacman.y].intensity > 0) {
        store.pacman.totalPoints += store.grid[store.pacman.x][store.pacman.y].commitsCount;
        store.pacman.points++;
        store.config.pointsIncreasedCallback(store.pacman.totalPoints);
        store.grid[store.pacman.x][store.pacman.y].intensity = 0;
        if (store.pacman.points >= 10)
            activatePowerUp(store);
    }
};
const activatePowerUp = (store) => {
    store.pacman.powerupRemainingDuration = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_POWERUP_DURATION;
    store.ghosts.forEach((ghost) => (ghost.scared = true));
};
const PacmanMovement = {
    movePacman
};


/***/ }),

/***/ "./src/music-player.ts":
/*!*****************************!*\
  !*** ./src/music-player.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MusicPlayer: () => (/* binding */ MusicPlayer),
/* harmony export */   Sound: () => (/* binding */ Sound)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Sound;
(function (Sound) {
    Sound["DEFAULT"] = "https://cdn.jsdelivr.net/npm/pacman-contribution-graph/src/assets/sounds/pacman_chomp.wav";
    Sound["BEGINNING"] = "https://cdn.jsdelivr.net/npm/pacman-contribution-graph/src/assets/sounds/pacman_beginning.wav";
    Sound["GAME_OVER"] = "https://cdn.jsdelivr.net/npm/pacman-contribution-graph/src/assets/sounds/pacman_death.wav";
    Sound["EAT_GHOST"] = "https://cdn.jsdelivr.net/npm/pacman-contribution-graph/src/assets/sounds/pacman_eatghost.wav";
})(Sound || (Sound = {}));
class MusicPlayer {
    constructor() {
        this.sounds = new Map();
        this.currentSource = null;
        this.defaultSource = null;
        this.isMuted = false;
        this.audioContext = new AudioContext();
    }
    static getInstance() {
        if (!MusicPlayer.instance) {
            MusicPlayer.instance = new MusicPlayer();
        }
        return MusicPlayer.instance;
    }
    preloadSounds() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const sound of Object.values(Sound)) {
                const response = yield fetch(sound);
                const arrayBuffer = yield response.arrayBuffer();
                const audioBuffer = yield this.audioContext.decodeAudioData(arrayBuffer);
                this.sounds.set(sound, audioBuffer);
            }
        });
    }
    play(sound) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isMuted) {
                return;
            }
            if (this.currentSource) {
                try {
                    this.currentSource.stop();
                }
                catch (ex) { }
            }
            const buffer = this.sounds.get(sound);
            if (!buffer) {
                console.error(`Sound ${sound} not found`);
                return;
            }
            this.currentSource = this.audioContext.createBufferSource();
            this.currentSource.buffer = buffer;
            this.currentSource.connect(this.audioContext.destination);
            if (!this.isMuted) {
                this.currentSource.start();
            }
            return new Promise((resolve) => {
                this.currentSource.onended = () => {
                    this.currentSource = null;
                    resolve();
                };
            });
        });
    }
    startDefaultSound() {
        if (this.defaultSource) {
            try {
                this.defaultSource.stop();
            }
            catch (ex) { }
        }
        const buffer = this.sounds.get(Sound.DEFAULT);
        if (!buffer) {
            console.error('Default sound not found');
            return;
        }
        this.defaultSource = this.audioContext.createBufferSource();
        this.defaultSource.buffer = buffer;
        this.defaultSource.loop = true;
        this.defaultSource.connect(this.audioContext.destination);
        if (!this.isMuted) {
            this.defaultSource.start();
        }
    }
    stopDefaultSound() {
        if (this.defaultSource) {
            try {
                this.defaultSource.stop();
            }
            catch (ex) { }
            this.defaultSource = null;
        }
    }
    mute() {
        this.isMuted = true;
        if (this.currentSource) {
            this.currentSource.disconnect();
        }
        if (this.defaultSource) {
            this.defaultSource.disconnect();
        }
    }
    unmute() {
        this.isMuted = false;
        if (this.currentSource) {
            this.currentSource.connect(this.audioContext.destination);
        }
        if (this.defaultSource) {
            this.defaultSource.connect(this.audioContext.destination);
        }
    }
}


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
        totalPoints: 0,
        deadRemainingDuration: 0,
        powerupRemainingDuration: 0,
        recentPositions: []
    },
    ghosts: [],
    grid: [],
    monthLabels: [],
    pacmanMouthOpen: true,
    gameInterval: 0,
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
/* harmony export */   SVG: () => (/* binding */ SVG)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


const generateAnimatedSVG = (store) => {
    const svgWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
    const svgHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 20;
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<desc>Generated with https://github.com/abozanona/pacman-contribution-graph on ${new Date()}</desc>`;
    svg += `<rect width="100%" height="100%" fill="${_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).gridBackground}"/>`;
    svg += generateGhostsPredefinition();
    // Month labels
    let lastMonth = '';
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
        if (store.monthLabels[y] !== lastMonth) {
            const xPos = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            svg += `<text x="${xPos}" y="10" text-anchor="middle" font-size="10" fill="${_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).textColor}">${store.monthLabels[y]}</text>`;
            lastMonth = store.monthLabels[y];
        }
    }
    // Grid
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; y++) {
            const cellX = x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
            const cellY = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
            const cellColorAnimation = generateChangingValuesAnimation(store, generateCellColorValues(store, x, y));
            svg += `<rect id="c-${x}-${y}" x="${cellX}" y="${cellY}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" rx="5" fill="${_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).emptyContributionBoxColor}">
                <animate attributeName="fill" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite" 
                    values="${cellColorAnimation.values}" 
                    keyTimes="${cellColorAnimation.keyTimes}"/>
            </rect>`;
        }
    }
    // Walls
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; y++) {
            if (_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.horizontal[x][y].active) {
                svg += `<rect id="wh-${x}-${y}" x="${x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE}" y="${y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE + 15}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE}" rx="5" fill="${_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).wallColor}"></rect>`;
            }
            if (_constants__WEBPACK_IMPORTED_MODULE_0__.WALLS.vertical[x][y].active) {
                svg += `<rect id="wv-${x}-${y}" x="${x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE}" y="${y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) - _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE + 15}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE}" rx="5" fill="${_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).wallColor}"></rect>`;
            }
        }
    }
    // Pacman
    const pacmanColorAnimation = generateChangingValuesAnimation(store, generatePacManColors(store));
    const pacmanPositionAnimation = generateChangingValuesAnimation(store, generatePacManPositions(store));
    const pacmanRotationAnimation = generateChangingValuesAnimation(store, generatePacManRotations(store));
    svg += `<path id="pacman" d="${generatePacManPath(0.55)}"
        >
		<animate attributeName="fill" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite"
            keyTimes="${pacmanColorAnimation.keyTimes}"
            values="${pacmanColorAnimation.values}"/>
        <animateTransform attributeName="transform" type="translate" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite"
            keyTimes="${pacmanPositionAnimation.keyTimes}"
            values="${pacmanPositionAnimation.values}"
            additive="sum"/>
        <animateTransform attributeName="transform" type="rotate" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite"
            keyTimes="${pacmanRotationAnimation.keyTimes}"
            values="${pacmanRotationAnimation.values}"
            additive="sum"/>
        <animate attributeName="d" dur="0.5s" repeatCount="indefinite"
            values="${generatePacManPath(0.55)};${generatePacManPath(0.05)};${generatePacManPath(0.55)}"/>
    </path>`;
    // Ghosts
    store.ghosts.forEach((ghost, index) => {
        const ghostPositionAnimation = generateChangingValuesAnimation(store, generateGhostPositions(store, index));
        const ghostColorAnimation = generateChangingValuesAnimation(store, generateGhostColors(store, index));
        svg += `<use id="ghost${index}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" href="#ghost-${ghost.name}">
            <animateTransform attributeName="transform" type="translate" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite"
                keyTimes="${ghostPositionAnimation.keyTimes}"
                values="${ghostPositionAnimation.values}"/>
            <animate attributeName="href" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite"
                keyTimes="${ghostColorAnimation.keyTimes}"
                values="${ghostColorAnimation.values}"/>
        </use>`;
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
const generatePacManPositions = (store) => {
    return store.gameHistory.map((state) => {
        const x = state.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = state.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
        return `${x},${y}`;
    });
};
const generatePacManRotations = (store) => {
    const pivit = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    return store.gameHistory.map((state) => {
        switch (state.pacman.direction) {
            case 'right':
                return `0 ${pivit} ${pivit}`;
            case 'left':
                return `180 ${pivit} ${pivit}`;
            case 'up':
                return `270 ${pivit} ${pivit}`;
            case 'down':
                return `90 ${pivit} ${pivit}`;
            default:
                return `0 ${pivit} ${pivit}`;
        }
    });
};
const generatePacManColors = (store) => {
    return store.gameHistory.map((state) => {
        if (state.pacman.deadRemainingDuration) {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
        }
        else if (state.pacman.powerupRemainingDuration) {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_POWERUP;
        }
        else {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR;
        }
    });
};
const generateCellColorValues = (store, x, y) => {
    return store.gameHistory.map((state) => {
        const intensity = state.grid[x][y];
        if (intensity > 0) {
            const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
            return _utils__WEBPACK_IMPORTED_MODULE_1__.Utils.hexToHexAlpha(_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).contributionBoxColor, adjustedIntensity);
        }
        else {
            return _utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).emptyContributionBoxColor;
        }
    });
};
const generateGhostPositions = (store, ghostIndex) => {
    return store.gameHistory.map((state) => {
        const ghost = state.ghosts[ghostIndex];
        const x = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
        return `${x},${y}`;
    });
};
const generateGhostColors = (store, ghostIndex) => {
    return store.gameHistory.map((state) => {
        const ghost = state.ghosts[ghostIndex];
        return '#' + (ghost.scared ? ghostShort('scared') : ghostShort(ghost.name));
    });
};
const generateGhostsPredefinition = () => {
    return `<defs>
		<symbol id="${ghostShort('blinky')}" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['blinky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="${ghostShort('clyde')}" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['clyde'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="${ghostShort('inky')}" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['inky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="${ghostShort('pinky')}" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['pinky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="${ghostShort('scared')}" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['scared'].imgDate}" width="100" height="100"/>
		</symbol>
	</defs>`;
};
const ghostShort = (ghostName) => {
    switch (ghostName) {
        case 'blinky':
            return 'gb';
        case 'clyde':
            return 'gc';
        case 'inky':
            return 'gi';
        case 'pinky':
            return 'gp';
        case 'scared':
            return 'gs';
        default:
            return ghostName;
    }
};
const generateChangingValuesAnimation = (store, changingValues) => {
    if (store.gameHistory.length !== changingValues.length) {
        throw new Error('The length of changingValues must match the length of gameHistory');
    }
    const totalFrames = store.gameHistory.length;
    let keyTimes = [];
    let values = [];
    let lastValue = null;
    let lastIndex = null;
    changingValues.forEach((currentValue, index) => {
        if (currentValue !== lastValue) {
            if (lastValue !== null && lastIndex !== null && index - 1 !== lastIndex) {
                // Add a keyframe right before the value change
                keyTimes.push(Number(((index - 0.000001) / (totalFrames - 1)).toFixed(6)));
                values.push(lastValue);
            }
            // Add the new value keyframe
            keyTimes.push(Number((index / (totalFrames - 1)).toFixed(6)));
            values.push(currentValue);
            lastValue = currentValue;
            lastIndex = index;
        }
    });
    // Ensure the last frame is always included
    if (keyTimes[keyTimes.length - 1] !== 1) {
        keyTimes.push(1);
        values.push(lastValue);
    }
    return {
        keyTimes: keyTimes.join(';'),
        values: values.join(';')
    };
};
const SVG = {
    generateAnimatedSVG
};


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Utils: () => (/* binding */ Utils)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const getGitlabContribution = (store) => __awaiter(void 0, void 0, void 0, function* () {
    // const response = await fetch(`https://gitlab.com/users/${username}/calendar.json`);
    const response = yield fetch(`https://v0-new-project-q1hhrdodoye-abozanona-gmailcoms-projects.vercel.app/api/contributions?username=${store.config.username}`);
    const contributionsList = yield response.json();
    return Object.entries(contributionsList).map(([date, count]) => ({
        date: new Date(date),
        count: Number(count)
    }));
});
const getGithubContribution = (store) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const commits = [];
    let isComplete = false;
    let page = 1;
    // TODO: Consider using GraphQL endpoint when user has an access token?
    do {
        try {
            const headers = {};
            if ((_a = store.config.githubSettings) === null || _a === void 0 ? void 0 : _a.accessToken) {
                headers['Authorization'] = 'Bearer ' + store.config.githubSettings.accessToken;
            }
            const response = yield fetch(`https://api.github.com/search/commits?q=author:${store.config.username}&sort=author-date&order=desc&page=${page}&per_page=1000`, {
                headers
            });
            const contributionsList = yield response.json();
            isComplete = contributionsList.items.length === 0;
            commits.push(...contributionsList.items);
            page++;
        }
        catch (ex) {
            isComplete = true;
        }
    } while (!isComplete);
    return Array.from(commits
        .reduce((map, item) => {
        const dateString = item.commit.committer.date.split('T')[0];
        const date = new Date(dateString);
        const count = (map.get(dateString) || { count: 0 }).count + 1;
        return map.set(dateString, { date, count });
    }, new Map())
        .values());
});
const getCurrentTheme = (store) => {
    var _a;
    return (_a = _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_THEMES[store.config.gameTheme]) !== null && _a !== void 0 ? _a : _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_THEMES['github'];
};
const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const hexToHexAlpha = (hex, alpha) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const alphaHex = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, '0');
    return `#${hex}${alphaHex}`;
};
const Utils = {
    getGitlabContribution,
    getGithubContribution,
    getCurrentTheme,
    hexToRGBA,
    hexToHexAlpha
};


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
/* harmony export */   PacmanRenderer: () => (/* binding */ PacmanRenderer)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.ts");
/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ "./src/grid.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class PacmanRenderer {
    constructor(conf) {
        this.store = structuredClone(_store__WEBPACK_IMPORTED_MODULE_2__.Store);
        this.conf = Object.assign({}, conf);
        _grid__WEBPACK_IMPORTED_MODULE_1__.Grid.buildWalls();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultConfing = {
                platform: 'github',
                username: '',
                canvas: undefined,
                outputFormat: 'svg',
                svgCallback: (_) => { },
                gameOverCallback: () => () => { },
                gameTheme: 'github',
                gameSpeed: 1,
                enableSounds: false,
                pointsIncreasedCallback: (_) => { }
            };
            this.store.config = Object.assign(Object.assign({}, defaultConfing), this.conf);
            switch (this.conf.platform) {
                case 'gitlab':
                    this.store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getGitlabContribution(this.store);
                    break;
                case 'github':
                    this.store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getGithubContribution(this.store);
                    break;
            }
            _game__WEBPACK_IMPORTED_MODULE_0__.Game.startGame(this.store);
        });
    }
    stop() {
        _game__WEBPACK_IMPORTED_MODULE_0__.Game.stopGame(this.store);
    }
}

})();

var __webpack_exports__PacmanRenderer = __webpack_exports__.PacmanRenderer;
export { __webpack_exports__PacmanRenderer as PacmanRenderer };

//# sourceMappingURL=pacman-contribution-graph.js.map