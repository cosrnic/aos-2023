<script lang="ts">
	import type { dataType } from '$lib/server/routes/_app';
	import { trpc } from '$lib/trpc';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const data = trpc.data.query();

	let maxCapacity = 100;
	let sledCapcity = 0;

	$: sledCapcity = $sledPresents.reduce((acc, item) => acc + item.weight, 0);

	let presents = writable<dataType[]>([]);
	let sledPresents = writable<dataType[]>([]);

	onMount(() => {
		presents.set($data.data!);
	});
</script>

{#if $data.data}
	<main class="flex h-screen w-full flex-row p-1">
		<div class="flex h-full w-fit flex-col gap-1 overflow-y-scroll p-1">
			<p>Presents{':'}</p>
			{#each $presents as present}
				<div class="flex min-w-[300px] flex-row justify-between gap-x-1">
					{present.name}: {present.weight}kg
					<button
						on:click={() => {
							presents.update((v) => {
								let index = v.findIndex((name) => name.name == present.name);

								if (index !== -1) {
									v.splice(index, 1);
								}

								return v;
							});

							sledPresents.update((v) => {
								v.push(present);
								return v;
							});
						}}
						class=" rounded-md bg-blue-500 p-1 text-white transition-all duration-200 ease-in-out hover:bg-blue-600"
						>Add to Sled</button
					>
				</div>
			{/each}
		</div>
		<div
			class="flex h-full w-fit min-w-[300px] flex-col gap-1 overflow-y-scroll p-1"
		>
			<p>Sled Presents{':'}</p>
			{#each $sledPresents as present}
				<div class="flex flex-row justify-between gap-x-1">
					{present.name}: {present.weight}kg
					<button
						on:click={() => {
							sledPresents.update((v) => {
								let index = v.findIndex((name) => name.name == present.name);

								if (index !== -1) {
									v.splice(index, 1);
								}

								return v;
							});

							presents.update((v) => {
								v.push(present);
								return v;
							});
						}}
						class="rounded-md bg-red-500 p-1 text-white transition-all duration-200 ease-in-out hover:bg-red-600"
						>Remove from Sled</button
					>
				</div>
			{/each}
		</div>
		<div
			class="flex h-full w-auto flex-grow flex-col items-center justify-center p-4"
		>
			<div
				class:bg-red-500={sledCapcity > maxCapacity}
				class:border-red-600={sledCapcity > maxCapacity}
				class:bg-green-500={sledCapcity <= maxCapacity}
				class:border-green-600={sledCapcity <= maxCapacity}
				class="flex aspect-square h-96 flex-col items-center justify-center rounded-full border-4"
			>
				<p class="text-2xl">Sled Capacity</p>
				<p class="text-xl">{sledCapcity}</p>
				<p>/</p>
				<p>{maxCapacity}</p>
			</div>
		</div>
	</main>
{/if}

<style>
</style>
