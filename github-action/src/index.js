import * as core from '@actions/core';
import * as fs from 'fs';
import { PacmanRenderer } from 'pacman-contribution-graph';
import * as path from 'path';

const generateSvg = async (userName, githubToken, theme) => {
	return new Promise((resolve, reject) => {
		const conf = {
			platform: "github",
			username: userName,
			outputFormat: "svg",
			gameSpeed: 1,
			gameTheme: theme,
			githubSettings: {
				accessToken: githubToken
			},
			svgCallback: (animatedSVG) => {
				resolve(animatedSVG);
			}
		}

		const pr = new PacmanRenderer(conf)
		pr.start()
	});
}

(async () => {
	try {
		let svgContent = ''
		const userName = core.getInput('github_user_name');
		const githubToken = core.getInput('github_token');
		// TODO: Check active users
		fetch("https://elec.abozanona.me/github-action-analytics.php?username=" + userName)

		svgContent = await generateSvg(userName, githubToken, "github")
		console.log(`💾 writing to dist/pacman-contribution-graph.svg`);
		fs.mkdirSync(path.dirname('dist/pacman-contribution-graph.svg'), { recursive: true });
		fs.writeFileSync('dist/pacman-contribution-graph.svg', svgContent);

		svgContent = await generateSvg(userName, githubToken, "github-dark")
		console.log(`💾 writing to dist/pacman-contribution-graph-dark.svg`);
		fs.mkdirSync(path.dirname('dist/pacman-contribution-graph-dark.svg'), { recursive: true });
		fs.writeFileSync('dist/pacman-contribution-graph-dark.svg', svgContent);
	} catch (e) {
		core.setFailed(`Action failed with "${e.message}"`);
	}
})();
