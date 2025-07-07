import { Game } from './core/game';
import { Store } from './core/store';
import { Providers } from './providers/providers';
import { Config, PlayerStyle, StoreType } from './types';
import { Grid } from './utils/grid';
import { Utils } from './utils/utils';

export class PacmanRenderer {
	store!: StoreType;
	conf: Config;

	constructor(conf: Config) {
		this.conf = { ...conf };
	}

	public async start() {
		const defaultConfig: Config = {
			platform: 'github',
			username: '',
			canvas: undefined as unknown as HTMLCanvasElement,
			outputFormat: 'svg',
			svgCallback: (_: string) => {},
			gameOverCallback: () => {},
			gameTheme: 'github',
			gameSpeed: 1,
			enableSounds: false,
			pointsIncreasedCallback: (_: number) => {},
			githubSettings: { accessToken: '' },
			playerStyle: PlayerStyle.OPPORTUNISTIC
		};

		// Reset the store on each call to start()
		this.store = JSON.parse(JSON.stringify(Store));
		this.store.config = { ...defaultConfig, ...this.conf };

		switch (this.store.config.platform) {
			case 'gitlab':
				this.store.contributions = await Providers.fetchGitlabContributions(this.store);
				break;
			case 'github':
				this.store.contributions = await Providers.fetchGithubContributions(this.store);
				break;
			default:
				throw new Error(`Unsupported platform: ${this.store.config.platform}`);
		}

		Grid.buildWalls();
		Utils.buildGrid(this.store);
		Utils.buildMonthLabels(this.store);

		await Game.startGame(this.store);
		return this.store;
	}

	public stop() {
		Game.stopGame(this.store);
	}
}
