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
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");




const resizeCanvas = () => {
    const canvasWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
    const canvasHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 20; // Adding some space for months on top
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.width = canvasWidth;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.height = canvasHeight;
};
const drawGrid = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getCurrentTheme().gridBackground;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillRect(0, 0, _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.width, _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.height);
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
            const intensity = _store__WEBPACK_IMPORTED_MODULE_2__.Store.grid[x][y].intensity;
            if (intensity > 0) {
                const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
                const color = _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.hexToRGBA(_utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getCurrentTheme().contributionBoxColor, adjustedIntensity);
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = color;
            }
            else {
                _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getCurrentTheme().emptyContributionBoxColor;
            }
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').beginPath();
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas
                .getContext('2d')
                .roundRect(y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE), x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE, 5);
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fill();
        }
    }
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getCurrentTheme().textColor;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').font = '10px Arial';
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').textAlign = 'center';
    let lastMonth = '';
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
        if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.monthLabels[y] !== lastMonth) {
            const xPos = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillText(_store__WEBPACK_IMPORTED_MODULE_2__.Store.monthLabels[y], xPos, 10);
            lastMonth = _store__WEBPACK_IMPORTED_MODULE_2__.Store.monthLabels[y];
        }
    }
};
const drawPacman = () => {
    const x = _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    const y = _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2 + 15;
    const radius = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
    // Change Pac-Man's color to red if he's on power-up, dead, else yellow
    if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.deadRemainingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
    }
    else if (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.powerupRemainingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_POWERUP;
    }
    else {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR;
    }
    const mouthAngle = _store__WEBPACK_IMPORTED_MODULE_2__.Store.pacmanMouthOpen ? 0.35 * Math.PI : 0.1 * Math.PI;
    let startAngle, endAngle;
    switch (_store__WEBPACK_IMPORTED_MODULE_2__.Store.pacman.direction) {
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
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').beginPath();
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').arc(x, y, radius, startAngle, endAngle);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineTo(x, y);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fill();
};
const drawGhosts = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.ghosts.forEach((ghost) => {
        const x = ghost.y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
        const y = ghost.x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
        const size = _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE;
        const ctx = _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d');
        if (ghost.scared) {
            ctx.drawImage(_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['scared'].img, x, y, size, size);
        }
        else {
            ctx.drawImage(_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS[ghost.name].img, x, y, size, size);
        }
    });
};
const renderGameOver = () => {
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = _utils__WEBPACK_IMPORTED_MODULE_3__.Utils.getCurrentTheme().textColor;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').font = '20px Arial';
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').textAlign = 'center';
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillText('Game Over', _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.width / 2, _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.height / 2);
};
const drawSoundController = () => {
    if (!_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.enableSounds) {
        return;
    }
    const width = 30, height = 30, left = _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.width - width - 10, top = 10;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fillStyle = `rgba(0, 0, 0, ${_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted ? 0.3 : 0.5})`;
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').beginPath();
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').moveTo(left + 10, top + 10);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineTo(left + 20, top + 5);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineTo(left + 20, top + 25);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineTo(left + 10, top + 20);
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').closePath();
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').fill();
    if (!_music_player__WEBPACK_IMPORTED_MODULE_1__.MusicPlayer.getInstance().isMuted) {
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').strokeStyle = `rgba(0, 0, 0, 0.4)`;
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineWidth = 2;
        // First wave
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').beginPath();
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').arc(left + 25, top + 15, 5, 0, Math.PI * 2);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').stroke();
        // Second wave
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').beginPath();
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').arc(left + 25, top + 15, 8, 0, Math.PI * 2);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').stroke();
    }
    else {
        // Mute line
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').strokeStyle = 'rgba(255, 0, 0, 0.6)';
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineWidth = 3;
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').beginPath();
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').moveTo(left + 25, top + 5);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').lineTo(left + 5, top + 25);
        _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getContext('2d').stroke();
    }
};
const listenToSoundController = () => {
    if (!_store__WEBPACK_IMPORTED_MODULE_2__.Store.config.enableSounds) {
        return;
    }
    _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.addEventListener('click', function (event) {
        const rect = _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left, y = event.clientY - rect.top;
        const width = 30, height = 30, left = _store__WEBPACK_IMPORTED_MODULE_2__.Store.config.canvas.width - width - 10, top = 10;
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
const DELTA_TIME = 250;
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
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4T+2TUQ7AIAhDy/0PzQIRAqxmLtnn/DJPWypBAVkKKOMCyOQN7IRElLrcnIrDLNK4wVtxNbkb6Hq+jOcSbim6QVzKEstkw92gxVeFrMpqokix4wA+NvCOnvfArvcEbHoe2G9QmmhDMUc65p3xYC6q3zQPxtdl3NgF5QpL/b/rs3IAAAAASUVORK5CYIIA',
        img: new Image()
    },
    clyde: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4T+2T0Q6AIAhFLx9sH1MfTIPCAeLKrcd8PHqP4JBQLN7BFacNlHkAs+AQcqIueBs2mVWjgtWwl4yCdrd/pHYLLlVEgR2yK0wy4SoI5TcGXU4wM+AEJQfwsUCuXngDOR4rqKbngf0C94gyFHmkbd4rbkxD/pv2jfR1Ky7sBNrzXbHpnBX+AAAAAElFTkSuQmCC',
        img: new Image()
    },
    inky: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAg0lEQVQ4T+WTWxKAIAhFuQvK/a+jFoT5QAVxypn+6vMEx6sDIO/jk12OAMs1WDVOXV3UBW+bRVbTFMFu8yCZBExH/g26VHCXI0AJpKgdUCUrTlkwxE+FECdzS7HiJemXgvyeO29gE7jD8wDVFX4vSLNtR1q2z+OVlaZxTaXYrq7HbxYBS8VgMVrqzkEAAAAASUVORK5CYIIA',
        img: new Image()
    },
    pinky: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhklEQVQ4T+2T0Q2AIAwF281wC50Qt9DNagoptqVESfyUz4N3vJCCECxaD4o47gt6bsAo2IWUqAnehkUmbYpgNqwlvSCnur+dtnnAuYUVyCGJimTAi8DUzwmwOoGI7hYjDgAfC/jqiTfg47ZBND0P7BeoR+Sh8CMt8x5xYSWkv2nbcF834swuA/9u49Yy5bgAAAAASUVORK5CYIIA',
        img: new Image()
    },
    scared: {
        imgDate: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeUlEQVQ4T82TUQ6AMAhD7UX0/sdyF0GREVmDmTN+bH9r6Bs0A0t2VpFULwDrrfBkZFcA3YC3ZodViAFGzQHyP0B2w2NrB0/1AoDbHwLoQ5/nrw1OBuD5e/crbM9Aiz35njHWzpSB/m3+0r40mV41M8U19WJe3Uw/tQOKt08pUUbBEQAAAABJRU5ErkJgggAA',
        img: new Image()
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
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./svg */ "./src/svg.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const initializeGrid = () => {
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.points = 0;
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.totalPoints = 0;
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid = Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT }, () => Array.from({ length: _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH }, () => ({ commitsCount: 0, intensity: 0 })));
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.monthLabels = Array(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH).fill('');
    let maxCommits = 1;
    const now = new Date();
    const startOfCurrentWeek = new Date(now);
    startOfCurrentWeek.setDate(now.getDate() - now.getDay());
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.contributions.forEach((contribution) => {
        const contributionDate = new Date(contribution.date);
        const dayOfWeek = contributionDate.getDay();
        const weeksAgo = Math.floor((+startOfCurrentWeek - +contributionDate) / (1000 * 60 * 60 * 24 * 7));
        if (weeksAgo >= 0 && weeksAgo < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH && dayOfWeek >= 0 && dayOfWeek < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT) {
            _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[dayOfWeek][_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - weeksAgo] = { commitsCount: contribution.count, intensity: 0 };
            if (contribution.count > maxCommits)
                maxCommits = contribution.count;
        }
    });
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
            if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].commitsCount > 0) {
                _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].intensity = _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].commitsCount / maxCommits;
            }
        }
    }
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
        const weeksAgo = _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH - 1 - y;
        const columnDate = new Date(startOfCurrentWeek);
        columnDate.setDate(columnDate.getDate() - weeksAgo * 7);
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.monthLabels[y] = _constants__WEBPACK_IMPORTED_MODULE_1__.MONTHS[columnDate.getMonth()];
    }
};
const placePacman = () => {
    let validCells = [];
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
            if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].intensity > 0)
                validCells.push({ x, y });
        }
    }
    if (validCells.length > 0) {
        const randomCell = validCells[Math.floor(Math.random() * validCells.length)];
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman = {
            x: randomCell.x,
            y: randomCell.y,
            direction: 'right',
            points: 0,
            totalPoints: 0,
            deadRemainingDuration: 0,
            powerupRemainingDuration: 0
        };
    }
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawPacman();
};
const placeGhosts = () => {
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts = [];
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.scaredGhostsDestinations = [];
    for (let i = 0; i < 4; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
            y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
        } while (_store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].intensity === 0);
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.push({ x, y, name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[i], scared: false, target: undefined });
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.scaredGhostsDestinations.push({ x: 0, y: 0 });
    }
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGhosts();
};
const startGame = () => __awaiter(void 0, void 0, void 0, function* () {
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas') {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.config.canvas = _store__WEBPACK_IMPORTED_MODULE_3__.Store.config.canvas;
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.resizeCanvas();
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.listenToSoundController();
    }
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.frameCount = 0;
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.forEach((ghost) => (ghost.scared = false));
    initializeGrid();
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGrid();
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas') {
        if (!_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.enableSounds) {
            _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().mute();
        }
        yield _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().preloadSounds();
        _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().startDefaultSound();
        yield _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.BEGINNING);
    }
    placePacman();
    placeGhosts();
    _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.blinky.img.src = _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.blinky.imgDate;
    _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.clyde.img.src = _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.clyde.imgDate;
    _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.inky.img.src = _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.inky.imgDate;
    _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.pinky.img.src = _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.pinky.imgDate;
    _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.scared.img.src = _constants__WEBPACK_IMPORTED_MODULE_1__.GHOSTS.scared.imgDate;
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'svg') {
        const remainingCells = () => _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid.some((row) => row.some((cell) => cell.intensity > 0));
        while (remainingCells()) {
            yield updateGame();
        }
        // One more time to generate svg
        yield updateGame();
    }
    else {
        clearInterval(_store__WEBPACK_IMPORTED_MODULE_3__.Store.gameInterval);
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.gameInterval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () { return yield updateGame(); }), _constants__WEBPACK_IMPORTED_MODULE_1__.DELTA_TIME);
    }
});
const updateGame = () => __awaiter(void 0, void 0, void 0, function* () {
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.frameCount++;
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.frameCount % _store__WEBPACK_IMPORTED_MODULE_3__.Store.config.gameSpeed !== 0) {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.gameHistory.push({
            pacman: Object.assign({}, _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman),
            ghosts: _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.map((ghost) => (Object.assign({}, ghost))),
            grid: _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid.map((row) => [...row.map((col) => col.intensity)])
        });
        return;
    }
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.deadRemainingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.deadRemainingDuration--;
        if (!_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.deadRemainingDuration) {
            // IT'S ALIVE!
            if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
                _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance()
                    .play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.GAME_OVER)
                    .then(() => _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().startDefaultSound());
        }
    }
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration) {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration--;
        if (!_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration) {
            _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.forEach((ghost) => (ghost.scared = false));
            _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.points = 0;
        }
    }
    const remainingCells = _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid.some((row) => row.some((cell) => cell.intensity > 0));
    if (!remainingCells) {
        if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas') {
            clearInterval(_store__WEBPACK_IMPORTED_MODULE_3__.Store.gameInterval);
            if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas') {
                _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.renderGameOver();
                _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance()
                    .play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.BEGINNING)
                    .then(() => _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().stopDefaultSound());
            }
        }
        if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'svg') {
            const animatedSVG = _svg__WEBPACK_IMPORTED_MODULE_4__.SVG.generateAnimatedSVG();
            const svgBlob = new Blob([animatedSVG], {
                type: 'image/svg+xml;charset=utf-8'
            });
            const svgUrl = URL.createObjectURL(svgBlob);
            _store__WEBPACK_IMPORTED_MODULE_3__.Store.config.svgCallback(svgUrl);
        }
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.config.gameOverCallback();
        return;
    }
    movePacman();
    moveGhosts();
    checkCollisions();
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacmanMouthOpen = !_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacmanMouthOpen;
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.gameHistory.push({
        pacman: Object.assign({}, _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman),
        ghosts: _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.map((ghost) => (Object.assign({}, ghost))),
        grid: _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid.map((row) => [...row.map((col) => col.intensity)])
    });
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGrid();
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawPacman();
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawGhosts();
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas')
        _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas.drawSoundController();
});
const movePacman = () => {
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.deadRemainingDuration) {
        return;
    }
    let targetCells = [];
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration) {
        targetCells = _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.map((ghost) => ({
            x: ghost.x,
            y: ghost.y,
            distance: Infinity
        }));
    }
    else {
        for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT; x++) {
            for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH; y++) {
                if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].intensity > 0)
                    targetCells.push({ x, y, distance: Infinity });
            }
        }
    }
    if (targetCells.length === 0)
        return;
    const closest = targetCells.reduce((closest, cell) => {
        const distance = Math.abs(cell.x - _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x) + Math.abs(cell.y - _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y);
        return distance < closest.distance ? Object.assign(Object.assign({}, cell), { distance }) : closest;
    }, { x: _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x, y: _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y, distance: Infinity });
    const dx = closest.x - _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x;
    const dy = closest.y - _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y;
    if (Math.abs(dx) > Math.abs(dy)) {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x += Math.sign(dx);
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.direction = dx > 0 ? 'down' : 'up';
    }
    else {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y += Math.sign(dy);
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.direction = dy > 0 ? 'right' : 'left';
    }
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x][_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y].intensity > 0) {
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.totalPoints += _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x][_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y].commitsCount;
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.points++;
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.config.pointsIncreasedCallback(_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.totalPoints);
        _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x][_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y].intensity = 0;
        if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.points >= 30)
            activatePowerUp();
    }
};
const moveGhosts = () => {
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.forEach((ghost, index) => {
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
            if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration && Math.random() < 0.5)
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
    if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.deadRemainingDuration)
        return;
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.forEach((ghost, index) => {
        if (ghost.x === _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x && ghost.y === _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y) {
            if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration && ghost.scared) {
                respawnGhost(index);
                _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.points += 10;
                if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas') {
                    _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.EAT_GHOST);
                }
            }
            else {
                _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.points = 0;
                _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration = 0;
                _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.deadRemainingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_DEATH_DURATION;
                if (_store__WEBPACK_IMPORTED_MODULE_3__.Store.config.outputFormat == 'canvas') {
                    _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance()
                        .play(_music_player__WEBPACK_IMPORTED_MODULE_2__.Sound.GAME_OVER)
                        .then(() => _music_player__WEBPACK_IMPORTED_MODULE_2__.MusicPlayer.getInstance().stopDefaultSound());
                }
            }
        }
    });
};
const respawnGhost = (ghostIndex) => {
    let x, y;
    do {
        x = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_HEIGHT);
        y = Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_WIDTH);
    } while ((Math.abs(x - _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.x) <= 2 && Math.abs(y - _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.y) <= 2) || _store__WEBPACK_IMPORTED_MODULE_3__.Store.grid[x][y].intensity === 0);
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts[ghostIndex] = {
        x,
        y,
        name: _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES[ghostIndex % _constants__WEBPACK_IMPORTED_MODULE_1__.GHOST_NAMES.length],
        scared: false,
        target: undefined
    };
};
const activatePowerUp = () => {
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.pacman.powerupRemainingDuration = _constants__WEBPACK_IMPORTED_MODULE_1__.PACMAN_POWERUP_DURATION;
    _store__WEBPACK_IMPORTED_MODULE_3__.Store.ghosts.forEach((ghost) => (ghost.scared = true));
};
const Game = {
    startGame
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
    Sound["DEFAULT"] = "https://cdn.jsdelivr.net/gh/abozanona/pacman-contribution-graph@1.0.2/src/assets/sounds/pacman_chomp.wav";
    Sound["BEGINNING"] = "https://cdn.jsdelivr.net/gh/abozanona/pacman-contribution-graph@1.0.2/src/assets/sounds/pacman_beginning.wav";
    Sound["GAME_OVER"] = "https://cdn.jsdelivr.net/gh/abozanona/pacman-contribution-graph@1.0.2/src/assets/sounds/pacman_death.wav";
    Sound["EAT_GHOST"] = "https://cdn.jsdelivr.net/gh/abozanona/pacman-contribution-graph@1.0.2/src/assets/sounds/pacman_eatghost.wav";
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
/* harmony export */   SVG: () => (/* binding */ SVG)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/store.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



const generateAnimatedSVG = () => {
    const svgWidth = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
    const svgHeight = _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 20;
    let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="100%" height="100%" fill="${_utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme().gridBackground}"/>`;
    svg += generateGhostsPredefinition();
    // Month labels
    let lastMonth = '';
    for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y] !== lastMonth) {
            const xPos = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + _constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE / 2;
            svg += `<text x="${xPos}" y="10" text-anchor="middle" font-size="10" fill="${_utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme().textColor}">${_store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y]}</text>`;
            lastMonth = _store__WEBPACK_IMPORTED_MODULE_1__.Store.monthLabels[y];
        }
    }
    // Grid
    for (let x = 0; x < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_HEIGHT; x++) {
        for (let y = 0; y < _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_WIDTH; y++) {
            const cellX = y * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE);
            const cellY = x * (_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE + _constants__WEBPACK_IMPORTED_MODULE_0__.GAP_SIZE) + 15;
            const intensity = _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory[0].grid[x][y];
            const color = intensity > 0 ? getContributionColor(intensity) : _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme().emptyContributionBoxColor;
            svg += `<rect id="cell-${x}-${y}" x="${cellX}" y="${cellY}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" rx="5" fill="${color}">
                <animate attributeName="fill" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite" 
                    values="${generateCellColorValues(x, y)}" 
                    keyTimes="${generateKeyTimes()}"/>
            </rect>`;
        }
    }
    // Pacman
    svg += `<path id="pacman" d="${generatePacManPath(0.35)}"
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
        svg += `<use id="ghost${index}" width="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" height="${_constants__WEBPACK_IMPORTED_MODULE_0__.CELL_SIZE}" href="#ghost-${ghost.name}">
            <animateTransform attributeName="transform" type="translate" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostPositions(index)}"/>
            <animate attributeName="href" dur="${_store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory.length * 300}ms" repeatCount="indefinite"
                keyTimes="${generateKeyTimes()}"
                values="${generateGhostColors(index)}"/>
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
        if (state.pacman.deadRemainingDuration) {
            return _constants__WEBPACK_IMPORTED_MODULE_0__.PACMAN_COLOR_DEAD;
        }
        else if (state.pacman.powerupRemainingDuration) {
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
        return intensity > 0 ? getContributionColor(intensity) : _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme().emptyContributionBoxColor;
    })
        .join(';');
};
const getContributionColor = (intensity) => {
    const adjustedIntensity = intensity < 0.2 ? 0.3 : intensity;
    return _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.hexToRGBA(_utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getCurrentTheme().contributionBoxColor, adjustedIntensity);
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
const generateGhostColors = (ghostIndex) => {
    return _store__WEBPACK_IMPORTED_MODULE_1__.Store.gameHistory
        .map((state) => {
        const ghost = state.ghosts[ghostIndex];
        return ghost.scared ? '#scared' : '#' + ghost.name;
    })
        .join(';');
};
const generateGhostsPredefinition = () => {
    return `<defs>
		<symbol id="blinky" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['blinky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="clyde" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['clyde'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="inky" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['inky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="pinky" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['pinky'].imgDate}" width="100" height="100"/>
		</symbol>
		<symbol id="scared" viewBox="0 0 100 100">
            <image href="${_constants__WEBPACK_IMPORTED_MODULE_0__.GHOSTS['scared'].imgDate}" width="100" height="100"/>
		</symbol>
	</defs>`;
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
const getCurrentTheme = () => {
    var _a;
    return (_a = _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_THEMES[_store__WEBPACK_IMPORTED_MODULE_1__.Store.config.gameTheme]) !== null && _a !== void 0 ? _a : _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_THEMES['github'];
};
function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const Utils = {
    getGitlabContribution,
    getGithubContribution,
    getCurrentTheme,
    hexToRGBA
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
    const defaultConfing = {
        platform: 'github',
        username: '',
        canvas: undefined,
        outputFormat: 'svg',
        svgCallback: (_) => { },
        gameOverCallback: () => () => { },
        gameTheme: 'github',
        gameSpeed: 1,
        enableSounds: true,
        pointsIncreasedCallback: (_) => { }
    };
    _store__WEBPACK_IMPORTED_MODULE_1__.Store.config = Object.assign(Object.assign({}, defaultConfing), conf);
    switch (conf.platform) {
        case 'gitlab':
            _store__WEBPACK_IMPORTED_MODULE_1__.Store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getGitlabContribution(conf.username);
            break;
        case 'github':
            _store__WEBPACK_IMPORTED_MODULE_1__.Store.contributions = yield _utils__WEBPACK_IMPORTED_MODULE_2__.Utils.getGithubContribution(conf.username);
            break;
    }
    _game__WEBPACK_IMPORTED_MODULE_0__.Game.startGame();
});

})();

var __webpack_exports__renderContributions = __webpack_exports__.renderContributions;
export { __webpack_exports__renderContributions as renderContributions };

//# sourceMappingURL=pacman-contribution-graph.js.map