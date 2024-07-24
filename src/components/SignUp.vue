<template>
    <img class="logo" src="../assets/resto-logo.jpg" alt="">
    <h1>Sign Up</h1>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Name">
        <input type="text" v-model="email" placeholder="Enter Email" :class="{ 'input-error': !isEmailValid }">
        <input type="password" v-model="password" placeholder="Enter Password" :class="{ 'input-error': !isPasswordValid }">
        <button v-on:click="signUp">Sign Up</button>
        <p>
            <router-link to="/login-page">Login</router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',
        };
    },
    computed: {
        isEmailValid() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(this.email);
        },
        isPasswordValid() {
    const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;
    return passwordPattern.test(this.password);
}

    },
    methods: {
        async signUp() {
            if (!this.isEmailValid || !this.isPasswordValid) {
                useToast().error('Please enter a valid email and password.Password must be 8 characters long and include one lowercase letter and one digit.');
                return;
            }

            try {
                let result = await axios.post("http://localhost:3000/users", {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                });

                if (result.status === 201) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    useToast().success('Sign up successful!');
                    this.$router.push({ name: 'Home' });
                }
            } catch (error) {
                console.error('Error signing up:', error);
                useToast().error('Failed to sign up. Please try again.');
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<style>
.input-error {
    border: 1px solid red;
}
</style>





<!-- <template>
    <img class="logo" src="../assets/resto-logo.jpg" alt="">
    <h1>Sign Up</h1>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Name">
        <input type="text" v-model="email" placeholder="Enter Email" :class="{ 'input-error': !isEmailValid }">
        <input type="password" v-model="password" placeholder="Enter Password" :class="{ 'input-error': !isPasswordValid }">
        <button v-on:click="signUp">Sign Up</button>
        <p>
            <router-link to="/login-page">Login</router-link>
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errorMessage: '',
        };
    },
    computed: {
        isEmailValid() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(this.email);
        },
        isPasswordValid() {
            // Example regex: At least 8 characters, 1 uppercase, 1 lowercase, 1 number
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return passwordPattern.test(this.password);
        }
    },
    methods: {
        async signUp() {
            if (!this.isEmailValid || !this.isPasswordValid) {
                this.errorMessage = 'Please enter a valid email and password.';
                return;
            }

            this.errorMessage = '';

            try {
                let result = await axios.post("http://localhost:3000/users", {
                    email: this.email,
                    password: this.password,
                    name: this.name,
                });
                
                console.warn(result);
                if (result.status === 201) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push({ name: 'Home' });
                }
            } catch (error) {
                console.error('Error signing up:', error);
                this.errorMessage = 'Failed to sign up. Please try again.';
            }
        }
    },
    mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<style>
.input-error {
    border: 1px solid red;
}
.error-message {
    color: red;
}
</style> -->
