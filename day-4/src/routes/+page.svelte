<script lang="ts">
	import { heartRate, oldHeartRate } from '../lib/heartrate';
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<div
		class="flex h-full w-full flex-col items-center justify-center bg-black/60"
	>
		<img src="/favicon.png" alt="heart" />
		<p class="text-2xl">Santa's Heart Rate: {$heartRate}</p>
		<div class="flex flex-row flex-wrap gap-2">
			{$oldHeartRate}
		</div>
	</div>
</main>
