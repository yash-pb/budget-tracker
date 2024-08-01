<template>
    <div class="lg:flex w-full lg:space-x-10 md:space-y-5 lg:space-y-0">
        <div class="card lg:w-1/2 rounded-box grid h-80 md:h-96 flex-grow place-items-center">
            <!-- {{ chartData }} -->
            <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
        </div>
        <div class="card lg:w-1/2 rounded-box grid h-80 md:h-96 flex-grow place-items-center">
            Comming Soon
            <!-- <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />  -->
        </div>
    </div>
</template>
<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const props = defineProps(['chartData']);
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartOptions = {
    responsive: true
}
</script>