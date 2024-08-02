<template>
    <div class="lg:flex w-full lg:space-x-10 md:space-y-5 lg:space-y-0">
        <div class="card lg:w-1/2 rounded-box grid h-80 md:h-96 flex-grow flex-col place-items-center">
            <span>
                <Bar width="650" id="my-chart-id" :options="chartOptions" :data="chartData.barChart" />
            </span>
            <span> Income/Expenses </span>
        </div>
        <div class="card lg:w-1/2 rounded-box grid h-80 md:h-96 flex-grow flex-col place-items-center">
            <span>
                <Pie width="350" :data="chartData.pieChart" :options="chartOptions" />
            </span>
            <span> Categories Expenses </span>
        </div>
    </div>
</template>
<script setup>
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

const props = defineProps(['chartData']);
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false
}
</script>