import { GAME_THEMES } from './constants';
import type { Contribution, GameTheme, StoreType } from './types';

const getGitlabContribution = async (username: string): Promise<Contribution[]> => {
	// const response = await fetch(`https://gitlab.com/users/${username}/calendar.json`);
	const response = await fetch(
		`https://v0-new-project-q1hhrdodoye-abozanona-gmailcoms-projects.vercel.app/api/contributions?username=${username}`
	);
	const contributionsList = await response.json();
	return Object.entries(contributionsList).map(([date, count]) => ({
		date: new Date(date),
		count: Number(count)
	}));
};

const getGithubContribution = async (username: string): Promise<Contribution[]> => {
	const response = await fetch(
		`https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&page=1&per_page=1000`
	);
	const contributionsList = await response.json();
	return Array.from(
		contributionsList.items
			.reduce((map: any, item: any) => {
				const dateString = item.commit.committer.date.split('T')[0];
				const date = new Date(dateString);
				const count = (map.get(dateString) || { count: 0 }).count + 1;
				return map.set(dateString, { date, count });
			}, new Map())
			.values()
	);
};

const getCurrentTheme = (store: StoreType): GameTheme => {
	return GAME_THEMES[store.config.gameTheme] ?? GAME_THEMES['github'];
};

function hexToRGBA(hex: string, alpha: number): string {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const Utils = {
	getGitlabContribution,
	getGithubContribution,
	getCurrentTheme,
	hexToRGBA
};
