import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const appRouter = router({
	data: publicProcedure.query(async () => {
		const res = await fetch(
			'https://advent.sveltesociety.dev/data/2023/day-one.json'
		);
		const json = await res.json();
		return json as dataType[];
	}),
});

export type AppRouter = typeof appRouter;

export type dataType = {
	name: string;
	tally: number;
};
