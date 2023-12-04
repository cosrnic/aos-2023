import { writable } from "svelte/store";

export let heartRate = writable(0);
export let oldHeartRate = writable<number[]>([]);

heartRate.subscribe((v) => {
    oldHeartRate.update((a) => {
        a.push(v);
        return a;
    })
})

async function updateHeartRate() {
    const res = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json");
    const json: {
        heartRate: number;
    } = await res.json()

    heartRate.set(json.heartRate);
}

setInterval(() => {
    updateHeartRate()
}, 1000)