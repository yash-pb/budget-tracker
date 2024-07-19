<template>
    <div class="bg-gray-50 flex items-center justify-center h-screen">
        <div class="soft-card p-6 max-w-md w-full">
            <h2 class="text-3xl font-bold text-gray-900 text-center mb-4">Login</h2>
            <form class="space-y-6" @submit.prevent="loginUser">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-gray-700">Email</span>
                    </label>
                    <input v-model="formData.email" type="email" placeholder="Enter your email"
                        class="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text text-gray-700">Password</span>
                    </label>
                    <input v-model="formData.password" type="password" placeholder="Enter your password"
                        class="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500">
                </div>
                <button type="submit" class="btn btn-primary w-full rounded-lg">Login</button>
                <p class="text-center text-gray-600 mt-4">
                    Don't have an account? 
                    <router-link to="/signup" class="text-blue-500 hover:underline">Sign Up</router-link>
                </p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { useRouter } from "vue-router";

const router = useRouter()
const userStore = useUserStore()
const formData = ref({
    email: null,
    password: null
})
const loginUser = async () => {
    const response = await userStore.login(formData.value)
    if(response.status) {
        router.push({
            name: 'dashboard'
        })
    } else {
        error.value = response.message
    }
};
</script>