<script lang="ts">
	import { heartRate, oldHeartRate } from '../lib/heartrate';
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-center justify-center bg-black/60"
	>
		<img src="/favicon.png" alt="heart" />
		<p class="text-2xl">Santa's Heart Rate: {$heartRate}</p>
		<p class="text-lg">Previous Heart Rate</p>
		<div class="flex w-full flex-row flex-wrap justify-center gap-2 text-sm">
			{#each $oldHeartRate as heartrate}
				<p>{heartrate}</p>
			{/each}
		</div>
	</div>
</main>
