import * as Canvas from './canvas';
import * as Game from './game';
import { Store } from './store';
import * as Utils from './utils';

export const renderContributions = async (conf: {
	platform: 'github' | 'gitlab';
	username: string;
	canvas: HTMLCanvasElement;
	output: 'canvas' | 'svg';
	svgCallback: (blonUrl: string) => void;
	gameOverCallback: () => void;
}) => {
	if (conf.platform == 'gitlab') {
		Store.contributions = await Utils.getGitlabContribution(conf.username);
	} else {
		Store.contributions = await Utils.getGithubContribution(conf.username);
	}
	if (conf.output) {
		Store.outputFormat = conf.output;
	}
	Store.svgCallback = conf.svgCallback;
	Store.gameOverCallback = conf.gameOverCallback;

	if (conf.output == 'canvas') {
		Store.canvas = conf.canvas;
		Utils.resizeCanvas();
	}

	Game.initializeGrid();

	if (conf.output == 'canvas') Canvas.drawGrid();
	Game.placePacman();
	Game.placeGhosts();
	Game.startGame();
};
