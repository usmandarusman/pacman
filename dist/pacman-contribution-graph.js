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
    store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).gridBackground;
    store.config.canvas.getContext('2d').fillRect(0, 0, store.config.canvas.width, store.config.canvas.height);
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
            const intensity = store.grid[x][y].intensity;
            if (intensity > 0) {
                const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
                const color = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.hexToRGBA(_utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).contributionBoxColor, adjustedIntensity);
                store.config.canvas.getContext('2d').fillStyle = color;
            }
            else {
                store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).emptyContributionBoxColor;
            }
            store.config.canvas.getContext('2d').beginPath();
            store.config.canvas
                .getContext('2d')
                .roundRect(y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE), x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, 5);
            store.config.canvas.getContext('2d').fill();
        }
    }
    store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).textColor;
    store.config.canvas.getContext('2d').font = '10px Arial';
    store.config.canvas.getContext('2d').textAlign = 'center';
    let lastMonth = '';
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
        if (store.monthLabels[y] !== lastMonth) {
            const xPos = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            store.config.canvas.getContext('2d').fillText(store.monthLabels[y], xPos, 10);
            lastMonth = store.monthLabels[y];
        }
    }
};
const drawPacman = (store) => {
    const x = store.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    const y = store.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2 + 15;
    const radius = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    // Change Pac-Man's color to red if he's on power-up, dead, else yellow
    if (store.pacman.deadRemainingDuration) {
        store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
    }
    else if (store.pacman.powerupRemainingDuration) {
        store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_POWERUP;
    }
    else {
        store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR;
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
    store.config.canvas.getContext('2d').beginPath();
    store.config.canvas.getContext('2d').arc(x, y, radius, startAngle, endAngle);
    store.config.canvas.getContext('2d').lineTo(x, y);
    store.config.canvas.getContext('2d').fill();
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
        const x = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
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
    store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme(store).textColor;
    store.config.canvas.getContext('2d').font = '20px Arial';
    store.config.canvas.getContext('2d').textAlign = 'center';
    store.config.canvas.getContext('2d').fillText('Game Over', store.config.canvas.width / 2, store.config.canvas.height / 2);
};
const drawSoundController = (store) => {
    if (!store.config.enableSounds) {
        return;
    }
    const width = 30, height = 30, left = store.config.canvas.width - width - 10, top = 10;
    store.config.canvas.getContext('2d').fillStyle = `rgba(0, 0, 0, ${_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted ? 0.3 : 0.5})`;
    store.config.canvas.getContext('2d').beginPath();
    store.config.canvas.getContext('2d').moveTo(left + 10, top + 10);
    store.config.canvas.getContext('2d').lineTo(left + 20, top + 5);
    store.config.canvas.getContext('2d').lineTo(left + 20, top + 25);
    store.config.canvas.getContext('2d').lineTo(left + 10, top + 20);
    store.config.canvas.getContext('2d').closePath();
    store.config.canvas.getContext('2d').fill();
    if (!_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted) {
        store.config.canvas.getContext('2d').strokeStyle = `rgba(0, 0, 0, 0.4)`;
        store.config.canvas.getContext('2d').lineWidth = 2;
        // First wave
        store.config.canvas.getContext('2d').beginPath();
        store.config.canvas.getContext('2d').arc(left + 25, top + 15, 5, 0, Math.PI * 2);
        store.config.canvas.getContext('2d').stroke();
        // Second wave
        store.config.canvas.getContext('2d').beginPath();
        store.config.canvas.getContext('2d').arc(left + 25, top + 15, 8, 0, Math.PI * 2);
        store.config.canvas.getContext('2d').stroke();
    }
    else {
        // Mute line
        store.config.canvas.getContext('2d').strokeStyle = 'rgba(255, 0, 0, 0.6)';
        store.config.canvas.getContext('2d').lineWidth = 3;
        store.config.canvas.getContext('2d').beginPath();
        store.config.canvas.getContext('2d').moveTo(left + 25, top + 5);
        store.config.canvas.getContext('2d').lineTo(left + 5, top + 25);
        store.config.canvas.getContext('2d').stroke();
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
/* harmony export */   PACMAN_POWERUP_DURATION: () => (/* binding */ PACMAN_POWERUP_DURATION)
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
        emptyContributionBoxColor: '#ebedf0'
    },
    'github-dark': {
        textColor: '#8b949e',
        gridBackground: '#0d1117',
        contributionBoxColor: '#26a641',
        emptyContributionBoxColor: '#161b22'
    },
    gitlab: {
        textColor: '#626167',
        gridBackground: '#ffffff',
        contributionBoxColor: '#7992f5',
        emptyContributionBoxColor: '#ececef'
    },
    'gitlab-dark': {
        textColor: '#999999',
        gridBackground: '#1f1f1f',
        contributionBoxColor: '#2e7db1',
        emptyContributionBoxColor: '#2d2d2d'
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
/* harmony import */ var _music_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./music-player */ "./src/music-player.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svg */ "./src/svg.ts");
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
    store.grid = Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT }, () => Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH }, () => ({ commitsCount: 0, intensity: 0 })));
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
            store.grid[dayOfWeek][_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - weeksAgo] = { commitsCount: contribution.count, intensity: 0 };
            if (contribution.count > maxCommits)
                maxCommits = contribution.count;
        }
    });
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
            if (store.grid[x][y].commitsCount > 0) {
                store.grid[x][y].intensity = store.grid[x][y].commitsCount / maxCommits;
            }
        }
    }
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
        const weeksAgo = _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - y;
        const columnDate = new Date(startOfCurrentWeek);
        columnDate.setDate(columnDate.getDate() - weeksAgo * 7);
        store.monthLabels[y] = _constants__WEBPACK_IMPORTED_MODULE_1__.MONTHS[columnDate.getMonth()];
    }
};
const placePacman = (store) => {
    let validCells = [];
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
            if (store.grid[x][y].intensity > 0)
                validCells.push({ x, y });
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
    if (store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawPacman(store);
};
const placeGhosts = (store) => {
    store.ghosts = [];
    for (let i = 0; i < 4; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
            y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
        } while (store.grid[x][y].intensity === 0);
        store.ghosts.push({ x, y, name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[i], scared: false, target: undefined });
    }
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
            _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().mute();
        }
        yield _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().preloadSounds();
        _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().startDefaultSound();
        yield _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.BEGINNING);
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
            if (store.config.outputFormat == 'canvas')
                _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance()
                    .play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.GAME_OVER)
                    .then(() => _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().startDefaultSound());
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
                _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance()
                    .play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.BEGINNING)
                    .then(() => _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().stopDefaultSound());
            }
        }
        if (store.config.outputFormat == 'svg') {
            const animatedSVG = _svg__WEBPACK_IMPORTED_MODULE_3__.SVG.generateAnimatedSVG(store);
            store.config.svgCallback(animatedSVG);
        }
        store.config.gameOverCallback();
        return;
    }
    movePacman(store);
    moveGhosts(store);
    checkCollisions(store);
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
const movePacman = (store) => {
    if (store.pacman.deadRemainingDuration) {
        return;
    }
    let targetCells = [];
    if (store.pacman.powerupRemainingDuration) {
        targetCells = store.ghosts.map((ghost) => ({
            x: ghost.x,
            y: ghost.y,
            distance: Infinity
        }));
    }
    else {
        for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
            for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
                if (store.grid[x][y].intensity > 0)
                    targetCells.push({ x, y, distance: Infinity });
            }
        }
    }
    if (targetCells.length === 0)
        return;
    const closest = targetCells.reduce((closest, cell) => {
        const distance = Math.abs(cell.x - store.pacman.x) + Math.abs(cell.y - store.pacman.y);
        return distance < closest.distance ? Object.assign(Object.assign({}, cell), { distance }) : closest;
    }, { x: store.pacman.x, y: store.pacman.y, distance: Infinity });
    const dx = closest.x - store.pacman.x;
    const dy = closest.y - store.pacman.y;
    if (Math.abs(dx) > Math.abs(dy)) {
        store.pacman.x += Math.sign(dx);
        store.pacman.direction = dx > 0 ? 'down' : 'up';
    }
    else {
        store.pacman.y += Math.sign(dy);
        store.pacman.direction = dy > 0 ? 'right' : 'left';
    }
    if (store.grid[store.pacman.x][store.pacman.y].intensity > 0) {
        store.pacman.totalPoints += store.grid[store.pacman.x][store.pacman.y].commitsCount;
        store.pacman.points++;
        store.config.pointsIncreasedCallback(store.pacman.totalPoints);
        store.grid[store.pacman.x][store.pacman.y].intensity = 0;
        if (store.pacman.points >= 30)
            activatePowerUp(store);
    }
};
const moveGhosts = (store) => {
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
            if (store.pacman.powerupRemainingDuration && Math.random() < 0.5)
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
const checkCollisions = (store) => {
    if (store.pacman.deadRemainingDuration)
        return;
    store.ghosts.forEach((ghost, index) => {
        if (ghost.x === store.pacman.x && ghost.y === store.pacman.y) {
            if (store.pacman.powerupRemainingDuration && ghost.scared) {
                respawnGhost(store, index);
                store.pacman.points += 10;
                if (store.config.outputFormat == 'canvas') {
                    _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.EAT_GHOST);
                }
            }
            else {
                store.pacman.points = 0;
                store.pacman.powerupRemainingDuration = 0;
                store.pacman.deadRemainingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_DEATH_DURATION;
                if (store.config.outputFormat == 'canvas') {
                    _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance()
                        .play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.GAME_OVER)
                        .then(() => _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().stopDefaultSound());
                }
            }
        }
    });
};
const respawnGhost = (store, ghostIndex) => {
    let x, y;
    do {
        x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
        y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
    } while ((Math.abs(x - store.pacman.x) <= 2 && Math.abs(y - store.pacman.y) <= 2) || store.grid[x][y].intensity === 0);
    store.ghosts[ghostIndex] = {
        x,
        y,
        name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[ghostIndex % _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES.length],
        scared: false,
        target: undefined
    };
};
const activatePowerUp = (store) => {
    store.pacman.powerupRemainingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_POWERUP_DURATION;
    store.ghosts.forEach((ghost) => (ghost.scared = true));
};
const Game = {
    startGame,
    stopGame
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
        powerupRemainingDuration: 0
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
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
            const cellX = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
            const cellY = x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
            const cellColorAnimation = generateChangingValuesAnimation(store, generateCellColorValues(store, x, y));
            svg += `<rect id="c-${x}-${y}" x="${cellX}" y="${cellY}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" rx="5" fill="${_utils__WEBPACK_IMPORTED_MODULE_1__.Utils.getCurrentTheme(store).emptyContributionBoxColor}">
                <animate attributeName="fill" dur="${store.gameHistory.length * _constants__WEBPACK_IMPORTED_MODULE_0__.DELTA_TIME}ms" repeatCount="indefinite" 
                    values="${cellColorAnimation.values}" 
                    keyTimes="${cellColorAnimation.keyTimes}"/>
            </rect>`;
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
        const x = state.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = state.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
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
        const x = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
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
    changingValues.forEach((currentValue, index) => {
        if (currentValue !== lastValue) {
            if (lastValue !== null) {
                // Add a keyframe right before the color change
                keyTimes.push(Number(((index - 0.000001) / (totalFrames - 1)).toFixed(6)));
                values.push(lastValue);
            }
            // Add the new color keyframe
            keyTimes.push(Number((index / (totalFrames - 1)).toFixed(6)));
            values.push(currentValue);
            lastValue = currentValue;
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



class PacmanRenderer {
    constructor(conf) {
        this.store = Object.assign({}, _store__WEBPACK_IMPORTED_MODULE_1__.Store);
        this.conf = Object.assign({}, conf);
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
                    this.store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getGitlabContribution(this.store);
                    break;
                case 'github':
                    this.store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getGithubContribution(this.store);
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