import { CELL_SIZE, GAP_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants';
import { Store } from './store';
import type { Contribution } from './types';

export const resizeCanvas = () => {
	const canvasWidth = GRID_WIDTH * (CELL_SIZE + GAP_SIZE);
	const canvasHeight = GRID_HEIGHT * (CELL_SIZE + GAP_SIZE) + 20; // Adding some space for months on top

	Store.config.canvas.width = canvasWidth;
	Store.config.canvas.height = canvasHeight;
};

export const getGitlabContribution = async (username: string): Promise<Contribution[]> => {
	const response = await fetch(`https://gitlab.com/users/${username}/calendar.json`);
	const contributionsList = await response.json();
	return Object.entries(contributionsList).map(([date, count]) => ({
		date: new Date(date),
		count: Number(count)
	}));
};

export const getGithubContribution = async (username: string): Promise<Contribution[]> => {
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
