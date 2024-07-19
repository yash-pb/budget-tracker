import { defineStore } from 'pinia'
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const token = ref(null)
    const user = ref(null)
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const register = async(credential) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/register`, credential);  
            if(response.status == 201) {
                return {
                    status: true,
                    message: response.data.message
                }
            } else {
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }
        } catch (error) {
           console.log('error => ', error); 
           return {
                status: false,
                message: "Something went wrong"
            }
        }
    }

    const login = async(credential) => {
        try {
            const response = await axios.post(`${baseUrl}/auth/login`, credential);  
            if(response.status == 200) {
                token.value = response.data.token
                localStorage.setItem('token', token.value)
                return {
                    status: true,
                    message: "login auccess"
                }
            } else {
                return {
                    status: false,
                    message: "Something went wrong"
                }
            }
        } catch (error) {
           console.log('error => ', error); 
           return {
                status: false,
                message: "Something went wrong"
            }
        }
    }

    const setDatas = async(newToken) => {
        token.value = newToken
    }

    const dashboard = async() => {
        try {
            const response = await axios.get(`${baseUrl}/dashboard`, {
                headers: {
                    Authorization: `${token.value}`
                }
            });
            if(response.status == 200) {
                return response.data;
            }
        } catch (error) {
            let response = error.response
            if(response.status == 401) {
                router.push({
                    name: 'login'
                })
            }
        }
    }

    const addTransaction = async(transaction) => {
        try {
            const response = await axios.post(`${baseUrl}/add-transaction`, transaction, {
                headers: {
                    Authorization: `${token.value}`
                }
            });
            if(response.status == 200) {
                return {
                    status: true
                };
            }
        } catch (error) {
            let response = error.response
            if(response.status == 401) {
                router.push({
                    name: 'login'
                })
            }
        }
    }

    const deleteTransaction = async(transactionId) => {
        try {
            const response = await axios.post(`${baseUrl}/delete-transaction`, {
                transaction_id: transactionId
            }, {
                headers: {
                    Authorization: `${token.value}`
                }
            });
            if(response.status == 200) {
                return {
                    status: true
                };
            }
        } catch (error) {
            let response = error.response
            if(response.status == 401) {
                router.push({
                    name: 'login'
                })
            }
        }
    }

    const logout = async() => {
        try {
            const response = await axios.post(`${baseUrl}/logout`, [], {
                headers: {
                    Authorization: `${token.value}`
                }
            });
            if(response.status == 200) {
                localStorage.removeItem('token')
                return {
                    status: true
                };
            }
        } catch (error) {
           console.log('error => ', error); 
        }
    }
  
    return { token, user, register, login, setDatas, dashboard, addTransaction, deleteTransaction, logout }
})