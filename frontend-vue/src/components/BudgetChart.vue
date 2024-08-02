<template>
    <div class="lg:flex w-full lg:space-x-10 md:space-y-5 lg:space-y-0">
        <div class="card rounded-box grid h-80 md:h-96 flex-grow place-items-center">
            <Bar id="my-chart-id" :options="chartOptions" :data="chartData.barChart" />
            <!-- <span> Income/Expenses </span> -->
        </div>
        <div class="card rounded-box grid h-80 md:h-96 flex-grow place-items-center">
            <Pie :data="chartData.pieChart" :options="chartOptions" />
            <!-- <span> Categories Expenses </span> -->
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