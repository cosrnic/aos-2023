<script lang="ts">
	import { quintInOut } from 'svelte/easing';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	let cookies = writable(0);
</script>

<main class="flex h-screen flex-col items-center justify-center gap-2 py-16">
	<p class="text-2xl">
		Cookies: {$cookies.toFixed(0)}
	</p>
	<div class="flex flex-row gap-2">
		<button
			class="rounded-md bg-green-500 p-2 text-white transition-all duration-200 ease-in-out hover:bg-green-400"
			on:click={() => $cookies++}>Add</button
		>
		<button
			class="rounded-md bg-red-500 p-2 text-white transition-all duration-200 ease-in-out hover:bg-red-400 disabled:bg-red-800"
			disabled={$cookies <= 0}
			on:click={() => {
				$cookies--;
			}}>Remove</button
		>
		<button
			class="rounded-md bg-zinc-500 p-2 text-white transition-all duration-200 ease-in-out hover:bg-zinc-400"
			on:click={() => cookies.set(0)}>Reset</button
		>
	</div>
	<div class="h-full max-w-[500px]">
		<ul class="flex max-w-[500px] flex-row flex-wrap gap-1">
			{#each { length: $cookies } as _, i}
				<li>
					<img
						src="/favicon.png"
						alt="cookie"
						class="h-8 w-8"
						transition:fly={{
							delay: 100,
							duration: 200,
							x: -32,
							easing: quintInOut,
						}}
					/>
				</li>
			{/each}
		</ul>
	</div>
</main>
