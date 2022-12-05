import store from '@/store'
import Vue from 'vue'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            } else {
                Vue.axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;
    }
})