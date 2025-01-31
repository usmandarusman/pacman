import * as Canvas from './canvas';
import * as Game from './game';
import { Store } from './store';
import { Config } from './types';
import * as Utils from './utils';

export const renderContributions = async (conf: Config) => {
	Store.config = conf;
	if (conf.platform == 'gitlab') {
		Store.contributions = await Utils.getGitlabContribution(conf.username);
	} else {
		Store.contributions = await Utils.getGithubContribution(conf.username);
	}

	if (Store.config.outputFormat == 'canvas') {
		Store.config.canvas = conf.canvas;
		Utils.resizeCanvas();
	}

	Game.initializeGrid();

	if (Store.config.outputFormat == 'canvas') Canvas.drawGrid();
	Game.placePacman();
	Game.placeGhosts();
	Game.startGame();
};
