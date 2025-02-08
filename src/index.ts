import { Game } from './game';
import { Store } from './store';
import { Config, StoreType } from './types';
import { Utils } from './utils';

export class PacmanRenderer {
	store: StoreType;
	conf: Config;

	constructor(conf: Config) {
		this.store = { ...Store };
		this.conf = { ...conf };
	}

	public async start() {
		const defaultConfing: Config = {
			platform: 'github',
			username: '',
			canvas: undefined as unknown as HTMLCanvasElement,
			outputFormat: 'svg',
			svgCallback: (_: string) => {},
			gameOverCallback: () => () => {},
			gameTheme: 'github',
			gameSpeed: 1,
			enableSounds: true,
			pointsIncreasedCallback: (_: number) => {}
		};
		this.store.config = { ...defaultConfing, ...this.conf };

		switch (this.conf.platform) {
			case 'gitlab':
				this.store.contributions = await Utils.getGitlabContribution(this.store);
				break;

			case 'github':
				this.store.contributions = await Utils.getGithubContribution(this.store);
				break;
		}

		Game.startGame(this.store);
	}

	public stop() {
		Game.stopGame(this.store);
	}
}
