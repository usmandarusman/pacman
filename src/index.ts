import { Game } from './game';
import { Store } from './store';
import { Config } from './types';
import { Utils } from './utils';

export const renderContributions = async (conf: Config) => {
	const defaultConfing: Config = {
		platform: 'github',
		username: '',
		canvas: undefined as unknown as HTMLCanvasElement,
		outputFormat: 'svg',
		svgCallback: (_: string) => {},
		gameOverCallback: () => () => {},
		gameTheme: 'github',
		gameSpeed: 1,
		enableSounds: true
	};
	Store.config = { ...defaultConfing, ...conf };

	switch (conf.platform) {
		case 'gitlab':
			Store.contributions = await Utils.getGitlabContribution(conf.username);
			break;

		case 'github':
			Store.contributions = await Utils.getGithubContribution(conf.username);
			break;
	}

	Game.startGame();
};
