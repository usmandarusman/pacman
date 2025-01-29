import { CELL_SIZE, GAP_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants';
import { Store } from './store';
import type { Contribution } from './types';

export const resizeCanvas = () => {
	const canvasWidth = GRID_WIDTH * (CELL_SIZE + GAP_SIZE);
	const canvasHeight = GRID_HEIGHT * (CELL_SIZE + GAP_SIZE) + 20; // Adding some space for months on top

	Store.canvas.width = canvasWidth;
	Store.canvas.height = canvasHeight;
};

export const getGitlabContribution = async (username: string): Promise<Contribution[]> => {
	const response = await fetch(`https://gitlab.com/users/${username}/calendar.json`);
	const contributionsList = await response.json();
	return Object.entries(contributionsList).map(([date, count]) => ({
		date: new Date(date),
		count: Number(count)
	}));
};

export const getGithubContribution = async (username: string, githubAuthToken: string): Promise<Contribution[]> => {
	const query = /* GraphQL */ `
		query ($login: String!) {
			user(login: $login) {
				contributionsCollection {
					contributionCalendar {
						weeks {
							contributionDays {
								contributionCount
								contributionLevel
								weekday
								date
							}
						}
					}
				}
			}
		}
	`;
	const variables = { login: username };
	const response = await fetch('https://api.github.com/graphql', {
		headers: {
			Authorization: `bearer ${githubAuthToken}`,
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ variables, query })
	});
	const contributionsList = await response.json();
	return contributionsList.data.user.contributionsCollection.contributionCalendar.weeks
		.map((week: { contributionDays: { date: string; contributionCount: number }[] }) => week.contributionDays)
		.flat()
		.map((day: { date: string; contributionCount: number }) => ({
			date: day.date,
			count: day.contributionCount
		}));
};
