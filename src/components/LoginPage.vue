<!-- <template>
  <img class="logo" src="../assets/resto-logo.jpg" alt="" />
  <h1>Login</h1>
  <div class="login">
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login">Login</button>
    <p>
      <router-link to="/sign-up">Sign up</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "LoginPage",
  data()
  {
    return{
      email:'',
      password:''
    }
  },
  methods:{
   async login()
    {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      )
      if(result.status==200 && result.data.length > 0)
            {
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'Home'})
            }
      console.warn(result)
    }
  }
};
</script> -->



<template>
  <img class="logo" src="../assets/resto-logo.jpg" alt="" />
  <h1>Login</h1>
  <div class="login">
    <input type="text" v-model="email" placeholder="Enter Email" :class="{ 'input-error': !isEmailValid }" />
    <input type="password" v-model="password" placeholder="Enter Password" :class="{ 'input-error': !isPasswordValid }" />
    <button v-on:click="login">Login</button>
    <p>
      <router-link to="/sign-up">Sign up</router-link>
    </p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  computed: {
    isEmailValid() {
      // Simple regex for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    },
    isPasswordValid() {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordPattern.test(this.password);
    }
  },
  methods: {
    async login() {
      if (!this.isEmailValid || !this.isPasswordValid) {
        this.errorMessage = 'Please enter a valid email and password.';
        return;
      }

      this.errorMessage = '';

      try {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.email}&password=${this.password}`
        );

        if (result.status === 200 && result.data.length > 0) {
          localStorage.setItem("user-info", JSON.stringify(result.data[0])); // Assuming result.data is an array
          this.$router.push({ name: 'Home' });
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.errorMessage = 'Failed to login. Please try again.';
      }
    }
  }
};
</script>

<style>
.input-error {
  border: 1px solid red;
}
.error-message {
  color: red;
}
</style>
