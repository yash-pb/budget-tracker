<template>
    <div class="bg-gray-50 flex items-center justify-center min-h-screen">
        <div class="soft-card p-8 max-w-lg w-full">
            <h2 class="text-3xl font-bold text-gray-900 text-center mb-6">Sign Up</h2>
            <div role="alert" class="alert alert-error" v-if="error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{error}}</span>
            </div>
            <form class="space-y-6" @submit.prevent="signup">
            <div class="form-control">
                <label class="label">
                <span class="label-text text-gray-700">Name</span>
                </label>
                <input v-model="formData.name" type="text" placeholder="Enter your name" class="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>  
            <div class="form-control">
                <label class="label">
                <span class="label-text text-gray-700">Email</span>
                </label>
                <input v-model="formData.email" type="email" placeholder="Enter your email" class="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="form-control">
                <label class="label">
                <span class="label-text text-gray-700">Password</span>
                </label>
                <input v-model="formData.password" type="password" placeholder="Enter your password" class="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <button type="submit" class="btn btn-primary w-full rounded-lg">Sign Up</button>
            <p class="text-center text-gray-600 mt-4">
                Already have an account? 
                <router-link to="/login" class="text-blue-500 hover:underline">Log in</router-link>
            </p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import { useRouter } from "vue-router";

const userStore = useUserStore()

const formData = ref({
  name: null,
  email: null,
  password: null
});
const error = ref(null)
const router = useRouter()

const rules = {
  name: { required },
  email: { required, email },
};

const v$ = useVuelidate(rules, formData);

const signup = async () => {
    const response = await userStore.register(formData.value)
    if(response.status) {
        router.push({
            name: 'login'
        })
    } else {
        error.value = response.message
    }
};
</script>