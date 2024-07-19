<template>
    <div class="card shadow-lg">
        <div class="card-body">
        <form class="space-y-4" @submit.prevent="insertTransaction">
            <div class="form-control">
            <label class="label">
                <span class="label-text">Description</span>
            </label>
            <input v-model="transaction.description" type="text" placeholder="Enter description" class="input input-bordered">
            </div>
            <div class="form-control">
            <label class="label">
                <span class="label-text">Amount</span>
            </label>
            <input v-model="transaction.amount" type="number" placeholder="Enter amount" class="input input-bordered">
            </div>
            <div class="form-control">
            <label class="label">
                <span class="label-text">Type</span>
            </label>
            <select v-model="transaction.type" class="select select-bordered">
                <option value="null" disabled selected>Select type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
            </div>
            <button type="submit" class="btn btn-primary w-full">Add Transaction</button>
        </form>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const emits = defineEmits(['refetch']);

const transaction = ref({
    description: null,
    amount: null,
    type: null
})

const insertTransaction = async () => {
    const response = await userStore.addTransaction(transaction.value)
    if(response.status) {
        transaction.value.description = null
        transaction.value.amount = null
        transaction.value.type = null
        emits('refetch');
    }
};
</script>