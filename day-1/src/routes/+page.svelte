<script lang="ts">
	import type { dataType } from '$lib/server/routes/_app';
	import { trpc } from '$lib/trpc';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const data = trpc.data.query();

	let nameInput: HTMLInputElement;
	let tallyInput: HTMLInputElement;

	let niceChildren = writable<dataType[] | undefined>();
	let naughtyChildren = writable<dataType[] | undefined>();

	$: niceChildren.set(
		$data.data?.filter((c) => c.tally >= 0).sort((a, b) => b.tally - a.tally)
	);

	$: naughtyChildren.set(
		$data.data?.filter((c) => c.tally < 0).sort((a, b) => a.tally - b.tally)
	);

	function saveChild() {
		let nameValue = nameInput.value;
		let tallyValue = Number(tallyInput.value);

		if (tallyValue >= 0) {
			niceChildren.update((v) => {
				if (!v) return v;
				v?.push({
					name: nameValue,
					tally: tallyValue,
				});
				return v.sort((a, b) => b.tally - a.tally);
			});
		} else {
			naughtyChildren.update((v) => {
				if (!v) return v;
				v?.push({
					name: nameValue,
					tally: tallyValue,
				});
				return v.sort((a, b) => a.tally - b.tally);
			});
		}
	}

	function deleteChild(child: dataType) {
		if (child.tally >= 0) {
			niceChildren.update((v) => {
				if (!v) return v;
				let index = v.findIndex((children) => children.name === child.name);

				if (index !== -1) {
					v = [...v.slice(0, index), ...v.slice(index + 1)];
				}

				return v.sort((a, b) => b.tally - a.tally);
			});
		} else {
			naughtyChildren.update((v) => {
				if (!v) return v;
				let index = v.findIndex((children) => children.name === child.name);

				if (index !== -1) {
					v = [...v.slice(0, index), ...v.slice(index + 1)];
				}

				return v.sort((a, b) => a.tally - b.tally);
			});
		}
	}
</script>

{#if $niceChildren && $naughtyChildren}
	<main class="flex h-fit flex-row gap-4 p-2">
		<div class="flex h-fit w-fit flex-col rounded-md bg-green-900/40 p-2">
			<div class="text-center text-2xl font-semibold text-green-300">NICE</div>
			<div class="grid w-fit grid-cols-3 gap-1">
				{#each $niceChildren as children}
					<div
						class="flex items-center justify-center rounded-md border-2 border-green-400 p-1"
					>
						{children.name}
					</div>
					<div
						class="flex items-center justify-center rounded-md border-2 border-green-400 p-1"
					>
						{children.tally}
					</div>
					<button
						on:click={() => {
							deleteChild(children);
						}}
						class="flex items-center justify-center rounded-md border-2 border-red-500 bg-transparent transition-all duration-200 ease-in-out hover:text-red-500"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M3 6h18" /><path
								d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
							/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line
								x1="10"
								x2="10"
								y1="11"
								y2="17"
							/><line x1="14" x2="14" y1="11" y2="17" /></svg
						>
					</button>
				{/each}
			</div>
		</div>
		<div class="flex h-fit w-fit flex-col rounded-md bg-red-900/40 p-2">
			<div class="text-center text-2xl font-semibold text-red-300">NAUGHTY</div>
			<div class="grid w-fit grid-cols-3 gap-1">
				{#each $naughtyChildren as children}
					<div
						class="flex items-center justify-center rounded-md border-2 border-red-400 p-1"
					>
						{children.name}
					</div>
					<div
						class="flex items-center justify-center rounded-md border-2 border-red-400 p-1"
					>
						{children.tally}
					</div>
					<button
						on:click={() => {
							deleteChild(children);
						}}
						class="flex items-center justify-center rounded-md border-2 border-red-500 bg-transparent transition-all duration-200 ease-in-out hover:text-red-500"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M3 6h18" /><path
								d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
							/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line
								x1="10"
								x2="10"
								y1="11"
								y2="17"
							/><line x1="14" x2="14" y1="11" y2="17" /></svg
						>
					</button>
				{/each}
			</div>
		</div>
		<div
			class="fixed right-2 flex h-fit w-fit flex-col gap-1 rounded-md bg-blue-900/40 p-2"
		>
			<p>Enter a Childs Name</p>
			<input
				bind:this={nameInput}
				class="focus:border-3 rounded-md border-2 border-blue-400 bg-transparent p-1 text-white transition-all duration-200 ease-in-out focus:bg-blue-900/40 focus:outline-none focus-visible:outline-none"
			/>
			<p>Enter their Tally</p>
			<input
				bind:this={tallyInput}
				type="number"
				min="-100"
				max="100"
				class="focus:border-3 rounded-md border-2 border-blue-400 bg-transparent p-1 text-white transition-all duration-200 ease-in-out focus:bg-blue-900/40 focus:outline-none focus-visible:outline-none"
			/>
			<button
				on:click={saveChild}
				class="rounded-md border-2 border-blue-400 bg-transparent p-1 transition-all duration-200 ease-in-out hover:bg-blue-900/40"
				>Save</button
			>
		</div>
	</main>
{/if}
