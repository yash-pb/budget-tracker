<template>
    <div class="container mx-auto p-4">
        <!-- Header -->
        <!-- <header class="text-center my-4">
            <h1 class="text-4xl font-bold text-gray-800">Budget Tracker</h1>
            <p class="text-gray-600">Track your income and expenses effortlessly</p>
        </header> -->
        <header class="flex justify-between items-center py-4">
            <div class="text-center">
                <h1 class="text-4xl font-bold text-gray-800">Budget Tracker</h1>
                <p class="text-gray-600">Track your income and expenses effortlessly</p>
            </div>
            <div>
                <button class="btn btn-secondary rounded-lg" @click="logoutUser">Logout</button>
            </div>
        </header>

        <!-- Budget Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <MainCard title="Total Income" :data="totalIncome" color="bg-success"/>
            <MainCard title="Total Expenses" :data="totalExpense" color="bg-error"/>
            <MainCard title="Net Balance" :data="netBalance" color="bg-info"/>
        </div>

        <div class="text-right m-5">
            Show Chart
            <input type="checkbox" class="ml-2 toggle toggle-success" v-model="isPro" @onChange="!isPro" />
        </div>

        <div v-if="isPro">
            <BudgetChart :chartData="computedChartData"/>
        </div>
        <!-- Income and Expense Form -->
        <BudgetForm @refetch="refetchData" v-else/>

        <!-- Transaction List -->
        <TransactionHistory :transactions="computedTransaction" @refetch="refetchData"/>
    </div>
</template>
<script setup>
import MainCard from "../components/MainCard.vue";
import BudgetForm from "../components/BudgetForm.vue";
import BudgetChart from "../components/BudgetChart.vue";
import TransactionHistory from "../components/TransactionHistory.vue";
import { useUserStore } from "../stores/user";
import { computed, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const transactions = ref([]);
const totalExpense = ref(0);
const totalIncome = ref(0);
const router = useRouter()
const isPro = ref(false)

const chartData = ref([])

onBeforeMount(() => {
    fetchDashboard()
})

const fetchDashboard = async () => {
    let response = await userStore.dashboard()
    transactions.value = response.transactions
    totalExpense.value = response.expense
    totalIncome.value = response.income

    let chartResponse = await userStore.chartData()
    chartData.value = chartResponse
};

const computedChartData = computed(() => {
    return chartData.value
})

const computedTransaction = computed(() => {
    return transactions.value
})

const netBalance = computed(() => {
    return totalIncome.value - totalExpense.value;
})

const refetchData = () => {
    fetchDashboard()
}

const logoutUser = async() => {
    const response = await userStore.logout()
    if(response.status) {
        router.push({
            name: 'login'
        })
    } else {
        error.value = response.message
    }
}
</script>