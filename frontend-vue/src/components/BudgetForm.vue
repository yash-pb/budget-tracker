<template>
    <div class="card shadow-lg">
        <div class="card-body">
            <form class="space-y-4" @submit.prevent="insertTransaction">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Description</span>
                    </label>
                    <input v-model="transaction.description" type="text" placeholder="Enter description"
                        class="input input-bordered">
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Amount</span>
                    </label>
                    <input v-model="transaction.amount" type="number" placeholder="Enter amount"
                        class="input input-bordered">
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
                <div class="flex space-x-3">
                    <button type="submit" class="btn btn-primary w-1/2">Save Transaction</button>
                    <a role="button" @click="clearForm" class="btn w-1/2">Cancle</a>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";
import { ref, watch } from "vue";

const props = defineProps(['transactionData'])
const userStore = useUserStore();
const emits = defineEmits(['refetch']);

const transaction = ref({
    description: null,
    amount: null,
    type: null
})

const insertTransaction = async () => {
    const response = await userStore.addTransaction(transaction.value)
    if (response.status) {
        clearForm();
        emits('refetch');
    }
};

const clearForm = () => {
    transaction.value = {}
    transaction.value.description = null
    transaction.value.amount = null
    transaction.value.type = null
}

// console.log('transactionData => ', transactionData);
watch(props, async (newProps, oldProps) => {
    transaction.value = newProps.transactionData;
})


</script>