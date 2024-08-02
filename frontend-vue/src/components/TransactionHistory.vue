<template>
  <div class="my-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-2">Transaction History</h2>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" v-if="transactions" :key="index">
            <td>{{ transaction.description }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.created_at }}</td>
            <td>
              <div class="flex space-x-5">
                <span>
                  <svg @click="editTransaction(transaction._id)" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                  </svg>
                </span>
                <span>
                  <svg @click="deleteTransaction(transaction._id)" class="cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                    <path
                      d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z">
                    </path>
                  </svg>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="transactions.length == 0">
            <td colspan="5" class="text-center">No Transaction found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";

const props = defineProps(['transactions'])
const userStore = useUserStore();
const emits = defineEmits(['refetch', 'edit']);

const deleteTransaction = async (id) => {
  let response = await userStore.deleteTransaction(id)
  if (response.status) {
    emits('refetch');
  }
}

const editTransaction = async (id) => {
  emits('edit', id);
}
</script>